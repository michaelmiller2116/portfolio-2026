'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import type { FocusEvent, PointerEvent } from 'react';
import Link from 'next/link';

type HighlightState = {
  left: number;
  width: number;
  height: number;
};

const TopNav = () => {
  const listRef = useRef<HTMLUListElement | null>(null);
  const activeTargetRef = useRef<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const setHighlightFromElement = (element: HTMLElement | null) => {
    const list = listRef.current;
    if (!list) return;
    const listRect = list.getBoundingClientRect();
    const targetRect = element ? element.getBoundingClientRect() : listRect;

    const nextState: HighlightState = {
      left: targetRect.left - listRect.left,
      width: targetRect.width,
      height: targetRect.height,
    };

    list.style.setProperty('--nav-highlight-left', `${nextState.left}px`);
    list.style.setProperty('--nav-highlight-width', `${nextState.width}px`);
    list.style.setProperty('--nav-highlight-height', `${nextState.height}px`);
  };

  const handlePointerEnter = (event: PointerEvent<HTMLAnchorElement>) => {
    const target = event.currentTarget;
    activeTargetRef.current = target;
    setHighlightFromElement(target);
  };

  const handlePointerLeave = () => {
    activeTargetRef.current = null;
    setHighlightFromElement(null);
  };

  const handleFocus = (event: FocusEvent<HTMLAnchorElement>) => {
    const target = event.currentTarget;
    activeTargetRef.current = target;
    setHighlightFromElement(target);
  };

  const handleBlur = () => {
    activeTargetRef.current = null;
    setHighlightFromElement(null);
  };

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    setHighlightFromElement(null);

    const observer = new ResizeObserver(() => {
      setHighlightFromElement(activeTargetRef.current);
    });

    observer.observe(list);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleNavLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav
      className={`top-nav ${isOpen ? 'top-nav--open' : ''}`}
      aria-label="Primary"
      onPointerLeave={handlePointerLeave}
    >
      <button
        className="top-nav-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="top-nav-toggle-label">{isOpen ? 'Close' : 'Menu'}</span>
        <span className="top-nav-toggle-icon" aria-hidden="true" />
      </button>
      <ul className="top-nav-list" id="primary-navigation" ref={listRef}>
        <li>
          <Link
            className="top-nav-link"
            href="/"
            aria-label="Home"
            onPointerEnter={handlePointerEnter}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={handleNavLinkClick}
          >
            <span className="nav-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" className="nav-icon-svg">
                <path
                  d="M4 11.5L12 5l8 6.5V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7.5Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 21v-6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </li>
        <li>
          <Link
            className="top-nav-link"
            href="/#work"
            onPointerEnter={handlePointerEnter}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={handleNavLinkClick}
          >
            Work
          </Link>
        </li>
        <li>
          <Link
            className="top-nav-link"
            href="/about"
            onPointerEnter={handlePointerEnter}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={handleNavLinkClick}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            className="top-nav-link"
            href="/recommendations"
            onPointerEnter={handlePointerEnter}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={handleNavLinkClick}
          >
            Recommendations
          </Link>
        </li>
        <li>
          <Link
            className="top-nav-link"
            href="mailto:please.respond.mike@gmail.com?subject=New%20Message%20from%20Your%20Future%20Best%20Client"
            onPointerEnter={handlePointerEnter}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={handleNavLinkClick}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default TopNav;
