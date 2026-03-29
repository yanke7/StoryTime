import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner({ message = 'Creating your story...' }) {
  return (
    <div className={styles.wrapper} role="status" aria-label={message}>
      <div className={styles.orbit}>
        {['⭐', '🌟', '✨', '💫', '⭐'].map((s, i) => (
          <span
            key={i}
            className={styles.orb}
            style={{ '--i': i, '--total': 5 }}
            aria-hidden="true"
          >
            {s}
          </span>
        ))}
      </div>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
