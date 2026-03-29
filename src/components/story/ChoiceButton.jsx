import styles from './ChoiceButton.module.css';

const COLORS = [
  { bg: '#FFD700', shadow: '#c4a700', text: '#3D2B1F' },
  { bg: '#FF6B6B', shadow: '#c94f3f', text: '#fff' },
  { bg: '#5AC8A8', shadow: '#3a9e82', text: '#fff' },
  { bg: '#C8A8E9', shadow: '#9e7ec4', text: '#3D2B1F' },
];

export default function ChoiceButton({ choice, colorIndex, onClick, disabled }) {
  const color = COLORS[colorIndex % COLORS.length];

  return (
    <button
      className={styles.btn}
      style={{
        '--bg': color.bg,
        '--shadow-color': color.shadow,
        '--text-color': color.text,
      }}
      onClick={() => onClick(choice.label)}
      disabled={disabled}
      aria-label={choice.label}
    >
      <span className={styles.emoji} aria-hidden="true">{choice.emoji}</span>
      <span className={styles.label}>{choice.label}</span>
    </button>
  );
}
