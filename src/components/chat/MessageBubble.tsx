import React from 'react';
import { Bot, User } from 'lucide-react';

interface MessageBubbleProps {
  isAI: boolean;
  message: string;
  timestamp: string;
}

export function MessageBubble({ isAI, message, timestamp }: MessageBubbleProps) {
  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}>
      <div
        className={`flex max-w-[80%] ${
          isAI
            ? 'bg-gradient-to-r from-violet-900/50 to-blue-900/50 text-violet-100'
            : 'bg-gradient-to-r from-violet-800/50 to-pink-900/50 text-pink-100'
        } rounded-2xl p-4 shadow-lg relative overflow-hidden group`}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 transition-opacity duration-300" />
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-full ${isAI ? 'bg-violet-900/50' : 'bg-pink-900/50'}`}>
            {isAI ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
          </div>
          <div>
            <p className="text-sm">{message}</p>
            <span className="text-xs opacity-50 mt-2 block">{timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
}