import { useEffect, useRef } from 'react';

export const useScrollTilt = (maxAngle = 18) => {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    el.style.willChange = 'transform';

    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const viewportH = window.innerHeight;
        const centerY = rect.top + rect.height / 2;
        const distFromCenter = centerY - viewportH / 2;
        const tilt = Math.max(-maxAngle, Math.min(maxAngle, -distFromCenter * 0.04));
        const parallax = distFromCenter * 0.06;
        el.style.transform = `perspective(600px) rotateX(${tilt}deg) translateY(${parallax}px)`;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [maxAngle]);

  return ref;
};
