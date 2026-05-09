import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const useTypingEffect = (text: string, speed = 40) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [text, currentIndex, speed]);

  return displayText;
};

const Hero = () => {
  const typedTitle = useTypingEffect(
    'Cybersecurity Student | SOC & Blue Team Focus | SIEM · Wazuh · Threat Detection | Full Stack Developer | BSCS @ Air University | Google Cybersecurity Certified',
    35
  );

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--accent-glow)] rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>

      <motion.div
        style={{ y: y1, opacity }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism mb-8 border-white/10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">Available for Opportunities</span>
        </motion.div>

        {/* Main Content Card */}
        <Tilt
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          perspective={2000}
          className="mx-auto"
        >
          <div className="relative">
             <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-8xl font-black mb-6 tracking-tighter"
            >
              <span className="text-white block">Rao Umair</span>
              <span className="accent-gradient-text">Ahmed.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-12 mb-10"
            >
              <p className="text-lg md:text-2xl text-slate-400 font-medium max-w-3xl mx-auto leading-tight">
                {typedTitle}
                <span className="inline-block w-1 h-6 bg-[var(--accent)] ml-1 animate-blink"></span>
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Cybersecurity Student at Air University specializing in <span className="text-white font-semibold">SOC operations</span> and <span className="text-white font-semibold">secure full-stack development</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center items-center"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="group relative px-8 py-4 accent-bg text-white font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 shadow-xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Work
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 glass-morphism text-white font-bold rounded-2xl hover:bg-slate-800/50 transition-all duration-300 hover:scale-105 border-white/10"
              >
                Let's Talk
              </button>
            </motion.div>
          </div>
        </Tilt>
      </motion.div>

      {/* Scroll Down */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-bold">Scroll</span>
          <div className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;