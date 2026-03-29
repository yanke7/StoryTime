import { useState } from 'react';
import AppShell from './components/layout/AppShell';
import BookFrame from './components/layout/BookFrame';
import WelcomeScreen from './components/onboarding/WelcomeScreen';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import StoryPage from './components/story/StoryPage';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { useStory } from './hooks/useStory';
import useStoryStore from './store/storyStore';
import useOnboardingStore from './store/onboardingStore';

const VIEWS = {
  WELCOME: 'welcome',
  ONBOARDING: 'onboarding',
  STORY: 'story',
};

export default function App() {
  const [view, setView] = useState(VIEWS.WELCOME);
  const [adventureType, setAdventureType] = useState('forest');
  const { beginStory } = useStory();
  const currentPage = useStoryStore((s) => s.currentPage);
  const resetOnboarding = useOnboardingStore((s) => s.reset);
  const resetStory = useStoryStore((s) => s.reset);

  async function handleOnboardingComplete(answers) {
    setAdventureType(answers.adventureType?.split(' ')[1] || 'forest');
    setView(VIEWS.STORY);
    await beginStory(answers);
  }

  function handleRestart() {
    resetOnboarding();
    resetStory();
    setView(VIEWS.WELCOME);
  }

  const showInitialSpinner = view === VIEWS.STORY && !currentPage;

  return (
    <AppShell>
      <BookFrame>
        {view === VIEWS.WELCOME && (
          <WelcomeScreen onStart={() => setView(VIEWS.ONBOARDING)} />
        )}

        {view === VIEWS.ONBOARDING && (
          <OnboardingFlow onComplete={handleOnboardingComplete} />
        )}

        {showInitialSpinner && (
          <LoadingSpinner message="Building your magical story..." />
        )}

        {view === VIEWS.STORY && currentPage && (
          <StoryPage adventureType={adventureType} onRestart={handleRestart} />
        )}
      </BookFrame>
    </AppShell>
  );
}
