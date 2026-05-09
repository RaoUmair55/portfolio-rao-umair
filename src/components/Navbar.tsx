import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
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
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3 px-4 md:px-8'
          : 'py-5 px-4 md:px-8'
      }`}
    >
      <div className={`max-w-7xl mx-auto rounded-full transition-all duration-500 ${
        isScrolled ? 'glass-morphism px-6 py-2 shadow-2xl' : 'px-4'
      }`}>
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('home')}
              className="group flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg accent-bg flex items-center justify-center text-white font-bold text-sm transform group-hover:rotate-12 transition-transform duration-300 shadow-[0_0_15px_var(--accent)]">
                R
              </div>
              <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
                Umair<span className="text-[var(--accent)]">.</span>
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="px-4 py-2 rounded-full text-sm font-medium text-slate-400 hover:text-white transition-all duration-300 relative group"
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute inset-0 bg-[var(--accent)] opacity-0 group-hover:opacity-10 rounded-full scale-50 group-hover:scale-100 transition-all duration-300 blur-sm"></span>
                  <span className="absolute inset-0 border border-[var(--accent)] opacity-0 group-hover:opacity-20 rounded-full transition-all duration-300"></span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[var(--accent)] group-hover:w-4 transition-all duration-300 shadow-[0_0_10px_var(--accent)]"></span>
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="ml-4 px-5 py-2 rounded-full accent-bg text-white text-sm font-bold hover:scale-105 transition-all duration-300 shadow-lg shadow-[var(--accent-glow)]"
              >
                Hire Me
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 overflow-hidden"
          >
            <div className="glass-morphism rounded-3xl p-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left px-4 py-3 rounded-2xl text-base font-medium text-slate-400 hover:text-[var(--accent)] hover:bg-[var(--accent-glow)] transition-all duration-300"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;