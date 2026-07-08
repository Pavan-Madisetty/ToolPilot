import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Input, StatCard } from '@/components/ui';

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(val);
};

const TIP_PRESETS = [10, 15, 18, 20, 25];

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState<number>(100); // $100 default
  const [tipRate, setTipRate] = useState<number>(15); // 15% default tip
  const [people, setPeople] = useState<number>(2); // split between 2 default

  const calculations = useMemo(() => {
    const bill = billAmount || 0;
    const rate = tipRate || 0;
    const count = people || 1;

    const tipAmount = bill * (rate / 100);
    const totalAmount = bill + tipAmount;
    const sharePerPerson = totalAmount / count;
    const tipPerPerson = tipAmount / count;

    return {
      tipAmount,
      totalAmount,
      sharePerPerson,
      tipPerPerson,
    };
  }, [billAmount, tipRate, people]);

  return (
    <ToolPageWrapper toolId="tip-calculator">
      <div className="tool-layout">
        {/* Input variables */}
        <div className="space-y-6 p-6 border rounded-2xl bg-white dark:bg-slate-800" style={{ borderColor: 'var(--border-default)' }}>
          <Input
            label="Bill Amount ($)"
            type="number"
            value={billAmount === 0 ? '' : billAmount}
            onChange={(e) => setBillAmount(Number(e.target.value))}
            placeholder="Enter total bill amount"
          />

          <div>
            <span className="label">Tip Percentage (%)</span>
            <div className="grid grid-cols-6 gap-1.5 mt-1.5">
              {TIP_PRESETS.map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => setTipRate(rate)}
                  className={`btn btn-secondary btn-sm ${tipRate === rate ? 'bg-blue-50 border-blue-400 font-semibold' : ''}`}
                >
                  {rate}%
                </button>
              ))}
              <input
                type="number"
                value={tipRate}
                onChange={(e) => setTipRate(Number(e.target.value))}
                placeholder="Custom"
                className="input-base py-1 px-1.5 text-center text-xs"
                aria-label="Custom tip percent"
              />
            </div>
          </div>

          <Input
            label="Number of People"
            type="number"
            min={1}
            value={people === 0 ? '' : people}
            onChange={(e) => setPeople(Math.max(1, Number(e.target.value)))}
          />
        </div>

        {/* Output cards layout */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard label="Tip Amount (Total)" value={formatCurrency(calculations.tipAmount)} />
            <StatCard label="Total Bill (with Tip)" value={formatCurrency(calculations.totalAmount)} />
          </div>

          {/* Share details box */}
          <div className="border rounded-2xl p-6 bg-white dark:bg-slate-800 space-y-4" style={{ borderColor: 'var(--border-default)' }}>
            <h3 className="text-base font-bold">Split Sharing Details</h3>
            
            <div className="flex items-center justify-between text-sm py-2 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Tip Per Person</span>
              <span className="font-semibold">{formatCurrency(calculations.tipPerPerson)}</span>
            </div>

            <div className="flex items-center justify-between pt-4">
              <span className="font-bold text-base">Each Person Pays</span>
              <span className="text-2xl font-extrabold text-blue-500">
                {formatCurrency(calculations.sharePerPerson)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
