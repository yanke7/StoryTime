import { useState } from 'react';
import styles from './QuestionCard.module.css';

const CHOICE_COLORS = ['#FF6B6B', '#FFD700', '#5AC8A8', '#C8A8E9'];

export default function QuestionCard({ question, stepIndex, totalSteps, onAnswer }) {
  const [textValue, setTextValue] = useState('');

  const handleTextSubmit = () => {
    const trimmed = textValue.trim();
    if (trimmed.length >= 1) onAnswer(trimmed);
  };

  return (
    <div className={styles.card}>
      <div className={styles.progress} aria-label={`Step ${stepIndex + 1} of ${totalSteps}`}>
        {Array.from({ length: totalSteps }).map((_, i) => (
          <span key={i} className={`${styles.dot} ${i <= stepIndex ? styles.dotActive : ''}`} />
        ))}
      </div>

      <div className={styles.questionEmoji} aria-hidden="true">{question.emoji}</div>
      <h2 className={styles.questionText}>{question.question}</h2>

      {question.type === 'text' ? (
        <div className={styles.textGroup}>
          <input
            className={styles.textInput}
            type="text"
            placeholder={question.placeholder}
            value={textValue}
            maxLength={40}
            onChange={(e) => setTextValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleTextSubmit()}
            autoFocus
            aria-label={question.question}
          />
          <button
            className={styles.submitBtn}
            onClick={handleTextSubmit}
            disabled={textValue.trim().length < 1}
          >
            Next ➡️
          </button>
        </div>
      ) : (
        <div className={styles.choices}>
          {question.options.map((opt, i) => (
            <button
              key={opt.value}
              className={styles.choiceBtn}
              style={{ '--color': CHOICE_COLORS[i % CHOICE_COLORS.length] }}
              onClick={() => onAnswer(opt.value)}
            >
              <span className={styles.choiceEmoji}>{opt.emoji}</span>
              <span className={styles.choiceLabel}>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
