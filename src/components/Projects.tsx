import { motion } from 'framer-motion';
import { useState } from 'react';
import { projectsData } from '../data/portfolio';

const easeSmooth = [0.23, 1, 0.32, 1] as const;

const headerPatterns = [
  {
    bg: 'linear-gradient(135deg, #0D1A0F 0%, #132A17 50%, #0D1A0F 100%)',
    accent: '#16A34A',
    dots: true,
  },
  {
    bg: 'linear-gradient(135deg, #0F111A 0%, #1A1F2E 50%, #0F111A 100%)',
    accent: '#3B82F6',
    dots: true,
  },
  {
    bg: 'linear-gradient(135deg, #1A0F0D 0%, #2E1A15 50%, #1A0F0D 100%)',
    accent: '#F59E0B',
    dots: true,
  },
  {
    bg: 'linear-gradient(135deg, #0D0D1A 0%, #15132E 50%, #0D0D1A 100%)',
    accent: '#A855F7',
    dots: true,
  },
];

interface ProjectCardProps {
  project: typeof projectsData[0];
  index: number;
  featured?: boolean;
}

const ProjectCard = ({ project, index, featured }: ProjectCardProps) => {
  const [hover, setHover] = useState(false);
  const pattern = headerPatterns[index % headerPatterns.length];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="saas-card overflow-hidden flex flex-col relative group"
      style={{
        transform: hover ? 'translateY(-4px)' : 'none',
        boxShadow: hover ? '0 12px 32px rgba(0,0,0,0.12)' : undefined,
        borderColor: hover ? '#16A34A' : undefined,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
      }}
    >
      {/* Sliding green top border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#16A34A] z-20" style={{ transform: hover ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.2s ease' }} />

      {/* Featured badge */}
      {featured && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-white shadow-lg" style={{ background: '#16A34A' }}>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Featured
          </span>
        </div>
      )}

      {/* Dark header area */}
      <div className="relative h-36 flex-shrink-0 overflow-hidden" style={{ background: pattern.bg }}>
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ background: `repeating-linear-gradient(45deg, transparent, transparent 20px, ${pattern.accent} 20px, ${pattern.accent} 21px)` }} />
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${pattern.accent}, transparent 70%)` }} />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{project.icon}</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-white/50">{project.language}</span>
          </div>
          <h3 className="text-white font-bold font-display text-lg leading-tight">{project.title}</h3>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <p className="text-text-muted text-xs leading-relaxed line-clamp-2 mb-4 flex-1">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <span key={t} className="px-2 py-1 rounded-md text-[10px] font-semibold" style={{ background: '#16A34A15', color: '#16A34A' }}>{t}</span>
          ))}
        </div>

        <div className="flex items-center gap-2.5 pt-3 border-t border-gray-100">
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white transition-all duration-200 hover:opacity-90"
              style={{ background: '#16A34A' }}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              View Project
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200"
              style={{
                color: '#16A34A',
                border: '1.5px solid #16A34A',
                background: 'transparent',
              }}
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="relative z-10 py-24 bg-bg-main">
      <div className="container mx-auto lg:flex lg:gap-12">
        {/* Left: Sticky heading sidebar */}
        <div className="lg:sticky lg:top-[120px] lg:self-start lg:w-[30%] mb-10 lg:mb-0 flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeSmooth }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-blue text-green-primary text-xs font-bold tracking-wider mb-3">
              Portfolio
            </span>
            <h2 className="text-section font-bold text-text-primary font-display mb-4">Featured Work</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              Selected projects that showcase my work in cybersecurity, AI/ML, and full-stack development.
            </p>
            <a href="https://github.com/RaoUmair55" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-green-primary font-bold text-sm hover:underline decoration-2 underline-offset-4 transition-all"
            >
              View all projects on GitHub →
            </a>
          </motion.div>
        </div>

        {/* Right: Scrollable project cards */}
        <div className="lg:w-[55%] space-y-6">
          {projectsData.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} featured={i === 0} />
          ))}

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: projectsData.length * 0.08, ease: 'easeOut' }}
            className="text-center"
          >
            <a href="https://github.com/RaoUmair55" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-primary text-white font-semibold text-sm hover:bg-green-secondary transition-all duration-300 shadow-[0_4px_14px_rgba(15,93,54,0.25)] hover:shadow-[0_6px_20px_rgba(15,93,54,0.35)]"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              View All Projects on GitHub
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
