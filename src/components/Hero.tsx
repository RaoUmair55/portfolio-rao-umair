import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});

const COLOR_SCHEMES = [
  { // 0: Deep Ocean
    primary: '#0284c7', // light blue
    secondary: '#0891b2', // cyan
    tertiary: '#38bdf8',
    quaternary: '#0369a1',
    glow: 'rgba(2,132,199,0.15)',
    name: 'Deep Ocean'
  },
  { // 1: Emerald
    primary: '#059669',
    secondary: '#10b981',
    tertiary: '#34d399',
    quaternary: '#047857',
    glow: 'rgba(5,150,105,0.15)',
    name: 'Emerald'
  },
  { // 2: Monochromatic Slate
    primary: '#475569',
    secondary: '#64748b',
    tertiary: '#94a3b8',
    quaternary: '#334155',
    glow: 'rgba(71,85,105,0.15)',
    name: 'Slate'
  },
  { // 3: Sunset
    primary: '#e11d48', // rose
    secondary: '#c026d3', // fuchsia
    tertiary: '#fb7185',
    quaternary: '#9f1239',
    glow: 'rgba(225,29,72,0.15)',
    name: 'Sunset'
  }
];

type ColorScheme = typeof COLOR_SCHEMES[0];

/* ─── Premium SVG Developer Avatar ─── */
const DeveloperAvatar = ({ colors }: { colors: ColorScheme }) => (
  <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    <defs>
      {/* Face gradient */}
      <linearGradient id="faceGrad" x1="150" y1="80" x2="250" y2="280" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f0c9a0" />
        <stop offset="100%" stopColor="#d4a574" />
      </linearGradient>
      {/* Hair gradient */}
      <linearGradient id="hairGrad" x1="120" y1="60" x2="280" y2="160" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1a1a2e" />
        <stop offset="100%" stopColor="#16213e" />
      </linearGradient>
      {/* Hoodie gradient */}
      <linearGradient id="hoodieGrad" x1="100" y1="240" x2="300" y2="400" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#292524" />
        <stop offset="100%" stopColor="#1c1917" />
      </linearGradient>
      {/* Headphone gradient */}
      <linearGradient id="hpGrad" x1="100" y1="120" x2="300" y2="200" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2d2d2d" />
        <stop offset="100%" stopColor="#1a1a1a" />
      </linearGradient>
      {/* Screen glow */}
      <radialGradient id="screenGlow" cx="200" cy="350" r="120" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={colors.primary} stopOpacity="0.4" />
        <stop offset="50%" stopColor={colors.secondary} stopOpacity="0.1" />
        <stop offset="100%" stopColor="var(--text-primary)" />
      </radialGradient>
      {/* Subtle shadow */}
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
        <feOffset dy="4" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.15" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Background glow from "screen" */}
    <ellipse cx="200" cy="370" rx="140" ry="60" fill="url(#screenGlow)" />

    {/* Neck */}
    <rect x="178" y="230" width="44" height="36" rx="8" fill="url(#faceGrad)" filter="url(#softShadow)" />

    {/* Hoodie / Body */}
    <path d="M100 400 C100 290, 140 260, 200 255 C260 260, 300 290, 300 400 Z" fill="url(#hoodieGrad)" filter="url(#softShadow)" />
    {/* Hoodie collar */}
    <path d="M160 260 Q200 280, 240 260 Q230 275, 200 280 Q170 275, 160 260Z" fill="var(--text-primary)" />
    {/* Hoodie string left */}
    <line x1="180" y1="270" x2="175" y2="310" stroke={colors.tertiary} strokeWidth="2" strokeLinecap="round" opacity="0.6" style={{ transition: 'stroke 0.4s' }} />
    {/* Hoodie string right */}
    <line x1="220" y1="270" x2="225" y2="310" stroke={colors.tertiary} strokeWidth="2" strokeLinecap="round" opacity="0.6" style={{ transition: 'stroke 0.4s' }} />
    {/* Back logo cutout glow */}
    <path d="M160 260 Q200 280, 240 260 Q230 275, 200 280 Q170 275, 160 260Z" fill="var(--text-primary)" />
    
    {/* Right sleeve/arm details */}
    <path d="M250 200 Q280 230, 280 300 Q270 300, 250 260 Z" fill="url(#hoodieGrad)" />
    
    {/* Subtle wrinkles */}
    <path d="M155 330 Q200 340, 245 330 Q245 355, 200 360 Q155 355, 155 330Z" fill="var(--text-primary)" stroke="#444" strokeWidth="0.5" opacity="0.5" />

    {/* Face */}
    <ellipse cx="200" cy="165" rx="68" ry="78" fill="url(#faceGrad)" filter="url(#softShadow)" />

    {/* Hair (Short Male Style) */}
    <path d="M134 135 C132 85, 155 65, 200 65 C245 65, 268 85, 266 135 C266 115, 235 90, 200 90 C165 90, 134 115, 134 135 Z" fill="url(#hairGrad)" />
    {/* Hair top volume */}
    <ellipse cx="200" cy="82" rx="63" ry="24" fill="#1a1a2e" />
    {/* Sideburns */}
    <path d="M136 120 L136 150" stroke="#1a1a2e" strokeWidth="8" strokeLinecap="round" />
    <path d="M264 120 L264 150" stroke="#1a1a2e" strokeWidth="8" strokeLinecap="round" />

    {/* Subtle Stubble/Jawline */}
    <path d="M142 195 Q200 245, 258 195" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.4" />
    <path d="M148 208 Q200 250, 252 208" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.25" />

    {/* Eyes */}
    <g>
      {/* Left eye */}
      <ellipse cx="176" cy="165" rx="11" ry="12" fill="#fff" />
      <circle cx="178" cy="165" r="6" fill="#1a1a2e" />
      <circle cx="180" cy="163" r="2.5" fill="#fff" />
      {/* Right eye */}
      <ellipse cx="224" cy="165" rx="11" ry="12" fill="#fff" />
      <circle cx="226" cy="165" r="6" fill="#1a1a2e" />
      <circle cx="228" cy="163" r="2.5" fill="#fff" />
    </g>

    {/* Eyebrows */}
    <path d="M162 148 Q176 142, 190 148" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M210 148 Q224 142, 238 148" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" fill="none" />

    {/* Nose */}
    <path d="M196 178 Q200 186, 204 178" stroke="#c49a6c" strokeWidth="2" strokeLinecap="round" fill="none" />

    {/* Subtle smile */}
    <path d="M182 198 Q200 210, 218 198" stroke="#c49a6c" strokeWidth="2.5" strokeLinecap="round" fill="none" />

    {/* Ears */}
    <ellipse cx="132" cy="168" rx="10" ry="14" fill="#e0b085" />
    <ellipse cx="268" cy="168" rx="10" ry="14" fill="#e0b085" />

    {/* Headphones band */}
    <path d="M122 168 Q120 90, 200 75 Q280 90, 278 168" stroke="url(#hpGrad)" strokeWidth="10" strokeLinecap="round" fill="none" />
    {/* Headphone band highlight */}
    <path d="M135 140 Q140 95, 200 85 Q260 95, 265 140" stroke="#444" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.3" />

    {/* Headphone left cup */}
    <rect x="108" y="148" width="28" height="40" rx="10" fill="url(#hpGrad)" />
    <rect x="112" y="155" width="8" height="26" rx="4" fill="#22c55e" opacity="0.7" />

    {/* Headphone right cup */}
    <rect x="264" y="148" width="28" height="40" rx="10" fill="url(#hpGrad)" />
    <rect x="280" y="155" width="8" height="26" rx="4" fill="#22c55e" opacity="0.7" />

    {/* Glasses */}
    <rect x="156" y="154" width="36" height="26" rx="8" stroke="#555" strokeWidth="2" fill="none" opacity="0.4" />
    <rect x="208" y="154" width="36" height="26" rx="8" stroke="#555" strokeWidth="2" fill="none" opacity="0.4" />
    <line x1="192" y1="167" x2="208" y2="167" stroke="#555" strokeWidth="2" opacity="0.4" />

    {/* Code symbols floating */}
    <text x="80" y="320" fill={colors.primary} fontSize="18" fontFamily="monospace" opacity="0.4" style={{ transition: 'fill 0.4s' }}>&lt;/&gt;</text>
    <text x="290" y="300" fill={colors.secondary} fontSize="16" fontFamily="monospace" opacity="0.35" style={{ transition: 'fill 0.4s' }}>{ }</text>
    <text x="310" y="340" fill={colors.quaternary} fontSize="14" fontFamily="monospace" opacity="0.3" style={{ transition: 'fill 0.4s' }}>01</text>
  </svg>
);

/* ─── Animated Avatar Container ─── */
const ProfileAvatar = ({ colors, onAvatarClick, themeName }: { colors: ColorScheme, onAvatarClick: () => void, themeName: string }) => (
  <motion.div
    {...fadeUp(0.3)}
    className="avatar-container"
    onClick={onAvatarClick}
    style={{ cursor: 'pointer' }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    title={`Click to change theme (${themeName})`}
  >
    {/* Ambient glow */}
    <div className="avatar-glow" aria-hidden="true" style={{ background: colors.glow, transition: 'background 0.4s' }} />

    {/* Animated ring */}
    <div className="avatar-ring" aria-hidden="true" style={{ borderColor: colors.glow, transition: 'border-color 0.4s' }}>
      <div className="avatar-ring-inner" style={{ borderTopColor: colors.primary, transition: 'border-top-color 0.4s' }} />
    </div>

    {/* Avatar */}
    <div className="avatar-main">
      <img src="/boy_avatar.png" alt="Developer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>

    {/* Orbiting particles */}
    {[
      { color: colors.primary, radius: '155px', speed: '8s', delay: '0s' },
      { color: colors.secondary, radius: '165px', speed: '12s', delay: '-4s' },
      { color: colors.tertiary, radius: '145px', speed: '10s', delay: '-7s' },
      { color: colors.quaternary, radius: '160px', speed: '14s', delay: '-2s' },
    ].map((p, i) => (
      <div
        key={i}
        className="avatar-particle"
        aria-hidden="true"
        style={{
          background: p.color,
          boxShadow: `0 0 12px ${p.color}`,
          '--orbit-radius': p.radius,
          '--orbit-speed': p.speed,
          animationDelay: p.delay,
          transition: 'background 0.4s, box-shadow 0.4s'
        } as React.CSSProperties}
      />
    ))}

    {/* Status badge */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      style={{
        position: 'absolute',
        bottom: '8%',
        right: '-4%',
        zIndex: 5,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        borderRadius: 980,

        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(16px)',
        border: `1px solid ${colors.glow}`,
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        transition: 'border 0.4s'
      }}
    >
      <span style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: colors.primary,
        boxShadow: `0 0 8px ${colors.primary}`,
        animation: 'pulseGlow 2s ease-in-out infinite',
        transition: 'background 0.4s, box-shadow 0.4s'
      }} />
      <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
        Open to roles
      </span>
    </motion.div>

    {/* Floating tags */}
    {[
      { label: 'SIEM', x: '-8%', y: '18%' },
      { label: 'AI/ML', x: '88%', y: '12%' },
      { label: 'Python', x: '92%', y: '72%' },
    ].map((tag, i) => (
      <motion.span
        key={tag.label}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
        transition={{
          opacity: { delay: 0.9 + i * 0.15, duration: 0.4 },
          scale: { delay: 0.9 + i * 0.15, duration: 0.4 },
          y: { delay: 1.2 + i * 0.2, duration: 3 + i, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{
          position: 'absolute',
          left: tag.x,
          top: tag.y,
          zIndex: 5,
          padding: '0.35rem 0.75rem',
          fontSize: '0.6875rem',
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: colors.primary,
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(8px)',
          border: `1px solid ${colors.glow}`,
          borderRadius: 980,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          transition: 'color 0.4s, border 0.4s'
        }}
      >
        {tag.label}
      </motion.span>
    ))}
  </motion.div>
);

const TITLES = ['Security Engineer', 'AI / ML Builder', 'Threat Analyst', 'Creative Coder'];

const Hero = () => {
  const [titleIdx, setTitleIdx] = useState(0);
  const [themeIdx, setThemeIdx] = useState(0);

  const colors = COLOR_SCHEMES[themeIdx];

  const handleAvatarClick = () => {
    setThemeIdx((prev) => (prev + 1) % COLOR_SCHEMES.length);
  };

  useEffect(() => {
    const iv = setInterval(() => {
      setTitleIdx(p => (p + 1) % TITLES.length);
    }, 3200);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--bg-mesh-1', colors.primary);
    document.documentElement.style.setProperty('--bg-mesh-2', colors.secondary);
    document.documentElement.style.setProperty('--bg-mesh-3', colors.quaternary);
    document.documentElement.style.setProperty('--bg-mesh-4', colors.tertiary);
  }, [colors]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      className="section-light"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >

      {/* Subtle grid overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)',
        }}
      />

      <div
        className="container-premium"
        style={{
          position: 'relative',
          zIndex: 2,
          paddingTop: '6rem',
          paddingBottom: '4rem',
          width: '100%',
        }}
      >
        <div className="hero-grid">
          {/* Left — copy */}
          <div>
            <motion.p {...fadeUp(0.1)} className="eyebrow eyebrow-dark">
              Portfolio · 2026
            </motion.p>

            <motion.h1
              {...fadeUp(0.2)}
              className="font-signature"
              style={{
                fontSize: 'clamp(3rem, 7vw, 5rem)', // slightly larger for script font
                fontWeight: 700,
                lineHeight: 1.05,
                color: 'var(--text-primary)',
                marginBottom: '0.75rem',
              }}
            >
              Rao Umair{' '}
              <span 
                style={{ 
                  WebkitTextStroke: '0px', 
                  backgroundImage: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.tertiary} 100%)`, 
                  WebkitBackgroundClip: 'text', 
                  backgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent'
                }}
              >
                Ahmed
              </span>
            </motion.h1>

            <div style={{ height: '2rem', marginBottom: '1.25rem', overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={titleIdx}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  style={{
                    fontSize: 'clamp(1.125rem, 2.2vw, 1.375rem)',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    backgroundImage: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent'
                  }}
                >
                  {TITLES[titleIdx]}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.p
              {...fadeUp(0.45)}
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.125rem)',
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
                maxWidth: '480px',
                marginBottom: '2rem',
              }}
            >
              Forging threat detection pipelines and intelligent systems at the nexus of{' '}
              <span style={{ color: colors.primary, fontWeight: 600, transition: 'color 0.4s' }}>defensive security</span> and{' '}
              <span style={{ color: colors.secondary, fontWeight: 600, transition: 'color 0.4s' }}>artificial intelligence</span>.
              Google Cybersecurity Certified.
            </motion.p>

            <motion.div
              {...fadeUp(0.55)}
              style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}
            >
              <button className="btn-primary" onClick={() => scrollTo('projects')}>
                <span>View my work</span>
              </button>
              <button className="btn-secondary" onClick={() => scrollTo('contact')}>
                Contact me
              </button>
            </motion.div>

            <motion.div
              {...fadeUp(0.65)}
              className="hero-stats"
            >
              {[
                { val: '38+', label: 'Public repos' },
                { val: '4+', label: 'Projects' },
                { val: '5', label: 'Certifications' },
                { val: 'MITRE', label: 'ATT&CK' },
              ].map(s => (
                <div key={s.label} className="stat-pill">
                  <div className="stat-value">{s.val}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — avatar */}
          <div className="hero-avatar-col">
            <ProfileAvatar colors={colors} onAvatarClick={handleAvatarClick} themeName={colors.name} />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
        aria-hidden="true"
      >
        <span style={{ fontSize: '0.6875rem', color: '#86868b', letterSpacing: '0.06em' }}>
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 1,
            height: 32,
            background: 'linear-gradient(180deg, #86868b, transparent)',
            borderRadius: 1,
          }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
