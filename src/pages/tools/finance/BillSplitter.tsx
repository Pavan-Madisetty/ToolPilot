import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Slider } from '@/components/ui';

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(val);
};

export default function BillSplitter() {
  const [billAmount, setBillAmount] = useState(120); // $120 default bill
  const [numPeople, setNumPeople] = useState(4); // 4 people default split
  const [tipPercent, setTipPercent] = useState(15); // 15% tip default
  const [taxPercent, setTaxPercent] = useState(8); // 8% tax default

  const splitDetails = useMemo(() => {
    const amount = billAmount;
    const tip = amount * (tipPercent / 100);
    const tax = amount * (taxPercent / 100);
    const totalBill = amount + tip + tax;
    const perPerson = numPeople > 0 ? totalBill / numPeople : 0;

    return {
      tipAmount: tip,
      taxAmount: tax,
      totalBill,
      perPerson,
    };
  }, [billAmount, numPeople, tipPercent, taxPercent]);

  return (
    <ToolPageWrapper toolId="bill-splitter">
      <div className="tool-layout">
        {/* Sliders Sidebar */}
        <div className="space-y-6 p-6 card">
          <Slider
            label="Bill Amount ($)"
            min={10}
            max={5000}
            step={5}
            value={billAmount}
            onChange={setBillAmount}
          />
          <Slider
            label="Number of People"
            min={1}
            max={50}
            step={1}
            value={numPeople}
            onChange={setNumPeople}
          />
          <Slider
            label="Tip Percentage (%)"
            min={0}
            max={40}
            step={1}
            value={tipPercent}
            onChange={setTipPercent}
            suffix="%"
          />
          <Slider
            label="Sales Tax (%)"
            min={0}
            max={25}
            step={0.5}
            value={taxPercent}
            onChange={setTaxPercent}
            suffix="%"
          />
        </div>

        {/* Results layout */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="result-box text-center">
              <span className="result-label">Total Bill Amount</span>
              <div className="result-value text-primary">
                {formatCurrency(splitDetails.totalBill)}
              </div>
            </div>
            <div className="result-box text-center">
              <span className="result-label">Tip / Tax Amounts</span>
              <div className="result-value text-warning">
                {formatCurrency(splitDetails.tipAmount)} / {formatCurrency(splitDetails.taxAmount)}
              </div>
            </div>
            <div className="result-box text-center">
              <span className="result-label">Amount Per Person</span>
              <div className="result-value text-success">
                {formatCurrency(splitDetails.perPerson)}
              </div>
            </div>
          </div>

          <div className="p-6 card">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
              Detailed Bill Summary
            </h3>
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div
                className="flex justify-between border-b pb-2"
                style={{ borderColor: 'var(--border-default)' }}
              >
                <span>Subtotal Base Bill:</span>
                <span className="font-semibold">{formatCurrency(billAmount)}</span>
              </div>
              <div
                className="flex justify-between border-b pb-2"
                style={{ borderColor: 'var(--border-default)' }}
              >
                <span>Tip Added ({tipPercent}%):</span>
                <span className="font-semibold">{formatCurrency(splitDetails.tipAmount)}</span>
              </div>
              <div
                className="flex justify-between border-b pb-2"
                style={{ borderColor: 'var(--border-default)' }}
              >
                <span>Sales Tax Added ({taxPercent}%):</span>
                <span className="font-semibold">{formatCurrency(splitDetails.taxAmount)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-1">
                <span>Total Bill Due:</span>
                <span style={{ color: 'var(--text-primary)' }}>
                  {formatCurrency(splitDetails.totalBill)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
