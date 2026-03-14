import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ReadingMode = 'light' | 'dark' | 'sepia' | 'contrast';
export type ArabicFont = 'Amiri' | 'Cairo' | 'Traditional Arabic';
export type UIVariant = 'classic' | 'cinematic';

interface ReadingSettingsState {
    textSize: number; // 1-5 scale
    arabicFont: ArabicFont;
    mode: ReadingMode;
    uiVariant: UIVariant;
    showTranslation: boolean;
    showIsnad: boolean;

    // Actions
    setTextSize: (size: number) => void;
    setArabicFont: (font: ArabicFont) => void;
    setMode: (mode: ReadingMode) => void;
    setUIVariant: (variant: UIVariant) => void;
    toggleTranslation: () => void;
    toggleIsnad: () => void;
    resetSettings: () => void;
}

const DEFAULT_SETTINGS = {
    textSize: 3,
    arabicFont: 'Amiri' as ArabicFont,
    mode: 'light' as ReadingMode,
    uiVariant: 'classic' as UIVariant,
    showTranslation: true,
    showIsnad: false,
};

export const useReadingSettings = create<ReadingSettingsState>()(
    persist(
        (set) => ({
            ...DEFAULT_SETTINGS,

            setTextSize: (textSize) => set({ textSize }),
            setArabicFont: (arabicFont) => set({ arabicFont }),
            setMode: (mode) => set({ mode }),
            setUIVariant: (uiVariant) => set({ uiVariant }),
            toggleTranslation: () => set((state) => ({ showTranslation: !state.showTranslation })),
            toggleIsnad: () => set((state) => ({ showIsnad: !state.showIsnad })),
            resetSettings: () => set(DEFAULT_SETTINGS),
        }),
        {
            name: 'mumin_reading_settings',
        }
    )
);
