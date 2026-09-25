import { useMemo, useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, ResultBox, Textarea } from '@/components/ui';
import { Notice } from '@/components/tools/Notice';
import { describe } from '@/utils/extraToolMath';

const f = (n: number) => (Number.isFinite(n) ? String(parseFloat(n.toPrecision(8))) : '—');

export default function StatisticsCalculator() {
  const [raw, setRaw] = useState('12, 15, 15, 18, 21, 24, 24, 24, 30');
  const { stats, bad } = useMemo(() => {
    const tokens = raw.split(/[\s,;]+/).filter(Boolean);
    const nums = tokens.map(Number);
    return { stats: describe(nums), bad: tokens.filter((_, i) => !Number.isFinite(nums[i])) };
  }, [raw]);

  return (
    <ToolPageWrapper toolId="statistics-calculator">
      <div className="tool-layout lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <Card className="space-y-4">
          <Textarea label="Data set" rows={10} value={raw} onChange={(e) => setRaw(e.target.value)} helperText="Separate numbers with commas, spaces or new lines" />
          {bad.length > 0 && <Notice tone="warning" title="Ignored non-numeric values">{bad.slice(0, 8).join(', ')}{bad.length > 8 ? '…' : ''}</Notice>}
        </Card>
        {stats ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 content-start">
            <ResultBox label="Count" value={stats.count} />
            <ResultBox label="Sum" value={f(stats.sum)} />
            <ResultBox label="Mean" value={f(stats.mean)} highlight />
            <ResultBox label="Median" value={f(stats.median)} highlight />
            <ResultBox label="Mode" value={stats.modes.length ? stats.modes.map(f).join(', ') : 'None'} />
            <ResultBox label="Range" value={f(stats.range)} />
            <ResultBox label="Min" value={f(stats.min)} />
            <ResultBox label="Max" value={f(stats.max)} />
            <ResultBox label="Q1 / Q3" value={`${f(stats.q1)} / ${f(stats.q3)}`} />
            <ResultBox label="Std dev (population)" value={f(stats.sdPop)} />
            <ResultBox label="Std dev (sample)" value={f(stats.sdSample)} />
            <ResultBox label="Variance (sample)" value={f(stats.varianceSample)} />
          </div>
        ) : <Notice tone="info" title="No data yet">Enter some numbers to see statistics.</Notice>}
      </div>
    </ToolPageWrapper>
  );
}
