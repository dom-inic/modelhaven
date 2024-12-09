import React from 'react';
import { Star, Trash2 } from 'lucide-react';
import { ModelCard } from '../components/cards/ModelCard';

const favoriteModels = [
  {
    id: '1',
    name: 'GPT-4 Turbo',
    description: 'Your most used AI assistant for complex tasks',
    lastUsed: '2 hours ago',
    type: 'Language Model'
  },
  {
    id: '2',
    name: 'Stable Diffusion XL',
    description: 'Create stunning artwork and illustrations',
    lastUsed: '1 day ago',
    type: 'Image Generation'
  },
  {
    id: '3',
    name: 'Luma AI',
    description: 'Create stunning videos for your projects',
    lastUsed: '1 day ago',
    type: 'Video Generation'
  },
  {
    id: '4',
    name: 'Runway',
    description: 'Create/ edit you videos',
    lastUsed: '1 day ago',
    type: 'Video Generation'
  },
  {
    id: '5',
    name: 'V0',
    description: 'Create full stack web application',
    lastUsed: '1 day ago',
    type: 'Code Generation'
  },
  {
    id: '6',
    name: 'LLama',
    description: 'Multimodal model',
    lastUsed: '1 day ago',
    type: 'Image/text/video Generation'
  }
];

export function FavoritesPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-violet-100">My Favorites</h1><br></br>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg
                         bg-violet-500/10 text-violet-300 hover:text-cyan-400 transition-colors">
            <Star className="w-5 h-5" />
            <span>Sort by Most Used</span>
          </button>
        </div>
        
      </div>
      <h3 className="text-3xl font-bold text-violet-100">Bookmark your AI models so you can easily find them on modelhaven</h3>

      <div className="space-y-4">
        {favoriteModels.map((model) => (
          <div key={model.id} className="border border-violet-500/20 rounded-xl p-6 bg-black/30
                                     hover:border-cyan-500/30 transition-all group">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-medium text-violet-100 mb-2">{model.name}</h3>
                <p className="text-violet-300 mb-4">{model.description}</p>
                <div className="flex items-center space-x-4 text-sm text-violet-400">
                  <span>Last used: {model.lastUsed}</span>
                  <span>Type: {model.type}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="p-2 hover:bg-violet-500/10 rounded-lg transition-colors">
                  <Trash2 className="w-5 h-5 text-violet-400 hover:text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}