import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Input, Select, ResultBox } from '@/components/ui';

const TIMEZONES = [
  { value: 'UTC', label: 'Coordinated Universal Time (UTC)' },
  { value: 'Asia/Kolkata', label: 'India Standard Time (IST - Kolkata)' },
  { value: 'America/New_York', label: 'US Eastern Time (EST/EDT - New York)' },
  { value: 'America/Chicago', label: 'US Central Time (CST/CDT - Chicago)' },
  { value: 'America/Denver', label: 'US Mountain Time (MST/MDT - Denver)' },
  { value: 'America/Los_Angeles', label: 'US Pacific Time (PST/PDT - Los Angeles)' },
  { value: 'Europe/London', label: 'London Time (GMT/BST)' },
  { value: 'Europe/Paris', label: 'Central European Time (CET/CEST - Paris)' },
  { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST - Tokyo)' },
  { value: 'Australia/Sydney', label: 'Australian Eastern Time (AEST/AEDT - Sydney)' },
  { value: 'Asia/Singapore', label: 'Singapore Time (SGT)' },
  { value: 'Asia/Dubai', label: 'Gulf Standard Time (GST - Dubai)' },
  { value: 'Pacific/Auckland', label: 'New Zealand Time (NZST/NZDT)' },
];

export default function TimezoneConverter() {
  // Set default datetime string: 2026-07-10T15:00
  const [dateTimeStr, setDateTimeStr] = useState<string>('2026-07-10T15:00');
  const [fromTz, setFromTz] = useState<string>('Asia/Kolkata');
  const [toTz, setToTz] = useState<string>('America/New_York');

  // Offset helper: returns difference in minutes between tz and UTC at date
  const getTzOffset = (tz: string, date: Date): number => {
    try {
      const tzString = date.toLocaleString('en-US', { timeZone: tz });
      const utcString = date.toLocaleString('en-US', { timeZone: 'UTC' });
      const tzDate = new Date(tzString);
      const utcDate = new Date(utcString);
      return (tzDate.getTime() - utcDate.getTime()) / 60000;
    } catch {
      return 0;
    }
  };

  const times = useMemo(() => {
    if (!dateTimeStr) return { targetTime: '—', otherTimes: [] };

    // 1. Parse date as if it is in UTC
    const utcInput = new Date(dateTimeStr + 'Z');
    if (isNaN(utcInput.getTime())) return { targetTime: '—', otherTimes: [] };

    // 2. Adjust using the offset of fromTz to get real UTC time
    const fromOffset = getTzOffset(fromTz, utcInput);
    const trueUtc = new Date(utcInput.getTime() - fromOffset * 60000);

    // 3. Format target timezone conversion
    let targetTime = '';
    try {
      targetTime = trueUtc.toLocaleString('en-US', {
        timeZone: toTz,
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    } catch {
      targetTime = 'Error converting timezone';
    }

    // 4. Convert to other timezones for comparative preview
    const otherTimes = TIMEZONES.filter(tz => tz.value !== fromTz && tz.value !== toTz).map(tz => {
      let formatted = '';
      try {
        formatted = trueUtc.toLocaleString('en-US', {
          timeZone: tz.value,
          dateStyle: 'medium',
          timeStyle: 'short',
        });
      } catch {
        formatted = 'N/A';
      }
      return {
        name: tz.label.split(' - ')[0],
        value: formatted,
      };
    });

    return {
      targetTime,
      otherTimes,
    };
  }, [dateTimeStr, fromTz, toTz]);

  return (
    <ToolPageWrapper toolId="timezone-converter">
      <div className="tool-layout lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="space-y-6">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Select Timezone
            </h2>

            <Input
              label="Date & Time"
              type="datetime-local"
              value={dateTimeStr}
              onChange={(e) => setDateTimeStr(e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="From Timezone"
                options={TIMEZONES}
                value={fromTz}
                onChange={(e) => setFromTz(e.target.value)}
              />
              <Select
                label="To Timezone"
                options={TIMEZONES}
                value={toTz}
                onChange={(e) => setToTz(e.target.value)}
              />
            </div>
          </Card>

          {times.otherTimes.length > 0 && (
            <Card className="space-y-4">
              <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                World Clock Comparison
              </h3>
              <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                {times.otherTimes.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-2.5 text-sm">
                    <span style={{ color: 'var(--text-secondary)' }}>{item.name}</span>
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card className="space-y-6">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Converted Result
            </h2>

            <ResultBox
              label={`Time in ${TIMEZONES.find(t => t.value === toTz)?.label.split(' (')[0]}`}
              value={times.targetTime}
              highlight
              shouldFormat={false}
            />

            <div className="p-4 rounded-xl space-y-2 text-xs" style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}>
              <p>
                <strong>Source:</strong> {dateTimeStr.replace('T', ' ')} in {TIMEZONES.find(t => t.value === fromTz)?.label}
              </p>
              <p>
                <strong>Destination:</strong> {times.targetTime} in {TIMEZONES.find(t => t.value === toTz)?.label}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
