import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Input, Switch, StatCard, Button } from '@/components/ui';

export default function DateDifference() {
  const [startDate, setStartDate] = useState<string>('2026-07-10');
  const [endDate, setEndDate] = useState<string>('2026-07-17');
  const [includeEndDate, setIncludeEndDate] = useState<boolean>(false);

  // Shortcuts
  const addDays = (days: number) => {
    const start = new Date(startDate);
    if (isNaN(start.getTime())) return;
    const next = new Date(start.getTime() + days * 24 * 60 * 60 * 1000);
    setEndDate(next.toISOString().split('T')[0]);
  };

  const addMonths = (monthsNum: number) => {
    const start = new Date(startDate);
    if (isNaN(start.getTime())) return;
    start.setMonth(start.getMonth() + monthsNum);
    setEndDate(start.toISOString().split('T')[0]);
  };

  const setToEndOfYear = () => {
    const start = new Date(startDate);
    if (isNaN(start.getTime())) return;
    const next = new Date(start.getFullYear(), 11, 31);
    setEndDate(next.toISOString().split('T')[0]);
  };

  const results = useMemo(() => {
    let start = new Date(startDate);
    let end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return null;
    }

    let isNegative = false;
    if (start > end) {
      const temp = start;
      start = end;
      end = temp;
      isNegative = true;
    }

    // Include end date means adding 1 day to the end boundary
    let targetEnd = new Date(end);
    if (includeEndDate) {
      targetEnd = new Date(end.getTime() + 24 * 60 * 60 * 1000);
    }

    // Total difference in milliseconds
    const diffTime = targetEnd.getTime() - start.getTime();
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const remainingDaysOfWeek = totalDays % 7;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    // YMD calculation
    let years = targetEnd.getFullYear() - start.getFullYear();
    let months = targetEnd.getMonth() - start.getMonth();
    let days = targetEnd.getDate() - start.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(targetEnd.getFullYear(), targetEnd.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return {
      isNegative,
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      remainingDaysOfWeek,
      totalHours,
      totalMinutes,
    };
  }, [startDate, endDate, includeEndDate]);

  return (
    <ToolPageWrapper toolId="date-difference">
      <div className="tool-layout lg:grid-cols-2 gap-6">
        
        {/* Left Side: Inputs */}
        <div className="space-y-6 p-6 card">
          <h3 className="text-lg font-bold border-b pb-4" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-default)' }}>
            Select Dates
          </h3>

          <div className="space-y-4">
            <Input
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <div className="space-y-2">
              <Input
                label="End Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />

              {/* Shortcuts */}
              <div>
                <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>Add Duration Preset:</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  <Button variant="secondary" size="xs" onClick={() => addDays(7)}>+7 Days</Button>
                  <Button variant="secondary" size="xs" onClick={() => addDays(30)}>+30 Days</Button>
                  <Button variant="secondary" size="xs" onClick={() => addMonths(1)}>+1 Month</Button>
                  <Button variant="secondary" size="xs" onClick={() => addMonths(3)}>+3 Months</Button>
                  <Button variant="secondary" size="xs" onClick={() => addMonths(6)}>+6 Months</Button>
                  <Button variant="secondary" size="xs" onClick={() => addMonths(12)}>+1 Year</Button>
                  <Button variant="secondary" size="xs" onClick={setToEndOfYear}>End of Year</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4" style={{ borderColor: 'var(--border-default)' }}>
            <Switch
              label="Include End Date (Add 1 Day)"
              checked={includeEndDate}
              onChange={setIncludeEndDate}
              description="Count the end date as a full day in the calculation"
            />
          </div>
        </div>

        {/* Right Side: Results */}
        <div className="space-y-6">
          {results ? (
            <>
              {results.isNegative && (
                <div className="p-3 rounded-lg border text-sm bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300">
                  ⚠️ <strong>Note:</strong> Start date is after the end date. Showing absolute difference.
                </div>
              )}

              {/* Main Y-M-D Card */}
              <Card className="p-6 flex flex-col justify-center text-center">
                <span className="text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Formatted Difference
                </span>
                <div className="text-3xl font-extrabold text-primary flex flex-wrap justify-center gap-x-3 gap-y-1">
                  {results.years > 0 && (
                    <span>
                      {results.years} {results.years === 1 ? 'Year' : 'Years'}
                    </span>
                  )}
                  {results.months > 0 && (
                    <span>
                      {results.months} {results.months === 1 ? 'Month' : 'Months'}
                    </span>
                  )}
                  {(results.days > 0 || (results.years === 0 && results.months === 0)) && (
                    <span>
                      {results.days} {results.days === 1 ? 'Day' : 'Days'}
                    </span>
                  )}
                </div>
                <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>
                  Breakdown in calendar units
                </p>
              </Card>

              {/* Alternative Units */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard
                  label="Total Days"
                  value={results.totalDays}
                  suffix={results.totalDays === 1 ? 'day' : 'days'}
                />
                <StatCard
                  label="Total Weeks"
                  value={`${results.totalWeeks} wks, ${results.remainingDaysOfWeek} days`}
                />
                <StatCard
                  label="Total Hours"
                  value={results.totalHours}
                  suffix="hours"
                />
                <StatCard
                  label="Total Minutes"
                  value={results.totalMinutes}
                  suffix="mins"
                />
              </div>
            </>
          ) : (
            <Card className="p-6 text-center text-sm" style={{ color: 'var(--text-tertiary)' }}>
              Please select valid start and end dates to see the difference.
            </Card>
          )}
        </div>

      </div>
    </ToolPageWrapper>
  );
}
