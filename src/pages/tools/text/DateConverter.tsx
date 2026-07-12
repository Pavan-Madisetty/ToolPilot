import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { CopyButton } from '@/components/ui';

// Calendar names across languages
const HIJRI_MONTHS = [
  'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
  'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban',
  'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
];

const SOLAR_MONTHS = [
  'Farvardin', 'Ordibehesht', 'Khordad', 'Tir', 'Mordad', 'Shahrivar',
  'Mehr', 'Aban', 'Azar', 'Dey', 'Bahman', 'Esfand'
];

const LANGS = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: 'Chinese (中文)' },
  { code: 'es', name: 'Spanish (Español)' },
  { code: 'fr', name: 'French (Français)' },
  { code: 'ar', name: 'Arabic (العربية)' }
];

// Helper to convert Gregorian to Julian Day Number
const getJulianDay = (y: number, m: number, d: number): number => {
  let year = y;
  let month = m;
  if (month < 3) {
    year -= 1;
    month += 12;
  }
  const a = Math.floor(year / 100);
  const b = Math.floor(a / 4);
  const c = 2 - a + b;
  const e = Math.floor(365.25 * (year + 4716));
  const f = Math.floor(30.6001 * (month + 1));
  return c + d + e + f - 1524.5;
};

// Julian Day Number to Hijri Date
const jdToHijri = (jd: number) => {
  const l = jd - 1948438.5; // Offset to Islamic epoch
  const n = Math.floor(l / 10631); // 30-year cycles
  const remainder = l % 10631;
  const cycleYears = Math.floor((remainder * 30 + 10646) / 10631);
  const year = n * 30 + cycleYears;
  const dayOfYear = l - (n * 10631 + Math.floor((cycleYears * 10631 - 10647) / 30));
  const month = Math.min(12, Math.floor((dayOfYear * 30 + 383) / 10631));
  const day = Math.floor(dayOfYear - Math.floor((month * 10631 - 383) / 30)) + 1;
  return { year, month, day };
};

// Julian Day Number to Solar Persian Date
const jdToSolar = (jd: number) => {
  const dep = jd - 2120822.5; // Epoch offset
  const cycle = Math.floor(dep / 12053);
  const section = dep % 12053;
  const cycleYears = Math.floor((section * 33 + 8) / 12053);
  const year = cycle * 33 + cycleYears + 475;
  const dayOfYear = section - Math.floor((cycleYears * 12053 - 8) / 33);

  let month: number;
  let day: number;
  if (dayOfYear < 186) {
    month = Math.floor(dayOfYear / 31) + 1;
    day = Math.floor(dayOfYear % 31) + 1;
  } else {
    month = Math.floor((dayOfYear - 186) / 30) + 7;
    day = Math.floor((dayOfYear - 186) % 30) + 1;
  }
  return { year, month, day };
};

export default function DateConverter() {
  const [inputDate, setInputDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [lang, setLang] = useState('en');

  let gregorianStr = '';
  let hijriStr = '';
  let solarStr = '';

  if (inputDate) {
    const [y, m, d] = inputDate.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    const jd = getJulianDay(y, m, d);

    const hijri = jdToHijri(jd);
    const solar = jdToSolar(jd);

    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const localeMap: Record<string, string> = { en: 'en-US', zh: 'zh-CN', es: 'es-ES', fr: 'fr-FR', ar: 'ar-EG' };
    gregorianStr = dateObj.toLocaleDateString(localeMap[lang] || 'en-US', options);

    const hijriMonthName = HIJRI_MONTHS[hijri.month - 1];
    const solarMonthName = SOLAR_MONTHS[solar.month - 1];

    if (lang === 'ar') {
      hijriStr = `${hijri.day} ${hijriMonthName} ${hijri.year} هـ`;
      solarStr = `${solar.day} ${solarMonthName} ${solar.year} ش`;
    } else if (lang === 'zh') {
      hijriStr = `伊历 ${hijri.year}年 ${hijri.month}月 ${hijri.day}日`;
      solarStr = `波斯历 ${solar.year}年 ${solar.month}月 ${solar.day}日`;
    } else {
      hijriStr = `${hijri.day} ${hijriMonthName} ${hijri.year} AH`;
      solarStr = `${solar.day} ${solarMonthName} ${solar.year} SH`;
    }
  }

  return (
    <ToolPageWrapper toolId="date-converter">
      <div className="space-y-6">
        {/* Controls Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Gregorian Date Picker input */}
          <div className="md:col-span-6 space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">Pick Date (Gregorian)</label>
            <input
              type="date"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              className="w-full px-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--primary)]/10 focus:border-[var(--primary)] font-medium h-12 text-sm"
            />
          </div>

          {/* Target Language Toggle list */}
          <div className="md:col-span-6 flex flex-wrap gap-2 justify-end pt-5">
            {LANGS.map((item) => (
              <button
                key={item.code}
                onClick={() => setLang(item.code)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  lang === item.code
                    ? 'bg-[var(--primary)] text-white shadow-sm'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:bg-[var(--bg-elevated)]'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results list */}
        <div className="space-y-4 pt-4 border-t border-[var(--border-default)]">
          {/* Gregorian */}
          <div className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider block mb-1">
                Gregorian Calendar
              </span>
              <p className="text-lg font-semibold text-[var(--text-primary)]">{gregorianStr}</p>
            </div>
            <CopyButton text={gregorianStr} />
          </div>

          {/* Hijri */}
          <div className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider block mb-1">
                Hijri Calendar (Islamic)
              </span>
              <p className="text-lg font-semibold text-[var(--text-primary)]">{hijriStr}</p>
            </div>
            <CopyButton text={hijriStr} />
          </div>

          {/* Solar */}
          <div className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider block mb-1">
                Solar Calendar (Persian)
              </span>
              <p className="text-lg font-semibold text-[var(--text-primary)]">{solarStr}</p>
            </div>
            <CopyButton text={solarStr} />
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
