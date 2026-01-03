
import React, { useState } from 'react';
import { AppState } from './types';
import LandingPage from './components/LandingPage';
import ChatWindow from './components/ChatWindow';
import GardenVisualizer from './components/GardenVisualizer';
import Header from './components/Header';

const App: React.FC = () => {
  const [view, setView] = useState<AppState>(AppState.LANDING);

  const renderView = () => {
    switch (view) {
      case AppState.LANDING:
        return <LandingPage onStartChat={() => setView(AppState.CHAT)} onStartVisualizer={() => setView(AppState.VISUALIZER)} />;
      case AppState.CHAT:
        return <ChatWindow />;
      case AppState.VISUALIZER:
        return <GardenVisualizer />;
      default:
        return <LandingPage onStartChat={() => setView(AppState.CHAT)} onStartVisualizer={() => setView(AppState.VISUALIZER)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header currentView={view} setView={setView} />
      <main className="flex-1 overflow-hidden relative">
        {renderView()}
      </main>
      
      {/* Footer Branding */}
      <footer className="py-4 text-center text-xs text-slate-400 bg-white border-t border-slate-100">
        &copy; 2024 EverGreen Landscapes. Powered by Gemini AI.
      </footer>
    </div>
  );
};

export default App;
