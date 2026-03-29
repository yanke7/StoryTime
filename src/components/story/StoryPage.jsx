import StoryText from './StoryText';
import StoryImage from './StoryImage';
import ChoicesPanel from './ChoicesPanel';
import StoryProgress from './StoryProgress';
import LoadingSpinner from '../ui/LoadingSpinner';
import useStoryStore from '../../store/storyStore';
import { useStory } from '../../hooks/useStory';
import styles from './StoryPage.module.css';

export default function StoryPage({ adventureType, onRestart }) {
  const { currentPage, isLoading, error, coverImageUrl } = useStoryStore();
  const { makeChoice } = useStory();

  if (isLoading) {
    return (
      <div className={styles.center}>
        <LoadingSpinner message="Writing the next part of your story..." />
      </div>
    );
  }

  if (!currentPage) return null;

  if (currentPage.isEnding) {
    return (
      <div className={styles.ending}>
        <div className={styles.confetti} aria-hidden="true">🎉🌟🎊✨🎈</div>
        <h2 className={styles.endTitle}>The End! 🎉</h2>
        <StoryImage adventureType={adventureType} />
        <StoryText text={currentPage.pageText} />
        <p className={styles.endMsg}>What an amazing adventure!</p>
        <button className={styles.restartBtn} onClick={onRestart}>
          📖 Read Another Story
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <StoryProgress pages={currentPage.pageNumber || 1} coverImageUrl={coverImageUrl} />
        {error && <p className={styles.error}>Oops! {error} — Try again?</p>}
      </div>

      <div className={styles.body}>
        <div className={styles.imageCol}>
          <StoryImage adventureType={adventureType} />
        </div>
        <div className={styles.textCol}>
          <StoryText text={currentPage.pageText} />
        </div>
      </div>

      <div className={styles.choices}>
        <ChoicesPanel
          choices={currentPage.choices || []}
          onChoice={makeChoice}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}
