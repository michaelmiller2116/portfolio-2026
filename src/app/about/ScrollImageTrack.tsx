'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './about.module.css';

const images = [
  { src: '/mike-bday.jpeg', alt: 'Mike at a birthday celebration' },
  { src: '/mike-beach.jpeg', alt: 'Mike at the beach' },
  { src: '/mike-bird.jpeg', alt: 'Mike with a bird' },
  { src: '/mike-car.jpeg', alt: 'Mike in a car' },
  { src: '/mike-dirty.jpeg', alt: 'Mike after a messy project' },
  { src: '/mike-dog.jpeg', alt: 'Mike with a dog' },
  { src: '/mike-fam.jpeg', alt: 'Mike with family' },
  { src: '/mike-hat.jpeg', alt: 'Mike wearing a hat' },
  { src: '/mike-ice-cream.jpeg', alt: 'Mike with ice cream' },
  { src: '/mike-paris.jpeg', alt: 'Mike in Paris' },
  { src: '/mike-sea.jpeg', alt: 'Mike by the sea' },
  { src: '/mike-work.jpeg', alt: 'Mike at work' },
];

const ScrollImageTrack = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [canScroll, setCanScroll] = useState({ back: false, forward: false });
  const offsetRef = useRef(0);
  const maxTranslateRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!section || !viewport || !track) {
      return undefined;
    }

    let frame = 0;

    const getMaxTranslate = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

    const setOffset = (nextOffset: number) => {
      const maxTranslate = maxTranslateRef.current;
      const clamped = Math.min(maxTranslate, Math.max(0, nextOffset));
      offsetRef.current = clamped;
      track.style.transform = `translate3d(${-clamped}px, 0, 0)`;
      setIsReady(true);
      setCanScroll({
        back: clamped > 0,
        forward: clamped < maxTranslate,
      });
      return { clamped, maxTranslate };
    };

    const update = () => {
      maxTranslateRef.current = getMaxTranslate();
      setOffset(offsetRef.current);
    };

    const onScroll = () => {
      if (frame) {
        return;
      }
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(section);
    resizeObserver.observe(viewport);
    resizeObserver.observe(track);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      resizeObserver.disconnect();
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  const handleMove = (direction: 'back' | 'forward') => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) {
      return;
    }

    const firstCard = track.querySelector<HTMLDivElement>(`.${styles.scrollTrackCard}`);
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap || '0');
    const step = firstCard
      ? firstCard.getBoundingClientRect().width + gap
      : viewport.clientWidth * 0.65;
    const delta = direction === 'back' ? -step : step;
    const maxTranslate = Math.max(0, track.scrollWidth - viewport.clientWidth);
    maxTranslateRef.current = maxTranslate;
    const nextOffset = Math.min(maxTranslate, Math.max(0, offsetRef.current + delta));
    offsetRef.current = nextOffset;
    track.style.transform = `translate3d(${-nextOffset}px, 0, 0)`;
    setCanScroll({
      back: nextOffset > 0,
      forward: nextOffset < maxTranslate,
    });
  };

  return (
    <section
      ref={sectionRef}
      className={styles.scrollTrackSection}
      aria-labelledby="scroll-track-title"
    >
      <div className={styles.scrollTrackSticky}>
        <header className={styles.scrollTrackHeader}>
          <div>
            <p className={styles.scrollTrackKicker}>Tap the arrows to explore</p>
            <h2 id="scroll-track-title" className="section-heading">
              Snapshots
            </h2>
          </div>
          <p className={styles.scrollTrackCopy}>Some recent photos of me 😎</p>
        </header>
        <div ref={viewportRef} className={styles.scrollTrackViewport} data-ready={isReady}>
          <div ref={trackRef} className={styles.scrollTrack}>
            {images.map((image) => (
              <div key={image.src} className={styles.scrollTrackCard}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={360}
                  height={240}
                  className={styles.scrollTrackImage}
                />
              </div>
            ))}
          </div>
          <div className={styles.scrollTrackControls} aria-hidden={!isReady}>
            <button
              type="button"
              className={styles.scrollTrackButton}
              data-direction="back"
              aria-label="Previous photos"
              onClick={() => handleMove('back')}
              disabled={!canScroll.back}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M14.8 6.4L9.6 12l5.2 5.6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className={styles.scrollTrackButton}
              data-direction="forward"
              aria-label="Next photos"
              onClick={() => handleMove('forward')}
              disabled={!canScroll.forward}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M9.2 6.4l5.2 5.6-5.2 5.6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollImageTrack;
