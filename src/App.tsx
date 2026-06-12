import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Technologies from './components/Technologies';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';
import SectionDivider from './components/SectionDivider';
import BackToTop from './components/BackToTop';

function App() {
  return (
    <div className="bg-bg-main min-h-screen text-text-primary selection:bg-[rgba(15,93,54,0.12)] selection:text-green-primary">
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Technologies />
        <SectionDivider />
        <About />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
