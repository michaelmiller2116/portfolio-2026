'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './TypewriterText.module.css';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

const TypewriterText = ({
  text,
  speed = 50,
  delay = 0,
  onComplete,
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const onCompleteRef = useRef(onComplete);
  const hasRunRef = useRef(false);

  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => setIsTyping(true), delay);
      return () => clearTimeout(delayTimer);
    } else {
      setIsTyping(true);
    }
  }, [delay]);

  useEffect(() => {
    if (!isTyping || hasRunRef.current) return;
    hasRunRef.current = true;

    setDisplayedText('');
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(timer);
        setIsComplete(true);
        onCompleteRef.current?.();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [isTyping, text, speed]);

  return (
    <span className={styles.typewriter}>
      {displayedText}
      {!isComplete && <span className={styles.cursor}>|</span>}
    </span>
  );
};

export default TypewriterText;
