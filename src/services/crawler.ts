import { Groq } from "groq-sdk";


interface SearchResponse {
    recommendations: Array<{
        name: string;
        description: string;
        category: string;
        tags: string[];
        link: string;
    }>;
    explanation: string;
}

export class TwitterCrawler {
    private groq: Groq;
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.groq = new Groq({
            apiKey,
            dangerouslyAllowBrowser: true
        });
    }

    private async fetchTweets(query: string): Promise<any[]> {
        const startTime = new Date(
            Date.now() - 24 * 60 * 60 * 1000
        ).toISOString();

        const encodedQuery = encodeURIComponent(`${query} AI tools`);
        const encodedStartTime = encodeURIComponent(startTime);
        const apiUrl = `https://api.x.com/2/tweets/search/recent?query=${encodedQuery}&max_results=10&start_time=${encodedStartTime}`;

        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Twitter API error: ${response.statusText}`);
        }

        const tweets = await response.json();
        return tweets.data || [];
    }

    public async searchAIProducts(query: string): Promise<SearchResponse> {
        try {
            const tweets = await this.fetchTweets(query);

            // Format tweets as context for LLM
            const tweetContext = tweets
                .map(tweet => `Tweet: ${tweet.text}\nURL: https://x.com/i/status/${tweet.id}`)
                .join('\n\n');

            const systemPrompt = `You are an expert in recomending AI trends to users. 
        Analyze these tweets about AI trends and recommend the most relevant AI trends based on the tweets:
  
        ${tweetContext}
  
        Format response as JSON:
        {
          "recommendations": [
            {
              "name": "Tool name from tweets",
              "description": "What it does",
              "category": "Tool category",
              "tags": ["relevant", "tags"],
              "link": "URL from tweets"
            }
          ],
          "explanation": "Why these tools are recommended based on the tweets"
        }`;
            const completion = await this.groq.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: systemPrompt
                    },
                    {
                        role: "user",
                        content: tweetContext
                    }
                ],
                model: "llama-3.3-70b-versatile",
                temperature: 0.5,
                max_tokens: 1024,
                response_format: { type: "json_object" }
            });

            const content = completion.choices[0]?.message?.content;
            if (!content) {
                throw new Error("No response from LLM");
            }
            return JSON.parse(content);

        } catch (error) {
            console.error('Twitter crawler error:', error);
            throw new Error('Failed to get tweets from Twitter');
        }
    }
}