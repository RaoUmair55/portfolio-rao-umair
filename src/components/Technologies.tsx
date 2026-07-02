import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  SiPython, SiTensorflow, SiPytorch, SiOpencv, SiDocker, SiReact,
  SiTypescript, SiNodedotjs, SiMongodb, SiScikitlearn, SiGnubash,
  SiGit, SiLinux,
} from 'react-icons/si';
import { TbBrandMysql, TbMathFunction } from 'react-icons/tb';
import { MdSecurity } from 'react-icons/md';

const row1Items = [
  { name: 'Python', icon: <SiPython />, color: '#3776AB' },
  { name: 'Wazuh SIEM', icon: <MdSecurity />, color: '#22c55e' },
  { name: 'Linux', icon: <SiLinux />, color: '#FCC624' },
  { name: 'TensorFlow', icon: <SiTensorflow />, color: '#FF6F00' },
  { name: 'PyTorch', icon: <SiPytorch />, color: '#EE4C2C' },
  { name: 'OpenCV', icon: <SiOpencv />, color: '#5C3EE8' },
  { name: 'Docker', icon: <SiDocker />, color: '#2496ED' },
  { name: 'React', icon: <SiReact />, color: '#61DAFB' },
];

const row2Items = [
  { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
  { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933' },
  { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
  { name: 'Scikit-learn', icon: <SiScikitlearn />, color: '#F7931E' },
  { name: 'Bash', icon: <SiGnubash />, color: '#4EAA25' },
  { name: 'SQL', icon: <TbBrandMysql />, color: '#4479A1' },
  { name: 'Git', icon: <SiGit />, color: '#F05032' },
  { name: 'MATLAB', icon: <TbMathFunction />, color: '#e16737' },
];

const TechChip = ({ tech }: { tech: { name: string; icon: React.ReactNode; color: string } }) => (
  <div className="tech-chip-premium">
    <span className="tech-icon" style={{ color: tech.color, display: 'flex', alignItems: 'center' }}>
      {tech.icon}
    </span>
    <span>{tech.name}</span>
  </div>
);

const Technologies = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section-light" style={{ padding: '4rem 0', overflow: 'hidden' }}>
      <div ref={ref} className={`scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="container-premium" style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <p className="eyebrow scroll-reveal-child" style={{ '--i': 0 } as React.CSSProperties}>
            Tech stack
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative overflow-hidden scroll-reveal-child" style={{ '--i': 1 } as React.CSSProperties}>
            <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--bg-base), transparent)' }} />
            <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--bg-base), transparent)' }} />
            <div className="flex gap-4 animate-marquee" style={{ width: 'max-content' }}>
              {[...row1Items, ...row1Items].map((tech, i) => (
                <TechChip key={`r1-${tech.name}-${i}`} tech={tech} />
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden scroll-reveal-child" style={{ '--i': 2 } as React.CSSProperties}>
            <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--bg-base), transparent)' }} />
            <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--bg-base), transparent)' }} />
            <div className="flex gap-4 animate-marquee" style={{ width: 'max-content', animationDirection: 'reverse' }}>
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
