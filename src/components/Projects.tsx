import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { projectsData } from '../data/portfolio';
import { Github, ExternalLink } from 'lucide-react';

const Projects = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    const updateRange = () => {
      if (trackRef.current) {
        setScrollRange(trackRef.current.scrollWidth - window.innerWidth);
      }
    };
    updateRange();
    window.addEventListener('resize', updateRange);
    return () => window.removeEventListener('resize', updateRange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section ref={targetRef} id="projects" className="projects-h-section" style={{ height: '400vh' }}>
      <div className="projects-h-sticky">
        
        {/* Header in normal flow */}
        <div style={{ width: '100%', textAlign: 'center', marginBottom: '1.5rem', zIndex: 10 }}>
          <h2 className="section-title font-display" style={{ color: 'var(--text-primary)' }}>
            My Work
          </h2>
        </div>

        <motion.div ref={trackRef} style={{ x }} className="projects-h-track">
          {projectsData.map((project, index) => {
            const isEven = index % 2 !== 0;

            const textContent = (
              <div className="project-h-content-block">
                <div className="project-h-header">
                  <span className="project-h-num">{String(index + 1).padStart(2, '0')}</span>
                  <div className="project-h-title-group">
                    <h3 className="project-h-title">{project.title}</h3>
                    <span className="project-h-subtitle">{project.metric || project.description.substring(0, 40) + '...'}</span>
                  </div>
                </div>

                <div className="project-h-tools">
                  <div className="project-h-tools-label">Tools and features</div>
                  <div className="project-h-tools-list">
                    {project.tech.join(', ')}
                  </div>
                </div>
              </div>
            );

            const imageContent = (
              <div className="project-h-image-container">
                {project.image ? (
                  <img src={project.image} alt={project.title} />
                ) : (
                  <div style={{ color: 'var(--text-primary)' }}>{project.icon}</div>
                )}
                <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.9)', padding: '0.5rem', borderRadius: '50%', color: '#000', border: '1px solid var(--border-light)' }}>
                      <Github size={20} />
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ background: '#000', padding: '0.5rem', borderRadius: '50%', color: '#fff' }}>
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
            );

            return (
              <div key={project.title} className="project-card-h">
                {isEven ? (
                  <>
                    {imageContent}
                    <div style={{ height: '1.5rem' }} /> {/* Spacer */}
                    {textContent}
                  </>
                ) : (
                  <>
                    {textContent}
                    <div style={{ height: '1.5rem' }} /> {/* Spacer */}
                    {imageContent}
                  </>
                )}
              </div>
            );
          })}

          {/* End screen card */}
          <div className="project-card-h" style={{ borderRight: 'none', justifyContent: 'center', alignItems: 'center', background: 'transparent' }}>
            <h3 className="font-display" style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center', color: 'var(--text-primary)' }}>
              Want to see more?
            </h3>
            <a
              href="https://github.com/RaoUmair55"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ textDecoration: 'none', padding: '1rem 2rem', background: '#000', color: '#fff', borderRadius: '999px', display: 'flex', gap: '0.5rem', alignItems: 'center', fontWeight: '600' }}
            >
              <Github size={20} />
              <span>View all on GitHub</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
