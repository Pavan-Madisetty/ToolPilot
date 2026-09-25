import { describe as suite, it, expect } from 'vitest';
import * as m from './extraToolMath';

suite('finance', () => {
  it('lumpsum FV', () => expect(m.lumpsumFutureValue(100000, 10, 2)).toBeCloseTo(121000, 5));
  it('cagr', () => {
    expect(m.cagr(100, 200, 5)).toBeCloseTo(14.8698, 3);
    expect(m.cagr(0, 200, 5)).toBeNaN();
  });
  it('swp lasts and depletes', () => {
    const r = m.swpSchedule(100000, 20000, 0, 12);
    expect(r.monthsLasted).toBe(5);
    expect(r.finalValue).toBe(0);
    expect(r.totalWithdrawn).toBeCloseTo(100000, 5);
  });
  it('swp survives with growth', () => {
    const r = m.swpSchedule(1000000, 5000, 12, 60);
    expect(r.monthsLasted).toBe(60);
    expect(r.finalValue).toBeGreaterThan(1000000);
  });
});

suite('education', () => {
  it('quadratic real', () => expect(m.solveQuadratic(1, -3, 2).roots).toEqual(['2', '1']));
  it('quadratic complex', () => expect(m.solveQuadratic(1, 2, 5).kind).toBe('complex'));
  it('quadratic repeated + linear + invalid', () => {
    expect(m.solveQuadratic(1, 2, 1).kind).toBe('one-real');
    expect(m.solveQuadratic(0, 2, -4).roots).toEqual(['2']);
    expect(m.solveQuadratic(0, 0, 1).kind).toBe('invalid');
  });
  it('prime factors', () => {
    expect(m.primeFactors(360)).toEqual([[2, 3], [3, 2], [5, 1]]);
    expect(m.primeFactors(97)).toEqual([[97, 1]]);
    expect(m.primeFactors(1)).toEqual([]);
    expect(m.isPrime(97)).toBe(true);
    expect(m.isPrime(91)).toBe(false);
  });
  it('gcd lcm', () => {
    expect(m.gcd(48, 18)).toBe(6);
    expect(m.lcm(4, 6)).toBe(12);
  });
  it('stats', () => {
    const s = m.describe([2, 4, 4, 4, 5, 5, 7, 9]) as m.Stats;
    expect(s.mean).toBe(5);
    expect(s.median).toBe(4.5);
    expect(s.modes).toEqual([4]);
    expect(s.sdPop).toBeCloseTo(2, 5);
    expect(m.describe([])).toBeNull();
  });
});

suite('health', () => {
  it('devine', () => {
    expect(m.idealWeightDevine(170, 'male')).toBeCloseTo(66.0, 0);
    expect(m.idealWeightDevine(150, 'female')).toBeCloseTo(45.5, 1);
    expect(m.idealWeightDevine(160, 'female')).toBeCloseTo(52.4, 0);
  });
  it('navy bf plausible', () => {
    const bf = m.navyBodyFat('male', 178, 38, 90);
    expect(bf).toBeGreaterThan(15);
    expect(bf).toBeLessThan(25);
    expect(m.navyBodyFat('male', 178, 95, 90)).toBeNaN();
  });
  it('hr zones', () => {
    const z = m.heartRateZones(30, 60);
    expect(z.max).toBe(190);
    expect(z.zones[4].max).toBe(190);
  });
  it('water', () => expect(m.waterIntakeLitres(70, 0, false)).toBeCloseTo(2.45, 2));
});

suite('conversion', () => {
  it('roman round trip', () => {
    for (const n of [1, 4, 9, 14, 40, 90, 400, 1994, 2024, 3999]) expect(m.fromRoman(m.toRoman(n))).toBe(n);
    expect(m.toRoman(1994)).toBe('MCMXCIV');
    expect(m.fromRoman('IIII')).toBeNaN();
    expect(m.toRoman(0)).toBe('');
  });
  it('base convert', () => {
    expect(m.convertBase('255', 10, 16)).toBe('ff');
    expect(m.convertBase('ff', 16, 2)).toBe('11111111');
    expect(m.convertBase('-10', 10, 2)).toBe('-1010');
    expect(m.convertBase('12', 2, 10)).toBe('');
    expect(m.convertBase('123456789012345678901234567890', 10, 16)).toBe('18ee90ff6c373e0ee4e3f0ad2');
  });
});

suite('text', () => {
  it('syllables', () => {
    expect(m.countSyllables('cat')).toBe(1);
    expect(m.countSyllables('reading')).toBe(2);
  });
  it('readability', () => {
    const r = m.readability('The cat sat on the mat. The dog ran fast.') as NonNullable<ReturnType<typeof m.readability>>;
    expect(r.flesch).toBeGreaterThan(90);
    expect(m.readability('')).toBeNull();
  });
  it('keywords ignore stop words', () => {
    const k = m.keywordFrequency('Apple pie and apple tart and the apple');
    expect(k[0]).toMatchObject({ word: 'apple', count: 3 });
  });
  it('summarize returns subset in order', () => {
    const t = 'Cats are small animals. Cats like to sleep all day long. Dogs bark loudly at night. Cats and dogs are common pets in many homes.';
    const s = m.summarize(t, 2);
    expect(s).toHaveLength(2);
  });
  it('processLines', () => {
    const o = { mode: 'az' as const, dedupe: true, ignoreCase: true, trim: true, removeEmpty: true };
    expect(m.processLines('b\nA\n a \n\nB', o)).toEqual(['A', 'b']);
    expect(m.processLines('10\n9\n100', { ...o, mode: 'numeric' })).toEqual(['9', '10', '100']);
  });
});

suite('developer', () => {
  it('csv parse quoted', () => {
    expect(m.parseCsv('a,b\n"x,1","he said ""hi"""\r\n')).toEqual([['a', 'b'], ['x,1', 'he said "hi"']]);
  });
  it('json to csv flatten + escape', () => {
    const csv = m.jsonToCsv([{ a: 1, b: { c: 'x,y' } }, { a: 2, d: null }]);
    expect(csv).toBe('a,b.c,d\n1,"x,y",\n2,,');
  });
  it('csv → objects', () => expect(m.csvToObjects('n,v\nq,1')).toEqual([{ n: 'q', v: '1' }]));
  it('html entities', () => {
    expect(m.encodeHtmlEntities('<a href="x">&é</a>', true)).toBe('&lt;a href=&quot;x&quot;&gt;&amp;&#233;&lt;/a&gt;');
    expect(m.decodeHtmlEntities('&lt;p&gt;&#169; &copy; &#x1F600; &bogus;')).toBe('<p>© © 😀 &bogus;');
  });
  it('chmod', () => {
    expect(m.symbolicMode(0o755)).toBe('rwxr-xr-x');
    expect(m.octalMode(0o644)).toBe('644');
  });
});

suite('pdf helpers', () => {
  it('parsePageRanges', () => {
    expect(m.parsePageRanges('1-3, 5, 8-', 9).pages).toEqual([0, 1, 2, 4, 7, 8]);
    expect(m.parsePageRanges('-2', 5).pages).toEqual([0, 1]);
    expect(m.parsePageRanges('3,3,1', 5).pages).toEqual([0, 2]);
    expect(m.parsePageRanges('0', 5).error).toBeTruthy();
    expect(m.parsePageRanges('6', 5).error).toBeTruthy();
    expect(m.parsePageRanges('4-2', 5).error).toBeTruthy();
    expect(m.parsePageRanges('abc', 5).error).toBeTruthy();
    expect(m.parsePageRanges('', 5).error).toBeTruthy();
  });
});

suite('business helpers', () => {
  it('shiftMinutes handles breaks and overnight', () => {
    expect(m.shiftMinutes('09:00', '17:30', 30)).toBe(480);
    expect(m.shiftMinutes('22:00', '06:00', 0)).toBe(480);
    expect(m.shiftMinutes('', '06:00', 0)).toBe(0);
    expect(m.shiftMinutes('09:00', '09:30', 60)).toBe(0);
    expect(m.formatHM(485)).toBe('8h 05m');
  });
  it('markup vs margin', () => {
    const a = m.fromCostMarkup(100, 25);
    expect(a.price).toBe(125);
    expect(a.margin).toBeCloseTo(20, 8);
    const b = m.fromCostMargin(80, 20) as NonNullable<ReturnType<typeof m.fromCostMargin>>;
    expect(b.price).toBeCloseTo(100, 8);
    expect(b.markup).toBeCloseTo(25, 8);
    expect(m.fromCostMargin(80, 100)).toBeNull();
    expect(m.fromCostPrice(50, 75)).toMatchObject({ profit: 25, markup: 50 });
  });
});

suite('formatting', () => {
  it('compactINR', () => {
    expect(m.compactINR(1500)).toBe('1.5K');
    expect(m.compactINR(250000)).toBe('2.5L');
    expect(m.compactINR(12000000)).toBe('1.2Cr');
    expect(m.compactINR(999)).toBe('999');
  });
  it('formatNumber', () => {
    expect(m.formatNumber(0.1 + 0.2)).toBe('0.3');
    expect(m.formatNumber(1e-9)).toBe('1.0000e-9');
    expect(m.formatNumber(NaN)).toBe('—');
  });
});
