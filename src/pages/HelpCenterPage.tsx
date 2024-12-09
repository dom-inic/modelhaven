import React from 'react';
import { Book, MessageCircle, Video, FileText, Search } from 'lucide-react';

const helpCategories = [
  {
    icon: Book,
    title: 'Getting Started',
    description: 'Learn the basics of using our AI platform'
  },
  {
    icon: MessageCircle,
    title: 'Chat Interactions',
    description: 'Tips for effective communication with AI models'
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Step-by-step guides for advanced features'
  },
  {
    icon: FileText,
    title: 'Documentation',
    description: 'Detailed technical documentation and API references'
  }
];

export function HelpCenterPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-violet-100 mb-4">Help Center</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search help articles..."
            className="w-full bg-violet-950/30 border border-violet-500/30 rounded-lg py-3 pl-10 pr-4
                     text-violet-100 placeholder-violet-400/50 focus:outline-none focus:ring-2
                     focus:ring-cyan-500/50 transition-all"
          />
          <Search className="w-5 h-5 text-violet-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {helpCategories.map(({ icon: Icon, title, description }) => (
          <div key={title} className="border border-violet-500/20 rounded-xl p-6 bg-black/30
                                  hover:border-cyan-500/30 transition-all group cursor-pointer">
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-lg bg-violet-500/10 text-violet-400
                           group-hover:bg-cyan-500/10 group-hover:text-cyan-400 transition-colors">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-violet-100 group-hover:text-cyan-100 mb-2">{title}</h3>
                <p className="text-violet-300">{description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border border-violet-500/20 rounded-xl p-6 bg-black/30">
        <h2 className="text-xl font-medium text-violet-100 mb-4">Need More Help?</h2>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-500 transition-colors">
            Contact Support
          </button>
          <button className="px-4 py-2 border border-violet-500 text-violet-100 rounded-lg
                         hover:bg-violet-500/10 transition-colors">
            Join Community
          </button>
        </div>
      </div>
    </div>
  );
}