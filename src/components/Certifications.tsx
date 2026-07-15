import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { certificationsData } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useScrollTilt } from '../hooks/useScrollTilt';
import { FcGoogle } from 'react-icons/fc';
import { SiCoursera, SiUdemy } from 'react-icons/si';
import { Award, Shield, Monitor, FileBadge } from 'lucide-react';

const easeSmooth = [0.23, 1, 0.32, 1] as const;

const getIssuerLogo = (issuer: string, fallbackIcon: React.ReactNode) => {
  if (!issuer) return <FileBadge size={36} color="#64748b" />;
  const i = issuer.toLowerCase();
  if (i.includes('google')) return <FcGoogle size={36} />;
  if (i.includes('coursera')) return <SiCoursera size={36} color="#0056D2" />;
  if (i.includes('udemy')) return <SiUdemy size={36} color="#A435F0" />;
  if (i.includes('certiport')) return <Award size={36} color="#3b82f6" />;
  if (i.includes('navttc')) return <Monitor size={36} color="#10b981" />;
  if (i.includes('security') || i.includes('soc')) return <Shield size={36} color="#f59e0b" />;
  
  if (typeof fallbackIcon === 'string') {
    return <span className="text-4xl">{fallbackIcon}</span>;
  }
  return <FileBadge size={36} color="#64748b" />;
};

/* ── Card grid item ── */
const CertCard = ({ cert, index, onClick, isActive }: {
  cert: typeof certificationsData[0];
  index: number;
  onClick: (c: typeof certificationsData[0]) => void;
  isActive: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const skills = cert?.skills ?? [];

  return (
    <div
      onClick={() => onClick(cert)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group flip-child light-card p-5 flex flex-col relative overflow-hidden cursor-pointer transition-all duration-300 min-h-[200px] scroll-reveal-child border-l-[4px] border-l-[#3b82f6] ${
        isActive ? 'scale-[1.06] -translate-y-3 shadow-2xl z-20' : 'hover:-translate-y-0.5'
      }`}
      style={{ transitionDelay: `${index * 0.08}s`, '--i': index, background: 'var(--bg-base)' } as React.CSSProperties}
    >
      {/* Hover hint overlay */}
      <div
        className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none z-10 transition-opacity duration-200"
        style={{ opacity: hovered && !isActive ? 1 : 0 }}
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold text-white" style={{ background: 'rgba(22,163,74,0.92)', backdropFilter: 'blur(6px)' }}>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Click to see certificate
        </span>
      </div>

      {/* Floating Creative Logo Top Right */}
      <div className="absolute top-5 right-5 z-0 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
        <div className="relative">
          <div className="absolute inset-0 bg-[#3b82f6] opacity-10 blur-xl rounded-full scale-150 group-hover:opacity-30 transition-opacity duration-500"></div>
          <div className="relative drop-shadow-md">
            {getIssuerLogo(cert.issuer, cert.icon)}
          </div>
        </div>
      </div>

      <div className="mb-5 pr-14 relative z-10">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-4 h-[2px] bg-[#3b82f6] rounded-full"></span>
          <p style={{ color: '#64748b', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {cert.issuer}
          </p>
        </div>
        <h3 className="font-display leading-snug" style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.15rem' }}>{cert.title}</h3>
      </div>

      <div className="flex-1">
        <div className="flex flex-wrap gap-1.5">
          {skills.slice(0, expanded ? skills.length : 3).map((skill) => (
            <span key={skill} className="px-2 py-0.5 rounded bg-[#f1f5f9] text-[11px] font-medium text-[#1e293b] border border-[#cbd5e1]">
              {skill}
            </span>
          ))}
        </div>
        {skills.length > 3 && (
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
            className="mt-1.5 text-[11px] font-semibold text-[#1e293b] hover:text-[#334155] transition-colors"
          >
            {expanded ? 'Show Less' : `+${skills.length - 3} more`}
          </button>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 pt-3 mt-auto border-t border-[#cbd5e1]/40">
        <span className="text-[0.85rem] font-medium text-[#64748b]">
          {cert.date}
        </span>
        {cert.credentialId && (
          <span className="text-[10px] text-[#64748b] opacity-70">ID: {cert.credentialId}</span>
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
      <div className="relative" style={{ width: '100%', maxWidth: '680px', height: '440px' }}>
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
              className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-40 rounded-2xl bg-[#0a160c] border border-[#16A34A]/40 shadow-2xl flex items-center justify-center text-sm font-bold text-[#f0fdf4] text-center leading-snug px-4 hover:border-[#f59e0b] hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:-translate-y-1.5 transition-all cursor-pointer"
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

/* ── Click overlay (portal) ── */
const ClickOverlay = ({ cert, onClose }: {
  cert: typeof certificationsData[0];
  onClose: () => void;
}) => {
  const modules = (cert as { modules?: { name: string; pdf: string }[] }).modules ?? [];

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100]"
    >
      {/* Backdrop — click to close */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto">
          {modules.length > 0 ? (
            <ModuleFan modules={modules} />
          ) : cert.pdfUrl ? (
            <motion.div
              initial={{ scale: 0.93, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 8 }}
              transition={{ duration: 0.3, ease: easeSmooth }}
              className="relative rounded-3xl overflow-hidden bg-[#0a160c] border border-[#16A34A]/40 shadow-2xl"
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
                className="flex items-center justify-center gap-2 py-4 text-sm font-semibold text-[#4ADE80] hover:text-[#f59e0b] bg-[#0a160c] border-t border-[#16A34A]/30 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Certificate
              </a>
            </motion.div>
          ) : null}

          <button
            onClick={onClose}
            className="fixed top-6 right-6 z-10 w-10 h-10 rounded-full bg-[#0a160c]/90 backdrop-blur border border-[#16A34A]/40 shadow-lg flex items-center justify-center hover:bg-[#16A34A]/20 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5 text-[#f0fdf4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>,
    document.body
  );
};

/* ── Flip observer ── */
const useFlipOnScroll = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const cards = wrap.querySelectorAll<HTMLElement>('.flip-child');
        cards.forEach((c, i) => {
          setTimeout(() => c.classList.add('flipped'), i * 80);
        });
        obs.disconnect();
      }
    }, { threshold: 0.08 });
    obs.observe(wrap);
    return () => obs.disconnect();
  }, []);
  return wrapRef;
};

/* ── Section ── */
const Certifications = () => {
  const { ref, isVisible } = useScrollReveal();
  const headingRef = useScrollTilt(12);
  const flipRef = useFlipOnScroll();
  const [selectedCert, setSelectedCert] = useState<typeof certificationsData[0] | null>(null);

  const handleClick = useCallback((cert: typeof certificationsData[0]) => {
    setSelectedCert(cert);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedCert(null);
  }, []);

  return (
    <section id="certifications" style={{
      position: 'relative',
      padding: '8rem 2rem',
      zIndex: 5,
      background: 'transparent',
    }}>
      <div ref={ref} className={`container mx-auto scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="text-center mb-16 scroll-reveal-child" style={{ '--i': 0 } as React.CSSProperties}>
          <div className="section-tag" style={{ justifyContent: 'center', marginBottom: '1.5rem' }}>
            <span>Credentials</span>
          </div>
          <h2 ref={headingRef} className="section-heading font-display" style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 3.75rem)',
            textAlign: 'center',
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            fontWeight: 600,
            letterSpacing: '-0.03em',
          }}>
            Certifications & achievements
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1.0625rem' }}>
            Click a certificate to view details
          </p>
        </div>

        <div ref={flipRef} className="flip-wrap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
          {certificationsData.map((c, i) => (
            <CertCard
              key={c.title || i}
              cert={c}
              index={i}
              onClick={handleClick}
              isActive={selectedCert?.title === c.title}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCert && (
          <ClickOverlay
            key={selectedCert.title}
            cert={selectedCert}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
