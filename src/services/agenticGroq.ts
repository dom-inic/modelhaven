import { Groq } from "groq-sdk";
import { SearchResponse, AIProduct, SearchResult } from "../types";
import { searchWeb } from "./search";

interface QueryAnalysis {
  enhancedQuery: string;
  keywords: string[];
  userIntent: string;
}

export class ModelHavenSearch {
  private groq: Groq;

  constructor(apiKey: string) {
    this.groq = new Groq({
      apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  private cleanJsonResponse(response: string): string {
    // Remove markdown code blocks if present
    let cleaned = response.replace(/```json\s?/g, '').replace(/```\s?/g, '');
    // Remove any leading/trailing whitespace
    cleaned = cleaned.trim();
    return cleaned;
  }

  private async analyzeQuery(userQuery: string): Promise<QueryAnalysis> {
    try {
      const completion = await this.groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are an expert at understanding user needs and finding AI-powered products, tools and ML models. Respond only with pure JSON, no markdown.

When users describe what they want to build, create or looking for, analyze their request and return JSON in this exact format:
{
  "enhancedQuery": "specific search query to find AI tools",
  "keywords": ["key1", "key2"],
  "userIntent": "primary goal"
}`
          },
          {
            role: "user",
            content: userQuery
          }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.5,
        max_tokens: 300,
        response_format: { type: "json_object" }  // Force JSON response
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new Error("Empty response from LLM");
      }

      return JSON.parse(this.cleanJsonResponse(content));
    } catch (error) {
      console.error('Query analysis failed:', error);
      // Fallback to a simple analysis
      return {
        enhancedQuery: userQuery,
        keywords: [userQuery],
        userIntent: userQuery
      };
    }
  }

  public async searchAIProducts(userQuery: string): Promise<SearchResponse> {
    try {
      // Analyze query to get better search terms
      const analysis = await this.analyzeQuery(userQuery);
      
      // Single optimized search
      const searchResults = await searchWeb(
        `${analysis.enhancedQuery} ML models AI tools products platforms software`
      );

      // Format results for the LLM
      const webContext = searchResults
        .map(result => `
Title: ${result.title.trim()}
URL: ${result.link.trim()}
Description: ${result.snippet.trim()}`.trim())
        .join('\n\n');

      // Generate recommendations
      const completion = await this.groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are an ML models, AI producst, AI platforms and AI tools recommendation expert. Return only pure JSON, no markdown or code blocks.

For the query: "${userQuery}"
User's goal: ${analysis.userIntent}
Based on these search results:
${webContext}

Return JSON in exactly this format:
{
  "recommendations": [
    {
      "name": "Product Name",
      "description": "Focus on AI capabilities and how it solves user's need",
      "category": "Video/Image/Text/Audio/Code/Other",
      "url": "Product URL",
      "tags": ["relevant", "tags"],
      "pricing": "Free/Freemium/Paid/Enterprise"
    }
  ],
  "explanation": "Brief explanation focusing on how these AI tools/models solve the user's needs"
}`
          }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.5,
        max_tokens: 1024,
        response_format: { type: "json_object" }  // Force JSON response
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new Error("Empty response from LLM");
      }

      const recommendations = JSON.parse(this.cleanJsonResponse(content));

      return {
        recommendations: recommendations.recommendations,
        explanation: recommendations.explanation
      };

    } catch (error) {
      console.error('Error in searchAIProducts:', error);
      throw new Error(`Failed to search AI products: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}