import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  Compass,
  Star,
  HelpCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogIn,
  User
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { AuthModal } from '../auth/AuthModal';

const navItems = [
  { icon: Home, label: 'Modelhaven', path: '/' },
  { icon: Compass, label: 'Explore Models', path: '/explore' },
  { icon: Star, label: 'My Favorites', path: '/favorites' },
  { icon: HelpCircle, label: 'Help Center', path: '/help' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <div
        className={`${
          isExpanded ? 'w-64' : 'w-20'
        } bg-black/50 backdrop-blur-md border-r border-violet-500/20 transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 flex-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center p-2 rounded-lg
                     hover:bg-violet-500/10 transition-colors mb-6"
          >
            {isExpanded ? (
              <ChevronLeft className="w-5 h-5 text-violet-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-violet-400" />
            )}
          </button>

          <div className="space-y-2">
            {navItems.map(({ icon: Icon, label, path }) => (
              <button
                key={path}
                onClick={() => handleNavigation(path)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg
                         text-violet-300 hover:text-cyan-400 transition-colors
                         hover:bg-violet-500/10 group ${
                           location.pathname === path ? 'bg-violet-500/10 text-cyan-400' : ''
                         }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isExpanded && (
                  <span className="text-sm flex-1 text-left">{label}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-violet-500/20">
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="w-full flex items-center space-x-3 p-3 rounded-lg
                     text-violet-300 hover:text-cyan-400 transition-colors
                     hover:bg-violet-500/10 group"
            >
              <User className="w-5 h-5 flex-shrink-0" />
              {isExpanded && (
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{user.name}</span>
                  <span className="text-xs text-violet-400">{user.email}</span>
                </div>
              )}
            </button>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="w-full flex items-center space-x-3 p-3 rounded-lg
                     text-violet-300 hover:text-cyan-400 transition-colors
                     hover:bg-violet-500/10 group"
            >
              <LogIn className="w-5 h-5 flex-shrink-0" />
              {isExpanded && (
                <span className="text-sm flex-1 text-left">Login / Sign Up</span>
              )}
            </button>
          )}
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}