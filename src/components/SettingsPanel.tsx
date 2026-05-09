import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SettingsPanel = ({ settings, setSettings }) => {
  const [isOpen, setIsOpen] = useState(false);

  const presets = [
    { name: 'Orange', color: '#F97316' },
    { name: 'Blue', color: '#3B82F6' },
    { name: 'Green', color: '#10B981' },
    { name: 'Purple', color: '#8B5CF6' },
    { name: 'Pink', color: '#EC4899' },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-2xl accent-bg text-white shadow-2xl flex items-center justify-center transition-transform"
      >
        <svg className={`w-7 h-7 transition-transform duration-500 ${isOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-72 glass-morphism rounded-[2rem] p-6 shadow-2xl"
          >
            <h3 className="text-xl font-bold text-white mb-6">Experience Settings</h3>
            
            {/* Color Picker */}
            <div className="mb-8">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 block">Accent Color</label>
              <div className="flex justify-between items-center">
                {presets.map((p) => (
                  <button
                    key={p.color}
                    onClick={() => setSettings({ ...settings, accent: p.color })}
                    className={`w-8 h-8 rounded-full transition-all duration-300 ${
                      settings.accent === p.color ? 'scale-125 ring-4 ring-white/20' : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: p.color }}
                    title={p.name}
                  />
                ))}
              </div>
            </div>

            {/* Compact Mode */}
            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-white/5">
              <div>
                <div className="text-sm font-bold text-white">Compact Mode</div>
                <div className="text-[10px] text-slate-500 uppercase font-black">Less padding</div>
              </div>
              <button
                onClick={() => setSettings({ ...settings, compact: !settings.compact })}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  settings.compact ? 'bg-orange-500' : 'bg-slate-800'
                }`}
              >
                <motion.div
                  animate={{ x: settings.compact ? 24 : 4 }}
                  className="absolute top-1 w-4 h-4 bg-white rounded-full"
                />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
