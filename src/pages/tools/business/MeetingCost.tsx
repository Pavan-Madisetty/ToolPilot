import { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, Input, ResultBox, Select } from '@/components/ui';

export default function MeetingCost() {
  const [people, setPeople] = useState('6');
  const [rate, setRate] = useState('1500');
  const [rateType, setRateType] = useState<'hour' | 'year'>('hour');
  const [planned, setPlanned] = useState('60');
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const last = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    last.current = performance.now();
    const id = setInterval(() => {
      const now = performance.now();
      setElapsed((e) => e + (now - (last.current ?? now)) / 1000);
      last.current = now;
    }, 250);
    return () => clearInterval(id);
  }, [running]);

  const n = Math.max(0, parseFloat(people) || 0);
  const r = Math.max(0, parseFloat(rate) || 0);
  const perHour = n * (rateType === 'hour' ? r : r / 2000); // 2,000 working hours per year
  const perSecond = perHour / 3600;
  const plannedMin = Math.max(0, parseFloat(planned) || 0);
  const mm = Math.floor(elapsed / 60), ss = Math.floor(elapsed % 60);

  return (
    <ToolPageWrapper toolId="meeting-cost">
      <div className="tool-layout lg:grid-cols-2">
        <Card className="space-y-5">
          <Input label="Attendees" type="number" min="1" value={people} onChange={(e) => setPeople(e.target.value)} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Average cost per person (₹)" type="number" min="0" value={rate} onChange={(e) => setRate(e.target.value)} />
            <Select label="Per" value={rateType} onChange={(e) => setRateType(e.target.value as 'hour' | 'year')} options={[{ value: 'hour', label: 'Hour' }, { value: 'year', label: 'Year (÷2000 hrs)' }]} />
          </div>
          <Input label="Planned length (minutes)" type="number" min="1" value={planned} onChange={(e) => setPlanned(e.target.value)} />
        </Card>
        <div className="flex flex-col gap-4">
          <ResultBox label="Planned meeting cost" value={Math.round((perHour * plannedMin) / 60)} prefix="₹" />
          <ResultBox label={`Live cost · ${mm}:${String(ss).padStart(2, '0')}`} value={Math.round(perSecond * elapsed)} prefix="₹" highlight />
          <div className="flex flex-wrap gap-2">
            <Button leftIcon={running ? <Pause size={16} /> : <Play size={16} />} onClick={() => setRunning((v) => !v)}>{running ? 'Pause' : elapsed > 0 ? 'Resume' : 'Start meeting'}</Button>
            <Button variant="secondary" leftIcon={<RotateCcw size={16} />} onClick={() => { setRunning(false); setElapsed(0); }}>Reset</Button>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Burning about ₹{Math.round(perHour / 60).toLocaleString('en-IN')} every minute.</p>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
