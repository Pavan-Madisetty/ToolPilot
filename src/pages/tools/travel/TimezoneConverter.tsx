import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Input, Select, Button } from '@/components/ui';
import { Trash2, Copy, RefreshCw, Plus, Info, Sun, Moon } from 'lucide-react';

interface TimezoneOption {
  value: string;
  label: string;
  abbrev: string;
}

const ALL_TIMEZONES: TimezoneOption[] = [
  { value: 'UTC', label: 'Coordinated Universal Time', abbrev: 'UTC' },
  { value: 'Asia/Kolkata', label: 'India Standard Time', abbrev: 'IST' },
  { value: 'America/New_York', label: 'Eastern Standard Time', abbrev: 'EST/EDT' },
  { value: 'America/Chicago', label: 'Central Standard Time', abbrev: 'CST/CDT' },
  { value: 'America/Denver', label: 'Mountain Standard Time', abbrev: 'MST/MDT' },
  { value: 'America/Los_Angeles', label: 'Pacific Standard Time', abbrev: 'PST/PDT' },
  { value: 'Europe/London', label: 'Greenwich Mean / British Summer Time', abbrev: 'GMT/BST' },
  { value: 'Europe/Paris', label: 'Central European Time', abbrev: 'CET/CEST' },
  { value: 'Asia/Tokyo', label: 'Japan Standard Time', abbrev: 'JST' },
  { value: 'Australia/Sydney', label: 'Australian Eastern Standard Time', abbrev: 'AEST/AEDT' },
  { value: 'Asia/Singapore', label: 'Singapore Time', abbrev: 'SGT' },
  { value: 'Asia/Dubai', label: 'Gulf Standard Time', abbrev: 'GST' },
  { value: 'Pacific/Auckland', label: 'New Zealand Standard Time', abbrev: 'NZST/NZDT' },
  { value: 'America/Phoenix', label: 'Mountain Standard Time (Arizona)', abbrev: 'MST' },
  { value: 'America/Sao_Paulo', label: 'Brasilia Time', abbrev: 'BRT' },
  { value: 'Europe/Moscow', label: 'Moscow Standard Time', abbrev: 'MSK' },
  { value: 'Asia/Hong_Kong', label: 'Hong Kong Time', abbrev: 'HKT' },
  { value: 'Asia/Seoul', label: 'Korea Standard Time', abbrev: 'KST' },
  { value: 'Asia/Jakarta', label: 'Western Indonesian Time', abbrev: 'WIB' },
  { value: 'Asia/Shanghai', label: 'China Standard Time', abbrev: 'CST' },
  { value: 'Africa/Cairo', label: 'Eastern European Time (Cairo)', abbrev: 'EET' },
  { value: 'Africa/Johannesburg', label: 'South Africa Standard Time', abbrev: 'SAST' },
  { value: 'Europe/Istanbul', label: 'Turkey Time', abbrev: 'TRT' },
  { value: 'Pacific/Honolulu', label: 'Hawaii Standard Time', abbrev: 'HST' },
];

const DEFAULT_STACK = ['Asia/Kolkata', 'America/New_York', 'UTC', 'Asia/Dubai'];

export default function TimezoneConverter() {
  const [baseDateStr, setBaseDateStr] = useState<string>(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });

  const [utcTimeMs, setUtcTimeMs] = useState<number>(() => {
    // Initialized to current UTC millisecond timestamp
    return Date.now();
  });

  const [stackedTzs, setStackedTzs] = useState<string[]>(DEFAULT_STACK);
  const [selectedToAdd, setSelectedToAdd] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Offset helper: returns difference in minutes between tz and UTC at date
  const getTzOffsetMinutes = (timezone: string, date: Date): number => {
    try {
      const tzString = date.toLocaleString('en-US', { timeZone: timezone });
      const utcString = date.toLocaleString('en-US', { timeZone: 'UTC' });
      const tzDate = new Date(tzString);
      const utcDate = new Date(utcString);
      return (tzDate.getTime() - utcDate.getTime()) / 60000;
    } catch {
      return 0;
    }
  };

  // Synchronize baseDate picker changes with the utcTimeMs timestamp
  const handleDateChange = (newDateStr: string) => {
    setBaseDateStr(newDateStr);
    if (!newDateStr) return;

    // Preserve the current hour/minute relative to UTC, but adjust the calendar date
    const [year, month, day] = newDateStr.split('-').map(Number);
    const prevDate = new Date(utcTimeMs);
    const newUtc = new Date(Date.UTC(
      year,
      month - 1,
      day,
      prevDate.getUTCHours(),
      prevDate.getUTCMinutes(),
      prevDate.getUTCSeconds()
    ));
    setUtcTimeMs(newUtc.getTime());
  };

  // Convert input slider value (0-95 steps = 15 minute blocks of the day) in a specific timezone to UTC time
  const handleSliderChange = (tz: string, val: number) => {
    // Get calendar date in that timezone at current time
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour12: false,
    });
    
    try {
      const parts = formatter.formatToParts(new Date(utcTimeMs));
      const partMap = Object.fromEntries(parts.map(p => [p.type, p.value]));
      const year = parseInt(partMap.year);
      const month = parseInt(partMap.month) - 1;
      const day = parseInt(partMap.day);

      const localHour = Math.floor(val / 4);
      const localMinute = (val % 4) * 15;

      const utcDateForLocal = new Date(Date.UTC(year, month, day, localHour, localMinute));
      const offset = getTzOffsetMinutes(tz, utcDateForLocal);
      
      const targetMs = utcDateForLocal.getTime() - offset * 60000;
      setUtcTimeMs(targetMs);
    } catch {
      // Fallback
    }
  };

  // Adjust time by hours in a timezone
  const adjustHours = (_tz: string, amount: number) => {
    setUtcTimeMs(prev => prev + amount * 3600000);
  };

  // Reset to now
  const handleResetToNow = () => {
    setUtcTimeMs(Date.now());
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setBaseDateStr(`${yyyy}-${mm}-${dd}`);
  };

  // Add timezone to stack
  const handleAddTimezone = () => {
    if (!selectedToAdd) return;
    if (!stackedTzs.includes(selectedToAdd)) {
      setStackedTzs(prev => [...prev, selectedToAdd]);
    }
    setSelectedToAdd('');
  };

  // Remove timezone from stack
  const handleRemoveTimezone = (tz: string) => {
    if (stackedTzs.length <= 1) return;
    setStackedTzs(prev => prev.filter(t => t !== tz));
  };

  // Get options for adding timezones
  const availableToAdd = useMemo(() => {
    return ALL_TIMEZONES.filter(tz => !stackedTzs.includes(tz.value)).map(tz => ({
      value: tz.value,
      label: `${tz.abbrev} - ${tz.label} (${tz.value})`,
    }));
  }, [stackedTzs]);

  // Construct comparisons for text summary
  const timezoneCards = useMemo(() => {
    return stackedTzs.map((tz) => {
      const tzMeta = ALL_TIMEZONES.find(t => t.value === tz) || { label: tz, abbrev: tz };
      const dateObj = new Date(utcTimeMs);

      // Localized Strings
      let timeStr = '—';
      let dateStr = '—';
      let sliderVal = 0;
      let offsetStr = '';
      let isSleeping = false;
      let isWorking = false;
      let isAwakeOff = false;

      try {
        const timeFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone: tz,
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });
        timeStr = timeFormatter.format(dateObj);

        const dateFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone: tz,
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        });
        dateStr = dateFormatter.format(dateObj);

        // Get local hour/minute parts for slider and status color
        const partsFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone: tz,
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
        });
        const parts = partsFormatter.formatToParts(dateObj);
        const partMap = Object.fromEntries(parts.map(p => [p.type, p.value]));
        const localHour = parseInt(partMap.hour) % 24;
        const localMinute = parseInt(partMap.minute);
        
        sliderVal = localHour * 4 + Math.round(localMinute / 15);

        // Classify hours
        if (localHour >= 9 && localHour < 17) {
          isWorking = true;
        } else if (localHour >= 22 || localHour < 6) {
          isSleeping = true;
        } else {
          isAwakeOff = true;
        }

        // Get timezone offset text (e.g. UTC +5:30)
        const offsetMin = getTzOffsetMinutes(tz, dateObj);
        const offsetHrs = Math.floor(Math.abs(offsetMin) / 60);
        const offsetMinsRemainder = Math.abs(offsetMin) % 60;
        const sign = offsetMin >= 0 ? '+' : '-';
        offsetStr = `UTC ${sign}${offsetHrs}:${String(offsetMinsRemainder).padStart(2, '0')}`;
      } catch {
        // Safe fallback
      }

      // Calculate relative day compared to system/selected base date
      let relativeDayStr = '';
      try {
        const tzFormatDate = new Intl.DateTimeFormat('en-US', {
          timeZone: tz,
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        });
        const tzParts = tzFormatDate.formatToParts(dateObj);
        const tzMap = Object.fromEntries(tzParts.map(p => [p.type, p.value]));
        const tzYear = parseInt(tzMap.year);
        const tzMonth = parseInt(tzMap.month) - 1;
        const tzDay = parseInt(tzMap.day);
        const tzCalendarDate = new Date(tzYear, tzMonth, tzDay);

        const baseParts = baseDateStr.split('-').map(Number);
        const baseCalendarDate = new Date(baseParts[0], baseParts[1] - 1, baseParts[2]);

        const diffTime = tzCalendarDate.getTime() - baseCalendarDate.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          relativeDayStr = 'Tomorrow';
        } else if (diffDays === -1) {
          relativeDayStr = 'Yesterday';
        } else if (diffDays > 1) {
          relativeDayStr = `+${diffDays} Days`;
        } else if (diffDays < -1) {
          relativeDayStr = `${diffDays} Days`;
        }
      } catch {
        // Fallback
      }

      return {
        timezone: tz,
        label: tzMeta.label,
        abbrev: tzMeta.abbrev,
        timeStr,
        dateStr,
        sliderVal,
        offsetStr,
        relativeDayStr,
        isSleeping,
        isWorking,
        isAwakeOff,
      };
    });
  }, [stackedTzs, utcTimeMs, baseDateStr]);

  // Copy comparisons summary text to clipboard
  const handleCopySummary = () => {
    const textLines = timezoneCards.map(c => `${c.abbrev} (${c.timezone}): ${c.timeStr} (${c.dateStr})`);
    const summary = textLines.join('\n');
    navigator.clipboard.writeText(summary).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Colors for range tracks indicating sleep, wake, work hours:
  const trackGradient = `linear-gradient(to right, 
    rgba(30, 27, 75, 0.3) 0%, rgba(30, 27, 75, 0.3) 25%, 
    rgba(245, 158, 11, 0.3) 25%, rgba(245, 158, 11, 0.3) 37.5%, 
    rgba(14, 165, 233, 0.3) 37.5%, rgba(14, 165, 233, 0.3) 70.8%, 
    rgba(245, 158, 11, 0.3) 70.8%, rgba(245, 158, 11, 0.3) 91.6%, 
    rgba(30, 27, 75, 0.3) 91.6%, rgba(30, 27, 75, 0.3) 100%)`;

  return (
    <ToolPageWrapper toolId="timezone-converter">
      <div className="space-y-8">
        
        {/* Top Control Panel */}
        <div className="card p-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-end justify-between">
            <div className="flex flex-wrap md:flex-nowrap gap-4 items-end flex-1">
              <div className="w-full md:w-48">
                <Input
                  label="Compare Date"
                  type="date"
                  value={baseDateStr}
                  onChange={(e) => handleDateChange(e.target.value)}
                />
              </div>
              
              {availableToAdd.length > 0 && (
                <div className="flex gap-2 items-end w-full md:w-80">
                  <div className="flex-1">
                    <Select
                      label="Add Timezone"
                      options={[{ value: '', label: 'Select timezone...' }, ...availableToAdd]}
                      value={selectedToAdd}
                      onChange={(e) => setSelectedToAdd(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleAddTimezone} variant="primary" disabled={!selectedToAdd} className="flex gap-1.5 items-center shrink-0">
                    <Plus size={16} />
                    Add
                  </Button>
                </div>
              )}
            </div>

            <div className="flex gap-2 w-full md:w-auto shrink-0 justify-end">
              <Button onClick={handleCopySummary} variant="secondary" className="flex items-center gap-1.5 flex-1 md:flex-initial">
                <Copy size={14} />
                {copied ? 'Copied' : 'Copy Text'}
              </Button>
              <Button onClick={handleResetToNow} variant="secondary" className="flex items-center gap-1.5 flex-1 md:flex-initial">
                <RefreshCw size={14} />
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Timezone Stack list */}
        <div className="space-y-4">
          {timezoneCards.map((tzCard) => (
            <Card key={tzCard.timezone} className="relative p-5 space-y-4 transition-all hover:shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* Timezone Labels */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                      {tzCard.abbrev}
                    </h3>
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-medium" style={{
                      borderColor: 'var(--border-default)',
                      borderWidth: '1px',
                      background: 'var(--bg-surface)',
                      color: 'var(--text-secondary)'
                    }}>
                      {tzCard.offsetStr}
                    </span>
                    {tzCard.relativeDayStr && (
                      <span className="text-xs px-2 py-0.5 rounded-md font-semibold text-white" style={{ background: 'var(--primary)' }}>
                        {tzCard.relativeDayStr}
                      </span>
                    )}

                    {/* Status Badge (Working/Awake/Sleeping) */}
                    {tzCard.isWorking && (
                      <span className="text-xs px-2 py-0.5 rounded-md font-medium flex items-center gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <Sun size={12} />
                        Office Hours
                      </span>
                    )}
                    {tzCard.isAwakeOff && (
                      <span className="text-xs px-2 py-0.5 rounded-md font-medium flex items-center gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        <Sun size={12} />
                        Personal Hours
                      </span>
                    )}
                    {tzCard.isSleeping && (
                      <span className="text-xs px-2 py-0.5 rounded-md font-medium flex items-center gap-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                        <Moon size={12} />
                        Sleep Hours
                      </span>
                    )}
                  </div>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    {tzCard.label} — {tzCard.timezone}
                  </p>
                </div>

                {/* Date & Time displays with Adjusters */}
                <div className="flex items-center gap-3 justify-between md:justify-end">
                  <div className="flex flex-col text-right">
                    <span className="text-2xl font-bold font-mono" style={{ color: 'var(--text-primary)' }}>
                      {tzCard.timeStr}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {tzCard.dateStr}
                    </span>
                  </div>

                  <div className="flex gap-1 shrink-0">
                    <Button onClick={() => adjustHours(tzCard.timezone, -1)} variant="ghost" size="xs" className="w-8 h-8 flex items-center justify-center font-bold">
                      -1h
                    </Button>
                    <Button onClick={() => adjustHours(tzCard.timezone, 1)} variant="ghost" size="xs" className="w-8 h-8 flex items-center justify-center font-bold">
                      +1h
                    </Button>
                    {stackedTzs.length > 1 && (
                      <button
                        onClick={() => handleRemoveTimezone(tzCard.timezone)}
                        aria-label={`Remove ${tzCard.abbrev} timezone`}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors text-red-500 hover:bg-red-500/10 shrink-0 cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>

              </div>

              {/* Slider Controller */}
              <div className="space-y-1">
                <input
                  type="range"
                  min={0}
                  max={95}
                  step={1}
                  value={tzCard.sliderVal}
                  onChange={(e) => handleSliderChange(tzCard.timezone, parseInt(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: trackGradient,
                    outline: 'none',
                  }}
                  aria-label={`Adjust time slider for ${tzCard.abbrev}`}
                />
                
                {/* Axis legend */}
                <div className="flex justify-between text-[10px] font-medium select-none" style={{ color: 'var(--text-tertiary)' }}>
                  <span>12 AM</span>
                  <span>3 AM</span>
                  <span>6 AM</span>
                  <span>9 AM</span>
                  <span>12 PM</span>
                  <span>3 PM</span>
                  <span>6 PM</span>
                  <span>9 PM</span>
                  <span>12 AM</span>
                </div>
              </div>

            </Card>
          ))}
        </div>

        {/* Legend Explanations */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center gap-2 border-b pb-4" style={{ borderColor: 'var(--border-default)' }}>
            <Info size={16} style={{ color: 'var(--text-secondary)' }} />
            <h4 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
              Legend &amp; Planner Guide
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <div className="flex gap-3 items-start p-3 rounded-xl bg-indigo-500/5">
              <div className="w-4 h-4 mt-0.5 rounded-full bg-indigo-500/30 border border-indigo-500 shrink-0" />
              <div>
                <span className="font-bold block" style={{ color: 'var(--text-primary)' }}>Sleep Hours (10 PM - 6 AM)</span>
                Off-limits for calls. Local stakeholders are sleeping.
              </div>
            </div>

            <div className="flex gap-3 items-start p-3 rounded-xl bg-amber-500/5">
              <div className="w-4 h-4 mt-0.5 rounded-full bg-amber-500/30 border border-amber-500 shrink-0" />
              <div>
                <span className="font-bold block" style={{ color: 'var(--text-primary)' }}>Personal Hours (6 AM - 9 AM / 5 PM - 10 PM)</span>
                Out-of-office active hours. Good for emergency check-ins, but not standard core hours.
              </div>
            </div>

            <div className="flex gap-3 items-start p-3 rounded-xl bg-emerald-500/5">
              <div className="w-4 h-4 mt-0.5 rounded-full bg-emerald-500/30 border border-emerald-500 shrink-0" />
              <div>
                <span className="font-bold block" style={{ color: 'var(--text-primary)' }}>Office Hours (9 AM - 5 PM)</span>
                Standard core overlap meeting slots. Perfect for coordinating business calls.
              </div>
            </div>
          </div>
        </div>

      </div>
    </ToolPageWrapper>
  );
}
