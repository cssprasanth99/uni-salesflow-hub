import { create } from 'zustand';

export type IndustryMode = 'wholesale' | 'retail';

interface IndustryState {
  mode: IndustryMode;
  setMode: (mode: IndustryMode) => void;
}

export const useIndustryStore = create<IndustryState>((set) => ({
  mode: 'wholesale',
  setMode: (mode) => set({ mode }),
}));