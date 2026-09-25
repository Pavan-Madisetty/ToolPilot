import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Input, ResultBox, Select, Switch } from '@/components/ui';
import { Notice } from '@/components/tools/Notice';
import { waterIntakeLitres } from '@/utils/extraToolMath';

export default function WaterIntake() {
  const [weight, setWeight] = useState('70');
  const [unit, setUnit] = useState<'kg' | 'lb'>('kg');
  const [activity, setActivity] = useState('30');
  const [hot, setHot] = useState(false);

  const w = parseFloat(weight);
  const kg = unit === 'kg' ? w : w * 0.45359237;
  const ok = Number.isFinite(kg) && kg >= 20 && kg <= 300;
  const litres = ok ? waterIntakeLitres(kg, Math.max(0, parseFloat(activity) || 0), hot) : NaN;

  return (
    <ToolPageWrapper toolId="water-intake">
      <div className="tool-layout lg:grid-cols-2">
        <Card className="space-y-5">
          <div className="grid grid-cols-[1fr_7rem] gap-3 items-end">
            <Input label="Body weight" type="number" min="0" value={weight} onChange={(e) => setWeight(e.target.value)} />
            <Select label="Unit" value={unit} onChange={(e) => setUnit(e.target.value as 'kg' | 'lb')} options={[{ value: 'kg', label: 'kg' }, { value: 'lb', label: 'lb' }]} />
          </div>
          <Input label="Exercise per day (minutes)" type="number" min="0" value={activity} onChange={(e) => setActivity(e.target.value)} />
          <Switch label="Hot or humid climate" description="Adds about 0.5 L" checked={hot} onChange={setHot} />
        </Card>
        <div className="flex flex-col gap-4">
          {ok ? (
            <>
              <ResultBox label="Recommended daily water" value={litres.toFixed(1)} suffix=" L" highlight />
              <div className="grid grid-cols-2 gap-4">
                <ResultBox label="Glasses (250 mL)" value={Math.round((litres * 1000) / 250)} />
                <ResultBox label="Ounces" value={Math.round(litres * 33.814)} />
              </div>
            </>
          ) : <Notice tone="info" title="Enter a realistic weight">Between 20 and 300 kg (about 45–660 lb).</Notice>}
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>General guideline (~35 mL per kg plus adjustments) that includes water from food and drinks. Needs vary with health conditions, pregnancy and medication — ask a clinician for personal advice.</p>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
