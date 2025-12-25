import { create } from 'zustand';
import { MoodResponse } from '../types/api';

export type Category = 'Movies' | 'Series' | 'Music' | 'Books';

interface AppState {
    selectedCategory: Category | null;
    capturedPhoto: string | null;
    moodData: MoodResponse | null;
    isLoading: boolean;
    setSelectedCategory: (category: Category | null) => void;
    setCapturedPhoto: (uri: string | null) => void;
    setMoodData: (data: MoodResponse | null) => void;
    setIsLoading: (loading: boolean) => void;
    reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
    selectedCategory: null,
    capturedPhoto: null,
    moodData: null,
    isLoading: false,
    setSelectedCategory: (category) => set({ selectedCategory: category }),
    setCapturedPhoto: (uri) => set({ capturedPhoto: uri }),
    setMoodData: (data) => set({ moodData: data }),
    setIsLoading: (loading) => set({ isLoading: loading }),
    reset: () => set({ selectedCategory: null, capturedPhoto: null, moodData: null, isLoading: false }),
}));
