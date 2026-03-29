import styles from './StoryProgress.module.css';

export default function StoryProgress({ pages, coverImageUrl }) {
  return (
    <div className={styles.track} aria-label={`Page ${pages} of story`}>
      {coverImageUrl && (
        <img
          src={coverImageUrl}
          alt="Story cover"
          className={styles.cover}
        />
      )}
      {!coverImageUrl && (
        <span className={styles.coverPlaceholder} aria-hidden="true">📖</span>
      )}
      <div className={styles.dots}>
        {Array.from({ length: Math.max(pages, 1) }).map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === pages - 1 ? styles.current : styles.visited}`}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}
