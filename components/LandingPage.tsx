
import React from 'react';
import { LandscapingService } from '../types';

const SERVICES: LandscapingService[] = [
  {
    id: '1',
    title: 'Modern Garden Design',
    description: 'Transform your outdoor space with contemporary aesthetics and sustainable flora.',
    icon: '🌿',
    imageUrl: 'https://picsum.photos/seed/garden1/800/600'
  },
  {
    id: '2',
    title: 'Artisan Hardscaping',
    description: 'Custom patios, retaining walls, and pathways built to last generations.',
    icon: '🧱',
    imageUrl: 'https://picsum.photos/seed/hardscape/800/600'
  },
  {
    id: '3',
    title: 'Smart Irrigation',
    description: 'Cloud-connected watering systems that save resources and keep plants thriving.',
    icon: '💧',
    imageUrl: 'https://picsum.photos/seed/water/800/600'
  }
];

interface LandingPageProps {
  onStartChat: () => void;
  onStartVisualizer: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartChat, onStartVisualizer }) => {
  return (
    <div className="h-full overflow-y-auto pb-12">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558904541-efa8c1965f1e?auto=format&fit=crop&q=80&w=2000" 
            alt="Beautiful Garden" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
            Design Your Paradise <br/>With Intelligent Care.
          </h2>
          <p className="text-lg md:text-xl text-emerald-50 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Welcome to EverGreen. Our AI-powered consultants help you plan, visualize, and maintain the garden you've always dreamed of.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onStartChat}
              className="px-8 py-4 bg-emerald-600 text-white rounded-full font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl hover:scale-105 active:scale-95"
            >
              Start Chatting
            </button>
            <button 
              onClick={onStartVisualizer}
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full font-bold text-lg hover:bg-white/20 transition-all shadow-xl hover:scale-105 active:scale-95"
            >
              Visualize My Garden
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm">Our Expertise</span>
          <h3 className="text-4xl font-bold mt-2 text-slate-800">Rooted in Excellence</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {SERVICES.map((service) => (
            <div key={service.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col">
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={service.imageUrl} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur p-2 rounded-xl text-2xl shadow-sm">
                  {service.icon}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h4 className="text-2xl font-bold text-slate-800 mb-3">{service.title}</h4>
                <p className="text-slate-500 leading-relaxed mb-6">
                  {service.description}
                </p>
                <button 
                  onClick={onStartChat}
                  className="mt-auto text-emerald-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Visualizer Promo */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-emerald-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 flex-1">
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">See your future garden today.</h3>
            <p className="text-emerald-100/80 text-lg mb-8 max-w-lg">
              Our advanced AI Visualizer takes your descriptions and generates stunning landscape renders in seconds. No more guessing.
            </p>
            <button 
              onClick={onStartVisualizer}
              className="bg-white text-emerald-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-50 transition-colors shadow-lg"
            >
              Try the Visualizer
            </button>
          </div>
          <div className="flex-1 w-full max-w-md">
            <div className="aspect-square bg-white/5 rounded-3xl border border-white/10 p-4 relative overflow-hidden">
               <img src="https://picsum.photos/seed/ai-garden/600/600" alt="AI Preview" className="w-full h-full object-cover rounded-2xl opacity-80" />
               <div className="absolute bottom-8 left-8 right-8 glass p-4 rounded-2xl border border-white/20">
                 <p className="text-xs text-emerald-800 font-semibold italic">"Modern Zen garden with bamboo, stone path, and waterfall..."</p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
