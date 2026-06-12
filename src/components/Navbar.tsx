import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMagnetic } from '../hooks/useMagnetic';

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills', hasDropdown: true },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

const dropdownColumns = [
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Cybersecurity',
    skills: ['Wazuh SIEM', 'Honeypot Deployment', 'Custom Detection Rules', 'MITRE ATT&CK', 'Incident Response'],
  },
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a8 8 0 00-8 8c0 5 8 12 8 12s8-7 8-12a8 8 0 00-8-8z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'AI / ML / DL',
    skills: ['Scikit-learn', 'TensorFlow / PyTorch', 'Model Building', 'Classification', 'Deep Learning'],
  },
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    title: 'Digital Image Processing',
    skills: ['OpenCV', 'Morphological Operations', 'Edge Detection', 'Frequency Filtering', 'K-Means Clustering'],
  },
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Programming',
    skills: ['Python', 'C++', 'MATLAB'],
  },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('');
  const magnetic = useMagnetic();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setActiveDropdown(null); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    const ids = navLinks.map(l => l.id);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      }
    }, { rootMargin: '-45% 0px -45% 0px' });
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 80;
      const rect = el.getBoundingClientRect();
      window.scrollTo({ top: rect.top + window.scrollY - offset, behavior: 'smooth' });
    }
    setIsMobileOpen(false);
    setActiveDropdown(null);
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className={`transition-all duration-400 ${
          isScrolled
            ? 'border-b border-[rgba(22,163,74,0.15)]'
            : ''
        }`}
        style={
          isScrolled
            ? { background: 'rgba(5,20,8,0.75)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }
            : { background: 'transparent' }
        }
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button onClick={() => scrollToSection('home')} className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-green-primary flex items-center justify-center text-white font-black text-sm group-hover:bg-green-secondary transition-colors">
                RU
              </div>
              <span className="text-lg font-bold tracking-tight text-white hidden sm:block">
                Rao<span className="text-green-primary">.</span>Umair
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.id} className="relative"
                  onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => {
                      if (link.hasDropdown) {
                        setActiveDropdown(activeDropdown === link.id ? null : link.id);
                      } else {
                        scrollToSection(link.id);
                      }
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 relative ${
                      activeDropdown === link.id
                        ? 'text-green-primary bg-[rgba(22,163,74,0.15)]'
                        : activeSection === link.id
                        ? 'text-green-primary'
                        : isScrolled
                        ? 'text-white/70 hover:text-white hover:bg-white/10'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      {link.label}
                      {link.hasDropdown && (
                        <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === link.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </span>
                    {/* Active underline */}
                    {activeSection === link.id && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute -bottom-0.5 left-1/2 h-0.5 bg-green-primary rounded-full"
                        style={{ width: '60%', transform: 'translateX(-50%)' }}
                        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                      />
                    )}
                  </button>

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {link.hasDropdown && activeDropdown === link.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 mega-menu p-6 min-w-[680px]"
                      >
                        <div className="flex gap-8">
                          <div className="flex-1 grid grid-cols-3 gap-6">
                            {dropdownColumns.map((col) => (
                              <div key={col.title}>
                                <div className="flex items-center gap-2 mb-3 text-green-primary">
                                  {col.icon}
                                  <h4 className="text-sm font-bold text-text-primary">{col.title}</h4>
                                </div>
                                <ul className="space-y-2">
                                  {col.skills.map((skill) => (
                                    <li key={skill} className="text-sm text-text-muted hover:text-green-primary transition-colors cursor-default">
                                      {skill}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                          <div className="w-44 flex-shrink-0">
                            <div className="bg-accent-blue rounded-2xl p-4 h-full flex flex-col items-center justify-center text-center">
                              <div className="w-10 h-10 rounded-xl bg-green-primary flex items-center justify-center text-white text-lg mb-3">
                                🛡️
                              </div>
                              <p className="text-xs font-bold text-text-primary leading-relaxed">
                                Defensive Security<br />Meets<br />Artificial Intelligence
                              </p>
                              <div className="mt-3 w-8 h-[2px] bg-green-primary/30 rounded" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <motion.button
                ref={magnetic.ref}
                onClick={() => scrollToSection('contact')}
                onMouseMove={magnetic.handleMouseMove}
                onMouseLeave={magnetic.handleMouseLeave}
                className="hidden md:inline-flex px-5 py-2.5 rounded-xl bg-green-primary text-white text-sm font-semibold"
                style={{
                  boxShadow: '0 4px 14px rgba(15,93,54,0.25)',
                  transform: magnetic.transform,
                  transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
                animate={{
                  boxShadow: [
                    '0 4px 14px rgba(15,93,54,0.25)',
                    '0 4px 24px rgba(15,93,54,0.45)',
                    '0 4px 14px rgba(15,93,54,0.25)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                Hire Me
              </motion.button>
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className={`md:hidden p-2 rounded-xl transition-all ${isScrolled ? 'text-white/70 hover:bg-white/10' : 'text-white hover:bg-white/10'}`}
                aria-label="Toggle menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-4 mt-2"
          >
            <div className="bg-white border border-gray-100 rounded-3xl p-3 space-y-1 shadow-lg">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    activeSection === link.id
                      ? 'text-green-primary bg-green-50'
                      : 'text-text-muted hover:text-text-primary hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2 border-t border-gray-100">
                <button
                  onClick={() => { scrollToSection('contact'); }}
                  className="w-full py-3 rounded-xl bg-green-primary text-white text-sm font-semibold hover:bg-green-secondary transition-colors"
                >
                  Hire Me
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
