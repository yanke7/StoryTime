import styles from './AppShell.module.css';

const CLOUDS = ['☁️', '⛅', '☁️', '🌤️'];
const STARS = ['⭐', '🌟', '✨', '💫'];

export default function AppShell({ children }) {
  return (
    <div className={styles.shell}>
      <div className={styles.deco} aria-hidden="true">
        {CLOUDS.map((c, i) => (
          <span key={i} className={styles.cloud} style={{ '--delay': `${i * 1.5}s`, '--left': `${10 + i * 22}%` }}>{c}</span>
        ))}
        {STARS.map((s, i) => (
          <span key={i} className={styles.star} style={{ '--delay': `${i * 0.7}s`, '--left': `${5 + i * 23}%`, '--top': `${5 + (i % 3) * 8}%` }}>{s}</span>
        ))}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
