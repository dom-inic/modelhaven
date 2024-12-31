import { SearchResult } from "../types";

interface SerperResponse {
  organic: Array<{
    title: string;
    link: string;
    snippet: string;
    position?: number;
  }>;
}

export async function searchWeb(query: string): Promise<SearchResult[]> {
  const SERPER_API_URL = 'https://google.serper.dev/search';
  
  try {
    const response = await fetch(SERPER_API_URL, {
      method: 'POST',
      headers: {
        'X-API-KEY': import.meta.env.VITE_SERPER_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        q: `${query} AI tools models products software`,
        num: 5
      })
    });

    if (!response.ok) {
      throw new Error(`Search API returned status: ${response.status}`);
    }

    const data: SerperResponse = await response.json();

    // Validate and transform the response
    if (!data.organic || !Array.isArray(data.organic)) {
      throw new Error('Invalid response format from search API');
    }

    return data.organic.map((result, index) => ({
      title: result.title || 'Untitled',
      link: result.link || '',
      snippet: result.snippet || '',
      position: result.position || index + 1
    }));

  } catch (error) {
    console.error('Web search failed:', error);
    
    // Provide more detailed error logging
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    }
    
    // Return empty array but don't fail completely
    return [];
  }
}

// Utility function to sanitize search queries
export function sanitizeSearchQuery(query: string): string {
  return query
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, ' '); // Normalize whitespace
}

// Optional: Add rate limiting
let lastSearchTime = 0;
const RATE_LIMIT_MS = 1000; // 1 second between searches

export async function rateDelaySearch(query: string): Promise<SearchResult[]> {
  const now = Date.now();
  const timeSinceLastSearch = now - lastSearchTime;
  
  if (timeSinceLastSearch < RATE_LIMIT_MS) {
    await new Promise(resolve => 
      setTimeout(resolve, RATE_LIMIT_MS - timeSinceLastSearch)
    );
  }
  
  lastSearchTime = Date.now();
  return searchWeb(sanitizeSearchQuery(query));
}