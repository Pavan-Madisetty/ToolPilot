import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeMode, STORAGE_KEYS } from '@/types';

interface ThemeStore {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'light',
      setTheme: (theme) => {
        set({ theme });
        document.documentElement.setAttribute('data-theme', theme);
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      toggleTheme: () => {
        const current = get().theme;
        const next: ThemeMode = current === 'light' ? 'dark' : 'light';
        get().setTheme(next);
      },
    }),
    {
      name: STORAGE_KEYS.THEME,
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.setAttribute('data-theme', state.theme);
          if (state.theme === 'dark') {
            document.documentElement.classList.add('dark');
          }
        }
      },
    }
  )
);
