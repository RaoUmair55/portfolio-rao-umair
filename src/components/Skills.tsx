import { motion } from 'framer-motion';
import { useSpotlight } from '../hooks/use-spotlight';
import { skillsData } from '../data/portfolio';

export const CategoryCard = ({ title, icon, skills = [], delay }) => {
  const spotlight = useSpotlight();

  return (
    <motion.div
      ref={spotlight.divRef}
      onMouseMove={spotlight.handleMouseMove}
      onMouseEnter={spotlight.handleMouseEnter}
      onMouseLeave={spotlight.handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group glass-card rounded-[2.5rem] relative overflow-hidden"
    >
       {/* Intense Spotlight Background Glow */}
       <div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          opacity: spotlight.opacity * 0.8,
          background: `radial-gradient(800px circle at ${spotlight.position.x}px ${spotlight.position.y}px, var(--accent-glow), transparent 60%)`,
        }}
      />
      
      {/* Enhanced Spotlight Border Glow (Near Cursor) */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] border-[2.5px] border-[var(--accent)] transition duration-300"
        style={{
          opacity: spotlight.opacity,
          maskImage: `radial-gradient(180px circle at ${spotlight.position.x}px ${spotlight.position.y}px, black 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(180px circle at ${spotlight.position.x}px ${spotlight.position.y}px, black 0%, transparent 100%)`,
          filter: 'drop-shadow(0 0 12px var(--accent))',
        }}
      />

      <div className="relative">
        <div className="flex items-center gap-6 mb-10">
          <div className="w-16 h-16 rounded-3xl accent-bg flex items-center justify-center text-3xl shadow-xl group-hover:rotate-6 transition-transform shadow-[var(--accent-glow)]">
            {icon}
          </div>
          <div>
            <h3 className="text-2xl font-black text-white">{title}</h3>
            <p className="text-[var(--accent)] font-bold text-xs uppercase tracking-widest">{skills.length} Expertise</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900/50 border border-white/5 group/skill"
            >
              <span className="text-lg grayscale group-hover/skill:grayscale-0 transition-all">{skill.icon}</span>
              <span className="text-slate-300 font-bold text-sm group-hover/skill:text-white transition-colors">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const categories = skillsData;

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="text-[var(--accent)] font-bold text-sm tracking-widest uppercase mb-4">My Expertise</p>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">Skills</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-1 w-12 bg-gradient-to-r from-transparent to-[var(--accent)] rounded-full"></div>
            <div className="h-1 w-8 bg-[var(--accent)] rounded-full"></div>
            <div className="h-1 w-12 bg-gradient-to-l from-transparent to-[var(--accent)] rounded-full"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.title || i} {...cat} delay={i * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;