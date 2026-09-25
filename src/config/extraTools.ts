import type { ModuleKey, ToolConfig } from '@/types';

// ============================================================
// Additional client-side tools.
// Every tool listed here runs 100% in the browser — no backend,
// no API keys, no uploads. Components are wired up in
// `src/pages/tools/extraRoutes.ts`.
// ============================================================

interface Def {
  id: string;
  name: string;
  module: ModuleKey;
  /** URL path without the leading slash, e.g. "finance/lumpsum-calculator". */
  path: string;
  icon: string;
  description: string;
  tags: string[];
  related: string[];
  popular?: boolean;
  isNew?: boolean;
}

const DEFS: Def[] = [
  // ── FINANCE ────────────────────────────────────────────────
  { id: 'lumpsum-calculator', name: 'Lumpsum Calculator', module: 'finance', path: 'finance/lumpsum-calculator', icon: 'Coins', description: 'Estimate the future value of a one-time investment with yearly growth chart', tags: ['lumpsum', 'mutual fund', 'one time investment', 'returns'], related: ['sip-calculator', 'cagr-calculator', 'compound-interest-calculator', 'mutual-fund-calculator'], popular: true },
  { id: 'swp-calculator', name: 'SWP Calculator', module: 'finance', path: 'finance/swp-calculator', icon: 'Wallet', description: 'Plan a Systematic Withdrawal Plan — see how long your corpus lasts', tags: ['swp', 'withdrawal', 'retirement income', 'corpus'], related: ['sip-calculator', 'retirement-calculator', 'lumpsum-calculator'] },
  { id: 'cagr-calculator', name: 'CAGR Calculator', module: 'finance', path: 'finance/cagr-calculator', icon: 'TrendingUp', description: 'Compute compound annual growth rate between two values', tags: ['cagr', 'growth rate', 'annualised return', 'investment'], related: ['lumpsum-calculator', 'roi-calculator', 'inflation-calculator'] },

  // ── DEVELOPER ──────────────────────────────────────────────
  { id: 'html-entity-encoder', name: 'HTML Entity Encoder/Decoder', module: 'developer', path: 'developer/html-entity-encoder', icon: 'Code', description: 'Escape or unescape HTML entities safely in your browser', tags: ['html', 'entities', 'escape', 'unescape', 'encode'], related: ['url-encoder', 'base64', 'markdown-preview'] },
  { id: 'json-csv-converter', name: 'JSON ⇄ CSV Converter', module: 'developer', path: 'developer/json-csv-converter', icon: 'FileSpreadsheet', description: 'Convert JSON arrays to CSV and CSV back to JSON, with nested-key flattening', tags: ['json', 'csv', 'converter', 'spreadsheet'], related: ['json-formatter', 'diff-checker', 'sql-formatter'], popular: true },
  { id: 'chmod-calculator', name: 'Chmod Calculator', module: 'developer', path: 'developer/chmod-calculator', icon: 'Lock', description: 'Build Unix file permissions visually — octal, symbolic and command output', tags: ['chmod', 'unix', 'linux', 'permissions', 'octal'], related: ['cron-builder', 'hash-generator', 'password-generator'] },
  { id: 'url-parser', name: 'URL Parser', module: 'developer', path: 'developer/url-parser', icon: 'Link', description: 'Break a URL into protocol, host, path, query params and hash', tags: ['url', 'parser', 'query string', 'params'], related: ['url-encoder', 'html-entity-encoder', 'base64'] },

  // ── TEXT ───────────────────────────────────────────────────
  { id: 'text-sorter', name: 'Sort & Dedupe Lines', module: 'text', path: 'text/text-sorter', icon: 'ArrowDownAZ', description: 'Sort, reverse, shuffle and remove duplicate lines instantly', tags: ['sort lines', 'remove duplicates', 'dedupe', 'alphabetical'], related: ['remove-spaces', 'case-converter', 'text-diff'], popular: true },
  { id: 'find-replace', name: 'Find & Replace', module: 'text', path: 'text/find-replace', icon: 'Replace', description: 'Bulk find and replace with regex, case and whole-word options', tags: ['find replace', 'regex', 'search', 'bulk edit'], related: ['regex-tester', 'text-sorter', 'case-converter'] },
  { id: 'readability-checker', name: 'Readability Checker', module: 'text', path: 'text/readability-checker', icon: 'BookOpen', description: 'Flesch reading ease, grade level and Gunning Fog score for any text', tags: ['readability', 'flesch', 'grade level', 'writing'], related: ['word-counter', 'keyword-extractor', 'text-summarizer'] },

  // ── IMAGE ──────────────────────────────────────────────────
  { id: 'image-to-base64', name: 'Image to Base64', module: 'image', path: 'image/image-to-base64', icon: 'FileCode', description: 'Turn an image into a Base64 data URI, CSS or HTML snippet', tags: ['base64', 'data uri', 'image encode'], related: ['base64', 'image-compress', 'favicon-generator'] },
  { id: 'image-flip-rotate', name: 'Rotate & Flip Image', module: 'image', path: 'image/rotate-flip', icon: 'RotateCw', description: 'Rotate by 90° steps or any angle and flip horizontally or vertically', tags: ['rotate image', 'flip image', 'mirror'], related: ['image-crop', 'image-resize', 'image-filters'] },
  { id: 'image-filters', name: 'Image Filters', module: 'image', path: 'image/image-filters', icon: 'SlidersHorizontal', description: 'Brightness, contrast, grayscale, sepia, blur and more — live preview', tags: ['image filter', 'grayscale', 'sepia', 'brightness', 'contrast'], related: ['image-compress', 'image-flip-rotate', 'color-palette'], popular: true },

  // ── PDF ────────────────────────────────────────────────────
  { id: 'pdf-merge', name: 'Merge PDF', module: 'pdf', path: 'pdf/merge', icon: 'Files', description: 'Combine multiple PDF files into one — reorder before merging', tags: ['merge pdf', 'combine pdf', 'join pdf'], related: ['pdf-split', 'pdf-rotate', 'image-to-pdf'], popular: true },
  { id: 'pdf-split', name: 'Split & Extract PDF Pages', module: 'pdf', path: 'pdf/split', icon: 'Scissors', description: 'Extract page ranges or split a PDF into separate files', tags: ['split pdf', 'extract pages', 'pdf pages'], related: ['pdf-merge', 'pdf-rotate', 'pdf-metadata'], popular: true },
  { id: 'pdf-rotate', name: 'Rotate PDF Pages', module: 'pdf', path: 'pdf/rotate', icon: 'RotateCw', description: 'Rotate all or selected PDF pages by 90°, 180° or 270°', tags: ['rotate pdf', 'pdf orientation'], related: ['pdf-merge', 'pdf-split', 'pdf-metadata'] },

  // ── AI ─────────────────────────────────────────────────────
  { id: 'text-summarizer', name: 'Text Summarizer', module: 'ai', path: 'ai/text-summarizer', icon: 'FileText', description: 'Offline extractive summariser — keeps the most important sentences', tags: ['summarize', 'summary', 'tl;dr', 'extractive'], related: ['keyword-extractor', 'readability-checker', 'word-counter'], isNew: true },
  { id: 'keyword-extractor', name: 'Keyword Extractor', module: 'ai', path: 'ai/keyword-extractor', icon: 'Tags', description: 'Find the most frequent keywords and density in any text — SEO friendly', tags: ['keywords', 'seo', 'keyword density', 'word frequency'], related: ['text-summarizer', 'readability-checker', 'word-counter'], isNew: true },

  // ── BUSINESS ───────────────────────────────────────────────
  { id: 'markup-calculator', name: 'Markup Calculator', module: 'business', path: 'business/markup-calculator', icon: 'Percent', description: 'Convert between cost, price, markup % and margin %', tags: ['markup', 'margin', 'pricing', 'selling price'], related: ['profit-margin', 'break-even', 'discount-calculator'], popular: true },
  { id: 'email-signature', name: 'Email Signature Generator', module: 'business', path: 'business/email-signature', icon: 'PenLine', description: 'Design a clean HTML email signature you can paste into any mail client', tags: ['email signature', 'html signature', 'business card'], related: ['email-writer', 'invoice-generator', 'quotation-generator'] },
  { id: 'meeting-cost', name: 'Meeting Cost Calculator', module: 'business', path: 'business/meeting-cost', icon: 'Users', description: 'See what a meeting really costs, live, based on attendee salaries', tags: ['meeting cost', 'productivity', 'salary', 'time cost'], related: ['roi-calculator', 'profit-margin', 'stopwatch'] },

  // ── PRODUCTIVITY ───────────────────────────────────────────
  { id: 'eisenhower-matrix', name: 'Eisenhower Matrix', module: 'productivity', path: 'productivity/eisenhower-matrix', icon: 'LayoutGrid', description: 'Prioritise tasks by urgency and importance — saved locally in your browser', tags: ['eisenhower', 'priority', 'urgent important', 'tasks'], related: ['todo', 'checklist', 'pomodoro'], popular: true },
  { id: 'random-picker', name: 'Random Picker Wheel', module: 'productivity', path: 'productivity/random-picker', icon: 'Dices', description: 'Spin a wheel to pick a random name, option or winner', tags: ['random picker', 'wheel', 'raffle', 'decision'], related: ['random-number', 'dice-coin', 'todo'] },
  { id: 'hours-calculator', name: 'Work Hours Calculator', module: 'productivity', path: 'productivity/hours-calculator', icon: 'Timer', description: 'Total hours worked from start/end times with breaks — timesheet ready', tags: ['timesheet', 'work hours', 'time card', 'overtime'], related: ['date-difference', 'salary-calculator', 'stopwatch'] },

  // ── EDUCATION ──────────────────────────────────────────────
  { id: 'quadratic-solver', name: 'Quadratic Equation Solver', module: 'education', path: 'education/quadratic-solver', icon: 'Sigma', description: 'Solve ax² + bx + c = 0 with discriminant, roots and vertex', tags: ['quadratic', 'equation', 'roots', 'discriminant'], related: ['scientific-calculator', 'percentage-calculator', 'statistics-calculator'] },
  { id: 'prime-factorization', name: 'Prime, GCD & LCM Calculator', module: 'education', path: 'education/prime-factorization', icon: 'Hash', description: 'Prime factorisation, primality test, GCD and LCM of numbers', tags: ['prime', 'factors', 'gcd', 'lcm', 'hcf'], related: ['scientific-calculator', 'quadratic-solver', 'statistics-calculator'] },
  { id: 'statistics-calculator', name: 'Statistics Calculator', module: 'education', path: 'education/statistics-calculator', icon: 'BarChart2', description: 'Mean, median, mode, standard deviation, quartiles and more for a dataset', tags: ['statistics', 'mean', 'median', 'standard deviation'], related: ['scientific-calculator', 'percentage-calculator', 'cgpa-calculator'], popular: true },

  // ── TRAVEL ─────────────────────────────────────────────────
  { id: 'speed-distance-time', name: 'Speed, Distance & Time', module: 'travel', path: 'travel/speed-distance-time', icon: 'Gauge', description: 'Solve for speed, distance or travel time — with ETA', tags: ['speed', 'distance', 'time', 'eta', 'travel time'], related: ['fuel-cost', 'timezone-converter', 'trip-budget'] },
  { id: 'trip-budget', name: 'Trip Budget Planner', module: 'travel', path: 'travel/trip-budget', icon: 'Plane', description: 'Plan travel spending by category, per person and per day', tags: ['trip budget', 'travel cost', 'holiday planner'], related: ['fuel-cost', 'bill-splitter', 'currency-converter'] },

  // ── HEALTH ─────────────────────────────────────────────────
  { id: 'water-intake', name: 'Water Intake Calculator', module: 'health', path: 'health/water-intake', icon: 'Droplets', description: 'Daily hydration target based on weight, activity and climate', tags: ['water intake', 'hydration', 'daily water'], related: ['bmi-calculator', 'calorie-calculator', 'heart-rate-zones'] },
  { id: 'ideal-weight', name: 'Ideal Weight Calculator', module: 'health', path: 'health/ideal-weight', icon: 'Scale', description: 'Ideal body weight (Devine) and healthy BMI range for your height', tags: ['ideal weight', 'healthy weight', 'devine'], related: ['bmi-calculator', 'bmr-calculator', 'body-fat-calculator'] },
  { id: 'body-fat-calculator', name: 'Body Fat Calculator', module: 'health', path: 'health/body-fat', icon: 'Percent', description: 'Estimate body fat percentage with the U.S. Navy method', tags: ['body fat', 'navy method', 'body composition'], related: ['bmi-calculator', 'ideal-weight', 'calorie-calculator'] },
  { id: 'heart-rate-zones', name: 'Heart Rate Zones', module: 'health', path: 'health/heart-rate-zones', icon: 'HeartPulse', description: 'Training zones from age and resting heart rate (Karvonen)', tags: ['heart rate', 'training zones', 'karvonen', 'max heart rate'], related: ['calorie-calculator', 'water-intake', 'bmr-calculator'] },

  // ── UTILITIES ──────────────────────────────────────────────
  { id: 'dice-coin', name: 'Dice Roller & Coin Flip', module: 'utilities', path: 'utilities/dice-coin', icon: 'Dice5', description: 'Roll up to 10 dice of any size or flip coins — cryptographically random', tags: ['dice', 'coin flip', 'random', 'd20'], related: ['random-number', 'random-picker', 'password-generator'] },
  { id: 'text-to-speech', name: 'Text to Speech', module: 'utilities', path: 'utilities/text-to-speech', icon: 'Volume2', description: 'Read text aloud using your device’s built-in voices — nothing leaves your browser', tags: ['text to speech', 'tts', 'read aloud', 'voice'], related: ['word-counter', 'notes', 'stopwatch'] },
  { id: 'device-info', name: 'Screen & Browser Info', module: 'utilities', path: 'utilities/device-info', icon: 'Monitor', description: 'See your screen resolution, viewport, pixel ratio, language and browser details', tags: ['screen resolution', 'browser info', 'viewport', 'user agent'], related: ['color-converter', 'timestamp-converter', 'random-number'] },

  // ── CONVERSION ─────────────────────────────────────────────
  { id: 'area-converter', name: 'Area Converter', module: 'conversion', path: 'convert/area', icon: 'Square', description: 'Convert between m², hectares, acres, sq ft, sq yd and more', tags: ['area', 'acre', 'hectare', 'square feet'], related: ['length-converter', 'volume-converter', 'unit-converter'] },
  { id: 'volume-converter', name: 'Volume Converter', module: 'conversion', path: 'convert/volume', icon: 'FlaskConical', description: 'Convert litres, millilitres, gallons, cups, tablespoons and cubic units', tags: ['volume', 'litre', 'gallon', 'cup'], related: ['weight-converter', 'area-converter', 'unit-converter'] },
  { id: 'speed-converter', name: 'Speed Converter', module: 'conversion', path: 'convert/speed', icon: 'Gauge', description: 'Convert km/h, mph, m/s, knots and Mach', tags: ['speed', 'kmh', 'mph', 'knots'], related: ['length-converter', 'time-converter', 'speed-distance-time'] },
  { id: 'time-converter', name: 'Time Converter', module: 'conversion', path: 'convert/time', icon: 'Clock', description: 'Convert seconds, minutes, hours, days, weeks, months and years', tags: ['time', 'seconds', 'hours', 'days'], related: ['date-difference', 'speed-converter', 'age-calculator'] },
  { id: 'number-base-converter', name: 'Number Base Converter', module: 'conversion', path: 'convert/number-base', icon: 'Binary', description: 'Binary, octal, decimal, hex and any base up to 36 — arbitrary precision', tags: ['binary', 'hex', 'octal', 'base converter'], related: ['base64', 'roman-numeral-converter', 'color-converter'], popular: true },
  { id: 'roman-numeral-converter', name: 'Roman Numeral Converter', module: 'conversion', path: 'convert/roman-numerals', icon: 'Landmark', description: 'Convert numbers to Roman numerals and back (1–3999)', tags: ['roman numerals', 'number converter'], related: ['number-base-converter', 'numbers-to-words', 'date-converter'] },
];

const SHORT_TITLE_LIMIT = 60;

function toConfig(d: Def): ToolConfig {
  const metaTitle = `${d.name} - Free Online Tool | Toolskyt`;
  return {
    id: d.id,
    name: d.name,
    description: d.description,
    longDescription: `${d.description}. Runs entirely in your browser — no sign-up, no uploads and no server, so your data stays private.`,
    module: d.module,
    slug: `/${d.path}`,
    icon: d.icon,
    tags: d.tags,
    isPopular: d.popular,
    isNew: d.isNew ?? true,
    metaTitle: metaTitle.length > SHORT_TITLE_LIMIT + 20 ? `${d.name} | Toolskyt` : metaTitle,
    metaDescription: `${d.description}. Free, private and works offline in your browser.`,
    keywords: [d.name.toLowerCase(), ...d.tags],
    relatedTools: d.related,
  };
}

export const EXTRA_TOOLS: ToolConfig[] = DEFS.map(toConfig);
export const EXTRA_TOOL_IDS: string[] = DEFS.map((d) => d.id);
