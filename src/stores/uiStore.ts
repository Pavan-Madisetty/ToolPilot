import { create } from 'zustand';
import type { SearchResult } from '@/types';
import { TOOLS } from '@/config/tools';

// ─────────────────────────────────────────────
// Search Engine (client-side fuzzy search)
// ─────────────────────────────────────────────
function searchTools(query: string): SearchResult[] {
  if (!query || query.length < 2) return [];

  const q = query.toLowerCase().trim();

  return TOOLS.map((tool) => {
    let score = 0;
    const matchedFields: string[] = [];

    // Name match (highest weight)
    if (tool.name.toLowerCase().includes(q)) {
      score += tool.name.toLowerCase().startsWith(q) ? 100 : 60;
      matchedFields.push('name');
    }

    // Tags match
    if (tool.tags.some((tag) => tag.includes(q))) {
      score += 40;
      matchedFields.push('tags');
    }

    // Description match
    if (tool.description.toLowerCase().includes(q)) {
      score += 30;
      matchedFields.push('description');
    }

    // Keywords match
    if (tool.keywords.some((kw) => kw.includes(q))) {
      score += 20;
      matchedFields.push('keywords');
    }

    // Boost popular and featured tools
    if (tool.isPopular) score += 10;
    if (tool.isFeatured) score += 5;

    return { tool, score, matchedFields };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12); // Max 12 results
}

// ─────────────────────────────────────────────
// Search Store
// ─────────────────────────────────────────────
interface SearchStore {
  query: string;
  results: SearchResult[];
  isOpen: boolean;
  setQuery: (query: string) => void;
  setIsOpen: (open: boolean) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchStore>()((set) => ({
  query: '',
  results: [],
  isOpen: false,
  setQuery: (query) => {
    const results = searchTools(query);
    set({ query, results, isOpen: true });
  },
  setIsOpen: (isOpen) => set({ isOpen }),
  clearSearch: () => set({ query: '', results: [], isOpen: false }),
}));

// ─────────────────────────────────────────────
// UI Store (toasts, modals, sidebar)
// ─────────────────────────────────────────────
import type { ToastMessage } from '@/types';

interface UIStore {
  toasts: ToastMessage[];
  isSidebarOpen: boolean;
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useUIStore = create<UIStore>()((set) => ({
  toasts: [],
  isSidebarOpen: false,
  addToast: (toast) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const newToast: ToastMessage = { ...toast, id };
    set((state) => ({ toasts: [...state.toasts, newToast] }));

    // Auto remove after duration
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, toast.duration ?? 4000);
  },
  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
}));
