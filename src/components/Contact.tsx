import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

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

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1500);
  };

  const SOCIALS = [
    {
      label: 'GitHub',
      href: 'https://github.com/RaoUmair55',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" aria-hidden="true">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/rao-umair-ahmed',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      label: 'Email',
      href: 'mailto:raoumair554@gmail.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="section-premium section-light" style={{ position: 'relative', overflow: 'hidden', paddingTop: '8rem', paddingBottom: '8rem', background: 'var(--bg-elevated)' }}>
      
      {/* Subtle background gradient top-left */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(249,115,22,0.03) 0%, rgba(255,255,255,0) 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container-premium" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div 
          className="premium-split-container"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Left Side: Text and Socials */}
          <div style={{ paddingRight: '2rem' }}>
            <motion.div variants={fadeUp} style={{ marginBottom: '3rem' }}>
              <p className="eyebrow">Contact</p>
              <h2 className="font-display" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', lineHeight: 1.1, color: 'var(--text-primary)', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                Let's build<br />something.
              </h2>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '400px' }}>
                Open to collaborations, roles, and conversations about security and artificial intelligence.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Connect with me
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {SOCIALS.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.label !== 'Email' ? '_blank' : undefined}
                    rel={s.label !== 'Email' ? 'noopener noreferrer' : undefined}
                    aria-label={s.label}
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      background: 'rgba(0,0,0,0.03)',
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(0,0,0,0.05)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = 'var(--text-primary)';
                      (e.currentTarget as HTMLElement).style.color = '#ffffff';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.03)';
                      (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side: Form */}
          <motion.div variants={fadeUp}>
            <div className="premium-metric-card" style={{ padding: '3rem', border: '3px solid #4b5563', borderTop: '4px solid var(--orange-mid)', background: 'var(--bg-elevated)', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.08)' }}>
              {!sent ? (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
                        Name
                      </label>
                      <input
                        className="input-premium"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        required
                        style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border-light)', background: 'var(--bg-base)', fontSize: '1rem', color: 'var(--text-primary)', outline: 'none', transition: 'border-color 0.2s' }}
                        onFocus={e => (e.target.style.borderColor = 'var(--orange-mid)')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.1)')}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        required
                        style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border-light)', background: 'var(--bg-base)', fontSize: '1rem', color: 'var(--text-primary)', outline: 'none', transition: 'border-color 0.2s' }}
                        onFocus={e => (e.target.style.borderColor = 'var(--orange-mid)')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.1)')}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
                      Message
                    </label>
                    <textarea
                      placeholder="How can we collaborate?"
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      required
                      rows={5}
                      style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border-light)', background: 'var(--bg-base)', fontSize: '1rem', color: 'var(--text-primary)', outline: 'none', transition: 'border-color 0.2s', resize: 'vertical' }}
                      onFocus={e => (e.target.style.borderColor = 'var(--orange-mid)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.1)')}
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={sending}
                    style={{
                      width: '100%',
                      padding: '1.25rem',
                      borderRadius: '0.75rem',
                      background: '#1d1d1f',
                      color: '#ffffff',
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      border: '1px solid #1d1d1f',
                      cursor: sending ? 'wait' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.75rem',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
                      opacity: sending ? 0.8 : 1
                    }}
                    onMouseEnter={e => { 
                      if(!sending) {
                        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                        (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
                        (e.currentTarget as HTMLElement).style.background = '#000000';
                      }
                    }}
                    onMouseLeave={e => { 
                      if(!sending) {
                        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 14px 0 rgba(0,0,0,0.1)';
                        (e.currentTarget as HTMLElement).style.background = '#1d1d1f';
                      }
                    }}
                  >
                    {sending ? 'Sending...' : 'Send Message'}
                    {!sending && <Send size={20} />}
                  </button>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 0', textAlign: 'center' }}
                >
                  <CheckCircle2 size={64} color="var(--green-mid)" style={{ marginBottom: '1.5rem' }} />
                  <h3 className="font-display" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    Message sent
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
                    Thanks for reaching out! I'll get back to you soon.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
