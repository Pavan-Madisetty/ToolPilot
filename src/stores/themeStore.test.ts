import { describe, it, expect, beforeEach } from 'vitest';
import { useThemeStore } from './themeStore';

describe('themeStore', () => {
  beforeEach(() => {
    // Reset Zustand state before each test
    useThemeStore.setState({ theme: 'light', designMode: 'default' });
  });

  it('should initialize with light theme and default design', () => {
    const state = useThemeStore.getState();
    expect(state.theme).toBe('light');
    expect(state.designMode).toBe('default');
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

  it('should allow setting design mode', () => {
    useThemeStore.getState().setDesignMode('minimal');
    const state = useThemeStore.getState();
    expect(state.designMode).toBe('minimal');
  });

  it('should toggle design mode', () => {
    useThemeStore.getState().toggleDesignMode();
    let state = useThemeStore.getState();
    expect(state.designMode).toBe('minimal');

    useThemeStore.getState().toggleDesignMode();
    state = useThemeStore.getState();
    expect(state.designMode).toBe('default');
  });
});
