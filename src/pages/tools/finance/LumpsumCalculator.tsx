import { useMemo, useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Slider, ResultBox, Card } from '@/components/ui';
import { GrowthChart } from '@/components/tools/GrowthChart';
import { lumpsumFutureValue } from '@/utils/extraToolMath';

export default function LumpsumCalculator() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const calc = useMemo(() => {
    const labels: string[] = [];
    const invested: number[] = [];
    const value: number[] = [];
    for (let y = 0; y <= years; y++) {
      labels.push(`Yr ${y}`);
      invested.push(amount);
      value.push(lumpsumFutureValue(amount, rate, y));
    }
    const fv = value[value.length - 1];
    return { labels, invested, value, fv, gain: fv - amount };
  }, [amount, rate, years]);

  return (
    <ToolPageWrapper toolId="lumpsum-calculator">
      <div className="tool-layout lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <Card className="space-y-6">
          <Slider label="Investment Amount (₹)" min={1000} max={50000000} step={1000} value={amount} onChange={setAmount} />
          <Slider label="Expected Return (p.a. %)" min={1} max={30} step={0.1} value={rate} onChange={setRate} suffix="%" />
          <Slider label="Time Period (Years)" min={1} max={40} step={1} value={years} onChange={setYears} suffix=" Yr" />
        </Card>
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultBox label="Invested" value={amount} prefix="₹" />
            <ResultBox label="Estimated Returns" value={Math.round(calc.gain)} prefix="₹" />
            <ResultBox label="Total Value" value={Math.round(calc.fv)} prefix="₹" highlight />
          </div>
          <Card>
            <GrowthChart
              labels={calc.labels}
              series={[
                { label: 'Value', data: calc.value, color: 'success' },
                { label: 'Invested', data: calc.invested, color: 'info' },
              ]}
            />
          </Card>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            Returns are illustrative and assume a constant annual rate. Actual market returns vary and are not guaranteed.
          </p>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
