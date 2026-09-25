import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Input, ResultBox, Card } from '@/components/ui';
import { Notice } from '@/components/tools/Notice';
import { cagr } from '@/utils/extraToolMath';

export default function CagrCalculator() {
  const [begin, setBegin] = useState('100000');
  const [end, setEnd] = useState('250000');
  const [years, setYears] = useState('5');

  const b = parseFloat(begin);
  const e = parseFloat(end);
  const y = parseFloat(years);
  const rate = cagr(b, e, y);
  const valid = Number.isFinite(rate);
  const absolute = valid ? ((e - b) / b) * 100 : NaN;

  return (
    <ToolPageWrapper toolId="cagr-calculator">
      <div className="tool-layout lg:grid-cols-2">
        <Card className="space-y-5">
          <Input label="Beginning Value (₹)" type="number" min="0" value={begin} onChange={(ev) => setBegin(ev.target.value)} />
          <Input label="Ending Value (₹)" type="number" min="0" value={end} onChange={(ev) => setEnd(ev.target.value)} />
          <Input label="Number of Years" type="number" min="0" step="0.5" value={years} onChange={(ev) => setYears(ev.target.value)} />
        </Card>
        <div className="flex flex-col gap-4">
          {valid ? (
            <>
              <ResultBox label="CAGR" value={rate.toFixed(2)} suffix="%" highlight />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ResultBox label="Absolute Return" value={absolute.toFixed(2)} suffix="%" />
                <ResultBox label="Absolute Gain" value={Math.round(e - b)} prefix="₹" />
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                An investment growing from ₹{b.toLocaleString('en-IN')} to ₹{e.toLocaleString('en-IN')} in {y} years grew at an
                average {rate.toFixed(2)}% per year, compounded.
              </p>
            </>
          ) : (
            <Notice tone="info" title="Enter valid values">
              Beginning value, ending value and years must all be greater than zero.
            </Notice>
          )}
        </div>
      </div>
    </ToolPageWrapper>
  );
}
