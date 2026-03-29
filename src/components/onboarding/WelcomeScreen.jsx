import styles from './WelcomeScreen.module.css';

export default function WelcomeScreen({ onStart }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.badge} aria-hidden="true">📖</div>
      <h1 className={styles.title}>My Magical Story</h1>
      <p className={styles.subtitle}>
        Answer a few questions and we'll create a <strong>one-of-a-kind adventure</strong> just for you!
      </p>
      <button className={styles.startBtn} onClick={onStart}>
        Start My Adventure! 🚀
      </button>
      <p className={styles.hint}>✏️ You get to make the choices!</p>
    </div>
  );
}
