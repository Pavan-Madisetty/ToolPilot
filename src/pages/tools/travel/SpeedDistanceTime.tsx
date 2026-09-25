import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Input, ResultBox, Select, Tabs } from '@/components/ui';
import { Notice } from '@/components/tools/Notice';

type Solve = 'time' | 'speed' | 'distance';
const hm = (h: number) => {
  const total = Math.round(h * 60);
  const d = Math.floor(total / 1440), hh = Math.floor((total % 1440) / 60), mm = total % 60;
  return `${d ? `${d}d ` : ''}${hh}h ${String(mm).padStart(2, '0')}m`;
};

export default function SpeedDistanceTime() {
  const [solve, setSolve] = useState<Solve>('time');
  const [unit, setUnit] = useState<'km' | 'mi'>('km');
  const [dist, setDist] = useState('450');
  const [speed, setSpeed] = useState('60');
  const [hours, setHours] = useState('7');
  const [mins, setMins] = useState('30');
  const [depart, setDepart] = useState('08:00');

  const d = parseFloat(dist), s = parseFloat(speed);
  const t = (parseFloat(hours) || 0) + (parseFloat(mins) || 0) / 60;

  let out: { label: string; value: string } | null = null;
  let travelHours: number | null = null;
  if (solve === 'time' && d >= 0 && s > 0) { travelHours = d / s; out = { label: 'Travel time', value: hm(travelHours) }; }
  if (solve === 'speed' && d >= 0 && t > 0) { out = { label: `Average speed`, value: `${(d / t).toFixed(2)} ${unit}/h` }; travelHours = t; }
  if (solve === 'distance' && s >= 0 && t > 0) { out = { label: 'Distance', value: `${(s * t).toFixed(2)} ${unit}` }; travelHours = t; }

  let eta = '';
  const m = /^(\d{2}):(\d{2})$/.exec(depart);
  if (m && travelHours !== null) {
    const total = parseInt(m[1], 10) * 60 + parseInt(m[2], 10) + Math.round(travelHours * 60);
    const days = Math.floor(total / 1440);
    const r = total % 1440;
    eta = `${String(Math.floor(r / 60)).padStart(2, '0')}:${String(r % 60).padStart(2, '0')}${days ? ` (+${days} day${days > 1 ? 's' : ''})` : ''}`;
  }

  return (
    <ToolPageWrapper toolId="speed-distance-time">
      <div className="space-y-6">
        <Tabs activeTab={solve} onTabChange={(k) => setSolve(k as Solve)} ariaLabel="Solve for" tabs={[{ key: 'time', name: 'Find time' }, { key: 'speed', name: 'Find speed' }, { key: 'distance', name: 'Find distance' }]} />
        <div className="tool-layout lg:grid-cols-2">
          <Card className="space-y-5">
            <Select label="Unit" value={unit} onChange={(e) => setUnit(e.target.value as 'km' | 'mi')} options={[{ value: 'km', label: 'Kilometres' }, { value: 'mi', label: 'Miles' }]} />
            {solve !== 'distance' && <Input label={`Distance (${unit})`} type="number" min="0" value={dist} onChange={(e) => setDist(e.target.value)} />}
            {solve !== 'speed' && <Input label={`Speed (${unit}/h)`} type="number" min="0" value={speed} onChange={(e) => setSpeed(e.target.value)} />}
            {solve !== 'time' && (
              <div className="grid grid-cols-2 gap-4">
                <Input label="Hours" type="number" min="0" value={hours} onChange={(e) => setHours(e.target.value)} />
                <Input label="Minutes" type="number" min="0" max="59" value={mins} onChange={(e) => setMins(e.target.value)} />
              </div>
            )}
            <Input label="Departure time (for ETA)" type="time" value={depart} onChange={(e) => setDepart(e.target.value)} />
          </Card>
          <div className="flex flex-col gap-4">
            {out ? <ResultBox label={out.label} value={out.value} highlight /> : <Notice tone="info" title="Enter valid values">Speed and time must be greater than zero.</Notice>}
            {out && eta && <ResultBox label="Estimated arrival" value={eta} />}
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
