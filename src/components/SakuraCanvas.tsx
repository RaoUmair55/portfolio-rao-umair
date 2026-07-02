import { useEffect, useRef } from 'react';

interface Petal {
  x: number; y: number;
  vx: number; vy: number;
  rot: number; rotV: number;
  size: number; alpha: number;
  wobble: number; wobbleS: number;
  color: string;
}

const PETAL_COLORS = [
  'rgba(255,192,203,',  // soft pink
  'rgba(255,182,193,',  // light pink
  'rgba(255,240,245,',  // near-white pink
  'rgba(220,180,220,',  // lavender-pink
  'rgba(255,210,230,',  // pale rose
];

const SakuraCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const MAX_PETALS = 80;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const petals: Petal[] = [];

    const spawnPetal = (): Petal => ({
      x:       Math.random() * canvas.width + 100,
      y:       -20,
      vx:      -(Math.random() * 1.5 + 0.5),
      vy:       Math.random() * 1.2 + 0.4,
      rot:      Math.random() * Math.PI * 2,
      rotV:     (Math.random() - 0.5) * 0.06,
      size:     Math.random() * 6 + 4,
      alpha:    Math.random() * 0.4 + 0.2,
      wobble:   Math.random() * Math.PI * 2,
      wobbleS:  Math.random() * 0.04 + 0.01,
      color:    PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    });

    // Pre-scatter petals across screen
    for (let i = 0; i < MAX_PETALS; i++) {
      const p = spawnPetal();
      p.y = Math.random() * canvas.height;
      petals.push(p);
    }

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.beginPath();
      // Oval petal shape
      ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${p.alpha})`;
      ctx.shadowColor = `${p.color}0.6)`;
      ctx.shadowBlur  = 4;
      ctx.fill();
      // Highlight
      ctx.beginPath();
      ctx.ellipse(-p.size * 0.2, -p.size * 0.15, p.size * 0.3, p.size * 0.15, -0.4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.alpha * 0.4})`;
      ctx.fill();
      ctx.restore();
    };

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of petals) {
        p.wobble += p.wobbleS;
        p.x  += p.vx + Math.sin(p.wobble) * 0.5;
        p.y  += p.vy;
        p.rot += p.rotV;
        drawPetal(p);
        if (p.y > canvas.height + 20 || p.x < -30) {
          Object.assign(p, spawnPetal());
        }
      }

      // Spawn new petals if below max
      if (petals.length < MAX_PETALS && Math.random() < 0.05) {
        petals.push(spawnPetal());
      }
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default SakuraCanvas;
