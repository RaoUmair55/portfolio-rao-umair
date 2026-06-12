import { useEffect, useState, useCallback } from 'react';

const isCoarse = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

const CursorGlow = () => {
  const [pos, setPos] = useState({ x: -400, y: -400 });

  const handleMouse = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    if (isCoarse) return;
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [handleMouse]);

  if (isCoarse) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(22,163,74,0.06) 0%, transparent 70%)',
          transform: `translate(${pos.x - 200}px, ${pos.y - 200}px)`,
          transition: 'transform 100ms ease-out',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default CursorGlow;
