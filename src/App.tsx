import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { SettingsPanel } from './components/SettingsPanel';

const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base Aesthetic Layers */}
      <div className="absolute inset-0 bg-[#0f1117]" />
      
      {/* Liquid Mesh Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[var(--accent-glow)] rounded-full blur-[140px] animate-liquid opacity-40" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[140px] animate-liquid-slow opacity-30" />
      <div className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] bg-[var(--accent-glow)] rounded-full blur-[120px] opacity-20 animate-pulse" />
      
      {/* Aesthetic Beams */}
      <div className="absolute top-[15%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-10 animate-beam" style={{ animationDelay: '0s' }} />
      <div className="absolute top-[45%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-5 animate-beam" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[75%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-10 animate-beam" style={{ animationDelay: '4s' }} />

      {/* Grainy Noise Overlay for Depth */}
      <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-overlay" />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(15,17,23,0.8)_100%)]" />
    </div>
  );
};

function App() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('cn_settings');
    return saved ? JSON.parse(saved) : { accent: '#F97316', compact: false };
  });

  useEffect(() => {
    localStorage.setItem('cn_settings', JSON.stringify(settings));
    document.documentElement.style.setProperty('--accent', settings.accent);
    
    const r = parseInt(settings.accent.slice(1, 3), 16);
    const g = parseInt(settings.accent.slice(3, 5), 16);
    const b = parseInt(settings.accent.slice(5, 7), 16);
    document.documentElement.style.setProperty('--accent-glow', `rgba(${r}, ${g}, ${b}, 0.15)`);

    if (settings.compact) {
      document.body.classList.add('compact-mode');
    } else {
      document.body.classList.remove('compact-mode');
    }
  }, [settings]);

  return (
    <div className="bg-[#0f1117] min-h-screen text-[#f1f5ff] selection:bg-[var(--accent-glow)] selection:text-[var(--accent)]">
      <BackgroundEffects />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certifications />
          <Contact />
        </main>
        <Footer />
        <SettingsPanel settings={settings} setSettings={setSettings} />
      </div>
    </div>
  );
}

export default App;