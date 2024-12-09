import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/sidebar/Sidebar';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import { HomePage } from './pages/HomePage';
import { ExploreModelsPage } from './pages/ExploreModelsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { HelpCenterPage } from './pages/HelpCenterPage';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ChatProvider>
          <div className="min-h-screen bg-gradient-to-br from-black via-violet-950/20 to-black">
            <div className="relative min-h-screen flex">
              {/* Background Animation */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.1),rgba(0,0,0,0))]" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
              </div>
              
              <Sidebar />
              
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/explore" element={<ExploreModelsPage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/help" element={<HelpCenterPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </div>
          </div>
        </ChatProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;