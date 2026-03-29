export async function startStory(onboardingData) {
  const res = await fetch('/api/generate-story-start', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(onboardingData),
  });
  if (!res.ok) throw new Error('Failed to start story');
  return res.json();
}

export async function continueStory({ storyHistory, choiceText, heroName, pageNumber }) {
  const res = await fetch('/api/generate-story-continue', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ storyHistory, choiceText, heroName, pageNumber }),
  });
  if (!res.ok) throw new Error('Failed to continue story');
  return res.json();
}
