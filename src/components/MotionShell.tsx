import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import Lenis from 'lenis';

const LoadingOverlay = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b1220]"
        >
          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.65, 1, 0.65] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="mx-auto mb-4 h-14 w-14 rounded-full bg-gradient-to-br from-[#3D52A0] to-[#7091E6] shadow-[0_0_50px_rgba(112,145,230,0.35)]"
            />
            <div className="text-sm tracking-[0.3em] text-slate-300 uppercase">Loading experience</div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

const CursorGlow = () => {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const springX = useSpring(x, { stiffness: 120, damping: 24, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 120, damping: 24, mass: 0.2 });

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX - 180);
      y.set(event.clientY - 180);
    };

    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-[5] hidden h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(112,145,230,0.18),rgba(112,145,230,0))] blur-2xl md:block"
      style={{ left: springX, top: springY }}
    />
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.2 });
  return (
    <motion.div
      className="fixed left-0 top-0 z-[90] h-1 origin-left bg-gradient-to-r from-[#3D52A0] via-[#7091E6] to-[#ADB8DA]"
      style={{ scaleX }}
    />
  );
};

export const MotionShell = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
          syncTouch: true,
      touchMultiplier: 1.6,
    });

    let animationFrame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    };
    animationFrame = requestAnimationFrame(raf);

    const timer = window.setTimeout(() => setIsLoading(false), 850);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };
  }, []);

  const background = useMemo(
    () => (
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-12%] h-[42rem] w-[42rem] rounded-full bg-[#7091E6]/12 blur-3xl" />
        <div className="absolute right-[-12%] top-[18%] h-[32rem] w-[32rem] rounded-full bg-[#ADB8DA]/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[22%] h-[28rem] w-[28rem] rounded-full bg-[#3D52A0]/12 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(173,184,218,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(173,184,218,0.08)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20 [mask-image:radial-gradient(ellipse_82%_82%_at_50%_50%,black_50%,transparent_100%)]" />
      </div>
    ),
    []
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b1220] text-white">
      <ScrollProgress />
      <CursorGlow />
      {background}
      <div className="relative z-10">{children}</div>
      <LoadingOverlay isVisible={isLoading} />
    </div>
  );
};
