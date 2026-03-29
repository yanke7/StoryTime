import { useEffect, useState } from 'react';
import styles from './StoryText.module.css';

export default function StoryText({ text }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    if (!text) return;

    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 22);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <p className={styles.text} aria-live="polite">
      {displayed}
      {displayed.length < (text?.length ?? 0) && (
        <span className={styles.cursor} aria-hidden="true">|</span>
      )}
    </p>
  );
}
