import { describe, it, expect, beforeEach } from 'vitest';
import { useThemeStore } from './themeStore';

describe('themeStore', () => {
  beforeEach(() => {
    // Reset Zustand state before each test
    useThemeStore.setState({ theme: 'light' });
  });

  it('should allow setting theme', () => {
    useThemeStore.getState().setTheme('dark');
    const state = useThemeStore.getState();
    expect(state.theme).toBe('dark');
  });

  it('should toggle theme', () => {
    useThemeStore.getState().toggleTheme();
    let state = useThemeStore.getState();
    expect(state.theme).toBe('dark');

    useThemeStore.getState().toggleTheme();
    state = useThemeStore.getState();
    expect(state.theme).toBe('light');
  });

});
