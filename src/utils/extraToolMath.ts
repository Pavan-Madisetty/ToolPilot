// ============================================================
// Pure, dependency-free logic used by the additional client-side tools.
// Everything here runs in the browser — no network, no backend.
// ============================================================

// ── Finance ──────────────────────────────────────────────────

/** Future value of a one-time investment compounded annually. */
export function lumpsumFutureValue(principal: number, annualRatePct: number, years: number): number {
  return principal * Math.pow(1 + annualRatePct / 100, years);
}

export interface SwpRow {
  month: number;
  opening: number;
  interest: number;
  withdrawal: number;
  closing: number;
}

/**
 * Systematic Withdrawal Plan simulation (monthly).
 * Returns the schedule and how many months the corpus lasts (capped at `months`).
 */
export function swpSchedule(
  corpus: number,
  monthlyWithdrawal: number,
  annualRatePct: number,
  months: number
): { rows: SwpRow[]; monthsLasted: number; finalValue: number; totalWithdrawn: number } {
  const r = annualRatePct / 100 / 12;
  const rows: SwpRow[] = [];
  let balance = corpus;
  let totalWithdrawn = 0;
  let monthsLasted = 0;
  for (let m = 1; m <= months; m++) {
    if (balance <= 0) break;
    const interest = balance * r;
    const withdrawal = Math.min(monthlyWithdrawal, balance + interest);
    const closing = balance + interest - withdrawal;
    rows.push({ month: m, opening: balance, interest, withdrawal, closing: Math.max(0, closing) });
    totalWithdrawn += withdrawal;
    balance = Math.max(0, closing);
    monthsLasted = m;
    if (balance <= 0.005) {
      balance = 0;
      break;
    }
  }
  return { rows, monthsLasted, finalValue: balance, totalWithdrawn };
}

/** Compound annual growth rate in %. Returns NaN for invalid input. */
export function cagr(begin: number, end: number, years: number): number {
  if (begin <= 0 || end <= 0 || years <= 0) return NaN;
  return (Math.pow(end / begin, 1 / years) - 1) * 100;
}

// ── Education / statistics ───────────────────────────────────

export interface QuadraticResult {
  discriminant: number;
  kind: 'two-real' | 'one-real' | 'complex' | 'linear' | 'invalid';
  roots: string[];
  vertex?: [number, number];
}

const fmt = (n: number) => String(parseFloat(n.toPrecision(10)));

export function solveQuadratic(a: number, b: number, c: number): QuadraticResult {
  if (![a, b, c].every(Number.isFinite)) return { discriminant: NaN, kind: 'invalid', roots: [] };
  if (a === 0) {
    if (b === 0) return { discriminant: NaN, kind: 'invalid', roots: [] };
    return { discriminant: NaN, kind: 'linear', roots: [fmt(-c / b)] };
  }
  const d = b * b - 4 * a * c;
  const vertex: [number, number] = [-b / (2 * a), c - (b * b) / (4 * a)];
  if (d > 0) {
    const s = Math.sqrt(d);
    return {
      discriminant: d,
      kind: 'two-real',
      roots: [fmt((-b + s) / (2 * a)), fmt((-b - s) / (2 * a))],
      vertex,
    };
  }
  if (d === 0) return { discriminant: 0, kind: 'one-real', roots: [fmt(-b / (2 * a))], vertex };
  const re = -b / (2 * a);
  const im = Math.sqrt(-d) / (2 * Math.abs(a));
  return {
    discriminant: d,
    kind: 'complex',
    roots: [`${fmt(re)} + ${fmt(im)}i`, `${fmt(re)} − ${fmt(im)}i`],
    vertex,
  };
}

/** Prime factorisation as [prime, exponent] pairs. Works for integers up to 2^53. */
export function primeFactors(n: number): [number, number][] {
  if (!Number.isSafeInteger(n) || n < 2) return [];
  const out: [number, number][] = [];
  let x = n;
  for (let p = 2; p * p <= x; p += p === 2 ? 1 : 2) {
    let e = 0;
    while (x % p === 0) {
      x /= p;
      e++;
    }
    if (e) out.push([p, e]);
  }
  if (x > 1) out.push([x, 1]);
  return out;
}

export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

export function lcm(a: number, b: number): number {
  return a === 0 || b === 0 ? 0 : Math.abs(a * b) / gcd(a, b);
}

export function isPrime(n: number): boolean {
  return Number.isSafeInteger(n) && n >= 2 && primeFactors(n).length === 1 && primeFactors(n)[0][1] === 1;
}

export interface Stats {
  count: number;
  sum: number;
  mean: number;
  median: number;
  modes: number[];
  min: number;
  max: number;
  range: number;
  variancePop: number;
  varianceSample: number;
  sdPop: number;
  sdSample: number;
  q1: number;
  q3: number;
}

function quantile(sorted: number[], q: number): number {
  const pos = (sorted.length - 1) * q;
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo);
}

export function describe(values: number[]): Stats | null {
  const xs = values.filter(Number.isFinite);
  if (xs.length === 0) return null;
  const sorted = [...xs].sort((a, b) => a - b);
  const n = sorted.length;
  const sum = sorted.reduce((s, v) => s + v, 0);
  const mean = sum / n;
  const ss = sorted.reduce((s, v) => s + (v - mean) ** 2, 0);
  const freq = new Map<number, number>();
  for (const v of sorted) freq.set(v, (freq.get(v) ?? 0) + 1);
  const maxF = Math.max(...freq.values());
  const modes = maxF > 1 ? [...freq.entries()].filter(([, f]) => f === maxF).map(([v]) => v) : [];
  return {
    count: n,
    sum,
    mean,
    median: quantile(sorted, 0.5),
    modes,
    min: sorted[0],
    max: sorted[n - 1],
    range: sorted[n - 1] - sorted[0],
    variancePop: ss / n,
    varianceSample: n > 1 ? ss / (n - 1) : NaN,
    sdPop: Math.sqrt(ss / n),
    sdSample: n > 1 ? Math.sqrt(ss / (n - 1)) : NaN,
    q1: quantile(sorted, 0.25),
    q3: quantile(sorted, 0.75),
  };
}

// ── Health ───────────────────────────────────────────────────

/** Devine formula ideal body weight in kg. */
export function idealWeightDevine(heightCm: number, sex: 'male' | 'female'): number {
  const inches = heightCm / 2.54;
  const over = Math.max(0, inches - 60);
  return (sex === 'male' ? 50 : 45.5) + 2.3 * over;
}

/** Healthy BMI (18.5–24.9) weight range in kg for a given height. */
export function healthyWeightRange(heightCm: number): [number, number] {
  const m = heightCm / 100;
  return [18.5 * m * m, 24.9 * m * m];
}

/** US Navy body-fat estimate. Inputs in cm. Returns % or NaN when inputs are impossible. */
export function navyBodyFat(
  sex: 'male' | 'female',
  heightCm: number,
  neckCm: number,
  waistCm: number,
  hipCm = 0
): number {
  if (sex === 'male') {
    if (waistCm - neckCm <= 0) return NaN;
    return 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450;
  }
  if (waistCm + hipCm - neckCm <= 0) return NaN;
  return (
    495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.221 * Math.log10(heightCm)) - 450
  );
}

/** Daily water intake guideline in litres (≈ 35 ml/kg + activity and climate adjustments). */
export function waterIntakeLitres(weightKg: number, activityMinutes: number, hot: boolean): number {
  let ml = weightKg * 35;
  ml += (activityMinutes / 30) * 350;
  if (hot) ml += 500;
  return ml / 1000;
}

/** Karvonen heart-rate zones. */
export function heartRateZones(age: number, restingHr: number) {
  const max = 220 - age;
  const reserve = max - restingHr;
  const zone = (lo: number, hi: number) => ({
    min: Math.round(restingHr + reserve * lo),
    max: Math.round(restingHr + reserve * hi),
  });
  return {
    max,
    zones: [
      { name: 'Zone 1 · Very light', pct: '50–60%', ...zone(0.5, 0.6) },
      { name: 'Zone 2 · Fat burn / endurance', pct: '60–70%', ...zone(0.6, 0.7) },
      { name: 'Zone 3 · Aerobic', pct: '70–80%', ...zone(0.7, 0.8) },
      { name: 'Zone 4 · Threshold', pct: '80–90%', ...zone(0.8, 0.9) },
      { name: 'Zone 5 · Maximum', pct: '90–100%', ...zone(0.9, 1) },
    ],
  };
}

// ── Conversion ───────────────────────────────────────────────

const ROMAN: [number, string][] = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
  [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

export function toRoman(n: number): string {
  if (!Number.isInteger(n) || n < 1 || n > 3999) return '';
  let out = '';
  let x = n;
  for (const [v, s] of ROMAN) {
    while (x >= v) {
      out += s;
      x -= v;
    }
  }
  return out;
}

export function fromRoman(input: string): number {
  const s = input.trim().toUpperCase();
  if (!/^[MDCLXVI]+$/.test(s)) return NaN;
  let total = 0;
  let rest = s;
  for (const [v, sym] of ROMAN) {
    while (rest.startsWith(sym)) {
      total += v;
      rest = rest.slice(sym.length);
    }
  }
  // Reject non-canonical forms such as "IIII" or "VX".
  return rest === '' && toRoman(total) === s ? total : NaN;
}

const DIGITS = '0123456789abcdefghijklmnopqrstuvwxyz';

/** Convert a numeric string between bases 2–36 using BigInt (no precision loss). */
export function convertBase(value: string, from: number, to: number): string {
  const v = value.trim().toLowerCase().replace(/[\s_]/g, '');
  if (!v) return '';
  const neg = v.startsWith('-');
  const body = neg ? v.slice(1) : v;
  if (!body) return '';
  let acc = 0n;
  const bf = BigInt(from);
  for (const ch of body) {
    const d = DIGITS.indexOf(ch);
    if (d < 0 || d >= from) return '';
    acc = acc * bf + BigInt(d);
  }
  if (acc === 0n) return '0';
  const bt = BigInt(to);
  let out = '';
  while (acc > 0n) {
    out = DIGITS[Number(acc % bt)] + out;
    acc /= bt;
  }
  return (neg ? '-' : '') + out;
}

// ── Text analysis ────────────────────────────────────────────

export function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!w) return 0;
  if (w.length <= 3) return 1;
  const stripped = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
  const groups = stripped.match(/[aeiouy]{1,2}/g);
  return Math.max(1, groups ? groups.length : 1);
}

export function readability(text: string) {
  const words = text.match(/[A-Za-z][A-Za-z'’-]*/g) ?? [];
  const sentences = (text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? []).filter((s) => /\w/.test(s));
  const wc = words.length;
  const sc = Math.max(1, sentences.length);
  const syll = words.reduce((s, w) => s + countSyllables(w), 0);
  if (wc === 0) return null;
  const flesch = 206.835 - 1.015 * (wc / sc) - 84.6 * (syll / wc);
  const grade = 0.39 * (wc / sc) + 11.8 * (syll / wc) - 15.59;
  const complex = words.filter((w) => countSyllables(w) >= 3).length;
  const fog = 0.4 * (wc / sc + 100 * (complex / wc));
  return { words: wc, sentences: sc, syllables: syll, flesch, grade, fog, avgSentence: wc / sc };
}

const STOP = new Set(
  ('a about above after again against all am an and any are as at be because been before being below between both but by can did do does doing down during each few for from further had has have having he her here hers herself him himself his how i if in into is it its itself just me more most my myself no nor not now of off on once only or other our ours ourselves out over own same she should so some such than that the their theirs them themselves then there these they this those through to too under until up very was we were what when where which while who whom why will with you your yours yourself yourselves would could also may might must shall'
  ).split(' ')
);

export function keywordFrequency(text: string, limit = 20) {
  const words = (text.toLowerCase().match(/[a-z][a-z'-]{2,}/g) ?? []).filter((w) => !STOP.has(w));
  const freq = new Map<string, number>();
  for (const w of words) freq.set(w, (freq.get(w) ?? 0) + 1);
  const total = words.length || 1;
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([word, count]) => ({ word, count, density: (count / total) * 100 }));
}

/** Extractive summariser: scores sentences by keyword frequency, returns the top ones in original order. */
export function summarize(text: string, sentenceCount: number): string[] {
  const sentences = (text.replace(/\s+/g, ' ').match(/[^.!?]+[.!?]+["')\]]*|[^.!?]+$/g) ?? [])
    .map((s) => s.trim())
    .filter((s) => s.length > 15);
  if (sentences.length <= sentenceCount) return sentences;
  const freq = new Map<string, number>();
  for (const w of text.toLowerCase().match(/[a-z][a-z'-]{2,}/g) ?? []) {
    if (!STOP.has(w)) freq.set(w, (freq.get(w) ?? 0) + 1);
  }
  const scored = sentences.map((s, i) => {
    const ws = (s.toLowerCase().match(/[a-z][a-z'-]{2,}/g) ?? []).filter((w) => !STOP.has(w));
    const score = ws.reduce((t, w) => t + (freq.get(w) ?? 0), 0) / Math.sqrt(ws.length || 1);
    return { s, i, score: score * (i === 0 ? 1.15 : 1) };
  });
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, sentenceCount)
    .sort((a, b) => a.i - b.i)
    .map((x) => x.s);
}

// ── Developer ────────────────────────────────────────────────

/** Minimal RFC-4180 CSV parser (quoted fields, escaped quotes, CRLF). */
export function parseCsv(text: string, delimiter = ','): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else inQuotes = false;
      } else field += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === delimiter) {
      row.push(field);
      field = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else field += ch;
  }
  if (field !== '' || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => !(r.length === 1 && r[0] === ''));
}

export function csvToObjects(text: string, delimiter = ','): Record<string, string>[] {
  const rows = parseCsv(text, delimiter);
  if (rows.length < 2) return [];
  const [head, ...body] = rows;
  return body.map((r) => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ''])));
}

function flatten(value: unknown, prefix = '', out: Record<string, unknown> = {}): Record<string, unknown> {
  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    for (const [k, v] of Object.entries(value)) flatten(v, prefix ? `${prefix}.${k}` : k, out);
  } else {
    out[prefix] = Array.isArray(value) || (value !== null && typeof value === 'object') ? JSON.stringify(value) : value;
  }
  return out;
}

export function jsonToCsv(json: unknown, delimiter = ','): string {
  const arr = Array.isArray(json) ? json : [json];
  const flat: Record<string, unknown>[] = arr.map((item) =>
    item !== null && typeof item === 'object' ? flatten(item) : { value: item }
  );
  const headers = [...new Set(flat.flatMap((r) => Object.keys(r)))];
  const esc = (v: unknown) => {
    const s = v === null || v === undefined ? '' : String(v);
    return s.includes(delimiter) || /["\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [headers.map(esc).join(delimiter), ...flat.map((r) => headers.map((h) => esc(r[h])).join(delimiter))].join('\n');
}

const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
};

export function encodeHtmlEntities(text: string, encodeNonAscii: boolean): string {
  let out = text.replace(/[&<>"']/g, (c) => HTML_ENTITIES[c]);
  if (encodeNonAscii) {
    out = Array.from(out)
      .map((ch) => {
        const cp = ch.codePointAt(0) ?? 0;
        return cp > 126 ? `&#${cp};` : ch;
      })
      .join('');
  }
  return out;
}

const NAMED: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', copy: '©', reg: '®', trade: '™',
  hellip: '…', mdash: '—', ndash: '–', euro: '€', pound: '£', yen: '¥', cent: '¢', laquo: '«', raquo: '»',
  lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”', bull: '•', middot: '·', deg: '°', times: '×', divide: '÷',
};

export function decodeHtmlEntities(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]*);/gi, (m, e: string) => {
    if (e[0] === '#') {
      const cp = e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      try {
        return String.fromCodePoint(cp);
      } catch {
        return m;
      }
    }
    return NAMED[e.toLowerCase()] ?? m;
  });
}

/** chmod helpers. `bits` is a 9-bit permission number (0–511). */
export function symbolicMode(bits: number): string {
  const chars = 'rwxrwxrwx';
  let s = '';
  for (let i = 0; i < 9; i++) s += bits & (1 << (8 - i)) ? chars[i] : '-';
  return s;
}

export function octalMode(bits: number): string {
  return bits.toString(8).padStart(3, '0');
}

// ── Sorting helpers ──────────────────────────────────────────

export type SortMode = 'az' | 'za' | 'length' | 'numeric' | 'reverse' | 'shuffle';

export function processLines(
  text: string,
  opts: { mode: SortMode; dedupe: boolean; ignoreCase: boolean; trim: boolean; removeEmpty: boolean; rng?: () => number }
): string[] {
  let lines = text.split(/\r?\n/);
  if (opts.trim) lines = lines.map((l) => l.trim());
  if (opts.removeEmpty) lines = lines.filter((l) => l !== '');
  if (opts.dedupe) {
    const seen = new Set<string>();
    lines = lines.filter((l) => {
      const k = opts.ignoreCase ? l.toLowerCase() : l;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }
  const key = (l: string) => (opts.ignoreCase ? l.toLowerCase() : l);
  switch (opts.mode) {
    case 'az':
      lines.sort((a, b) => key(a).localeCompare(key(b), undefined, { numeric: true }));
      break;
    case 'za':
      lines.sort((a, b) => key(b).localeCompare(key(a), undefined, { numeric: true }));
      break;
    case 'length':
      lines.sort((a, b) => a.length - b.length || key(a).localeCompare(key(b)));
      break;
    case 'numeric':
      lines.sort((a, b) => (parseFloat(a) || 0) - (parseFloat(b) || 0));
      break;
    case 'reverse':
      lines.reverse();
      break;
    case 'shuffle': {
      const rng = opts.rng ?? Math.random;
      for (let i = lines.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [lines[i], lines[j]] = [lines[j], lines[i]];
      }
      break;
    }
  }
  return lines;
}

// ── PDF helpers ──────────────────────────────────────────────

/**
 * Parse a page selection like "1-3, 5, 8-" into a sorted, de-duplicated list of
 * zero-based page indexes. Returns an error string for invalid input.
 */
export function parsePageRanges(input: string, total: number): { pages: number[]; error?: string } {
  const text = input.trim();
  if (!text) return { pages: [], error: 'Enter at least one page or range.' };
  const set = new Set<number>();
  for (const part of text.split(',')) {
    const p = part.trim();
    if (!p) continue;
    const m = /^(\d*)\s*-\s*(\d*)$/.exec(p);
    let from: number;
    let to: number;
    if (m && (m[1] || m[2])) {
      from = m[1] ? parseInt(m[1], 10) : 1;
      to = m[2] ? parseInt(m[2], 10) : total;
    } else if (/^\d+$/.test(p)) {
      from = to = parseInt(p, 10);
    } else {
      return { pages: [], error: `"${p}" is not a valid page or range.` };
    }
    if (from < 1 || to < 1 || from > total || to > total) {
      return { pages: [], error: `Pages must be between 1 and ${total}.` };
    }
    if (from > to) return { pages: [], error: `Range "${p}" is backwards.` };
    for (let i = from; i <= to; i++) set.add(i - 1);
  }
  return { pages: [...set].sort((a, b) => a - b) };
}

// ── Business / productivity ──────────────────────────────────

/** Minutes worked between two HH:MM times (overnight shifts supported) minus a break. */
export function shiftMinutes(start: string, end: string, breakMin: number): number {
  const parse = (t: string) => {
    const m = /^(\d{1,2}):(\d{2})$/.exec(t);
    return m ? parseInt(m[1], 10) * 60 + parseInt(m[2], 10) : NaN;
  };
  const s = parse(start);
  const e = parse(end);
  if (Number.isNaN(s) || Number.isNaN(e)) return 0;
  let diff = e - s;
  if (diff < 0) diff += 24 * 60;
  return Math.max(0, diff - Math.max(0, breakMin || 0));
}

export function formatHM(totalMinutes: number): string {
  const m = Math.round(totalMinutes);
  return `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, '0')}m`;
}

/** Markup/margin maths. `cost` and `price` are money, `markup`/`margin` are percentages. */
export function fromCostMarkup(cost: number, markupPct: number) {
  const price = cost * (1 + markupPct / 100);
  return { cost, price, profit: price - cost, markup: markupPct, margin: price === 0 ? 0 : ((price - cost) / price) * 100 };
}
export function fromCostMargin(cost: number, marginPct: number) {
  if (marginPct >= 100) return null;
  const price = cost / (1 - marginPct / 100);
  return { cost, price, profit: price - cost, margin: marginPct, markup: cost === 0 ? 0 : ((price - cost) / cost) * 100 };
}
export function fromCostPrice(cost: number, price: number) {
  return { cost, price, profit: price - cost, markup: cost === 0 ? 0 : ((price - cost) / cost) * 100, margin: price === 0 ? 0 : ((price - cost) / price) * 100 };
}

// ── Formatting ───────────────────────────────────────────────

/** Compact "1.2L / 3.4Cr" style label for currency axis ticks (Indian numbering). */
export function compactINR(v: number): string {
  const a = Math.abs(v);
  const trim = (n: number, d: number) => n.toFixed(d).replace(/\.?0+$/, '');
  if (a >= 1e7) return `${trim(v / 1e7, 2)}Cr`;
  if (a >= 1e5) return `${trim(v / 1e5, 2)}L`;
  if (a >= 1e3) return `${trim(v / 1e3, 1)}K`;
  return String(Math.round(v));
}

/** Readable number with up to 10 significant digits; exponent form for extreme values. */
export function formatNumber(v: number): string {
  if (!Number.isFinite(v)) return '—';
  if (v === 0) return '0';
  const a = Math.abs(v);
  if (a < 1e-6 || a >= 1e15) return v.toExponential(4);
  return String(parseFloat(v.toPrecision(10)));
}
