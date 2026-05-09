import { motion } from 'framer-motion';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Initialize EmailJS (replace with your public key)
  emailjs.init('QnIByMzq_WCQFGIDT');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setStatusMessage('Please fill in all fields');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setStatusMessage('Please enter a valid email');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setIsLoading(true);

    try {
      await emailjs.send(
        'service_l23mdkk',
        'template_soht9eq',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'raoumair554@gmail.com'
        }
      );

      setStatus('success');
      setStatusMessage('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Email error:', error);
      setStatus('error');
      setStatusMessage('Failed to send message. Please try again or email directly.');
      setTimeout(() => setStatus('idle'), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="blob bottom-0 right-0 opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-morphism rounded-[3rem] p-10 md:p-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 accent-bg blur-[120px] opacity-10" />

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-12 h-1 accent-bg rounded-full" />
                <span className="text-orange-500 font-bold text-sm tracking-[0.2em] uppercase">Connect</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-black text-white mb-8"
              >
                Let's Build Something <span className="accent-gradient-text">Secure.</span>
              </motion.h2>

              <p className="text-slate-400 text-xl mb-12 leading-relaxed">
                Currently looking for new opportunities in SOC analysis and Security Engineering. Have a question or just want to say hi?
              </p>

              <div className="space-y-6">
                {[
                  { label: 'Email', value: 'raoumair554@gmail.com', href: 'mailto:raoumair554@gmail.com' },
                  { label: 'LinkedIn', value: 'rao-umair-ahmed', href: 'https://www.linkedin.com/in/rao-umair-ahmed' },
                  { label: 'GitHub', value: '@RaoUmair55', href: 'https://github.com/RaoUmair55' }
                ].map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-6 rounded-3xl glass-card group border-white/5"
                  >
                    <div>
                      <div className="text-orange-500 text-xs font-black uppercase tracking-widest mb-1">{item.label}</div>
                      <div className="text-white font-bold text-lg">{item.value}</div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-slate-900/50 flex items-center justify-center group-hover:accent-bg group-hover:text-white transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-1 glass-card rounded-[2.5rem]"
            >
              <div className="bg-slate-950/50 rounded-[2.4rem] p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {status !== 'idle' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`p-4 rounded-xl font-semibold ${
                        status === 'success'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {statusMessage}
                    </motion.div>
                  )}
                  <div>
                    <label className="block text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-3 ml-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full px-6 py-4 bg-slate-900/50 border border-white/5 rounded-2xl text-white placeholder-slate-700 focus:outline-none focus:border-orange-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-3 ml-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full px-6 py-4 bg-slate-900/50 border border-white/5 rounded-2xl text-white placeholder-slate-700 focus:outline-none focus:border-orange-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-3 ml-1">Message</label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full px-6 py-4 bg-slate-900/50 border border-white/5 rounded-2xl text-white placeholder-slate-700 focus:outline-none focus:border-orange-500/50 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="How can I help you?"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-5 accent-bg text-white font-black rounded-2xl shadow-xl shadow-orange-500/20 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;