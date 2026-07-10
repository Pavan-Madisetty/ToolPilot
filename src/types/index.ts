// ============================================================
// ToolPilot — Core Type Definitions
// ============================================================

// ─────────────────────────────────────────────
// Module Keys
// ─────────────────────────────────────────────
export type ModuleKey =
  | 'finance'
  | 'developer'
  | 'pdf'
  | 'image'
  | 'text'
  | 'ai'
  | 'business'
  | 'productivity'
  | 'education'
  | 'travel'
  | 'health'
  | 'utilities'
  | 'conversion';

// ─────────────────────────────────────────────
// Theme & Design
// ─────────────────────────────────────────────
export type ThemeMode = 'light' | 'dark';
export type DesignMode = 'default' | 'minimal';


// ─────────────────────────────────────────────
// Tool Registry
// ─────────────────────────────────────────────
export interface ToolConfig {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  module: ModuleKey;
  slug: string; // URL path e.g. "/finance/emi-calculator"
  icon: string; // Lucide icon name
  tags: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  isPopular?: boolean;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  relatedTools?: string[]; // Array of tool IDs
  faq?: { question: string; answer: string }[];
  howToSteps?: { name: string; text: string }[];
  benefits?: string[];
  features?: string[];
  tips?: string[];
  examples?: { input: string; output: string }[];
}

export interface ModuleConfig {
  key: ModuleKey;
  name: string;
  description: string;
  icon: string;
  color: string; // Tailwind color class
  bgColor: string;
  textColor: string;
  slug: string; // e.g. "/finance"
  toolCount: number;
  isFeatured?: boolean;
}

// ─────────────────────────────────────────────
// Search
// ─────────────────────────────────────────────
export interface SearchResult {
  tool: ToolConfig;
  score: number;
  matchedFields: string[];
}

export interface SearchState {
  query: string;
  results: SearchResult[];
  isOpen: boolean;
  isLoading: boolean;
}

// ─────────────────────────────────────────────
// Favorites & History
// ─────────────────────────────────────────────
export interface FavoriteItem {
  toolId: string;
  addedAt: number; // Unix timestamp
}

export interface HistoryItem {
  toolId: string;
  visitedAt: number;
  visitCount: number;
}

export interface ToolCalculationHistory<T = unknown> {
  id: string;
  toolId: string;
  inputs: T;
  result: unknown;
  createdAt: number;
  label?: string;
}

// ─────────────────────────────────────────────
// UI State
// ─────────────────────────────────────────────
export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// ─────────────────────────────────────────────
// Finance Module Types
// ─────────────────────────────────────────────
export interface EMIInputs {
  principal: number;
  annualRate: number;
  tenureMonths: number;
}

export interface EMIResult {
  monthlyEMI: number;
  totalAmount: number;
  totalInterest: number;
  principal: number;
  amortizationSchedule: AmortizationRow[];
}

export interface AmortizationRow {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface SIPInputs {
  monthlyAmount: number;
  annualRate: number;
  years: number;
}

export interface SIPResult {
  totalInvested: number;
  estimatedReturns: number;
  totalValue: number;
  yearlyBreakdown: SIPYearlyRow[];
}

export interface SIPYearlyRow {
  year: number;
  invested: number;
  returns: number;
  totalValue: number;
}

// ─────────────────────────────────────────────
// Developer Module Types
// ─────────────────────────────────────────────
export interface JsonFormatterState {
  input: string;
  output: string;
  error: string | null;
  indentation: 2 | 4 | 'tab';
  sortKeys: boolean;
}

// ─────────────────────────────────────────────
// LocalStorage Keys
// ─────────────────────────────────────────────
export const STORAGE_KEYS = {
  THEME: 'toolpilot_theme',
  DESIGN: 'toolpilot_design',
  FAVORITES: 'toolpilot_favorites',
  HISTORY: 'toolpilot_history',
  RECENTLY_USED: 'toolpilot_recently_used',
  TOOL_HISTORY_PREFIX: 'toolpilot_tool_history_',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
