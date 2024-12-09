import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const { login, signup } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, name);
      }
      onClose();
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-black/80 border border-violet-500/20 rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-violet-400 hover:text-cyan-400 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-2xl font-bold text-violet-100 mb-6">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-violet-950/30 border border-violet-500/30 rounded-lg py-2 px-4
                       text-violet-100 placeholder-violet-400/50 focus:outline-none focus:ring-2
                       focus:ring-cyan-500/50 transition-all"
            />
          )}
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-violet-950/30 border border-violet-500/30 rounded-lg py-2 px-4
                     text-violet-100 placeholder-violet-400/50 focus:outline-none focus:ring-2
                     focus:ring-cyan-500/50 transition-all"
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-violet-950/30 border border-violet-500/30 rounded-lg py-2 px-4
                     text-violet-100 placeholder-violet-400/50 focus:outline-none focus:ring-2
                     focus:ring-cyan-500/50 transition-all"
          />
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 py-2 px-4 rounded-lg
                     text-white font-medium hover:from-violet-500 hover:to-cyan-500 transition-all"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-sm text-violet-400 hover:text-cyan-400 transition-colors"
        >
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
}