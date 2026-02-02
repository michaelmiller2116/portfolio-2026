'use client';

import { useEffect, useRef, useState } from 'react';

type SmoothScrollProps = {
  children: React.ReactNode;
};

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef(0);
  const runningRef = useRef(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    const scrollToHash = (hash: string) => {
      const id = hash.replace('#', '');
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return false;
      const offset = 120;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
      return true;
    };

    const scrollToHashWithRetry = (hash: string) => {
      let attempts = 0;
      const maxAttempts = 20;
      const tryScroll = () => {
        if (scrollToHash(hash)) return;
        attempts += 1;
        if (attempts < maxAttempts) {
          requestAnimationFrame(tryScroll);
        }
      };
      tryScroll();
    };

    const onHashChange = () => {
      scrollToHashWithRetry(window.location.hash);
    };

    history.pushState = function (...args) {
      originalPushState.apply(this, args as Parameters<History['pushState']>);
      window.dispatchEvent(new Event('app:locationchange'));
    };

    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args as Parameters<History['replaceState']>);
      window.dispatchEvent(new Event('app:locationchange'));
    };

    if (window.location.hash) {
      requestAnimationFrame(() => scrollToHashWithRetry(window.location.hash));
    }

    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('popstate', onHashChange);
    window.addEventListener('app:locationchange', onHashChange);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('popstate', onHashChange);
      window.removeEventListener('app:locationchange', onHashChange);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setReducedMotion(true);
      return;
    }

    document.body.classList.add('smooth-scroll-enabled');

    const updateHeight = () => {
      document.body.style.height = `${container.scrollHeight}px`;
    };

    const startAnimation = () => {
      if (runningRef.current) return;
      runningRef.current = true;
      rafRef.current = window.requestAnimationFrame(animate);
    };

    const onScroll = () => {
      targetRef.current = window.scrollY;
      startAnimation();
    };

    const animate = () => {
      const current = currentRef.current;
      const target = targetRef.current;
      const next = current + (target - current) * 0.12;
      currentRef.current = next;
      container.style.transform = `translate3d(0, ${-next}px, 0)`;
      if (Math.abs(target - next) < 0.5) {
        currentRef.current = target;
        container.style.transform = `translate3d(0, ${-target}px, 0)`;
        runningRef.current = false;
        rafRef.current = 0;
        return;
      }
      rafRef.current = window.requestAnimationFrame(animate);
    };

    updateHeight();
    targetRef.current = window.scrollY;
    currentRef.current = targetRef.current;
    container.style.transform = `translate3d(0, ${-currentRef.current}px, 0)`;
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      updateHeight();
      targetRef.current = window.scrollY;
      startAnimation();
    });

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(container);

    const mutationObserver = new MutationObserver(() => {
      updateHeight();
    });
    mutationObserver.observe(container, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateHeight);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
      runningRef.current = false;
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      document.body.classList.remove('smooth-scroll-enabled');
      document.body.style.height = '';
      container.style.transform = '';
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={reducedMotion ? 'smooth-scroll smooth-scroll--static' : 'smooth-scroll'}
    >
      {children}
    </div>
  );
};

export default SmoothScroll;
