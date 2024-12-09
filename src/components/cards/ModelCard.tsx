import React from 'react';
import { Sparkles } from 'lucide-react';

interface ModelCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function ModelCard({ title, description, icon }: ModelCardProps) {
  return (
    <div className="group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-yellow-500/10 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300" />
      <div className="border border-violet-500/20 rounded-xl p-4 bg-black/30 backdrop-blur-sm
                    hover:border-cyan-500/30 transition-colors">
        <div className="flex items-start space-x-4">
          <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-medium text-violet-100 mb-1">{title}</h3>
            <p className="text-sm text-violet-300/80">{description}</p>
          </div>
          <button className="ml-auto p-2 hover:bg-violet-500/10 rounded-lg transition-colors">
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </button>
        </div>
      </div>
    </div>
  );
}