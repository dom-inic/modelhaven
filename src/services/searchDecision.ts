import { Groq } from "groq-sdk";
import { SearchResponse, AIProduct, SearchResult } from "../types";
import { searchWeb } from "./search";

interface AgentDecision {
  needsSearch: boolean;
  explanation: string;
  recommendations?: AIProduct[];
  searchQuery?: string;
}

export class ModelHavenSearch {
  private groq: Groq;

  constructor(apiKey: string) {
    this.groq = new Groq({
      apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  private async makeDecision(query: string): Promise<AgentDecision> {
    const completion = await this.groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an ML models recommendation expert with knowledge of common Ml models, AI tools and platforms.

First, decide if you can confidently recommend ML models, AI tools upto date for this query based on your existing knowledge, or if you need to search for more current/specific information.

Consider searching when:
- User asks about very specific or niche tools
- Query involves comparing current pricing or features
- Request is about new or emerging AI tools
- User needs specialized industry-specific tools

Use existing knowledge when:
- Query is about well-known AI tools (ChatGPT, Midjourney, etc.)
- Request is for common use cases (image generation, text analysis, etc.)
- User needs general recommendations
- Tools and features are well-established

Return JSON in this format:
{
  "needsSearch": boolean,
  "explanation": "Why you made this decision",
  "recommendations": [  // Include only if needsSearch is false
    {
      "name": "Product Name",
      "description": "Description",
      "category": "Category",
      "url": "URL",
      "tags": ["tags"],
      "pricing": "Pricing"
    }
  ],
  "searchQuery": "optimized search query"  // Include only if needsSearch is true
}`
        },
        {
          role: "user",
          content: query
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      max_tokens: 1024,
      response_format: { type: "json_object" }
    });

    return JSON.parse(completion.choices[0]?.message?.content || '{}');
  }

  public async searchAIProducts(userQuery: string): Promise<SearchResponse> {
    try {
      // First, let the LLM decide if it needs to search
      const decision = await this.makeDecision(userQuery);

      // If the LLM can provide recommendations directly, return them
      if (!decision.needsSearch && decision.recommendations) {
        return {
          recommendations: decision.recommendations,
          explanation: decision.explanation
        };
      }

      // If search is needed, proceed with web search
      const searchResults = await searchWeb(
        `${decision.searchQuery} AI tools products platforms software`
      );

      const webContext = searchResults
        .map(result => `
Title: ${result.title.trim()}
URL: ${result.link.trim()}
Description: ${result.snippet.trim()}`.trim())
        .join('\n\n');

      // Generate recommendations based on search results
      const completion = await this.groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are an AI product recommendation expert. Based on these search results:
${webContext}

Provide recommendations for: "${userQuery}"

Return JSON in this format:
{
  "recommendations": [
    {
      "name": "Product Name",
      "description": "Description focusing on AI capabilities",
      "category": "Video/Image/Text/Audio/Code/Other",
      "url": "Product URL",
      "tags": ["relevant", "tags"],
      "pricing": "Free/Freemium/Paid/Enterprise"
    }
  ],
  "explanation": "Brief explanation of recommendations"
}`
          }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.5,
        max_tokens: 1024,
        response_format: { type: "json_object" }
      });

      return JSON.parse(completion.choices[0]?.message?.content || '{}');

    } catch (error) {
      console.error('Error in searchAIProducts:', error);
      throw new Error(`Failed to search AI products: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}