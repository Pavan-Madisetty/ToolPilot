import type { ModuleConfig, ModuleKey } from '@/types';

// ============================================================
// Module Configuration Registry
// ============================================================

export const MODULES: ModuleConfig[] = [
  {
    key: 'finance',
    name: 'Finance',
    description: 'EMI calculators, investment tools, tax calculators and financial planners',
    icon: 'CurrencyRupeeIcon',
    color: 'emerald',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    slug: '/finance',
    toolCount: 35,
    isFeatured: true,
  },
  {
    key: 'developer',
    name: 'Developer',
    description: 'JSON formatters, encoders, decoders, regex testers and developer utilities',
    icon: 'CodeBracketIcon',
    color: 'violet',
    bgColor: 'bg-violet-50 dark:bg-violet-900/20',
    textColor: 'text-violet-600 dark:text-violet-400',
    slug: '/developer',
    toolCount: 32,
    isFeatured: true,
  },
  {
    key: 'pdf',
    name: 'PDF Tools',
    description: 'Merge, split, compress, rotate and convert PDF files instantly',
    icon: 'DocumentIcon',
    color: 'red',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    textColor: 'text-red-600 dark:text-red-400',
    slug: '/pdf',
    toolCount: 18,
    isFeatured: true,
  },
  {
    key: 'image',
    name: 'Image Tools',
    description: 'Resize, compress, convert and edit images directly in your browser',
    icon: 'PhotoIcon',
    color: 'amber',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    textColor: 'text-amber-600 dark:text-amber-400',
    slug: '/image',
    toolCount: 20,
    isFeatured: true,
  },
  {
    key: 'text',
    name: 'Text Tools',
    description: 'Word counters, case converters, text diff and text manipulation utilities',
    icon: 'DocumentTextIcon',
    color: 'cyan',
    bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
    textColor: 'text-cyan-600 dark:text-cyan-400',
    slug: '/text',
    toolCount: 18,
  },
  {
    key: 'ai',
    name: 'AI Writing',
    description: 'AI-powered prompt builder, email writer, resume builder and content generators',
    icon: 'SparklesIcon',
    color: 'pink',
    bgColor: 'bg-pink-50 dark:bg-pink-900/20',
    textColor: 'text-pink-600 dark:text-pink-400',
    slug: '/ai',
    toolCount: 15,
    isFeatured: true,
  },
  {
    key: 'business',
    name: 'Business',
    description: 'Invoice generators, ROI calculators, profit margin tools for businesses',
    icon: 'BriefcaseIcon',
    color: 'blue',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    textColor: 'text-blue-600 dark:text-blue-400',
    slug: '/business',
    toolCount: 12,
  },
  {
    key: 'productivity',
    name: 'Productivity',
    description: 'Pomodoro timer, kanban board, habit tracker, notes and daily planners',
    icon: 'ClockIcon',
    color: 'orange',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    textColor: 'text-orange-600 dark:text-orange-400',
    slug: '/productivity',
    toolCount: 15,
  },
  {
    key: 'education',
    name: 'Education',
    description: 'Scientific calculator, GPA calculator, unit converter and study tools',
    icon: 'AcademicCapIcon',
    color: 'lime',
    bgColor: 'bg-lime-50 dark:bg-lime-900/20',
    textColor: 'text-lime-600 dark:text-lime-400',
    slug: '/education',
    toolCount: 15,
  },
  {
    key: 'travel',
    name: 'Travel',
    description: 'Trip planner, fuel cost calculator, timezone converter and travel budget tools',
    icon: 'MapIcon',
    color: 'teal',
    bgColor: 'bg-teal-50 dark:bg-teal-900/20',
    textColor: 'text-teal-600 dark:text-teal-400',
    slug: '/travel',
    toolCount: 10,
  },
  {
    key: 'health',
    name: 'Health',
    description: 'BMI calculator, calorie counter, sleep calculator and health trackers',
    icon: 'HeartIcon',
    color: 'green',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    textColor: 'text-green-600 dark:text-green-400',
    slug: '/health',
    toolCount: 12,
  },
  {
    key: 'utilities',
    name: 'Utilities',
    description: 'Random generators, date calculators, color tools and everyday utilities',
    icon: 'WrenchScrewdriverIcon',
    color: 'indigo',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
    textColor: 'text-indigo-600 dark:text-indigo-400',
    slug: '/utilities',
    toolCount: 15,
  },
  {
    key: 'conversion',
    name: 'Converters',
    description: 'Length, weight, temperature, speed and all unit converters',
    icon: 'ArrowsRightLeftIcon',
    color: 'slate',
    bgColor: 'bg-slate-50 dark:bg-slate-900/20',
    textColor: 'text-slate-600 dark:text-slate-400',
    slug: '/convert',
    toolCount: 12,
  },
  {
    key: 'calculators',
    name: 'Calculators',
    description: 'Scientific, percentage, ratio, discount and math calculators',
    icon: 'CalculatorIcon',
    color: 'purple',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    textColor: 'text-purple-600 dark:text-purple-400',
    slug: '/calculators',
    toolCount: 15,
  },
];

export const MODULE_MAP: Record<ModuleKey, ModuleConfig> = MODULES.reduce(
  (acc, module) => {
    acc[module.key] = module;
    return acc;
  },
  {} as Record<ModuleKey, ModuleConfig>
);

export const FEATURED_MODULES = MODULES.filter((m) => m.isFeatured);

export const TOTAL_TOOLS = MODULES.reduce((sum, m) => sum + m.toolCount, 0);

export interface ColorMapping {
  accent: string;
  bg: string;
  border: string;
}

export const MODULE_COLOR_MAP: Record<string, ColorMapping> = {
  finance:      { accent: '#10b981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)'  },
  developer:    { accent: '#8b5cf6', bg: 'rgba(139,92,246,0.08)',  border: 'rgba(139,92,246,0.2)'  },
  pdf:          { accent: '#ef4444', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.2)'   },
  image:        { accent: '#f59e0b', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.2)'  },
  text:         { accent: '#06b6d4', bg: 'rgba(6,182,212,0.08)',   border: 'rgba(6,182,212,0.2)'   },
  ai:           { accent: '#ec4899', bg: 'rgba(236,72,153,0.08)',  border: 'rgba(236,72,153,0.2)'  },
  business:     { accent: '#3b82f6', bg: 'rgba(59,130,246,0.08)',  border: 'rgba(59,130,246,0.2)'  },
  productivity: { accent: '#f97316', bg: 'rgba(249,115,22,0.08)',  border: 'rgba(249,115,22,0.2)'  },
  education:    { accent: '#84cc16', bg: 'rgba(132,204,22,0.08)',  border: 'rgba(132,204,22,0.2)'  },
  travel:       { accent: '#14b8a6', bg: 'rgba(20,184,166,0.08)',  border: 'rgba(20,184,166,0.2)'  },
  health:       { accent: '#22c55e', bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.2)'   },
  utilities:    { accent: '#6366f1', bg: 'rgba(99,102,241,0.08)',  border: 'rgba(99,102,241,0.2)'  },
  conversion:   { accent: '#64748b', bg: 'rgba(100,116,139,0.08)', border: 'rgba(100,116,139,0.2)' },
  calculators:  { accent: '#a855f7', bg: 'rgba(168,85,247,0.08)',  border: 'rgba(168,85,247,0.2)'  },
};

export function getModuleColors(key: string): ColorMapping {
  return MODULE_COLOR_MAP[key] ?? { accent: '#3b82f6', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)' };
}

export function getModuleEmoji(key: string): string {
  const map: Record<string, string> = {
    finance: '💰', developer: '⚡', pdf: '📄', image: '🖼️', text: '✍️',
    ai: '🤖', business: '💼', productivity: '⏰', education: '🎓', travel: '✈️',
    health: '❤️', utilities: '🔧', conversion: '🔄', calculators: '🧮',
  };
  return map[key] ?? '🔧';
}
