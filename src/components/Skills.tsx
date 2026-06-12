import { motion } from 'framer-motion';
import { useState } from 'react';
import { skillPillars } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';

const accentColors = ['#16A34A', '#3B82F6', '#A855F7', '#F59E0B', '#94A3B8'];

const SkillCard = ({ pillar, index }: { pillar: typeof skillPillars[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const accent = accentColors[index] ?? '#16A34A';

  return (
    <motion.div
      initial={false}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-2xl p-5 group scroll-reveal-child`}
      style={{
        '--i': index,
        background: '#1A2E1C',
        border: `1px solid ${isHovered ? '#16A34A' : '#2D4A2F'}`,
        borderLeft: `3px solid ${accent}`,
        boxShadow: isHovered ? '0 12px 32px rgba(0,0,0,0.12)' : '0 4px 16px rgba(0,0,0,0.25)',
        transform: isHovered ? 'translateY(-4px)' : 'none',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
      } as React.CSSProperties}
    >
      {/* Sliding green top border */}
      <div className="absolute top-0 left-3 right-3 h-0.5 bg-[#16A34A] rounded-t-2xl" style={{ transform: isHovered ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.2s ease' }} />
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-base flex-shrink-0 transition-transform duration-200"
          style={{
            background: `${accent}15`,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        >
          {pillar.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-card font-display" style={{ color: '#F0F0F0' }}>{pillar.title}</h3>
          <p className="text-[11px] mt-0.5 leading-snug" style={{ color: '#9FB8A0' }}>{pillar.oneLiner}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {pillar.skills.map((skill) => (
          <span
            key={skill.name}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-all duration-200"
            style={{
              background: `${accent}10`,
              color: '#9FB8A0',
            }}
          >
            <span className="text-[11px]">{skill.icon}</span>
            {skill.name}
          </span>
        ))}
      </div>

      <motion.div
        initial={false}
        animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="overflow-hidden"
      >
        <p
          className="text-[11px] leading-relaxed pt-2"
          style={{
            color: '#9FB8A0',
            borderTop: `1px solid ${accent}20`,
          }}
        >
          {pillar.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

const Skills = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="skills" className="relative z-10 py-24" style={{ background: '#0D1A0F' }}>
      <div ref={ref} className={`container mx-auto scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="text-center mb-16 relative scroll-reveal-child" style={{ '--i': 0 } as React.CSSProperties}>
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" style={{ fontSize: 'clamp(120px, 15vw, 200px)', fontWeight: 900, color: '#16A34A', opacity: 0.05, lineHeight: 1 }}>
              02
            </div>
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-6"
              style={{
                background: '#16A34A15',
                color: '#16A34A',
                border: '1px solid #16A34A30',
              }}
            >
              Technical Pillars
            </span>
            <h2 className="text-section font-bold font-display relative" style={{ color: '#F0F0F0' }}>Skills & Domains</h2>
            <p className="mt-4 max-w-lg mx-auto relative" style={{ color: '#9FB8A0' }}>Color-coded by discipline — hover for details</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {skillPillars.map((pillar, i) => (
            <SkillCard key={pillar.id} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
