import React, { useState } from 'react';
import { Sparkles, Loader2, Home ,LucideBrain } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { SearchBar } from '../components/cards/SearchBar';
import { ProductCard } from '../components/cards/ProductCard';
import { ModelHavenSearch } from '../services/groq';
import type { SearchResponse } from '../types';

export  function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResponse | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    const modelHaven = new ModelHavenSearch(import.meta.env.VITE_GROQ_API_KEY);
    try {
      const result = await modelHaven.searchAIProducts(query);
      setSearchResult(result);
    } catch (error) {
      toast.error('Failed to fetch recommendations. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
    <Toaster position="top-right" />
    
    {/* Header */}
    <header>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <LucideBrain className="w-6 h-6 text-violet-400" />
          <h1 className="text-3xl font-bold text-violet-100">ModelHaven</h1>
        </div>
      </div>
    </header>

    {/* Main Content */}
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col items-center mb-12">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      </div>

      {isLoading && (
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin text-blue-500" size={32} />
        </div>
      )}

      {searchResult && !isLoading && (
        <div className="space-y-8">
          <div className="bg-violet-950/30 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2 text-violet-100">Recommendations</h2>
            <p className="text-violet-300">{searchResult.explanation}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResult.recommendations.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      )}

{!isLoading && !searchResult && (
  <div className="text-center text-violet-300">
    <p>Start by describing your project needs above</p>
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-violet-100">Recommended Queries:</h3>
      <div className="flex flex-wrap justify-center gap-4 mt-2">
        <div className="bg-violet-950/30 text-violet-300 px-4 py-2 rounded-lg">
          I need to create short animated video for my startup's product launch
        </div>
        <div className="bg-violet-950/30 text-violet-300 px-4 py-2 rounded-lg">
          Generate a marketing campaign using AI tools
        </div>
        <div className="bg-violet-950/30 text-violet-300 px-4 py-2 rounded-lg">
          Develop a chatbot for customer support
        </div>
        <div className="bg-violet-950/30 text-violet-300 px-4 py-2 rounded-lg">
          Am Looking for text to video models for my project
        </div>
        <div className="bg-violet-950/30 text-violet-300 px-4 py-2 rounded-lg">
          I want to create a full stack web application
        </div>
      </div>
    </div>
  </div>
)}
    </main>

     {/* Footer */}
     <footer className="mt-12 py-6 border-t border-violet-800 text-center text-violet-300">
        <div className="flex justify-center space-x-4 mb-4">
          <a href="https://x.com/coderfpv" target="_blank" rel="noopener noreferrer" className="hover:text-violet-100">X</a>
          <a href="https://github.com/dom-inic" target="_blank" rel="noopener noreferrer" className="hover:text-violet-100">GitHub</a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-violet-100">Discord</a>
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" className="hover:text-violet-100">Terms</a>
          <a href="#" className="hover:text-violet-100">Privacy</a>
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          <a href="https://www.paypal.com/donate?hosted_button_id=5ZBSSMTW49PB2" target="_blank" rel="noopener noreferrer" className="hover:text-violet-100">Donate</a>
        </div>
        <div className="text-violet-400">
          &copy; {new Date().getFullYear()} ModelHaven
        </div>
      </footer>
  </div>
  );
}
