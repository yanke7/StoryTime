import { create } from 'zustand';

const useOnboardingStore = create((set) => ({
  answers: {},
  currentStep: 0,

  setAnswer: (key, value) =>
    set((state) => ({ answers: { ...state.answers, [key]: value } })),

  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),

  reset: () => set({ answers: {}, currentStep: 0 }),
}));

export default useOnboardingStore;
