import { useState } from 'react';
import ChoiceButton from './ChoiceButton';
import styles from './ChoicesPanel.module.css';

export default function ChoicesPanel({ choices, onChoice, disabled }) {
  const [customText, setCustomText] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  function handleCustomSubmit() {
    const trimmed = customText.trim().slice(0, 100);
    if (trimmed.length >= 3) {
      onChoice(trimmed);
      setCustomText('');
      setShowCustom(false);
    }
  }

  return (
    <div className={styles.panel}>
      <p className={styles.label}>What happens next?</p>
      <div className={styles.choices}>
        {choices.map((choice, i) => (
          <ChoiceButton
            key={choice.id}
            choice={choice}
            colorIndex={i}
            onClick={onChoice}
            disabled={disabled}
          />
        ))}
      </div>

      <div className={styles.customSection}>
        {!showCustom ? (
          <button
            className={styles.customToggle}
            onClick={() => setShowCustom(true)}
            disabled={disabled}
          >
            ✏️ Write your own idea!
          </button>
        ) : (
          <div className={styles.customInput}>
            <input
              type="text"
              placeholder="What should happen? (e.g. climb the big tree)"
              value={customText}
              maxLength={100}
              onChange={(e) => setCustomText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
              autoFocus
              aria-label="Write your own story choice"
            />
            <div className={styles.customActions}>
              <button
                className={styles.customSubmit}
                onClick={handleCustomSubmit}
                disabled={customText.trim().length < 3}
              >
                Go! 🚀
              </button>
              <button className={styles.customCancel} onClick={() => setShowCustom(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
