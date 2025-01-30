import { Groq } from "groq-sdk";
import { SearchResponse, AIProduct, SearchResult } from "../types";
import { searchWeb } from "./search";

// Define specific types for better type safety
interface AIRecommendation {
  name: string;
  description: string;
  category: 'Video' | 'Image' | 'Text' | 'Audio' | 'Code' | 'Other';
  url: string;
  tags: string[];
  pricing: 'Free' | 'Freemium' | 'Paid' | 'Enterprise';
  useCase?: string;
  alternatives?: string[];
}

interface RecommendationResponse {
  recommendations: AIRecommendation[];
  explanation: string;
  query: string;
  timestamp: string;
}

export class ModelHavenSearch {
  private groq: Groq;
  private cache: Map<string, RecommendationResponse>;
  private readonly CACHE_DURATION = 1000 * 60 * 60; // 1 hour

  constructor(apiKey: string) {
    this.groq = new Groq({
      apiKey,
      dangerouslyAllowBrowser: true
    });
    this.cache = new Map();
  }

  private formatSearchResults(results: SearchResult[]): string {
    return results
      .map(result => {
        // Add validation for required fields
        if (!result.title || !result.link || !result.snippet) {
          return '';
        }
        return `
Title: ${result.title.trim()}
URL: ${result.link.trim()}
Description: ${result.snippet.trim()}
        `.trim();
      })
      .filter(Boolean)
      .join('\n\n');
  }

  private getCacheKey(query: string): string {
    return query.toLowerCase().trim();
  }

  private isCacheValid(timestamp: string): boolean {
    const cacheTime = new Date(timestamp).getTime();
    return Date.now() - cacheTime < this.CACHE_DURATION;
  }

  private async getFromCache(query: string): Promise<RecommendationResponse | null> {
    const cacheKey = this.getCacheKey(query);
    const cached = this.cache.get(cacheKey);
    
    if (cached && this.isCacheValid(cached.timestamp)) {
      return cached;
    }
    
    return null;
  }

  private setCache(query: string, response: RecommendationResponse): void {
    const cacheKey = this.getCacheKey(query);
    this.cache.set(cacheKey, response);
  }

  public async searchAIProducts(query: string): Promise<SearchResponse> {
    try {
      // Check cache first
      const cached = await this.getFromCache(query);
      if (cached) {
        return {
          recommendations: cached.recommendations,
          explanation: cached.explanation
        };
      }

      // Get search results
      const searchResults = await searchWeb(query);
      const webContext = this.formatSearchResults(searchResults);

      const systemPrompt = `You are an AI product, AI platforms, AI tools and ML models recommendation expert. Your goal is to help users find the most relevant AI tools, products and models for their specific needs.

Use these web search results to inform your recommendations:
${webContext}

Important guidelines:
1. Focus on currently available and reliable AI tools
2. Consider the user's technical expertise level
3. Include both popular and specialized alternatives
4. Verify pricing models are current
5. Ensure recommendations are directly relevant to the query

Format your response as JSON with this structure:
{
  "recommendations": [
    {
      "name": "Product Name",
      "description": "Brief but informative description",
      "category": "Video/Image/Text/Audio/Code/Other",
      "url": "Product URL",
      "tags": ["relevant", "tags"],
      "pricing": "Free/Freemium/Paid/Enterprise",
      "useCase": "Specific use case this tool excels at",
      "alternatives": ["Similar tool 1", "Similar tool 2"]
    }
  ],
  "explanation": "Detailed explanation of why these tools were recommended",
  "query": "${query}",
  "timestamp": "${new Date().toISOString()}"
}`;

      const completion = await this.groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: query
          }
        ],
        model:  "deepseek-r1-distill-llama-70b",
        temperature: 0.5,
        max_tokens: 1024,
        response_format: { type: "json_object" }
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new Error("No response from LLM");
      }

      const response = JSON.parse(content) as RecommendationResponse;
      
      // Cache the results
      this.setCache(query, response);

      return {
        recommendations: response.recommendations,
        explanation: response.explanation
      };

    } catch (error) {
      console.error('Error in searchAIProducts:', error);
      throw new Error(`Failed to search AI products: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
