import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Input, ResultBox } from '@/components/ui';
import { Notice } from '@/components/tools/Notice';
import { heartRateZones } from '@/utils/extraToolMath';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#f97316', '#ef4444'];

export default function HeartRateZones() {
  const [age, setAge] = useState('30');
  const [resting, setResting] = useState('60');
  const a = parseFloat(age), r = parseFloat(resting);
  const ok = a >= 10 && a <= 100 && r >= 30 && r <= 120 && 220 - a > r;
  const res = ok ? heartRateZones(a, r) : null;

  return (
    <ToolPageWrapper toolId="heart-rate-zones">
      <div className="tool-layout lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <Card className="space-y-5">
          <Input label="Age (years)" type="number" min="10" max="100" value={age} onChange={(e) => setAge(e.target.value)} />
          <Input label="Resting heart rate (bpm)" type="number" min="30" max="120" value={resting} onChange={(e) => setResting(e.target.value)} helperText="Measure first thing in the morning" />
        </Card>
        <div className="flex flex-col gap-4">
          {res ? (
            <>
              <ResultBox label="Estimated max heart rate" value={res.max} suffix=" bpm" highlight />
              <ul className="space-y-2" aria-label="Heart rate zones">
                {res.zones.map((z, i) => (
                  <li key={z.name} className="flex items-center gap-3 rounded-xl border p-3" style={{ borderColor: 'var(--border-subtle)', borderLeft: `6px solid ${COLORS[i]}` }}>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">{z.name}</p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{z.pct} of heart-rate reserve</p>
                    </div>
                    <p className="font-mono text-sm tabular-nums whitespace-nowrap">{z.min}–{z.max} bpm</p>
                  </li>
                ))}
              </ul>
            </>
          ) : <Notice tone="info" title="Check your numbers">Age 10–100 and a resting heart rate of 30–120 bpm.</Notice>}
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Uses the Karvonen method with max HR = 220 − age. Consult a doctor before starting intense training.</p>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
