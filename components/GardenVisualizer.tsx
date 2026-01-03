
import React, { useState } from 'react';
import { generateGardenVisual } from '../services/geminiService';

const GardenVisualizer: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setResultImage(null);

    try {
      const imageUrl = await generateGardenVisual(prompt);
      setResultImage(imageUrl);
    } catch (error) {
      console.error(error);
      alert("Failed to generate garden visualization. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const PRESETS = [
    "English cottage garden with lavender and roses",
    "Modern Japanese Zen garden with a stone pagoda",
    "Desert xeriscape with succulents and decorative gravel",
    "Mediterranean patio with olive trees and terracotta"
  ];

  return (
    <div className="h-full max-w-5xl mx-auto px-6 py-8 flex flex-col gap-8 overflow-y-auto">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Garden Concept Visualizer</h2>
        <p className="text-slate-500">
          Describe your dream outdoor space and our AI will render a conceptual design for you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Controls */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Your Vision</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A modern backyard with a raised cedar deck, slate firepit area, and ornamental grasses..."
              className="w-full h-40 bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none resize-none text-slate-700"
            />
            
            <div className="mt-6">
               <p className="text-xs font-bold text-slate-400 mb-3 uppercase">Popular Ideas</p>
               <div className="flex flex-wrap gap-2">
                 {PRESETS.map((p, i) => (
                   <button 
                    key={i} 
                    onClick={() => setPrompt(p)}
                    className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full hover:bg-emerald-100 transition-colors border border-emerald-100"
                   >
                     {p}
                   </button>
                 ))}
               </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className={`w-full mt-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 ${!prompt.trim() || isGenerating ? 'bg-slate-200 text-slate-400' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Designing...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
                  Generate Vision
                </>
              )}
            </button>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl">
            <h4 className="text-emerald-800 font-bold mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              Did you know?
            </h4>
            <p className="text-sm text-emerald-700/80 leading-relaxed">
              Once you've found a design you love, you can chat with our expert AI to determine the best plant species and materials for your specific climate zone.
            </p>
          </div>
        </div>

        {/* Display */}
        <div className="flex flex-col gap-4">
          <div className="aspect-video bg-slate-200 rounded-[2rem] overflow-hidden shadow-inner border-4 border-white relative">
            {!resultImage && !isGenerating && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-12 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                </div>
                <p className="font-medium">No design generated yet</p>
                <p className="text-xs mt-1">Fill out your vision to see the magic happen</p>
              </div>
            )}

            {isGenerating && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100/80 backdrop-blur-sm z-20">
                <div className="w-64 h-2 bg-slate-200 rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-emerald-600 animate-progress"></div>
                </div>
                <p className="text-emerald-800 font-bold animate-pulse">Growing your garden...</p>
                <style>{`
                  @keyframes progress {
                    0% { width: 0; }
                    50% { width: 70%; }
                    100% { width: 100%; }
                  }
                  .animate-progress {
                    animation: progress 3s infinite ease-in-out;
                  }
                `}</style>
              </div>
            )}

            {resultImage && (
              <img src={resultImage} alt="Garden Concept" className="w-full h-full object-cover animate-in fade-in duration-1000" />
            )}
          </div>
          
          {resultImage && (
            <div className="flex gap-4">
              <button className="flex-1 py-3 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Save Draft
              </button>
              <button className="flex-1 py-3 bg-emerald-600 text-white rounded-2xl font-bold text-sm hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                Share Vision
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GardenVisualizer;
