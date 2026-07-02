import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Props { onComplete: () => void; }

const Loader = ({ onComplete }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.style.opacity = '0';
        setTimeout(onComplete, 500);
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      id="loader"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99997,
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center' }}
      >
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            fontSize: '1.0625rem',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: '#f5f5f7',
            marginBottom: '1rem',
          }}
        >
          Rao Umair
        </motion.div>
        <div style={{
          width: 120,
          height: 2,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: 1,
          overflow: 'hidden',
          margin: '0 auto',
        }}>
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #16A34A, #22c55e)',
              borderRadius: 1,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Loader;
