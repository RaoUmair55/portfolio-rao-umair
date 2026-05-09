import { motion } from 'framer-motion';
import { projectsData } from '../data/portfolio';
import { useSpotlight } from '../hooks/use-spotlight';

interface Project {
  title: string;
  description: string;
  tech: string[];
  language: string;
  github: string;
  live: string | null;
  icon: string;
}

// Project card component with hover effects
const ProjectCard = ({ project = {} as Project, index }: { project?: Project; index: number }) => {
  const spotlight = useSpotlight();

  const languageColors = {
    JavaScript: { bg: 'bg-orange-400/15', text: 'text-orange-400', border: 'border-orange-400/25' },
    HTML: { bg: 'bg-orange-600/15', text: 'text-orange-200', border: 'border-orange-600/25' },
    CSS: { bg: 'bg-orange-500/15', text: 'text-orange-500', border: 'border-orange-500/25' },
    C: { bg: 'bg-orange-500/15', text: 'text-orange-400', border: 'border-orange-500/25' },
    'C++': { bg: 'bg-orange-800/15', text: 'text-orange-600', border: 'border-orange-800/25' },
    Python: { bg: 'bg-orange-400/15', text: 'text-orange-200', border: 'border-orange-400/25' },
    Assembly: { bg: 'bg-orange-800/15', text: 'text-orange-300', border: 'border-orange-800/25' },
  };

  const langStyle = languageColors[project.language] || languageColors.JavaScript;

  return (
    <motion.div
      ref={spotlight.divRef}
      onMouseMove={spotlight.handleMouseMove}
      onMouseEnter={spotlight.handleMouseEnter}
      onMouseLeave={spotlight.handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
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
        {/* Header with Icon and Language Badge */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 rounded-3xl accent-bg flex items-center justify-center text-2xl shadow-lg group-hover:rotate-6 transition-transform shadow-[var(--accent-glow)] flex-shrink-0">
            {project?.icon || ''}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--accent)] transition-colors leading-tight">
              {project.title}
            </h3>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${langStyle.bg} border ${langStyle.border}`}>
              <div className={`w-2 h-2 rounded-full ${langStyle.text.replace('text-', 'bg-')}`}></div>
              <span className={`text-xs font-semibold ${langStyle.text}`}>{project.language}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-300 text-sm mb-5 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack - Styled like sub-tabs */}
        <div className="mb-6">
          <p className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-3">Stack</p>
          <div className="flex flex-wrap gap-2">
            {(project.tech || []).map((tech) => (
              <motion.div
                key={tech}
                whileHover={{ scale: 1.08, y: -2 }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/60 border border-white/10 hover:border-white/20 group/tech transition-all"
              >
                <span className="text-sm font-bold text-slate-300 group-hover/tech:text-white transition-colors">{tech}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-5 border-t border-white/10">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-300 hover:text-[var(--accent)] transition-colors text-sm font-semibold"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-300 hover:text-[var(--accent)] transition-colors text-sm font-semibold"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Projects section component
const Projects = () => {
  const projects = projectsData;

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="text-[var(--accent)] font-bold text-sm tracking-widest uppercase mb-4">My Work</p>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">Projects</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-1 w-12 bg-gradient-to-r from-transparent to-[var(--accent)] rounded-full"></div>
            <div className="h-1 w-8 bg-[var(--accent)] rounded-full"></div>
            <div className="h-1 w-12 bg-gradient-to-l from-transparent to-[var(--accent)] rounded-full"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title || i} project={p} index={i} />
          ))}
        </div>
        
        {/* View more - Premium Button */}
        <div className="text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block relative group"
          >
            {/* Background Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent)] via-orange-500 to-[var(--accent)] rounded-full blur-lg opacity-0 group-hover:opacity-75 transition-all duration-500 group-hover:blur-xl"></div>
            
            {/* Animated Border Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent)]/50 via-transparent to-[var(--accent)]/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>

            <a
              href="https://github.com/RaoUmair55"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-slate-900/80 to-slate-900/60 backdrop-blur-sm border border-[var(--accent)]/30 group-hover:border-[var(--accent)]/80 text-white font-black rounded-full transition-all duration-300 overflow-hidden"
            >
              {/* Shimmer Effect Background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                <div className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-700 bg-gradient-to-r from-transparent via-white to-transparent"></div>
              </div>

              <svg className="w-6 h-6 transition-all duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              
              <span className="relative text-lg">View All 32+ Projects on GitHub</span>
              
              <motion.svg 
                className="w-6 h-6 transition-all duration-300 group-hover:translate-x-2"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;