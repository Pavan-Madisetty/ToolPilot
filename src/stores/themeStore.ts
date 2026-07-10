import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeMode, DesignMode, STORAGE_KEYS } from '@/types';

interface ThemeStore {
  theme: ThemeMode;
  designMode: DesignMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setDesignMode: (designMode: DesignMode) => void;
  toggleDesignMode: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'light',
      designMode: 'default',
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
      setDesignMode: (designMode) => {
        set({ designMode });
        document.documentElement.setAttribute('data-design', designMode);
      },
      toggleDesignMode: () => {
        const current = get().designMode;
        const next: DesignMode = current === 'default' ? 'minimal' : 'default';
        get().setDesignMode(next);
      },
    }),
    {
      name: STORAGE_KEYS.THEME,
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Rehydrate Theme
          document.documentElement.setAttribute('data-theme', state.theme || 'light');
          if (state.theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }

          // Rehydrate Design Mode
          document.documentElement.setAttribute('data-design', state.designMode || 'default');
        }
      },
    }
  )
);
