'use client';

import { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.css';

const STORAGE_KEY = 'theme-preference';

type ThemeMode = 'light' | 'dark';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial: ThemeMode =
      stored === 'dark' || stored === 'light' ? stored : prefersDark ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', initial);
    // TODO: update theme toggle
    // setTheme(initial);
    // setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [hydrated, theme]);

  const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      className={styles.toggle}
      data-theme={theme}
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} mode`}
    >
      <span className={styles.icon} aria-hidden="true" />
    </button>
  );
};

export default ThemeToggle;
