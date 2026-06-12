import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useMagnetic } from '../hooks/useMagnetic';

const easeSmooth = [0.23, 1, 0.32, 1] as const;

const AnimatedCounter = ({ target, suffix = '', isCounting }: { target: number; suffix?: string; isCounting: boolean }) => {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    if (!isCounting) return;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / 1500, 1);
      const eased = 1 - (1 - t) * (1 - t);
      setValue(eased * target);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isCounting, target]);

  const display = suffix === '%' ? value.toFixed(1) : Math.round(value).toString();
  return <>{display}{suffix}</>;
};

const StatCard = ({ item }: { item: typeof statItems[0] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="rounded-2xl p-5 flex flex-col"
      style={{
        background: '#0D1A0F',
        border: '1px solid rgba(22,163,74,0.25)',
      }}
    >
      {item.type === 'number' ? (
        <div className="text-[36px] sm:text-[42px] font-bold leading-none text-white font-display">
          <AnimatedCounter target={item.target!} suffix={item.suffix ?? ''} isCounting={isVisible} />
        </div>
      ) : (
        <div className="text-[36px] sm:text-[42px] font-bold leading-none text-white font-display">{item.text}</div>
      )}
      <div className="text-[13px] font-semibold text-white/80 mt-2">{item.label}</div>
      <div className="text-[12px] text-white/40 mt-0.5 leading-relaxed">{item.sub}</div>
    </div>
  );
};

const statItems = [
  { type: 'number' as const, target: 95.6, suffix: '%', label: 'Accuracy', sub: 'Retinal Segmentation Model' },
  { type: 'number' as const, target: 4, suffix: '', label: 'Live Projects', sub: 'Research & Security' },
  { type: 'number' as const, target: 3, suffix: '', label: 'Certifications', sub: 'Google & ISC²' },
  { type: 'text' as const, text: 'MITRE', label: 'ATT&CK', sub: 'Framework Trained' },
];

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  color: string;
  label: string;
  pulsePhase: number;
}

const nodesDef: { label: string; color: string }[] = [
  { label: 'SIEM', color: '#16a34a' },
  { label: 'Wazuh', color: '#16a34a' },
  { label: 'Honeypot', color: '#dc2626' },
  { label: 'MITRE ATT&CK', color: '#ea580c' },
  { label: 'ML Model', color: '#2563eb' },
  { label: 'OpenCV', color: '#7c3aed' },
  { label: 'Python', color: '#ca8a04' },
];

const edgesDef: { src: number; dst: number }[] = [
  { src: 0, dst: 1 },
  { src: 0, dst: 2 },
  { src: 2, dst: 3 },
  { src: 3, dst: 4 },
  { src: 4, dst: 5 },
  { src: 5, dst: 6 },
  { src: 6, dst: 0 },
];

const refW = 600;
const refH = 400;
const refPositions: { x: number; y: number }[] = [
  { x: 100, y: 80 },
  { x: 220, y: 80 },
  { x: 150, y: 280 },
  { x: 360, y: 120 },
  { x: 500, y: 80 },
  { x: 460, y: 260 },
  { x: 300, y: 320 },
];

interface Dot {
  edgeIdx: number;
  progress: number;
  speed: number;
}

const NetworkGraph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const dotsRef = useRef<Dot[]>([]);
  const animRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const margin = 44;

    const resize = () => {
      const dpr = window.devicePixelRatio;
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (nodesRef.current.length === 0) {
        const sx = (w - margin * 2) / refW;
        const sy = (h - margin * 2) / refH;
        nodesRef.current = nodesDef.map((n, i) => ({
          x: margin + refPositions[i].x * sx,
          y: margin + refPositions[i].y * sy,
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
          color: n.color,
          label: n.label,
          pulsePhase: i * 0.3 * Math.PI,
        }));
        dotsRef.current = edgesDef.map((_, i) => ({
          edgeIdx: i,
          progress: Math.random(),
          speed: (0.17 + Math.random() * 0.08) / 60,
        }));
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const draw = (now: number) => {
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const dots = dotsRef.current;
      const t = now / 1000;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.vx += (Math.random() - 0.5) * 0.006;
        n.vy += (Math.random() - 0.5) * 0.006;
        n.vx *= 0.96;
        n.vy *= 0.96;
        const speed = Math.hypot(n.vx, n.vy);
        if (speed > 0.3) { n.vx *= 0.3 / speed; n.vy *= 0.3 / speed; }
        if (n.x < margin) { n.x = margin; n.vx = Math.abs(n.vx); }
        if (n.x > w - margin) { n.x = w - margin; n.vx = -Math.abs(n.vx); }
        if (n.y < margin) { n.y = margin; n.vy = Math.abs(n.vy); }
        if (n.y > h - margin) { n.y = h - margin; n.vy = -Math.abs(n.vy); }
      }

      for (const e of edgesDef) {
        const a = nodes[e.src];
        const b = nodes[e.dst];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = '#16a34a' + '30';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#16a34a';
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      for (const d of dots) {
        d.progress += d.speed;
        if (d.progress > 1) d.progress -= 1;
        const e = edgesDef[d.edgeIdx];
        const a = nodes[e.src];
        const b = nodes[e.dst];
        ctx.beginPath();
        ctx.arc(
          a.x + (b.x - a.x) * d.progress,
          a.y + (b.y - a.y) * d.progress,
          3.5, 0, Math.PI * 2
        );
        ctx.fillStyle = '#16a34a';
        ctx.shadowColor = '#16a34a';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      for (const n of nodes) {
        const isHub = n.label === 'SIEM';
        let hubPulse = 1;
        let hubOpacity = 1;
        if (isHub) {
          const phase = (Math.sin(t * Math.PI * 2 / 2.5) + 1) / 2;
          hubPulse = 1 + 0.15 * phase;
          hubOpacity = 1 - 0.3 * phase;
        }
        const pulse = isHub ? hubPulse : 1 + 0.05 * Math.sin(t * Math.PI + n.pulsePhase);
        const r = 24 * pulse;

        const grad = ctx.createRadialGradient(n.x, n.y, r * 0.2, n.x, n.y, r * 1.6);
        const glowAlpha = isHub ? (0.35 * hubOpacity).toFixed(2) : '0.35';
        grad.addColorStop(0, `rgba(22,163,74,${glowAlpha})`);
        grad.addColorStop(0.5, 'rgba(22,163,74,0.12)');
        grad.addColorStop(1, 'rgba(22,163,74,0)');
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.shadowColor = '#16a34a';
        ctx.shadowBlur = isHub ? 30 : 20;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(n.x, n.y, 24, 0, Math.PI * 2);
        ctx.fillStyle = '#0f172a';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, 24, 0, Math.PI * 2);
        ctx.strokeStyle = n.color;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = isHub ? 18 : 10;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Labels
        const labelMap: Record<string, string> = { SIEM: 'Web', Honeypot: 'Code' };
        const displayLabel = labelMap[n.label] ?? n.label;
        ctx.shadowColor = 'rgba(0,0,0,0.95)';
        ctx.shadowBlur = 6;
        ctx.fillStyle = '#ffffff';
        ctx.font = '500 10px Inter, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(displayLabel, n.x, n.y + 32);
        ctx.shadowBlur = 0;
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[560px] relative bg-transparent">
      <canvas ref={canvasRef} className="absolute inset-0" style={{ background: 'transparent' }} />
    </div>
  );
};

const headlineGroups = [
  { words: ['Cybersecurity'], green: false },
  { words: ['&', 'AI/ML', 'Student', '—'], green: false },
  { words: ['Building', 'Secure,', 'Intelligent', 'Systems'], green: true },
];

const Hero = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 250], [1, 0]);
  const magnetic = useMagnetic();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const rect = el.getBoundingClientRect();
      window.scrollTo({ top: rect.top + window.scrollY - offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[120vh] flex items-start overflow-hidden pt-20 md:pt-24" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1A3A1C 100%)' }}>
      {/* Dark gradient overlay behind text */}
      <div className="absolute inset-0 left-0 w-full lg:w-[55%] bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 min-h-screen flex flex-col justify-center">
        <motion.div style={{ opacity }} className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center flex-1">
          {/* Left: Text Content */}
          <div className="pt-4 lg:pt-0">
            <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              {(() => {
                let idx = 0;
                return headlineGroups.map((group, gi) => (
                  <span key={gi} style={{ display: 'block' }}>
                    {group.words.map((text) => {
                      const i = idx++;
                      return (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: group.green ? 0.7 : 0.5,
                            delay: i * 0.06,
                            ease: 'easeOut',
                          }}
                          style={{ display: 'inline-block', color: group.green ? '#16A34A' : 'inherit' }}
                        >
                          {text}&nbsp;
                        </motion.span>
                      );
                    })}
                  </span>
                ));
              })()}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8, ease: 'easeOut' }}
              className="text-base md:text-lg text-white/60 max-w-lg leading-relaxed mt-6"
            >
              CS student focused on defensive security, machine learning, and intelligent systems. Google Cybersecurity Certified.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8, ease: 'easeOut' }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <button
                ref={magnetic.ref}
                onClick={() => scrollToSection('projects')}
                onMouseMove={magnetic.handleMouseMove}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#15803D';
                  e.currentTarget.style.boxShadow = '0 6px 28px rgba(22,163,74,0.5)';
                }}
                onMouseLeave={(e) => {
                  magnetic.handleMouseLeave();
                  e.currentTarget.style.backgroundColor = '#16A34A';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(22,163,74,0.35)';
                }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-base"
                style={{
                  backgroundColor: '#16A34A',
                  boxShadow: '0 4px 20px rgba(22,163,74,0.35)',
                  transform: magnetic.transform,
                  transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              >
                View Projects
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300"
                style={{
                  border: '2px solid #16A34A',
                  color: '#16A34A',
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(22,163,74,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Let's Talk
              </button>
            </motion.div>
          </div>

          {/* Right: Animated Network Graph */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: easeSmooth }}
            className="hidden lg:block w-full"
          >
            <NetworkGraph />
          </motion.div>
        </motion.div>

        {/* Stats row — bento grid with animated counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pb-8">
          {statItems.map((item) => (
            <StatCard key={item.label} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
