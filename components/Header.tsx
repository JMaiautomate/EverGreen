
import React from 'react';
import { AppState } from '../types';

interface HeaderProps {
  currentView: AppState;
  setView: (view: AppState) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  return (
    <header className="sticky top-0 z-50 glass border-b border-emerald-100 px-6 py-4 flex items-center justify-between">
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => setView(AppState.LANDING)}
      >
        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:bg-emerald-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m20 10-1.27-1.27a8 8 0 1 0-13.46 0L4 10"/><path d="M15 10c0 3-3 5-3 5s-3-2-3-5a3 3 0 1 1 6 0Z"/><circle cx="12" cy="10" r="1"/></svg>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-emerald-900">EverGreen <span className="text-emerald-600">AI</span></h1>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        <button 
          onClick={() => setView(AppState.LANDING)}
          className={`text-sm font-medium transition-colors ${currentView === AppState.LANDING ? 'text-emerald-700' : 'text-slate-500 hover:text-emerald-600'}`}
        >
          Home
        </button>
        <button 
          onClick={() => setView(AppState.VISUALIZER)}
          className={`text-sm font-medium transition-colors ${currentView === AppState.VISUALIZER ? 'text-emerald-700' : 'text-slate-500 hover:text-emerald-600'}`}
        >
          Visualizer
        </button>
        <button 
          onClick={() => setView(AppState.CHAT)}
          className={`px-4 py-2 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-all shadow-md active:scale-95 flex items-center gap-2`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
          Chat with Expert
        </button>
      </nav>

      {/* Mobile Toggle Placeholder */}
      <div className="md:hidden">
        <button onClick={() => setView(AppState.CHAT)} className="p-2 text-emerald-600">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
