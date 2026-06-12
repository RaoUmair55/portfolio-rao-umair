import { useScrollReveal } from '../hooks/useScrollReveal';

const row1Items = [
  { name: 'Python', icon: '🐍' },
  { name: 'Wazuh SIEM', icon: '📊' },
  { name: 'Linux', icon: '🐧' },
  { name: 'Bash', icon: '📟' },
  { name: 'TensorFlow', icon: '🧠' },
  { name: 'PyTorch', icon: '🔥' },
  { name: 'OpenCV', icon: '📷' },
  { name: 'Docker', icon: '🐳' },
  { name: 'SQL', icon: '🗄️' },
];

const row2Items = [
  { name: 'TypeScript', icon: '📘' },
  { name: 'React', icon: '⚛️' },
  { name: 'Node.js', icon: '💚' },
  { name: 'Express', icon: '🚀' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'Kubernetes', icon: '⚙️' },
  { name: 'Git', icon: '🔀' },
  { name: 'MATLAB', icon: '📐' },
  { name: 'Scikit-learn', icon: '🔬' },
];

const TechChip = ({ tech }: { tech: typeof row1Items[0] }) => (
  <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-green-primary/20 hover:shadow-md transition-all duration-300">
    <span className="text-xl">{tech.icon}</span>
    <span className="text-sm font-bold text-text-primary whitespace-nowrap">{tech.name}</span>
  </div>
);

const Technologies = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-16 overflow-hidden">
      <div ref={ref} className={`scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="text-center scroll-reveal-child" style={{ '--i': 0 } as React.CSSProperties}>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-text-muted">
              Technologies I Work With
            </p>
          </div>
        </div>
        <div className="space-y-6">
          {/* Row 1 */}
          <div className="relative overflow-hidden scroll-reveal-child" style={{ '--i': 1 } as React.CSSProperties}>
            <div className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #F4F7F4, transparent)' }} />
            <div className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #F4F7F4, transparent)' }} />
            <div className="flex gap-12 animate-marquee" style={{ width: 'max-content' }}>
              {[...row1Items, ...row1Items].map((tech, i) => (
                <TechChip key={`r1-${tech.name}-${i}`} tech={tech} />
              ))}
            </div>
          </div>
          {/* Row 2 */}
          <div className="relative overflow-hidden scroll-reveal-child" style={{ '--i': 2 } as React.CSSProperties}>
            <div className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #F4F7F4, transparent)' }} />
            <div className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #F4F7F4, transparent)' }} />
            <div className="flex gap-12 animate-marquee" style={{ width: 'max-content' }}>
              {[...row2Items, ...row2Items].map((tech, i) => (
                <TechChip key={`r2-${tech.name}-${i}`} tech={tech} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;
