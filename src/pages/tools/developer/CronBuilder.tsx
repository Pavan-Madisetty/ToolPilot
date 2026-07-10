import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Select, CopyButton } from '@/components/ui';
import { Clock, HelpCircle, Calendar } from 'lucide-react';

const MINUTE_OPTIONS = [
  { value: '*', label: 'Every minute' },
  { value: '*/5', label: 'Every 5 minutes' },
  { value: '*/10', label: 'Every 10 minutes' },
  { value: '*/15', label: 'Every 15 minutes' },
  { value: '*/30', label: 'Every 30 minutes' },
  { value: '0', label: 'At minute 0' },
];

const HOUR_OPTIONS = [
  { value: '*', label: 'Every hour' },
  { value: '*/2', label: 'Every 2 hours' },
  { value: '*/4', label: 'Every 4 hours' },
  { value: '*/6', label: 'Every 6 hours' },
  { value: '*/12', label: 'Every 12 hours' },
  { value: '0', label: 'At midnight (12 AM)' },
  { value: '12', label: 'At noon (12 PM)' },
];

const DAY_OPTIONS = [
  { value: '*', label: 'Every day' },
  { value: '1-5', label: 'Weekdays (Monday to Friday)' },
  { value: '0,6', label: 'Weekends (Saturday & Sunday)' },
  { value: '1', label: 'First day of the month' },
];

const MONTH_OPTIONS = [
  { value: '*', label: 'Every month' },
  { value: '*/3', label: 'Quarterly (every 3 months)' },
  { value: '*/6', label: 'Semi-annually (every 6 months)' },
  { value: '1', label: 'Only in January' },
];

const DAY_OF_WEEK_OPTIONS = [
  { value: '*', label: 'Every day of the week' },
  { value: '1-5', label: 'Monday through Friday' },
  { value: '0,6', label: 'Saturday and Sunday' },
  { value: '1', label: 'Mondays only' },
];

export default function CronBuilder() {
  const [minute, setMinute] = useState<string>('*');
  const [hour, setHour] = useState<string>('*');
  const [day, setDay] = useState<string>('*');
  const [month, setMonth] = useState<string>('*');
  const [dayOfWeek, setDayOfWeek] = useState<string>('*');

  const cronExpression = `${minute} ${hour} ${day} ${month} ${dayOfWeek}`;

  // Human Explanation Generator
  const explanation = useMemo(() => {
    let minDesc = 'every minute';
    if (minute === '0') minDesc = 'at minute 0';
    else if (minute.startsWith('*/')) minDesc = `every ${minute.replace('*/', '')} minutes`;

    let hourDesc = 'every hour';
    if (hour === '0') hourDesc = 'at 12:00 AM';
    else if (hour === '12') hourDesc = 'at 12:00 PM';
    else if (hour.startsWith('*/')) hourDesc = `every ${hour.replace('*/', '')} hours`;

    let dayDesc = 'every day';
    if (day === '1') dayDesc = 'on the 1st day of the month';
    else if (day === '1-5') dayDesc = 'on weekdays';
    else if (day === '0,6') dayDesc = 'on weekends';

    let monthDesc = 'every month';
    if (month === '1') monthDesc = 'only in January';
    else if (month.startsWith('*/')) monthDesc = `every ${month.replace('*/', '')} months`;

    let dowDesc = 'every day of the week';
    if (dayOfWeek === '1-5') dowDesc = 'Monday through Friday';
    else if (dayOfWeek === '0,6') dowDesc = 'Saturday and Sunday';
    else if (dayOfWeek === '1') dowDesc = 'only on Mondays';

    return `Runs ${minDesc}, ${hourDesc}, ${dayDesc}, ${monthDesc}, ${dowDesc}.`;
  }, [minute, hour, day, month, dayOfWeek]);

  // Next 5 simulated execution times starting from now
  const nextRuns = useMemo(() => {
    const list: string[] = [];
    let current = new Date();

    // Standard increment loops simulating next trigger times
    for (let i = 0; i < 5; i++) {
      let loops = 0;
      while (loops < 10000) {
        loops++;
        // Increment by minute
        current = new Date(current.getTime() + 60000);

        const m = current.getMinutes();
        const h = current.getHours();
        const d = current.getDate();
        const mo = current.getMonth() + 1;
        const dow = current.getDay(); // 0 is Sunday, 1 is Monday...

        // Match Minute
        if (minute !== '*') {
          if (minute.startsWith('*/')) {
            const step = parseInt(minute.replace('*/', ''));
            if (m % step !== 0) continue;
          } else {
            if (m !== parseInt(minute)) continue;
          }
        }

        // Match Hour
        if (hour !== '*') {
          if (hour.startsWith('*/')) {
            const step = parseInt(hour.replace('*/', ''));
            if (h % step !== 0) continue;
          } else {
            if (h !== parseInt(hour)) continue;
          }
        }

        // Match Day of Month
        if (day !== '*') {
          if (day === '1' && d !== 1) continue;
          if (day === '1-5' && (dow === 0 || dow === 6)) continue;
          if (day === '0,6' && dow !== 0 && dow !== 6) continue;
        }

        // Match Month
        if (month !== '*') {
          if (month.startsWith('*/')) {
            const step = parseInt(month.replace('*/', ''));
            if (mo % step !== 0) continue;
          } else {
            if (mo !== parseInt(month)) continue;
          }
        }

        // Match Day of Week
        if (dayOfWeek !== '*') {
          if (dayOfWeek === '1-5' && (dow === 0 || dow === 6)) continue;
          if (dayOfWeek === '0,6' && dow !== 0 && dow !== 6) continue;
          if (dayOfWeek === '1' && dow !== 1) continue;
        }

        // Found next match
        list.push(
          current.toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
          })
        );
        break;
      }
    }
    return list;
  }, [minute, hour, day, month, dayOfWeek]);

  return (
    <ToolPageWrapper toolId="cron-builder">
      <div className="tool-layout lg:grid-cols-2 gap-6">
        {/* Left Column: Builder Settings */}
        <Card className="flex flex-col gap-5">
          <span
            className="text-sm font-bold flex items-center gap-1.5"
            style={{ color: 'var(--text-primary)' }}
          >
            <Clock size={16} />
            <span>Cron Parameters</span>
          </span>

          <Select
            label="Minutes"
            options={MINUTE_OPTIONS}
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
          />

          <Select
            label="Hours"
            options={HOUR_OPTIONS}
            value={hour}
            onChange={(e) => setHour(e.target.value)}
          />

          <Select
            label="Day of Month"
            options={DAY_OPTIONS}
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />

          <Select
            label="Month"
            options={MONTH_OPTIONS}
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />

          <Select
            label="Day of Week"
            options={DAY_OF_WEEK_OPTIONS}
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
          />
        </Card>

        {/* Right Column: Output / Human Translation */}
        <div className="flex flex-col gap-6">
          <Card className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                Generated Cron Expression
              </span>
              <CopyButton text={cronExpression} />
            </div>
            <div
              className="p-4 border rounded-xl font-mono text-xl font-bold text-center tracking-wider"
              style={{
                borderColor: 'var(--border-default)',
                background: 'var(--bg-surface)',
                color: 'var(--primary)',
              }}
            >
              {cronExpression}
            </div>
          </Card>

          <Card className="flex flex-col gap-3">
            <span
              className="text-xs font-semibold flex items-center gap-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              <HelpCircle size={14} />
              <span>Human Readable Translation</span>
            </span>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              {explanation}
            </p>
          </Card>

          <Card className="flex flex-col gap-4">
            <span
              className="text-xs font-semibold flex items-center gap-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              <Calendar size={14} />
              <span>Upcoming Scheduled Runs</span>
            </span>
            <div className="flex flex-col gap-2">
              {nextRuns.map((run, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs p-2.5 border rounded-xl"
                  style={{
                    borderColor: 'var(--border-default)',
                    background: 'var(--bg-surface)',
                  }}
                >
                  <span style={{ color: 'var(--text-secondary)' }}>Run #{idx + 1}</span>
                  <span className="font-mono font-bold" style={{ color: 'var(--text-primary)' }}>
                    {run}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
