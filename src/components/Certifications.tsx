import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { certificationsData } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';

const easeSmooth = [0.23, 1, 0.32, 1] as const;

/* ── Card grid item ── */
const CertCard = ({ cert, index, onHover, isActive }: {
  cert: typeof certificationsData[0];
  index: number;
  onHover: (c: typeof certificationsData[0]) => void;
  isActive: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);
  const skills = cert?.skills ?? [];

  return (
    <div
      onMouseEnter={() => onHover(cert)}
      className={`saas-card p-5 flex flex-col relative overflow-visible cursor-pointer transition-all duration-300 min-h-[200px] scroll-reveal-child ${
        isActive ? 'scale-[1.06] -translate-y-3 shadow-2xl z-20' : 'hover:-translate-y-0.5'
      }`}
      style={{ '--i': index } as React.CSSProperties}
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-accent-blue flex items-center justify-center text-base flex-shrink-0">
          {cert.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-card text-text-primary font-display mb-1 leading-tight">{cert.title}</h3>
          <p className="text-green-primary text-[11px] font-semibold">{cert.issuer}</p>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex flex-wrap gap-1.5">
          {skills.slice(0, expanded ? skills.length : 3).map((skill) => (
            <span key={skill} className="px-2 py-0.5 rounded bg-bg-main text-[11px] font-medium text-text-muted">
              {skill}
            </span>
          ))}
        </div>
        {skills.length > 3 && (
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
            className="mt-1.5 text-[11px] font-semibold text-green-primary hover:text-green-secondary transition-colors"
          >
            {expanded ? 'Show Less' : `+${skills.length - 3} more`}
          </button>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 pt-3 mt-auto border-t border-gray-100">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-green-50 text-green-primary">
          {cert.date}
        </span>
        {cert.credentialId && (
          <span className="text-[10px] text-text-muted">ID: {cert.credentialId}</span>
        )}
      </div>
    </div>
  );
};

/* ── Playing-card fan ── */
const ModuleFan = ({ modules }: { modules: { name: string; pdf: string }[] }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex items-center justify-center py-8">
      <div className="relative" style={{ width: '680px', height: '440px' }}>
        {modules.map((mod, i) => {
          const offset = i - (modules.length - 1) / 2;
          return (
            <motion.a
              key={mod.name}
              href={mod.pdf}
              target="_blank"
              rel="noopener noreferrer"
              initial={false}
              animate={{
                x: show ? offset * 76 : 0,
                y: show ? Math.abs(offset) * 9 + 10 : 0,
                rotate: show ? offset * 6.5 : 0,
                opacity: show ? 1 : 0,
                scale: show ? 1 : 0.35,
              }}
              transition={{ duration: 0.55, delay: show ? i * 0.045 : 0, ease: easeSmooth }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-40 rounded-2xl bg-white border border-gray-200 shadow-2xl flex items-center justify-center text-sm font-bold text-text-primary text-center leading-snug px-4 hover:border-green-primary hover:shadow-2xl hover:-translate-y-1.5 transition-colors cursor-pointer"
              style={{ transformOrigin: 'center bottom' }}
              title={mod.name}
            >
              {mod.name}
            </motion.a>
          );
        })}
      </div>
    </div>
  );
};

/* ── Hover overlay (portal) ── */
const HoverOverlay = ({ cert, onKeep, onClose, onCloseNow }: {
  cert: typeof certificationsData[0];
  onKeep: () => void;
  onClose: () => void;
  onCloseNow: () => void;
}) => {
  const modules = (cert as { modules?: { name: string; pdf: string }[] }).modules ?? [];

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] pointer-events-none"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          className="pointer-events-auto"
          onMouseEnter={onKeep}
          onMouseLeave={onClose}
        >
          {modules.length > 0 ? (
            <ModuleFan modules={modules} />
          ) : cert.pdfUrl ? (
            <motion.div
              initial={{ scale: 0.93, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 8 }}
              transition={{ duration: 0.3, ease: easeSmooth }}
              className="relative rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-2xl"
              style={{ width: '90vw', maxWidth: '1100px' }}
            >
              <iframe
                src={cert.pdfUrl}
                className="w-full h-[75vh]"
                title={cert.title}
              />
              <a
                href={cert.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-4 text-sm font-semibold text-green-primary hover:text-green-secondary bg-white border-t border-gray-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Certificate
              </a>
            </motion.div>
          ) : null}

          <button
            onClick={onCloseNow}
            className="fixed top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur border border-gray-200 shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>,
    document.body
  );
};

/* ── Section ── */
const Certifications = () => {
  const { ref, isVisible } = useScrollReveal();
  const [hoveredCert, setHoveredCert] = useState<typeof certificationsData[0] | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  const handleHover = useCallback((cert: typeof certificationsData[0]) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setHoveredCert(cert);
  }, []);

  const handleContentEnter = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const handleContentLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setHoveredCert(null), 300);
  }, []);

  return (
    <section id="certifications" className="relative z-10 py-24" style={{ background: '#F4F7F4', borderTop: '1px solid #E2EBE2', borderBottom: '1px solid #E2EBE2' }}>
      <div ref={ref} className={`container mx-auto scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="text-center mb-16 scroll-reveal-child" style={{ '--i': 0 } as React.CSSProperties}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-blue text-green-primary text-xs font-bold tracking-wider mb-6">
            Achievements
          </span>
          <div className="inline-block">
            <h2 className="text-section font-bold text-text-primary font-display">Certifications</h2>
            <div className="h-0.5 bg-green-primary mt-1.5 rounded-full" />
          </div>
          <p className="text-text-muted mt-4 max-w-lg mx-auto">Professional credentials and ongoing learning</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
          {certificationsData.map((c, i) => (
            <CertCard
              key={c.title || i}
              cert={c}
              index={i}
              onHover={handleHover}
              isActive={hoveredCert?.title === c.title}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {hoveredCert && (
          <HoverOverlay
            key={hoveredCert.title}
            cert={hoveredCert}
            onKeep={handleContentEnter}
            onClose={handleContentLeave}
            onCloseNow={() => setHoveredCert(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
