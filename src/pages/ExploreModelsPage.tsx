import React from 'react';
import { Search, Filter, Brain, Image, Code, Music, Video, Database } from 'lucide-react';

const categories = [
  { icon: Brain, name: 'Language Models', count: 24 },
  { icon: Image, name: 'Image Generation', count: 18 },
  { icon: Code, name: 'Code Assistants', count: 12 },
  { icon: Music, name: 'Audio Generation', count: 8 },
  { icon: Video, name: 'Video Creation', count: 6 },
  { icon: Database, name: 'Data Analysis', count: 15 }
];

export function ExploreModelsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-violet-100">Explore AI Models</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search models..."
              className="bg-violet-950/30 border border-violet-500/30 rounded-lg py-2 pl-10 pr-4
                       text-violet-100 placeholder-violet-400/50 focus:outline-none focus:ring-2
                       focus:ring-cyan-500/50 transition-all w-64"
            />
            <Search className="w-5 h-5 text-violet-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg
                         bg-violet-500/10 text-violet-300 hover:text-cyan-400 transition-colors">
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {categories.map(({ icon: Icon, name, count }) => (
          <div key={name} className="border border-violet-500/20 rounded-xl p-6 bg-black/30
                                   hover:border-cyan-500/30 transition-all group cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-violet-500/10 text-violet-400
                            group-hover:bg-cyan-500/10 group-hover:text-cyan-400 transition-colors">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-violet-100 group-hover:text-cyan-100">{name}</h3>
                <p className="text-sm text-violet-400">{count} models available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}