import { useRef, useState, useCallback } from 'react';

export function useMagnetic() {
  const ref = useRef<HTMLButtonElement>(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    const clampedX = Math.max(-8, Math.min(8, x));
    const clampedY = Math.max(-8, Math.min(8, y));
    setTransform(`translate(${clampedX}px, ${clampedY}px) scale(1.05)`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform('translate(0, 0) scale(1)');
  }, []);

  return { ref, transform, handleMouseMove, handleMouseLeave };
}
