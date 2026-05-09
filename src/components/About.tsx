import { motion } from 'framer-motion';

const StatCard = ({ value, label, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="glass-card rounded-3xl"
  >
    <div className="text-3xl mb-3">{icon}</div>
    <div className="text-3xl font-black text-white mb-1">{value}+</div>
    <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">{label}</div>
  </motion.div>
);

const About = () => {
  const interests = [
    { icon: '🛡️', label: 'SOC & Blue Team' },
    { icon: '🧰', label: 'SIEM / Wazuh' },
    { icon: '📜', label: 'Google Certified' },
    { icon: '💻', label: 'Full-Stack' },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="blob top-1/4 left-[-20%] opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 accent-bg blur-[100px] opacity-10 rounded-full" />
            <div className="relative glass-morphism rounded-[3rem] p-4 overflow-hidden">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 text-center">
                  <div className="text-5xl mb-4">🎓</div>
                  <div className="text-white font-bold text-xl">BSCS</div>
                  <div className="text-slate-400 text-sm">6th Semester</div>
                </div>
                <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 text-center">
                  <div className="text-5xl mb-4">🏛️</div>
                  <div className="text-white font-bold text-xl">Air Uni</div>
                  <div className="text-slate-400 text-sm">Islamabad</div>
                </div>
                <div className="col-span-2 p-10 rounded-3xl accent-bg bg-opacity-10 border border-white/10">
                  <h4 className="text-2xl font-black text-white mb-2">Security-First Dev</h4>
                  <p className="text-slate-300">Building resilient systems that stay ahead of threats.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Side */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-1 accent-bg rounded-full" />
                <span className="text-[var(--accent)] font-bold text-sm tracking-[0.2em] uppercase">Who I Am</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                Passionate about <span className="accent-gradient-text">Defense.</span>
              </h2>
              <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
                <p>
                  I'm <span className="text-white font-bold">Rao Umair Ahmed</span>, a BSCS student at Air University focused on defensive cybersecurity and full-stack development. I bridge the gap between building software and securing it.
                </p>
                <p>
                  My expertise lies in <span className="text-white">SIEM tuning (Wazuh)</span>, threat detection, and creating automated incident response playbooks. I'm Google Cybersecurity Certified and dedicated to SOC excellence.
                </p>
              </div>
            </motion.div>

            {/* Interest Badges */}
            <div className="grid grid-cols-2 gap-4">
              {interests.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 px-6 py-4 rounded-2xl glass-card border-white/5"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-slate-200 font-bold text-sm">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24">
          <StatCard value={15} label="Projects" icon="🚀" delay={0.1} />
          <StatCard value={14} label="Certs" icon="📜" delay={0.2} />
          <StatCard value={3} label="Languages" icon="💻" delay={0.3} />
          <StatCard value={32} label="Repos" icon="📚" delay={0.4} />
        </div>
      </div>
    </section>
  );
};

export default About;