import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Input, Switch, StatCard } from '@/components/ui';

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(val);
};

const PRESET_RATES = [5, 12, 18, 28];

export default function GSTCalculator() {
  const [amount, setAmount] = useState<number>(10000); // default ₹10,000
  const [gstRate, setGstRate] = useState<number>(18); // default 18%
  const [isExclusive, setIsExclusive] = useState<boolean>(true); // Add GST / Exclusive of tax
  const [isInterstate, setIsInterstate] = useState<boolean>(false); // Intrastate (CGST+SGST) vs Interstate (IGST)

  const gstCalculations = useMemo(() => {
    const amt = amount || 0;
    const rate = gstRate || 0;

    let baseAmount: number;
    let gstAmount: number;
    let totalAmount: number;

    if (isExclusive) {
      // Add GST: Amount is base price
      baseAmount = amt;
      gstAmount = amt * (rate / 100);
      totalAmount = amt + gstAmount;
    } else {
      // Remove GST: Amount is inclusive of tax
      totalAmount = amt;
      baseAmount = amt / (1 + rate / 100);
      gstAmount = totalAmount - baseAmount;
    }

    // Split CGST and SGST for Intrastate transactions
    const cgst = gstAmount / 2;
    const sgst = gstAmount / 2;

    return {
      baseAmount,
      gstAmount,
      totalAmount,
      cgst,
      sgst,
    };
  }, [amount, gstRate, isExclusive]);

  return (
    <ToolPageWrapper toolId="gst-calculator">
      <div className="tool-layout">
        {/* Input parameters panel */}
        <div className="space-y-6 p-6 card">
          <Input
            label="Amount (₹)"
            type="number"
            value={amount === 0 ? '' : amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter gross or net price"
          />

          {/* Preset GST rates */}
          <div>
            <span className="label">Tax Rate (%)</span>
            <div className="grid grid-cols-5 gap-1.5 mt-1.5">
              {PRESET_RATES.map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => setGstRate(rate)}
                  className={`btn btn-secondary btn-sm ${gstRate === rate ? 'bg-[rgba(79,70,229,0.08)] border-[var(--text-link)] font-semibold' : ''}`}
                >
                  {rate}%
                </button>
              ))}
              <input
                type="number"
                value={gstRate}
                onChange={(e) => setGstRate(Number(e.target.value))}
                placeholder="Custom"
                className="input-base py-1 px-1.5 text-center text-xs"
                aria-label="Custom GST Rate"
              />
            </div>
          </div>

          <div className="border-t pt-4 space-y-4" style={{ borderColor: 'var(--border-default)' }}>
            <Switch
              label="Add GST (Exclusive)"
              checked={isExclusive}
              onChange={setIsExclusive}
              description="Calculate tax on top of base amount"
            />

            <Switch
              label="Interstate IGST"
              checked={isInterstate}
              onChange={setIsInterstate}
              description="Full tax goes to IGST instead of CGST+SGST"
            />
          </div>
        </div>

        {/* Results layout */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard label="Base Amount (Net Price)" value={formatCurrency(gstCalculations.baseAmount)} />
            <StatCard label="Total Tax (GST)" value={formatCurrency(gstCalculations.gstAmount)} highlight />
          </div>

          {/* Tax breakup breakdown box */}
          <div className="p-6 card space-y-4">
            <h3 className="text-base font-bold">Tax Breakup Details</h3>
            
            {isInterstate ? (
              <div className="flex items-center justify-between text-sm py-2">
                <span style={{ color: 'var(--text-secondary)' }}>Integrated GST (IGST)</span>
                <span className="font-semibold">{formatCurrency(gstCalculations.gstAmount)}</span>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-sm py-2 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Central GST (CGST - {gstRate / 2}%)</span>
                  <span className="font-semibold">{formatCurrency(gstCalculations.cgst)}</span>
                </div>
                <div className="flex items-center justify-between text-sm py-2">
                  <span style={{ color: 'var(--text-secondary)' }}>State GST (SGST - {gstRate / 2}%)</span>
                  <span className="font-semibold">{formatCurrency(gstCalculations.sgst)}</span>
                </div>
              </>
            )}

            <div className="border-t pt-4 flex items-center justify-between" style={{ borderColor: 'var(--border-default)' }}>
              <span className="font-bold text-base">Total Price (Inclusive of Tax)</span>
              <span className="text-xl font-extrabold text-blue-500">
                {formatCurrency(gstCalculations.totalAmount)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
