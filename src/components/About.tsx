import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const CountUp = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !done.current) {
        done.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / 1500, 1);
          setVal(Math.round((1 - Math.pow(1 - t, 3)) * target));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{val}{suffix}</span>;
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section id="about" ref={sectionRef} className="section-premium section-elevated" style={{ paddingTop: '8rem', paddingBottom: '8rem', background: 'var(--bg-elevated)' }}>
      <div className="container-premium">
        
        <motion.div 
          className="premium-split-container"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Left Side: Sticky Profile Profile */}
          <div className="premium-sticky-sidebar">
            <motion.div variants={fadeUp} className="premium-profile-wrapper hidden md:block">
              <img src="/Rao Umair.jpeg" alt="Rao Umair" className="premium-profile-img" />
            </motion.div>
            
            <motion.div variants={fadeUp}>
              <h2 className="font-display" style={{ fontSize: '2.5rem', lineHeight: 1.1, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                Rao Umair
              </h2>
              <p style={{ fontSize: '1.125rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>
                Security Engineer & AI Builder
              </p>
            </motion.div>
          </div>

          {/* Right Side: Scrollable Prose and Metrics */}
          <div>
            <motion.div variants={fadeUp} style={{ marginBottom: '3.5rem' }}>
              <p className="eyebrow">About</p>
              <h3 className="font-display" style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--text-primary)', marginBottom: '2rem' }}>
                Engineering security.<br />Building intelligence.
              </h3>
            </motion.div>

            <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
              <p>
                Based in Rawalpindi, I specialize in the intersection of cybersecurity and artificial intelligence. My core expertise lies in designing robust <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Wazuh SIEM threat detection pipelines</strong> and engineering intelligent honeypots that neutralize threats before they escalate.
              </p>
              <p>
                As a Google Cybersecurity Certified professional and an active GDG organizer, I am deeply committed to pushing the boundaries of automated security. I build machine learning models specifically tailored to identify anomalous patterns in network traffic that are invisible to traditional heuristics.
              </p>
              <p>
                Currently advancing my computer science education at Air University, I balance rigorous academic theory with the practical execution of shipping highly secure, scalable, and resilient systems.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="premium-metric-grid">
              {[
                { val: 10, suffix: '+', label: 'Projects Shipped' },
                { val: 5, suffix: '', label: 'Certifications' },
                { val: 38, suffix: '+', label: 'Public Repos' },
              ].map((s, i) => (
                <div key={i} className="premium-metric-card">
                  <div className="premium-metric-value font-display">
                    <CountUp target={s.val} suffix={s.suffix} />
                  </div>
                  <div className="premium-metric-label">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} style={{ marginTop: '3.5rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {[
                'Wazuh SIEM',
                'MITRE ATT&CK',
                'Threat Intelligence',
                'Machine Learning',
                'Python & TS'
              ].map(b => (
                <span key={b} style={{
                  padding: '0.5rem 1.25rem',
                  background: 'rgba(249,115,22,0.08)',
                  borderRadius: '2rem',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--orange-mid)',
                  border: '1px solid rgba(249,115,22,0.1)'
                }}>
                  {b}
                </span>
              ))}
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
