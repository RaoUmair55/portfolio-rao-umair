import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: '#1d1d1f', // Dark footer for enterprise contrast
      color: '#ffffff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container-premium" style={{ paddingTop: '4rem', paddingBottom: '3rem', position: 'relative', zIndex: 1 }}>
        
        {/* Massive Typographic Statement */}
        <div style={{
          width: '100%',
          overflow: 'hidden',
          marginBottom: '3rem',
          display: 'flex',
          justifyContent: 'center',
          userSelect: 'none'
        }}>
          <h2 className="font-display footer-watermark-text" style={{
            fontSize: 'clamp(3rem, 8vw, 8rem)',
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap'
          }}>
            RAO UMAIR
          </h2>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '3rem',
          marginBottom: '4rem',
        }}>
          <div style={{ maxWidth: '300px' }}>
            <span style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              display: 'block',
              marginBottom: '0.5rem'
            }}>
              Rao Umair Ahmed
            </span>
            <p style={{
              fontSize: '0.9rem',
              color: '#86868b',
              lineHeight: 1.6
            }}>
              Security Engineer & AI Builder crafting robust, intelligent systems.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            {/* Links Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '0.75rem', fontWeight: 600, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Connect</h4>
              {[
                { label: 'GitHub', href: 'https://github.com/RaoUmair55' },
                { label: 'LinkedIn', href: 'https://linkedin.com/in/rao-umair-ahmed' },
                { label: 'Email', href: 'mailto:raoumair554@gmail.com' }
              ].map(link => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5, color: '#ffffff' }}
                  style={{
                    fontSize: '0.9375rem',
                    color: '#86868b',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'color 0.2s',
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Back to top */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
               <h4 style={{ fontSize: '0.75rem', fontWeight: 600, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>Navigate</h4>
               <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
                }}
                aria-label="Scroll to top"
              >
                <ArrowUp size={20} />
              </motion.button>
            </div>
          </div>
        </div>

        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{ fontSize: '0.8125rem', color: '#86868b' }}>
            © {new Date().getFullYear()} Rao Umair Ahmed. All rights reserved.
          </p>
          <p style={{ fontSize: '0.8125rem', color: '#86868b' }}>
            Built with React &middot; TypeScript &middot; Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
