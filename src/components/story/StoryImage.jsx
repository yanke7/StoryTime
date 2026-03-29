import { useState } from 'react';
import useStoryStore from '../../store/storyStore';
import styles from './StoryImage.module.css';

const PLACEHOLDERS = {
  forest: '🌲',
  space: '🚀',
  underwater: '🌊',
  castle: '🏰',
};

export default function StoryImage({ adventureType }) {
  const { imageUrl, isImageLoading } = useStoryStore();
  const [loaded, setLoaded] = useState(false);

  const placeholder = PLACEHOLDERS[adventureType] || '📖';

  if (isImageLoading || (!imageUrl && isImageLoading)) {
    return (
      <div className={styles.skeleton} aria-label="Loading illustration..." role="img">
        <div className={styles.shimmer} />
        <span className={styles.skeletonEmoji} aria-hidden="true">🎨</span>
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className={styles.placeholder} aria-label="Story illustration" role="img">
        <span className={styles.placeholderEmoji} aria-hidden="true">{placeholder}</span>
      </div>
    );
  }

  return (
    <div className={`${styles.imageWrapper} ${loaded ? styles.imageLoaded : styles.imageHidden}`}>
      <img
        src={imageUrl}
        alt="Story illustration"
        className={styles.image}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
