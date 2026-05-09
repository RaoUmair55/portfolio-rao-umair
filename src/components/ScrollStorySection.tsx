import { ReactNode, useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ScrollStorySectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
  pin?: boolean;
  revealDistance?: number;
};

export const ScrollStorySection = ({
  id,
  className = '',
  children,
  pin = false,
  revealDistance = 90,
}: ScrollStorySectionProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const target = element.querySelector('[data-story-content]');
      if (target) {
        gsap.fromTo(
          target,
          { y: revealDistance, opacity: 0, filter: 'blur(14px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 78%',
              end: 'top 30%',
              scrub: true,
            },
          }
        );
      }

      if (pin) {
        ScrollTrigger.create({
          trigger: element,
          start: 'top top',
          end: '+=70%',
          pin: true,
          pinSpacing: true,
          scrub: 1,
        });
      }
    }, element);

    return () => ctx.revert();
  }, [pin, revealDistance]);

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className={`relative story-spacer ${className}`}
      initial={{ opacity: 0.92 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div data-story-content>{children}</div>
    </motion.section>
  );
};
