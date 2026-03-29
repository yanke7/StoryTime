import { useState } from 'react';
import QuestionCard from './QuestionCard';
import { ONBOARDING_QUESTIONS } from '../../constants/onboardingQuestions';
import useOnboardingStore from '../../store/onboardingStore';
import styles from './OnboardingFlow.module.css';

export default function OnboardingFlow({ onComplete }) {
  const [step, setStep] = useState(0);
  const { answers, setAnswer } = useOnboardingStore();

  function handleAnswer(value) {
    const question = ONBOARDING_QUESTIONS[step];
    setAnswer(question.id, value);

    if (step + 1 >= ONBOARDING_QUESTIONS.length) {
      onComplete({ ...answers, [question.id]: value });
    } else {
      setStep((s) => s + 1);
    }
  }

  const question = ONBOARDING_QUESTIONS[step];

  return (
    <div className={styles.wrapper}>
      <QuestionCard
        key={step}
        question={question}
        stepIndex={step}
        totalSteps={ONBOARDING_QUESTIONS.length}
        onAnswer={handleAnswer}
      />
    </div>
  );
}
