'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import ExperienceCard from '../components/ExperienceCard';
import TypewriterText from '../components/TypewriterText';
import Image from 'next/image';
import WorkCard from '../components/WorkCard';

const Home = () => {
  const sloganText = "Hey, I'm Mike...";
  const typewriterDelayMs = 450;
  const typewriterSpeedMs = 110;
  const restDelayMs = typewriterDelayMs + sloganText.length * typewriterSpeedMs + 150;
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const workCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [visibleTimelineItems, setVisibleTimelineItems] = useState<Set<number>>(() => new Set());
  const [visibleWorkCards, setVisibleWorkCards] = useState<Set<number>>(() => new Set());
  const timelineProgressRef = useRef(0);
  const timelineTargetRef = useRef(0);
  const experiences = [
    {
      role: 'Senior Frontend Engineer',
      company: 'Freelance & Contract',
      employmentType: 'Self-employed',
      dateRange: 'Sep 2025 - Present',
      location: 'Remote',
      summary:
        'Building and maintaining React and TypeScript applications for client projects, delivering production-ready UI components with a focus on performance and accessibility. Collaborating with designers and backend engineers to ship features end-to-end, improving UX, code quality, and frontend architecture across multiple projects while working with modern stacks like React, TypeScript, Next.js, and APIs.',
    },
    {
      role: 'Senior Frontend Developer',
      company: 'ClickBank',
      employmentType: 'Full-time',
      dateRange: 'Apr 2021 - Jan 2026',
      location: 'United States',
      workMode: 'Remote',
      summary:
        'Led frontend architecture and development for high-traffic, customer-facing applications using React, TypeScript, and modern tooling. Primary contributor to a shared design system and component library to improve consistency, accessibility, and development speed across teams, and built a visual order form customizer that let non-technical users configure layouts, styling, and behavior safely in real time. Focused on performance optimization, WCAG accessibility, and maintainability in complex shared codebases, collaborated closely with Product, Design, Backend, and QA, resolved complex production issues, and helped define frontend standards as part of the UX Technology & Practices Committee.',
    },
    {
      role: 'Software Engineer',
      company: 'Seaspan Corporation',
      dateRange: 'Sep 2018 - Apr 2021',
      location: 'Greater Denver Area',
      workMode: 'Remote',
      summary:
        'At Seaspan, I worked as part of a small, fast-moving team contributing to a React-based micro-frontend architecture. I was a primary contributor to an in-house component library, helping establish shared patterns and reusable building blocks that allowed teams to move quickly without sacrificing consistency or quality. The work emphasized practical engineering, collaboration, and shipping reliable features in a production environment.',
    },
    {
      role: 'Software Engineer',
      company: 'Manatee Inc (startup)',
      dateRange: 'Aug 2018 - Sep 2018',
      location: 'Greater Denver Area',
      workMode: 'Remote',
    },
    {
      role: 'Lead Reservations Agent (Manager)',
      company: 'Xanterra Travel Collection',
      dateRange: 'Apr 2013 - Feb 2018',
      location: 'Greater Denver Area',
      summary:
        'Managed 60+ team members in a call center for National Parks. Addressed and resolved customer product complaints empathetically and professionally, played a critical role in dropping attrition under 5%, and maintained call monitor scores above 90%.',
    },
  ];
  const workItems = [
    {
      tech: 'React, TypeScript, GraphQL, Storybook, Zustand, Micro-Frontend',
      title: 'Order Form Customizer',
      description:
        'A custom WYSIWYG order form customizer that lets vendors shape UI, branding, and behavior without engineering support. I owned the frontend architecture, performance, and extensibility so teams could iterate fast while keeping the system reliable and scalable.',
      imageSrc: '/cb-large.png',
      imageAlt: 'Clickbank UI',
    },
    {
      tech: 'React, TypeScript, Redux, Go, Storybook, Sass, Micro-Frontend',
      title: 'Seaspan Coportation',
      description:
        'Built a React‑based micro‑frontend architecture and led development of a custom in‑house component library for reusable, consistent UI.',
      imageSrc: '/seaspan.png',
      imageAlt: 'seaspan UI',
    },
  ];

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    if (items.length === 0) return;

    let frame = 0;
    const updateOpacity = () => {
      frame = 0;
      const viewportCenter = window.innerHeight / 2;
      const maxDistance = window.innerHeight * 0.6;
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - viewportCenter);
        const normalized = Math.min(distance / maxDistance, 1);
        const opacity = 1 - normalized;
        item.style.setProperty('--tech-opacity', opacity.toFixed(3));
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateOpacity);
    };

    updateOpacity();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleTimelineItems((prev) => {
          const next = new Set(prev);
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = Number(entry.target.getAttribute('data-index'));
              if (!Number.isNaN(index)) {
                next.add(index);
              }
              observer.unobserve(entry.target);
            }
          });
          return next;
        });
      },
      { threshold: 0.4, rootMargin: '0px 0px -20% 0px' },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const items = workCardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleWorkCards((prev) => {
          const next = new Set(prev);
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = Number(entry.target.getAttribute('data-index'));
              if (!Number.isNaN(index)) {
                next.add(index);
              }
              observer.unobserve(entry.target);
            }
          });
          return next;
        });
      },
      { threshold: 0.4, rootMargin: '0px 0px -10% 0px' },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = timelineRef.current;
    if (!section) return;

    let frame = 0;
    let raf = 0;
    let sectionTop = 0;
    let sectionHeight = 0;
    let isScrolling = false;
    let scrollTimeout: number | null = null;
    let isInView = false;

    const updateTarget = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      const start = viewportHeight * 0.2;
      const end = viewportHeight * 0.8;
      const total = sectionHeight - (end - start);
      const current = Math.min(Math.max(window.scrollY - sectionTop + start, 0), total);
      timelineTargetRef.current = total > 0 ? current / total : 0;
    };

    const updateMetrics = () => {
      sectionTop = section.offsetTop;
      sectionHeight = section.offsetHeight;
      updateTarget();
    };

    const onScroll = () => {
      if (frame) return;
      isScrolling = true;
      if (scrollTimeout) {
        window.clearTimeout(scrollTimeout);
      }
      scrollTimeout = window.setTimeout(() => {
        isScrolling = false;
      }, 140);
      frame = window.requestAnimationFrame(updateTarget);
    };

    const animate = () => {
      if (isScrolling && isInView) {
        const current = timelineProgressRef.current;
        const target = timelineTargetRef.current;
        const next = current + (target - current) * 0.12;
        timelineProgressRef.current = next;
        section.style.setProperty('--timeline-progress', `${next}`);
      }
      raf = window.requestAnimationFrame(animate);
    };

    updateMetrics();
    raf = window.requestAnimationFrame(animate);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateMetrics);

    const resizeObserver = new ResizeObserver(updateMetrics);
    resizeObserver.observe(section);
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
      },
      { threshold: 0.1 },
    );
    visibilityObserver.observe(section);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      if (raf) window.cancelAnimationFrame(raf);
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateMetrics);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.slogan}>
            <TypewriterText text={sloganText} speed={typewriterSpeedMs} delay={typewriterDelayMs} />
            <span className={styles.sloganRest} style={{ animationDelay: `${restDelayMs}ms` }}>
              I turn complex ideas into clean, performant interfaces.
            </span>
          </h1>
          <div className="thumbnail-wrapper">
            <Image
              className="thumbnailImage"
              width={64}
              height={64}
              alt="mike-profile"
              src="/linkedIn-profile-dev.png"
            />
            <div className="thumbnailInfoWrapper">
              <span className="thumbnailTitle">Senior Software Engineer </span>
              <span className="thumbnailSubtitle">| Father | Lifetime Tinkier</span>
            </div>
          </div>
        </section>

        <section id="work" className={styles.workSection} aria-label="Work">
          <div className={styles.workHeader}>
            <h2 className="section-heading">Work</h2>
            <p className={styles.workSubhead}>
              Selected projects and experiments that showcase my focus on scalable engineering,
              performance, and thoughtful interface design.
            </p>
          </div>
          <div className={styles.workGrid}>
            {workItems.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => {
                  workCardRefs.current[index] = el;
                }}
                data-index={index}
              >
                <WorkCard
                  tech={item.tech}
                  title={item.title}
                  description={item.description}
                  imageSrc={item.imageSrc}
                  imageAlt={item.imageAlt}
                  priority={index === 0}
                  reverse={index % 2 === 1}
                  visible={visibleWorkCards.has(index)}
                />
              </div>
            ))}
          </div>
        </section>

        <h2 className={`section-heading ${styles.experienceHeading}`}>Experience</h2>
        <div ref={timelineRef} className={styles.timeline}>
          {experiences.map((exp, index) => (
            <div
              key={`${exp.company}-${exp.role}-${exp.dateRange}`}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              data-index={index}
              className={`${styles.timelineItem} ${
                visibleTimelineItems.has(index) ? styles.timelineItemVisible : ''
              }`}
            >
              <span className={styles.timelineMarker} aria-hidden="true" />
              <div className={styles.timelineContent}>
                <ExperienceCard exp={exp} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
