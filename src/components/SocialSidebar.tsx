import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { useRef, useState, MouseEvent } from 'react';

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const SOCIAL_LINKS = [
  { id: 'github', icon: <Github size={20} strokeWidth={2.5} />, url: 'https://github.com/RaoUmair55' },
  { id: 'linkedin', icon: <Linkedin size={20} strokeWidth={2.5} />, url: 'https://linkedin.com/in/rao-umair-ahmed' },
  { id: 'x', icon: <XIcon />, url: 'https://twitter.com' },
  { id: 'instagram', icon: <Instagram size={20} strokeWidth={2.5} />, url: 'https://instagram.com' },
];

const SocialSidebar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="social-sidebar"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'fixed',
        left: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: '1.75rem',
        padding: '1.75rem 1rem',
        borderRadius: '999px',
        background: isHovered ? 'var(--text-primary)' : 'var(--glass-light)', 
        border: isHovered ? '2px solid var(--text-primary)' : '2px solid var(--border-light)',
        boxShadow: isHovered ? '0 12px 40px rgba(0,0,0,0.2)' : 'none',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'all 0.4s ease',
      }}
    >

      {SOCIAL_LINKS.map(link => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: isHovered ? 'var(--bg-base)' : 'var(--text-secondary)', 
            transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease, opacity 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.85,
            position: 'relative', 
            zIndex: 1,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.2)';
            e.currentTarget.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.opacity = '0.85';
          }}
        >
          {link.icon}
        </a>
      ))}
    </motion.div>
  );
};

export default SocialSidebar;
