import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl accent-bg flex items-center justify-center text-white font-black">
                R
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Umair<span className="text-orange-500">.</span>
              </span>
          </div>

          <div className="flex gap-8">
            {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-slate-500 hover:text-orange-400 font-bold text-sm transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="text-slate-600 text-sm font-medium">
            © {currentYear} Rao Umair Ahmed. All rights reserved.
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-slate-600 text-xs tracking-widest uppercase font-black">
            Built with <span className="text-orange-500">React</span> · <span className="text-orange-500">Tailwind</span> · <span className="text-orange-500">Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;