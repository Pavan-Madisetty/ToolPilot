import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Slider, Select, StatCard } from '@/components/ui';

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
};

const FREQUENCY_OPTIONS = [
  { value: '1', label: 'Annually' },
  { value: '2', label: 'Semi-Annually' },
  { value: '4', label: 'Quarterly' },
  { value: '12', label: 'Monthly' },
  { value: '365', label: 'Daily' },
];

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState<number>(100000); // ₹1 Lakh default
  const [rate, setRate] = useState<number>(8); // 8% default interest
  const [years, setYears] = useState<number>(5); // 5 years default
  const [frequency, setFrequency] = useState<string>('1'); // annually default

  const calculations = useMemo(() => {
    const P = principal;
    const r = rate / 100;
    const t = years;
    const n = Number(frequency);

    // Formula: A = P * (1 + r/n)^(n*t)
    const totalAmount = P * Math.pow(1 + r / n, n * t);
    const interestEarned = totalAmount - P;

    // Effective Annual Rate (EAR) = (1 + r/n)^n - 1
    const ear = (Math.pow(1 + r / n, n) - 1) * 100;

    return {
      totalAmount,
      interestEarned,
      ear,
    };
  }, [principal, rate, years, frequency]);

  return (
    <ToolPageWrapper toolId="compound-interest-calculator">
      <div className="tool-layout">
        {/* Sliders panel */}
        <div className="space-y-6 p-6 card">
          <Slider
            label="Principal Amount (₹)"
            min={1000}
            max={10000000}
            step={1000}
            value={principal}
            onChange={setPrincipal}
          />
          <Slider
            label="Annual Rate (Interest)"
            min={1}
            max={30}
            step={0.1}
            value={rate}
            onChange={setRate}
            suffix="%"
          />
          <Slider
            label="Time Period (Years)"
            min={1}
            max={40}
            step={1}
            value={years}
            onChange={setYears}
            suffix=" Yr"
          />

          <Select
            label="Compounding Frequency"
            options={FREQUENCY_OPTIONS}
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          />
        </div>

        {/* Results Layout */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard label="Invested Principal" value={formatCurrency(principal)} />
            <StatCard label="Interest Earned" value={formatCurrency(calculations.interestEarned)} highlight />
          </div>

          <div className="p-6 card space-y-4">
            <h3 className="text-base font-bold">Investment Growth Breakdown</h3>

            <div className="flex items-center justify-between text-sm py-2 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Effective Annual Rate (EAR)</span>
              <span className="font-semibold">{calculations.ear.toFixed(2)}%</span>
            </div>

            <div className="flex items-center justify-between pt-4">
              <span className="font-bold text-base">Maturity Value (A)</span>
              <span className="text-2xl font-extrabold text-primary">
                {formatCurrency(calculations.totalAmount)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
