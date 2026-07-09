import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Loader from './components/Loader';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Technologies from './components/Technologies';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SocialSidebar from './components/SocialSidebar';
import CustomCursor from './components/CustomCursor';
import { useLenis } from './hooks/useLenis';
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Navbar />
        <SocialSidebar />
        <main>
          <Hero />
          <Technologies />
          <About />
          <Projects />
          <Skills />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>
      <Analytics />
    </>
  );
};

export default App;
