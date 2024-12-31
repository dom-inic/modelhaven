import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl">
      <div className="relative">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Hello, what do you want to build with AI today?&#10;Example: I need to create a short animated video for my startup's product launch. The video should be engaging and professional-looking, and I want to use AI tools to help with the creation process."
          className="w-full px-6 py-4 text-lg text-black rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[100px] resize-y"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-3 bottom-3 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300 flex items-center gap-2"
        >
          <Send className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>
      </div>
      <p className="mt-2 text-sm text-gray-500">
        Press Shift + Enter for new line, Enter to search
      </p>
    </form>
  );
}