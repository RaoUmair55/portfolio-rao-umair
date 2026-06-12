import { motion } from 'framer-motion';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useScrollReveal } from '../hooks/useScrollReveal';

const easeSmooth = [0.23, 1, 0.32, 1] as const;

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/RaoUmair55',
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rao-umair-ahmed',
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    label: 'Email',
    href: 'mailto:raoumair554@gmail.com',
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/rao_umair_ahmed',
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  },
];

const Contact = () => {
  const { ref, isVisible } = useScrollReveal();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  emailjs.init('QnIByMzq_WCQFGIDT');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error'); setStatusMessage('Please fill in all fields');
      setTimeout(() => setStatus('idle'), 3000); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus('error'); setStatusMessage('Please enter a valid email');
      setTimeout(() => setStatus('idle'), 3000); return;
    }
    setIsLoading(true);
    try {
      await emailjs.send('service_l23mdkk', 'template_soht9eq', {
        from_name: formData.name, from_email: formData.email,
        message: formData.message, to_email: 'raoumair554@gmail.com',
      });
      setStatus('success'); setStatusMessage('Message sent! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error'); setStatusMessage('Failed to send. Please try emailing directly.');
      setTimeout(() => setStatus('idle'), 3000);
    } finally { setIsLoading(false); }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden" style={{ background: '#0D1A0F' }}>
      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="text-center mb-6 scroll-reveal-child" style={{ '--i': 0 } as React.CSSProperties}>
          <h2 className="font-bold font-display text-white" style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>Get in Touch</h2>
          <p className="mt-4 max-w-lg mx-auto text-base" style={{ color: '#9FB8A0' }}>Open to cybersecurity internships &amp; research collaborations.</p>
        </div>

        <div className="max-w-lg mx-auto rounded-2xl p-6 md:p-8 scroll-reveal-child" style={{ '--i': 1, background: '#1A2E1C', border: '1px solid #2D4A2F' } as React.CSSProperties}>
          <form onSubmit={handleSubmit} className="space-y-5">
            {status !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-xl text-sm font-semibold ${
                  status === 'success'
                    ? 'bg-[rgba(22,163,74,0.12)] text-[#16A34A] border border-[#16A34A30]'
                    : 'bg-[rgba(239,68,68,0.12)] text-red-400 border border-[rgba(239,68,68,0.2)]'
                }`}
              >
                {statusMessage}
              </motion.div>
            )}
            <div>
              <input type="text" name="name" value={formData.name} onChange={handleChange} disabled={isLoading}
                className="w-full px-5 py-4 rounded-xl text-white placeholder-white/40 outline-none transition-all duration-200 disabled:opacity-50 text-sm"
                style={{ background: '#0D1A0F', border: '1px solid #2D4A2F' }}
                placeholder="Your Name"
                onFocus={(e) => e.currentTarget.style.borderColor = '#16A34A'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#2D4A2F'} />
            </div>
            <div>
              <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={isLoading}
                className="w-full px-5 py-4 rounded-xl text-white placeholder-white/40 outline-none transition-all duration-200 disabled:opacity-50 text-sm"
                style={{ background: '#0D1A0F', border: '1px solid #2D4A2F' }}
                placeholder="email@example.com"
                onFocus={(e) => e.currentTarget.style.borderColor = '#16A34A'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#2D4A2F'} />
            </div>
            <div>
              <textarea name="message" rows={4} value={formData.message} onChange={handleChange} disabled={isLoading}
                className="w-full px-5 py-4 rounded-xl text-white placeholder-white/40 outline-none transition-all duration-200 resize-none disabled:opacity-50 text-sm"
                style={{ background: '#0D1A0F', border: '1px solid #2D4A2F' }}
                placeholder="How can I help you?"
                onFocus={(e) => e.currentTarget.style.borderColor = '#16A34A'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#2D4A2F'} />
            </div>
            <button type="submit" disabled={isLoading}
              className="w-full rounded-xl text-white font-semibold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ height: '52px', background: '#16A34A' }}
            >
              {isLoading ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending...</>
              ) : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Social links footer */}
        <div className="flex items-center justify-center gap-6 mt-12 pt-8 scroll-reveal-child" style={{ '--i': 2, borderTop: '1px solid rgba(255,255,255,0.06)' } as React.CSSProperties}>
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.6)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#16A34A'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>

        <p className="text-center text-xs mt-4 scroll-reveal-child" style={{ '--i': 3, color: 'rgba(255,255,255,0.25)' } as React.CSSProperties}>
          &copy; {new Date().getFullYear()} Rao Umair Ahmed. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Contact;
