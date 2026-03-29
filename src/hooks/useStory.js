import useStoryStore from '../store/storyStore';
import { startStory, continueStory } from '../services/storyService';
import { generateImage } from '../services/imageService';

const getStore = () => useStoryStore.getState();

async function fetchImage(imagePrompt, characters) {
  getStore().setImageLoading(true);
  try {
    const fullPrompt = characters
      ? `${characters}. Scene: ${imagePrompt}`
      : imagePrompt;
    const url = await generateImage(fullPrompt);
    getStore().setImageUrl(url);
  } catch {
    getStore().setImageUrl(null);
  } finally {
    getStore().setImageLoading(false);
  }
}

export function useStory() {
  async function beginStory(onboardingData) {
    getStore().setLoading(true);
    getStore().setError(null);
    // Save hero name so all continuation pages can use it
    useStoryStore.setState({ heroName: onboardingData.heroName || 'the hero' });
    try {
      const page = await startStory(onboardingData);
      getStore().setCurrentPage(page);
      fetchImage(page.imagePrompt, page.characters);
    } catch (err) {
      getStore().setError(err.message);
    } finally {
      getStore().setLoading(false);
    }
  }

  async function makeChoice(choiceText) {
    const { pages, currentPage, characters, heroName } = getStore();
    getStore().setLoading(true);
    getStore().setError(null);
    try {
      const page = await continueStory({
        storyHistory: pages,
        choiceText,
        heroName,
        pageNumber: (currentPage?.pageNumber || 1) + 1,
        characters,
      });
      getStore().setCurrentPage(page);
      // Read characters again after setCurrentPage in case it was just set
      fetchImage(page.imagePrompt, getStore().characters);
    } catch (err) {
      getStore().setError(err.message);
    } finally {
      getStore().setLoading(false);
    }
  }

  return { beginStory, makeChoice };
}
