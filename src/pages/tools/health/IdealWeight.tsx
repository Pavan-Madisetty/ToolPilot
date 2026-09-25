import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Input, ResultBox, Select } from '@/components/ui';
import { Notice } from '@/components/tools/Notice';
import { healthyWeightRange, idealWeightDevine } from '@/utils/extraToolMath';

export default function IdealWeight() {
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState('170');
  const h = parseFloat(height);
  const ok = Number.isFinite(h) && h >= 100 && h <= 250;
  const [lo, hi] = ok ? healthyWeightRange(h) : [NaN, NaN];
  const lb = (kg: number) => Math.round(kg * 2.20462);

  return (
    <ToolPageWrapper toolId="ideal-weight">
      <div className="tool-layout lg:grid-cols-2">
        <Card className="space-y-5">
          <Select label="Sex" value={sex} onChange={(e) => setSex(e.target.value as 'male' | 'female')} options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]} />
          <Input label="Height (cm)" type="number" min="100" max="250" value={height} onChange={(e) => setHeight(e.target.value)} />
        </Card>
        <div className="flex flex-col gap-4">
          {ok ? (
            <>
              <ResultBox label="Ideal weight (Devine)" value={idealWeightDevine(h, sex).toFixed(1)} suffix=" kg" highlight />
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>≈ {lb(idealWeightDevine(h, sex))} lb</p>
              <ResultBox label="Healthy BMI range (18.5–24.9)" value={`${lo.toFixed(1)} – ${hi.toFixed(1)} kg`} />
            </>
          ) : <Notice tone="info" title="Enter a height">Between 100 and 250 cm.</Notice>}
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Formulas are population averages and ignore muscle mass, frame size and age. Use them as a rough guide, not a diagnosis.</p>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
