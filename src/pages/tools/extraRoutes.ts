import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

// Route table for the additional client-side tools (see src/config/extraTools.ts).
// Each entry maps a URL path (no leading slash) to a lazily loaded page component.

export interface ExtraRoute {
  path: string;
  Component: LazyExoticComponent<ComponentType>;
}

const r = (path: string, loader: () => Promise<{ default: ComponentType }>): ExtraRoute => ({
  path,
  Component: lazy(loader),
});

export const EXTRA_ROUTES: ExtraRoute[] = [
  // Finance
  r('finance/lumpsum-calculator', () => import('./finance/LumpsumCalculator')),
  r('finance/swp-calculator', () => import('./finance/SwpCalculator')),
  r('finance/cagr-calculator', () => import('./finance/CagrCalculator')),
  // Developer
  r('developer/html-entity-encoder', () => import('./developer/HtmlEntityTool')),
  r('developer/json-csv-converter', () => import('./developer/JsonCsvConverter')),
  r('developer/chmod-calculator', () => import('./developer/ChmodCalculator')),
  r('developer/url-parser', () => import('./developer/UrlParser')),
  // Text
  r('text/text-sorter', () => import('./text/TextSorter')),
  r('text/find-replace', () => import('./text/FindReplace')),
  r('text/readability-checker', () => import('./text/ReadabilityChecker')),
  // Image
  r('image/image-to-base64', () => import('./image/ImageToBase64')),
  r('image/rotate-flip', () => import('./image/ImageRotateFlip')),
  r('image/image-filters', () => import('./image/ImageFilters')),
  // PDF
  r('pdf/merge', () => import('./pdf/PdfMerge')),
  r('pdf/split', () => import('./pdf/PdfSplit')),
  r('pdf/rotate', () => import('./pdf/PdfRotate')),
  // AI
  r('ai/text-summarizer', () => import('./ai/TextSummarizer')),
  r('ai/keyword-extractor', () => import('./ai/KeywordExtractor')),
  // Business
  r('business/markup-calculator', () => import('./business/MarkupCalculator')),
  r('business/email-signature', () => import('./business/EmailSignature')),
  r('business/meeting-cost', () => import('./business/MeetingCost')),
  // Productivity
  r('productivity/eisenhower-matrix', () => import('./productivity/EisenhowerMatrix')),
  r('productivity/random-picker', () => import('./productivity/RandomPicker')),
  r('productivity/hours-calculator', () => import('./productivity/HoursCalculator')),
  // Education
  r('education/quadratic-solver', () => import('./education/QuadraticSolver')),
  r('education/prime-factorization', () => import('./education/PrimeFactorization')),
  r('education/statistics-calculator', () => import('./education/StatisticsCalculator')),
  // Travel
  r('travel/speed-distance-time', () => import('./travel/SpeedDistanceTime')),
  r('travel/trip-budget', () => import('./travel/TripBudget')),
  // Health
  r('health/water-intake', () => import('./health/WaterIntake')),
  r('health/ideal-weight', () => import('./health/IdealWeight')),
  r('health/body-fat', () => import('./health/BodyFat')),
  r('health/heart-rate-zones', () => import('./health/HeartRateZones')),
  // Utilities
  r('utilities/dice-coin', () => import('./utilities/DiceCoin')),
  r('utilities/text-to-speech', () => import('./utilities/TextToSpeech')),
  r('utilities/device-info', () => import('./utilities/DeviceInfo')),
  // Conversion
  r('convert/area', () => import('./conversion/AreaConverter')),
  r('convert/volume', () => import('./conversion/VolumeConverter')),
  r('convert/speed', () => import('./conversion/SpeedConverter')),
  r('convert/time', () => import('./conversion/TimeConverter')),
  r('convert/number-base', () => import('./conversion/NumberBaseConverter')),
  r('convert/roman-numerals', () => import('./conversion/RomanNumeralConverter')),
];
