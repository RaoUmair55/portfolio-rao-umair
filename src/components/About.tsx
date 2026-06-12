import { useScrollReveal } from '../hooks/useScrollReveal';

const easeSmooth = [0.23, 1, 0.32, 1] as const;

const TerminalBlock = () => (
  <div
    className="rounded-2xl overflow-hidden border border-[#2a2a2a] shadow-2xl"
    style={{ background: '#111' }}
  >
    {/* macOS-style title bar */}
    <div className="flex items-center gap-2 px-5 py-3.5" style={{ background: '#1c1c1c' }}>
      <div className="flex gap-2">
        <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56]" />
        <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E]" />
        <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F]" />
      </div>
      <span className="text-[#666] text-xs font-mono ml-3">~/rao-umair — zsh</span>
    </div>
    {/* Terminal content */}
    <div className="px-6 py-5 font-mono text-sm space-y-3" style={{ fontSize: '14px' }}>
      <div>
        <span style={{ color: '#22C55E' }}>$</span>{' '}
        <span style={{ color: '#4ADE80' }}>whoami</span>
      </div>
      <div className="text-gray-300 pl-5">Rao Umair Ahmed · Cybersecurity & AI/ML Student</div>
      <div>
        <span style={{ color: '#22C55E' }}>$</span>{' '}
        <span style={{ color: '#4ADE80' }}>cat</span>{' '}
        <span style={{ color: '#60A5FA' }}>info.json</span>
      </div>
      <div className="text-gray-300 pl-5 space-y-1">
        <div><span className="text-gray-500">"university"</span>: <span style={{ color: '#A78BFA' }}>"Air University"</span>,</div>
        <div><span className="text-gray-500">"location"</span>: <span style={{ color: '#A78BFA' }}>"Rawalpindi, PK"</span>,</div>
        <div><span className="text-gray-500">"semester"</span>: <span style={{ color: '#A78BFA' }}>"6th"</span>,</div>
        <div><span className="text-gray-500">"cgpa"</span>: <span style={{ color: '#A78BFA' }}>"3.09"</span></div>
      </div>
      <div>
        <span style={{ color: '#22C55E' }}>$</span>{' '}
        <span style={{ color: '#4ADE80' }}>status</span>
      </div>
      <div className="text-gray-300 pl-5">🟢 Actively seeking cybersecurity internship</div>
      <div className="flex items-center gap-1">
        <span style={{ color: '#22C55E' }}>$</span>
        <span className="w-2 h-4 ml-1" style={{ background: '#22C55E', boxShadow: '0 0 6px #22C55E', animation: 'pulse 1s infinite' }} />
      </div>
    </div>
  </div>
);

const badges = [
  { icon: '📜', title: 'Google Cybersecurity', subtitle: '8-course specialization', desc: 'Completed 8-course specialization covering NIST, SIEM, and incident response' },
  { icon: '🛡️', title: 'Wazuh SIEM', subtitle: 'SOC operations & detection rules', desc: 'Tuned detection rules, deployed honeypots, and analyzed real attacker traffic' },
  { icon: '👥', title: 'GDG Organizer', subtitle: 'Google Developer Groups', desc: 'Active member of Google Developer Groups on campus, organizing tech events' },
  { icon: '🎯', title: 'Seeking Internship', subtitle: 'Open to Cybersecurity / Web / AI roles', desc: 'Looking for Summer 2026 opportunities in cybersecurity, web development, or AI/ML' },
];

const About = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className="relative z-10 py-24 overflow-hidden bg-bg-main" style={{ marginTop: '-2rem', borderTopLeftRadius: '2rem', borderTopRightRadius: '2rem' }}>
      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="mb-12 scroll-reveal-child" style={{ '--i': 0 } as React.CSSProperties}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-[3px] bg-green-primary rounded-full" />
            <span className="text-green-primary font-bold text-xs tracking-[0.2em] uppercase">/ About</span>
          </div>
          <h2 className="text-section font-bold text-text-primary font-display">About Me</h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left: Terminal — 60% */}
          <div className="lg:col-span-3 scroll-reveal-child" style={{ '--i': 1 } as React.CSSProperties}>
            <TerminalBlock />
          </div>

          {/* Right: Bio + Badges — 40% */}
          <div className="lg:col-span-2 space-y-8">
            <div className="scroll-reveal-child" style={{ '--i': 2 } as React.CSSProperties}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-[3px] bg-green-primary rounded-full" />
                <span className="text-green-primary font-bold text-xs tracking-[0.2em] uppercase">Bio</span>
              </div>
              <div className="space-y-4 text-text-muted leading-relaxed" style={{ fontSize: '15px' }}>
                <p>
                  I'm <span className="font-bold text-text-primary">Rao Umair Ahmed</span>, a 6th-semester CS student at Air University with a focus on <span className="font-semibold text-text-primary">cybersecurity</span> and <span className="font-semibold text-text-primary">AI/ML</span>.
                </p>
                <p>
                  I specialize in <span className="font-semibold text-text-primary">Wazuh SIEM tuning</span>, threat detection, and building ML models for security and computer vision applications.
                </p>
                <p>
                  Google Cybersecurity Certified, GDG organizer, and actively seeking a <span className="font-semibold text-text-primary">SOC internship</span> for Summer 2026.
                </p>
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="space-y-3">
              {badges.map((badge, i) => (
                <div
                  key={badge.title}
                  className={`flex items-start gap-4 p-5 rounded-xl bg-white border border-gray-200 hover:border-green-primary/40 transition-all duration-200 scroll-reveal-child`}
                  style={{ borderLeft: '3px solid #16A34A', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', '--i': i + 3 } as React.CSSProperties}
                >
                  <div className="flex-shrink-0" style={{ fontSize: '28px', lineHeight: 1 }}>
                    {badge.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-text-primary" style={{ fontSize: '15px' }}>{badge.title}</div>
                    <div className="text-text-muted text-xs mt-1 leading-snug">{badge.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
