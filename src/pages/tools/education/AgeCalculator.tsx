import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Input, ResultBox } from '@/components/ui';
import { Calendar, Clock, Info, ShieldAlert } from 'lucide-react';

interface AgeCalculationResult {
  error: string;
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  totalHours: number;
  dayOfBirth: string;
  daysToNextBday: number;
  dayOfWeekNextBday: string;
  isBirthdayToday: boolean;
}

export default function AgeCalculator() {
  const todayStr = new Date().toISOString().split('T')[0];
  const [dob, setDob] = useState('2000-01-01');
  const [refDate, setRefDate] = useState(todayStr);

  const ageDetails = useMemo<AgeCalculationResult>(() => {
    const fallback: AgeCalculationResult = {
      error: 'Please enter valid dates.',
      years: 0,
      months: 0,
      days: 0,
      totalDays: 0,
      totalWeeks: 0,
      totalMonths: 0,
      totalHours: 0,
      dayOfBirth: '',
      daysToNextBday: 0,
      dayOfWeekNextBday: '',
      isBirthdayToday: false,
    };

    if (!dob || !refDate) return fallback;

    const birth = new Date(dob);
    const ref = new Date(refDate);

    // Reset times to midnight to calculate pure days
    birth.setHours(0, 0, 0, 0);
    ref.setHours(0, 0, 0, 0);

    if (isNaN(birth.getTime()) || isNaN(ref.getTime())) {
      return fallback;
    }

    if (birth > ref) {
      return {
        ...fallback,
        error: 'Date of Birth cannot be in the future relative to the reference date.',
      };
    }

    // 1. Exact age in Years, Months, Days
    let years = ref.getFullYear() - birth.getFullYear();
    let months = ref.getMonth() - birth.getMonth();
    let days = ref.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      // Get days in the previous month of the reference date
      const prevMonth = new Date(ref.getFullYear(), ref.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // 2. Total times lived
    const diffTime = ref.getTime() - birth.getTime();
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;

    // 3. Day of Birth
    const dayOfBirth = birth.toLocaleDateString('en-US', { weekday: 'long' });

    // 4. Next Birthday Countdown
    const nextBdayYear = ref.getFullYear();
    const nextBday = new Date(nextBdayYear, birth.getMonth(), birth.getDate());
    
    if (nextBday < ref) {
      nextBday.setFullYear(nextBdayYear + 1);
    }
    
    nextBday.setHours(0, 0, 0, 0);
    const timeToBday = nextBday.getTime() - ref.getTime();
    const daysToNextBday = Math.ceil(timeToBday / (1000 * 60 * 60 * 24));
    const dayOfWeekNextBday = nextBday.toLocaleDateString('en-US', { weekday: 'long' });

    return {
      error: '',
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      dayOfBirth,
      daysToNextBday,
      dayOfWeekNextBday,
      isBirthdayToday: daysToNextBday === 0 || (birth.getMonth() === ref.getMonth() && birth.getDate() === ref.getDate()),
    };
  }, [dob, refDate]);

  const hasValidationError = ageDetails.error !== '' && ageDetails.error !== 'Please enter valid dates.';

  return (
    <ToolPageWrapper toolId="age-calculator">
      <div className="tool-layout lg:grid-cols-12 gap-6">
        
        {/* Input Settings - 5 Columns */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="space-y-5">
            <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Calendar className="text-[var(--primary)]" size={20} />
              <span>Select Dates</span>
            </h2>

            <div className="space-y-4">
              <Input
                label="Date of Birth"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                requiredMark
              />

              <Input
                label="Age at the Date of (Reference Date)"
                type="date"
                value={refDate}
                onChange={(e) => setRefDate(e.target.value)}
                requiredMark
              />
            </div>

            <div className="pt-2 text-xs flex gap-2" style={{ color: 'var(--text-tertiary)' }}>
              <Info className="shrink-0" size={16} />
              <span>
                Default reference date is set to today. Changing it allows calculating age at any specific point in history or the future.
              </span>
            </div>
          </Card>
        </div>

        {/* Results Dashboard - 7 Columns */}
        <div className="lg:col-span-7 space-y-6">
          {hasValidationError ? (
            <Card className="border-[var(--danger)]/30 bg-[var(--danger)]/5 p-6 flex items-start gap-3">
              <ShieldAlert className="text-[var(--danger)] shrink-0 mt-0.5" size={20} />
              <div>
                <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                  Calculation Error
                </h3>
                <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                  {ageDetails.error}
                </p>
              </div>
            </Card>
          ) : ageDetails.error === '' ? (
            <>
              {/* Primary Exact Age Card */}
              <Card className="p-6 md:p-8 text-center space-y-6 relative overflow-hidden">
                {ageDetails.isBirthdayToday && (
                  <div className="absolute top-4 right-4 bg-rose-500 text-white text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full animate-bounce">
                    🎉 HAPPY BIRTHDAY!
                  </div>
                )}
                
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                    Exact Age
                  </span>
                  <div className="flex justify-center items-baseline gap-4 pt-2">
                    <div className="text-center">
                      <div className="text-4xl md:text-5xl font-black text-[var(--primary)]">
                        {ageDetails.years}
                      </div>
                      <div className="text-[10px] font-bold uppercase mt-1" style={{ color: 'var(--text-secondary)' }}>
                        Years
                      </div>
                    </div>
                    <div className="text-xl font-bold opacity-40 text-[var(--text-secondary)]">:</div>
                    <div className="text-center">
                      <div className="text-4xl md:text-5xl font-black text-[var(--primary)]">
                        {ageDetails.months}
                      </div>
                      <div className="text-[10px] font-bold uppercase mt-1" style={{ color: 'var(--text-secondary)' }}>
                        Months
                      </div>
                    </div>
                    <div className="text-xl font-bold opacity-40 text-[var(--text-secondary)]">:</div>
                    <div className="text-center">
                      <div className="text-4xl md:text-5xl font-black text-[var(--primary)]">
                        {ageDetails.days}
                      </div>
                      <div className="text-[10px] font-bold uppercase mt-1" style={{ color: 'var(--text-secondary)' }}>
                        Days
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 grid grid-cols-2 gap-4 text-left" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase">Day of Birth</span>
                    <span className="font-semibold block text-sm" style={{ color: 'var(--text-primary)' }}>
                      {ageDetails.dayOfBirth}
                    </span>
                  </div>
                  <div className="space-y-1 border-l pl-4" style={{ borderColor: 'var(--border-subtle)' }}>
                    <span className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase">Next Birthday</span>
                    <span className="font-semibold block text-sm" style={{ color: 'var(--text-primary)' }}>
                      {ageDetails.isBirthdayToday ? (
                        <span className="text-rose-500 font-bold">Today! 🎉</span>
                      ) : (
                        `In ${ageDetails.daysToNextBday} days (${ageDetails.dayOfWeekNextBday})`
                      )}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Next Birthday Details */}
              <div className="grid grid-cols-2 gap-4">
                <ResultBox
                  label="Days to Next Birthday"
                  value={ageDetails.isBirthdayToday ? 0 : ageDetails.daysToNextBday}
                  suffix=" days"
                  highlight={ageDetails.daysToNextBday < 30}
                  shouldFormat={true}
                />
                <ResultBox
                  label="Day of Birth"
                  value={ageDetails.dayOfBirth}
                  shouldFormat={false}
                />
              </div>

              {/* Lifetime Statistics Card */}
              <Card className="space-y-4">
                <h3 className="text-base font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <Clock className="text-[var(--primary)]" size={18} />
                  <span>Life Statistics (Lived Values)</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border flex flex-col justify-center" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-default)' }}>
                    <span className="text-xs text-[var(--text-secondary)] font-medium">Total Months Lived</span>
                    <span className="text-xl font-bold mt-1" style={{ color: 'var(--text-primary)' }}>
                      {ageDetails.totalMonths.toLocaleString('en-IN')} months
                    </span>
                  </div>
                  <div className="p-4 rounded-xl border flex flex-col justify-center" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-default)' }}>
                    <span className="text-xs text-[var(--text-secondary)] font-medium">Total Weeks Lived</span>
                    <span className="text-xl font-bold mt-1" style={{ color: 'var(--text-primary)' }}>
                      {ageDetails.totalWeeks.toLocaleString('en-IN')} weeks
                    </span>
                  </div>
                  <div className="p-4 rounded-xl border flex flex-col justify-center" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-default)' }}>
                    <span className="text-xs text-[var(--text-secondary)] font-medium">Total Days Lived</span>
                    <span className="text-xl font-bold mt-1" style={{ color: 'var(--text-primary)' }}>
                      {ageDetails.totalDays.toLocaleString('en-IN')} days
                    </span>
                  </div>
                  <div className="p-4 rounded-xl border flex flex-col justify-center" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-default)' }}>
                    <span className="text-xs text-[var(--text-secondary)] font-medium">Total Hours Lived</span>
                    <span className="text-xl font-bold mt-1" style={{ color: 'var(--text-primary)' }}>
                      {ageDetails.totalHours.toLocaleString('en-IN')} hours
                    </span>
                  </div>
                </div>
              </Card>
            </>
          ) : (
            <Card className="text-center py-12 text-[var(--text-tertiary)]">
              Please enter valid dates to see results.
            </Card>
          )}
        </div>

      </div>
    </ToolPageWrapper>
  );
}
