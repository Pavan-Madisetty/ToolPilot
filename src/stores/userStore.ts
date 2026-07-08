import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FavoriteItem, HistoryItem } from '@/types';
import { STORAGE_KEYS } from '@/types';

// ─────────────────────────────────────────────
// Favorites Store
// ─────────────────────────────────────────────
interface FavoritesStore {
  favorites: FavoriteItem[];
  addFavorite: (toolId: string) => void;
  removeFavorite: (toolId: string) => void;
  isFavorite: (toolId: string) => boolean;
  toggleFavorite: (toolId: string) => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (toolId) => {
        const existing = get().favorites.find((f) => f.toolId === toolId);
        if (!existing) {
          set((state) => ({
            favorites: [...state.favorites, { toolId, addedAt: Date.now() }],
          }));
        }
      },
      removeFavorite: (toolId) => {
        set((state) => ({
          favorites: state.favorites.filter((f) => f.toolId !== toolId),
        }));
      },
      isFavorite: (toolId) => {
        return get().favorites.some((f) => f.toolId === toolId);
      },
      toggleFavorite: (toolId) => {
        if (get().isFavorite(toolId)) {
          get().removeFavorite(toolId);
        } else {
          get().addFavorite(toolId);
        }
      },
    }),
    {
      name: STORAGE_KEYS.FAVORITES,
    }
  )
);

// ─────────────────────────────────────────────
// Recently Used / History Store
// ─────────────────────────────────────────────
const MAX_RECENT = 20;

interface HistoryStore {
  history: HistoryItem[];
  recordVisit: (toolId: string) => void;
  clearHistory: () => void;
  getRecentTools: (limit?: number) => HistoryItem[];
}

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set, get) => ({
      history: [],
      recordVisit: (toolId) => {
        set((state) => {
          const existing = state.history.find((h) => h.toolId === toolId);
          if (existing) {
            return {
              history: state.history
                .map((h) =>
                  h.toolId === toolId
                    ? { ...h, visitedAt: Date.now(), visitCount: h.visitCount + 1 }
                    : h
                )
                .sort((a, b) => b.visitedAt - a.visitedAt),
            };
          }
          const updated = [
            { toolId, visitedAt: Date.now(), visitCount: 1 },
            ...state.history,
          ].slice(0, MAX_RECENT);
          return { history: updated };
        });
      },
      clearHistory: () => set({ history: [] }),
      getRecentTools: (limit = 10) => {
        return get()
          .history.sort((a, b) => b.visitedAt - a.visitedAt)
          .slice(0, limit);
      },
    }),
    {
      name: STORAGE_KEYS.RECENTLY_USED,
    }
  )
);
