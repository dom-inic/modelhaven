export type AICategory = 'Video' | 'Image' | 'Text' | 'Audio' | 'Code' | 'Other';
export type PricingModel = 'Free' | 'Freemium' | 'Paid' | 'Enterprise';

export interface AIProduct {
  name: string;
  description: string;
  category: AICategory;
  url: string;
  imageUrl?: string;  
  tags: string[];
  pricing: PricingModel;
  useCase?: string;
  alternatives?: string[];
  lastUpdated?: string;  // ISO date string
}

export interface SearchResponse {
  recommendations: AIProduct[];
  explanation: string;
}

export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  position?: number;
  source?: string;
}

export interface RecommendationResponse {
  recommendations: AIProduct[];
  explanation: string;
  query: string;
  timestamp: string;
}

// Error types for better error handling
export class ModelHavenError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'ModelHavenError';
  }
}

export interface SearchOptions {
  limit?: number;
  category?: AICategory;
  maxPrice?: PricingModel;
  includeAlternatives?: boolean;
}