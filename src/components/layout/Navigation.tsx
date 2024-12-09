import React from 'react';
import { Home, Compass, Star, HelpCircle, Settings } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Home' },
  { icon: Compass, label: 'Explore Models' },
  { icon: Star, label: 'My Favorites' },
  { icon: HelpCircle, label: 'Help Center' },
  { icon: Settings, label: 'Settings' },
];

export function Navigation() {
  return (
    <nav className="bg-black/50 backdrop-blur-md border-b border-violet-500/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            {navItems.map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg
                         text-violet-300 hover:text-cyan-400 transition-colors
                         hover:bg-violet-500/10 group"
              >
                <Icon className="w-5 h-5 group-hover:animate-pulse" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}