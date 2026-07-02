import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { skillPillars } from '../data/portfolio';

const BORDER_COLORS: Record<string, string> = {
  cybersecurity: 'var(--orange-mid)',
  aiml: 'var(--green-mid)',
  dip: '#eab308',
  programming: '#3b82f6',
  backend: '#8b5cf6',
};

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [isMobile, setIsMobile] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(skillPillars[0].id);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activePillar = skillPillars.find(p => p.id === activeId) || skillPillars[0];
  const activeColor = BORDER_COLORS[activePillar.id];

  // Radial calculation
  const RADIUS = 280;
  const getOrbitPosition = (index: number) => {
    // Start at -90deg (top)
    const angleDeg = -90 + (index * (360 / skillPillars.length));
    const angleRad = angleDeg * (Math.PI / 180);
    return {
      x: Math.cos(angleRad) * RADIUS,
      y: Math.sin(angleRad) * RADIUS
    };
  };

  return (
    <section id="skills" ref={sectionRef} className="section-premium section-light" style={{ background: 'var(--bg-elevated)', paddingTop: '8rem', paddingBottom: '8rem', overflow: 'hidden' }}>
      <div className="container-premium">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: isMobile ? '3rem' : '1rem' }}
        >
          <p className="eyebrow">Expertise</p>
          <h2 className="section-title font-display" style={{ color: 'var(--text-primary)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Skills across the stack.
          </h2>
          <p className="section-subtitle" style={{ margin: '1.5rem auto 0', color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
            {!isMobile ? 'Select a domain on the orbital ring to explore.' : 'The domains I work in every day.'}
          </p>
        </motion.div>

        {isMobile ? (
          // MOBILE LAYOUT: Simple vertical stack
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {skillPillars.map((pillar) => {
              const accentColor = BORDER_COLORS[pillar.id] || 'var(--orange-mid)';
              return (
                <div key={pillar.id} className="premium-metric-card" style={{ borderTop: `3px solid ${accentColor}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '1rem', background: `rgba(0,0,0,0.03)`, color: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                      {pillar.icon}
                    </div>
                    <div>
                      <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>{pillar.title}</h3>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>{pillar.oneLiner}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '2rem' }}>{pillar.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {pillar.skills.map(s => (
                      <span key={s.name} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.4rem 0.875rem', background: 'rgba(0,0,0,0.03)', borderRadius: '2rem', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', border: '1px solid rgba(0,0,0,0.05)' }}>
                        <span style={{ fontSize: '0.9rem' }}>{s.icon}</span>{s.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // DESKTOP LAYOUT: Interactive Radial Wheel
          <div 
            style={{ 
              position: 'relative', 
              height: '800px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginTop: '1rem'
            }}
          >
            {/* Spinning decorative background rings */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
              style={{
                position: 'absolute',
                width: `${RADIUS * 2}px`,
                height: `${RADIUS * 2}px`,
                borderRadius: '50%',
                border: '1px dashed rgba(0,0,0,0.08)',
                zIndex: 0
              }}
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
              style={{
                position: 'absolute',
                width: `${RADIUS * 2.4}px`,
                height: `${RADIUS * 2.4}px`,
                borderRadius: '50%',
                border: '1px solid rgba(0,0,0,0.03)',
                zIndex: 0
              }}
            />

            {/* Orbit Nodes */}
            <AnimatePresence>
              {isInView && skillPillars.map((pillar, index) => {
                const pos = getOrbitPosition(index);
                const isActive = activeId === pillar.id;
                const nodeColor = BORDER_COLORS[pillar.id] || 'var(--orange-mid)';
                
                return (
                  <motion.div
                    key={`node-${pillar.id}`}
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{ opacity: 1, scale: 1, x: pos.x, y: pos.y }}
                    transition={{ type: "spring", damping: 15, delay: index * 0.1 }}
                    style={{
                      position: 'absolute',
                      zIndex: 10,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.75rem',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={() => setActiveId(pillar.id)}
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      animate={{ 
                        boxShadow: isActive ? `0 0 20px ${nodeColor}40` : '0 4px 12px rgba(0,0,0,0.05)',
                        borderColor: isActive ? nodeColor : 'rgba(0,0,0,0.08)'
                      }}
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: '50%',
                        background: 'var(--bg-elevated)',
                        border: '2px solid',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.75rem',
                        color: isActive ? nodeColor : 'var(--text-tertiary)',
                        transition: 'color 0.3s'
                      }}
                    >
                      {pillar.icon}
                    </motion.div>
                    <div style={{
                      background: 'rgba(255,255,255,0.9)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: isActive ? 'var(--text-primary)' : 'var(--text-tertiary)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      border: '1px solid rgba(0,0,0,0.05)'
                    }}>
                      {pillar.title}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Center Data Core */}
            <motion.div
              layoutId="center-core"
              style={{
                position: 'absolute',
                width: '380px',
                height: '380px',
                borderRadius: '50%',
                background: 'var(--bg-elevated)',
                boxShadow: `0 20px 40px -10px ${activeColor}20`,
                border: `1px solid ${(activeId === 'cybersecurity' || activeId === 'aiml') ? 'rgba(255,255,255,0.8)' : activeColor + '30'}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2.5rem',
                textAlign: 'center',
                zIndex: 5
              }}
              animate={{ 
                borderColor: (activeId === 'cybersecurity' || activeId === 'aiml') ? '#ffffff' : `${activeColor}40`, 
                boxShadow: `0 20px 40px -10px ${activeColor}20` 
              }}
              transition={{ duration: 0.4 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    height: '100%',
                    width: '100%',
                    overflowY: 'auto',
                    paddingRight: '0.5rem'
                  }}
                  className="premium-core-scroll"
                >
                  <div style={{ color: activeColor, fontSize: '2.5rem', marginBottom: '1rem', flexShrink: 0 }}>
                    {activePillar.icon}
                  </div>
                  <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem', flexShrink: 0 }}>
                    {activePillar.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '1.5rem', flexShrink: 0 }}>
                    {activePillar.description}
                  </p>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center', flexShrink: 0 }}>
                    {activePillar.skills.map(s => (
                      <span key={s.name} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.35rem 0.75rem', background: 'var(--bg-base)', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', border: '1px solid var(--border-light)' }}>
                        <span style={{ fontSize: '0.8rem' }}>{s.icon}</span>{s.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
