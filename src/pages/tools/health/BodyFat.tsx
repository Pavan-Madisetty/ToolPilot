import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Input, ResultBox, Select } from '@/components/ui';
import { Notice } from '@/components/tools/Notice';
import { navyBodyFat } from '@/utils/extraToolMath';

function category(sex: 'male' | 'female', bf: number): string {
  const c = sex === 'male' ? [6, 14, 18, 25] : [14, 21, 25, 32];
  if (bf < c[0]) return 'Essential fat';
  if (bf < c[1]) return 'Athletic';
  if (bf < c[2]) return 'Fitness';
  if (bf < c[3]) return 'Average';
  return 'Above average';
}

export default function BodyFat() {
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState('178');
  const [neck, setNeck] = useState('38');
  const [waist, setWaist] = useState('88');
  const [hip, setHip] = useState('95');
  const [weight, setWeight] = useState('75');

  const bf = navyBodyFat(sex, parseFloat(height), parseFloat(neck), parseFloat(waist), parseFloat(hip));
  const ok = Number.isFinite(bf) && bf > 0 && bf < 70;
  const w = parseFloat(weight);

  return (
    <ToolPageWrapper toolId="body-fat-calculator">
      <div className="tool-layout lg:grid-cols-2">
        <Card className="space-y-4">
          <Select label="Sex" value={sex} onChange={(e) => setSex(e.target.value as 'male' | 'female')} options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Height (cm)" type="number" min="0" value={height} onChange={(e) => setHeight(e.target.value)} />
            <Input label="Weight (kg, optional)" type="number" min="0" value={weight} onChange={(e) => setWeight(e.target.value)} />
            <Input label="Neck (cm)" type="number" min="0" value={neck} onChange={(e) => setNeck(e.target.value)} />
            <Input label="Waist (cm, at navel)" type="number" min="0" value={waist} onChange={(e) => setWaist(e.target.value)} />
            {sex === 'female' && <Input label="Hip (cm, widest)" type="number" min="0" value={hip} onChange={(e) => setHip(e.target.value)} />}
          </div>
        </Card>
        <div className="flex flex-col gap-4">
          {ok ? (
            <>
              <ResultBox label={`Body fat · ${category(sex, bf)}`} value={bf.toFixed(1)} suffix="%" highlight />
              {Number.isFinite(w) && w > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  <ResultBox label="Fat mass" value={((w * bf) / 100).toFixed(1)} suffix=" kg" />
                  <ResultBox label="Lean mass" value={(w - (w * bf) / 100).toFixed(1)} suffix=" kg" />
                </div>
              )}
            </>
          ) : <Notice tone="info" title="Check your measurements">Waist must be larger than neck, and all values must be realistic centimetre measurements.</Notice>}
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>The U.S. Navy method is an estimate (±3–4%). It is not a medical measurement.</p>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
