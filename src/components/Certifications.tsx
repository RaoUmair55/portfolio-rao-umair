import { useState } from 'react';
import { motion } from 'framer-motion';
import { certificationsData } from '../data/portfolio';
import { useSpotlight } from '../hooks/use-spotlight';

interface Certification {
  title: string;
  issuer: string;
  date: string;
  icon: string;
  credentialId?: string;
  skills: string[];
}

// Certification card component
export const CertificationCard = ({ cert = {} as Certification, index }: { cert?: Certification; index: number }) => {
  const spotlight = useSpotlight();
  const [isExpanded, setIsExpanded] = useState(false);
  const skillsList = cert?.skills ?? [];

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
        {/* Header with Icon and Details */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 rounded-3xl accent-bg flex items-center justify-center text-2xl shadow-lg group-hover:rotate-6 transition-transform shadow-[var(--accent-glow)] flex-shrink-0">
            {cert?.icon || ''}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--accent)] transition-colors leading-tight">
              {cert?.title}
            </h3>
            <div className="space-y-1">
              <p className="text-[var(--accent)] text-xs font-semibold uppercase tracking-widest">{cert?.issuer}</p>
              <p className="text-slate-400 text-xs font-medium">{cert?.date}</p>
            </div>
          </div>
        </div>

        {/* Skills - Styled as Sub-tabs */}
        <div className="mb-4">
          <p className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-3">Associated Skills</p>
          <div className="flex flex-wrap gap-2">
            {skillsList.slice(0, isExpanded ? skillsList.length : 3).map((skill) => (
              <motion.div
                key={skill}
                whileHover={{ scale: 1.08, y: -2 }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/60 border border-white/10 hover:border-white/20 group/skill transition-all"
              >
                <span className="text-sm font-bold text-slate-300 group-hover/skill:text-white transition-colors">{skill}</span>
              </motion.div>
            ))}
          </div>
          
          {/* Show More/Less Button - Only for Skills */}
          {skillsList.length > 3 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/40 border border-white/10 hover:border-[var(--accent)]/30 text-slate-300 hover:text-[var(--accent)] transition-all text-xs font-semibold"
            >
              <span>{isExpanded ? 'Show Less' : `Show More (+${skillsList.length - 3})`}</span>
              <svg 
                className="w-3 h-3 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                style={{
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s'
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          )}
        </div>

        {/* Credential ID if available */}
        {cert?.credentialId && (
          <div className="flex items-center gap-2 pt-4 border-t border-white/10">
            <svg className="w-4 h-4 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs text-slate-300 font-medium">ID: {cert.credentialId}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Certifications section component
const Certifications = () => {
  const certs = certificationsData;

  return (
    <section id="certifications" className="py-20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="text-[var(--accent)] font-bold text-sm tracking-widest uppercase mb-4">Achievements</p>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">Certifications</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-1 w-12 bg-gradient-to-r from-transparent to-[var(--accent)] rounded-full"></div>
            <div className="h-1 w-8 bg-[var(--accent)] rounded-full"></div>
            <div className="h-1 w-12 bg-gradient-to-l from-transparent to-[var(--accent)] rounded-full"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((c, i) => (
            <CertificationCard key={c.title || i} cert={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;