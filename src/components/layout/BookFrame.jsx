import styles from './BookFrame.module.css';

export default function BookFrame({ children }) {
  return (
    <div className={styles.frame}>
      <div className={styles.spine} aria-hidden="true" />
      <div className={styles.page}>{children}</div>
    </div>
  );
}
