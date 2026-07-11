import { useMemo } from 'react';
import { useThemeStore } from '@/stores/themeStore';

/**
 * Chart.js renders to <canvas> and cannot resolve CSS custom properties
 * (e.g. `var(--text-secondary)`). Passing those strings into chart options
 * silently falls back to transparent/default colors — most visibly, legend
 * and axis labels become invisible in dark mode.
 *
 * This hook reads the *computed* values of the design-system tokens off the
 * document root so charts can be styled with real hex/rgb strings, and it
 * recomputes whenever the theme changes.
 */
export interface ChartTheme {
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  border: string;
  borderSubtle: string;
  surface: string;
  elevated: string;
  primary: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  /** Ready-to-spread palette for multi-series datasets. */
  palette: string[];
}

function readToken(styles: CSSStyleDeclaration, name: string, fallback: string): string {
  const value = styles.getPropertyValue(name).trim();
  return value || fallback;
}

function computeChartTheme(_theme?: string): ChartTheme {
  // `_theme` is unused directly — it exists so callers can key memoization on
  // the active theme, forcing a recompute of the DOM-derived token values.
  void _theme;
  // Guard for non-DOM environments (tests/SSR).
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return {
      textPrimary: '#0f172a',
      textSecondary: '#64748b',
      textTertiary: '#94a3b8',
      border: '#e5e7eb',
      borderSubtle: '#f8fafc',
      surface: '#f8fafc',
      elevated: '#ffffff',
      primary: '#6366f1',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
      info: '#3b82f6',
      palette: ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#ec4899', '#8b5cf6', '#14b8a6'],
    };
  }

  const styles = getComputedStyle(document.documentElement);
  const primary = readToken(styles, '--primary', '#6366f1');
  const success = readToken(styles, '--success', '#10b981');
  const warning = readToken(styles, '--warning', '#f59e0b');
  const danger = readToken(styles, '--danger', '#ef4444');
  const info = readToken(styles, '--info', '#3b82f6');

  return {
    textPrimary: readToken(styles, '--text-primary', '#0f172a'),
    textSecondary: readToken(styles, '--text-secondary', '#64748b'),
    textTertiary: readToken(styles, '--text-tertiary', '#94a3b8'),
    border: readToken(styles, '--border-default', '#e5e7eb'),
    borderSubtle: readToken(styles, '--border-subtle', '#f8fafc'),
    surface: readToken(styles, '--bg-surface', '#f8fafc'),
    elevated: readToken(styles, '--bg-elevated', '#ffffff'),
    primary,
    success,
    warning,
    danger,
    info,
    palette: [primary, success, warning, danger, info, '#ec4899', '#8b5cf6', '#14b8a6'],
  };
}

export function useChartTheme(): ChartTheme {
  // The theme store applies the `data-theme`/`.dark` attributes to <html>
  // synchronously when `theme` changes, so recomputing keyed on `theme`
  // picks up the correct token values on the same render.
  const theme = useThemeStore((s) => s.theme);
  return useMemo(() => computeChartTheme(theme), [theme]);
}

export default useChartTheme;
