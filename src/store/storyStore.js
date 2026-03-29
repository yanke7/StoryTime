import { create } from 'zustand';

const useStoryStore = create((set, get) => ({
  pages: [],
  currentPage: null,
  characters: null,
  heroName: 'the hero',
  imageUrl: null,
  coverImageUrl: null,
  isLoading: false,
  isImageLoading: false,
  error: null,

  setLoading: (val) => set({ isLoading: val }),
  setImageLoading: (val) => set({ isImageLoading: val }),
  setError: (msg) => set({ error: msg }),

  setImageUrl: (url) =>
    set((state) => {
      // Attach the image to the last page in history
      const pages = state.pages.map((p, i) =>
        i === state.pages.length - 1 ? { ...p, imageUrl: url } : p
      );
      return {
        imageUrl: url,
        coverImageUrl: state.coverImageUrl || url,
        pages,
      };
    }),

  setCurrentPage: (page) =>
    set((state) => ({
      currentPage: page,
      characters: state.characters || page.characters || null,
      pages: [...state.pages, { ...page, imageUrl: null }],
      imageUrl: null,
      error: null,
    })),

  reset: () => set({
    pages: [],
    currentPage: null,
    characters: null,
    heroName: 'the hero',
    imageUrl: null,
    coverImageUrl: null,
    isLoading: false,
    isImageLoading: false,
    error: null,
  }),

  getHistory: () => get().pages,
  getCharacters: () => get().characters,
}));

export default useStoryStore;
