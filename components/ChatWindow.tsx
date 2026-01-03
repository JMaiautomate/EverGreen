
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getGeminiResponse } from '../services/geminiService';

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm EverGreen AI. How can I help you with your outdoor space today? I can offer plant advice, design tips, or help you book a service.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const aiResponse = await getGeminiResponse(input, history);
      
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse || "I'm sorry, I couldn't process that. Can you try again?",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Oops! I encountered an error connecting to my botanical database. Please check your connection.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto w-full px-4 pt-4">
      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto pb-6 space-y-6 scrollbar-hide"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm ${msg.role === 'user' ? 'bg-emerald-100 text-emerald-700' : 'bg-emerald-600 text-white'}`}>
                {msg.role === 'user' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m20 10-1.27-1.27a8 8 0 1 0-13.46 0L4 10"/><path d="M15 10c0 3-3 5-3 5s-3-2-3-5a3 3 0 1 1 6 0Z"/><circle cx="12" cy="10" r="1"/></svg>
                )}
              </div>
              <div className={`p-4 rounded-2xl shadow-sm ${msg.role === 'user' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700 border border-slate-100'}`}>
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                <div className={`text-[10px] mt-2 opacity-50 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m20 10-1.27-1.27a8 8 0 1 0-13.46 0L4 10"/><path d="M15 10c0 3-3 5-3 5s-3-2-3-5a3 3 0 1 1 6 0Z"/><circle cx="12" cy="10" r="1"/></svg>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-emerald-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="sticky bottom-4 pb-4 mt-auto">
        <div className="glass p-2 rounded-3xl border border-emerald-100 shadow-xl flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about garden design, plants, or booking..."
            className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-3 text-slate-700 placeholder-slate-400 font-medium"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-3 rounded-2xl transition-all ${!input.trim() || isLoading ? 'bg-slate-100 text-slate-300' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md active:scale-90'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
