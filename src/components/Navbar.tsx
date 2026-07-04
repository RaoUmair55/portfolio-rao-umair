import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { id: 'home',     label: 'Home'     },
  { id: 'projects', label: 'Work'     },
  { id: 'about',    label: 'About'    },
  { id: 'skills',   label: 'Skills'   },
  { id: 'contact',  label: 'Contact'  },
];

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-40% 0px -50% 0px' },
    );
    NAV_LINKS.forEach(l => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(e.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target as Node)
      ) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [mobileOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const textColor = 'var(--text-primary)';
  const mutedColor = 'var(--text-secondary)';

  return (
    <nav
      style={{
        position: 'fixed',
        top: scrolled ? '1rem' : '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: scrolled ? 'calc(100% - 2rem)' : '100%',
        maxWidth: scrolled ? '1280px' : '100%',
        zIndex: 1000,
        background: scrolled ? 'var(--glass-light)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        border: scrolled ? '1px solid var(--border-light)' : '1px solid transparent',
        borderBottom: scrolled ? '1px solid var(--border-light)' : '1px solid var(--border-light)',
        borderRadius: scrolled ? '999px' : '0',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: scrolled ? '0 10px 40px rgba(0,0,0,0.06)' : 'none',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: isMobile ? '56px' : '64px',
        padding: isMobile ? '0 1.25rem' : '0 1.5rem',
      }}>
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          aria-label="Go to home"
          className="font-signature"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: textColor,
            fontSize: isMobile ? '1.5rem' : '1.75rem',
            WebkitTextStroke: '0px', 
            lineHeight: 1,
            paddingTop: '0.25rem' // Visually center script font
          }}
        >
          Rao Umair
        </button>

        {/* Desktop Links */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onMouseLeave={() => setHovered(null)}>
            {NAV_LINKS.map(l => (
              <div 
                key={l.id}
                style={{ position: 'relative' }}
                onMouseEnter={() => setHovered(l.id)}
              >
                {(hovered === l.id || (!hovered && active === l.id)) && (
                  <motion.div
                    layoutId="nav-pill"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'var(--border-light)',
                      borderRadius: '999px',
                      zIndex: 0
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <button
                  onClick={() => scrollTo(l.id)}
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    padding: '0.5rem 1rem',
                    background: 'transparent',
                    border: 'none',
                    color: (hovered === l.id || (!hovered && active === l.id)) ? textColor : mutedColor,
                    fontSize: '0.9375rem',
                    fontWeight: (hovered === l.id || (!hovered && active === l.id)) ? 600 : 500,
                    cursor: 'pointer',
                    transition: 'color 0.2s ease, font-weight 0.2s ease',
                  }}
                >
                  {l.label}
                </button>
              </div>
            ))}

            {/* Socials Divider */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginLeft: '0.5rem',
              paddingLeft: '1rem',
              borderLeft: `1px solid var(--border-light)`,
              height: '24px'
            }}>
              <a href="https://github.com/RaoUmair55" target="_blank" rel="noopener noreferrer"
                style={{ color: mutedColor, display: 'flex', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = textColor}
                onMouseLeave={(e) => e.currentTarget.style.color = mutedColor}
                aria-label="GitHub">
                <GitHubIcon />
              </a>
              <a href="https://linkedin.com/in/rao-umair-ahmed" target="_blank" rel="noopener noreferrer"
                style={{ color: mutedColor, display: 'flex', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#0077b5'}
                onMouseLeave={(e) => e.currentTarget.style.color = mutedColor}
                aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              
              <button
                onClick={() => setIsDark(!isDark)}
                style={{
                  color: mutedColor,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.25rem',
                  marginLeft: '0.25rem',
                  transition: 'color 0.2s ease, transform 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = textColor;
                  e.currentTarget.style.transform = 'rotate(15deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = mutedColor;
                  e.currentTarget.style.transform = 'rotate(0deg)';
                }}
                aria-label="Toggle Dark Mode"
              >
                {isDark ? <SunIcon /> : <MoonIcon />}
              </button>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => scrollTo('contact')}
              style={{
                marginLeft: '1.25rem',
                padding: '0.625rem 1.25rem',
                fontSize: '0.9375rem',
                fontWeight: 600,
                background: 'var(--text-primary)',
                color: 'var(--bg-base)',
                border: 'none',
                borderRadius: '999px',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, background 0.2s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Let's Talk
            </button>
          </div>
        )}

        {/* Mobile Menu Toggle & Theme Toggle */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => setIsDark(!isDark)}
              style={{
                color: textColor,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.25rem'
              }}
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            <button
              ref={toggleRef}
              onClick={() => setMobileOpen(p => !p)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                width: 40,
                height: 40,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 6,
              }}
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block',
                  width: 20,
                  height: 2,
                  borderRadius: 2,
                  background: textColor,
                  transform: mobileOpen
                    ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                    : i === 1 ? 'scaleX(0)' : 'rotate(-45deg) translate(6px, -6px)'
                    : 'none',
                  opacity: mobileOpen && i === 1 ? 0 : 1,
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }} />
              ))}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobile && mobileOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 0.5rem)',
              right: 0,
              width: '100%',
              background: 'var(--glass-light)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid var(--border-light)',
              borderRadius: '1.5rem',
              padding: '1.5rem',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            }}
          >
            {NAV_LINKS.map(l => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                style={{
                  padding: '1rem',
                  background: active === l.id ? 'var(--border-light)' : 'transparent',
                  border: 'none',
                  borderRadius: '1rem',
                  color: active === l.id ? textColor : mutedColor,
                  fontSize: '1.125rem',
                  fontWeight: active === l.id ? 600 : 500,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
              >
                {l.label}
              </button>
            ))}
            <div style={{ display: 'flex', gap: '1rem', padding: '1rem', marginTop: '0.5rem' }}>
              <a href="https://github.com/RaoUmair55" target="_blank" rel="noopener noreferrer" style={{ color: mutedColor }}>
                <GitHubIcon />
              </a>
              <a href="https://linkedin.com/in/rao-umair-ahmed" target="_blank" rel="noopener noreferrer" style={{ color: mutedColor }}>
                <LinkedInIcon />
              </a>
            </div>
            <button
              onClick={() => scrollTo('contact')}
              style={{
                marginTop: '0.5rem',
                width: '100%',
                padding: '1rem',
                fontSize: '1rem',
                fontWeight: 600,
                background: 'var(--text-primary)',
                color: 'var(--bg-base)',
                border: 'none',
                borderRadius: '1rem',
                cursor: 'pointer',
              }}
            >
              Get in touch
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
