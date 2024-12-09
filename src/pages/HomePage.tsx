import React from 'react';
import { ChatArea } from '../components/chat/ChatArea';
import { ChatInput } from '../components/chat/ChatInput';
import { ModelCard } from '../components/cards/ModelCard';
import { Brain, Wand } from 'lucide-react';

const recommendedModels = [
  {
    title: 'Hunyuan Video',
    description: 'Advanced language model for complex tasks and creative writing',
    icon: <Brain className="w-5 h-5" />
  },
  {
    title: 'Eleven Labs',
    description: 'Generate stunning images from text descriptions',
    icon: <Wand className="w-5 h-5" />
  },
  {
    title: 'Sora',
    description: 'Generate stunning images from text descriptions',
    icon: <Wand className="w-5 h-5" />
  },
  {
    title: 'Gencast',
    description: 'Weather model better than weather forecasts they say',
    icon: <Wand className="w-5 h-5" />
  },
  {
    title: 'OpenAI o1',
    description: 'Reasoning model capped @200/month',
    icon: <Wand className="w-5 h-5" />
  },
  {
    title: 'OpenAI o1',
    description: 'Reasoning model capped @200/month',
    icon: <Wand className="w-5 h-5" />
  },
  {
    title: 'Nover',
    description: 'Multilingual support for africa',
    icon: <Wand className="w-5 h-5" />
  },
  {
    title: 'Nova',
    description: 'Amazon fleet of models',
    icon: <Wand className="w-5 h-5" />
  },
  {
    title: 'LLama 3.3',
    description: 'Reasoning model capped @200/month',
    icon: <Wand className="w-5 h-5" />
  },
 
];

export function HomePage() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex flex-col">
        <ChatInput />
        <ChatArea />
      </div>
      
      {/* Model Recommendations */}
      <div className="border-t border-violet-500/20 bg-black/30 p-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-violet-100 text-lg font-medium mb-4">Trending Models/AI platforms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedModels.map((model, idx) => (
              <ModelCard key={idx} {...model} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}