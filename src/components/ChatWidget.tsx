import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Hi! I am Rao Umair\'s AI assistant. Ask me anything about his projects, skills, or experience!' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMsg = message.trim();
    setMessage('');
    
    // Add user message to UI
    const newMessages = [...messages, { role: 'user' as const, content: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Send to our local backend
      // In production, this should point to your deployed backend URL if they are hosted separately
      const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
      
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMsg,
          // Send previous messages as history (excluding the first greeting to save tokens if preferred, but usually we send all)
          history: newMessages.slice(1, -1) 
        }),
      });

      if (!res.ok) throw new Error('API Error');

      const data = await res.json();
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble connecting to my brain right now. Please try again later or reach out via the contact form!" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#3b82f6] text-white shadow-lg shadow-blue-500/20 flex items-center justify-center z-50 ${isOpen ? 'hidden' : 'flex'}`}
        style={{ border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[380px] max-w-[calc(100vw-2rem)] h-[550px] max-h-[calc(100vh-2rem)] bg-[#0f172a] border border-[#1e293b] rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#1e293b]/50 border-b border-[#334155]/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#3b82f6]/20 flex items-center justify-center text-[#3b82f6]">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-100">AI Assistant</h3>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                    Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
            >
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[85%] gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                      msg.role === 'user' ? 'bg-slate-700 text-slate-300' : 'bg-[#3b82f6]/20 text-[#3b82f6]'
                    }`}>
                      {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <div className={`px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-[#3b82f6] text-white rounded-tr-sm' 
                        : 'bg-[#1e293b] text-slate-200 rounded-tl-sm border border-[#334155]/50'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex max-w-[85%] gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-[#3b82f6]/20 text-[#3b82f6]">
                      <Bot size={14} />
                    </div>
                    <div className="px-4 py-2.5 rounded-2xl bg-[#1e293b] text-slate-200 rounded-tl-sm border border-[#334155]/50 flex items-center">
                      <Loader2 size={14} className="animate-spin text-[#3b82f6]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-[#1e293b]/50 border-t border-[#334155]/50">
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me about Rao Umair..."
                  className="w-full bg-[#0f172a] text-slate-200 text-[13px] rounded-xl pl-4 pr-10 py-3 border border-[#334155] focus:outline-none focus:border-[#3b82f6] transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!message.trim() || isLoading}
                  className="absolute right-2 text-[#3b82f6] hover:text-blue-400 disabled:opacity-50 disabled:hover:text-[#3b82f6] p-1.5 transition-colors"
                >
                  <Send size={16} />
                </button>
              </form>
              <div className="text-center mt-2">
                <span className="text-[9px] text-slate-500">AI can make mistakes. Verify important info.</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
