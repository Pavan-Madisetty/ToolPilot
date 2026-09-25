import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, Input, ResultBox } from '@/components/ui';
import { loadJSON, saveJSON } from '@/utils/safeStorage';

interface Item { id: number; name: string; amount: string }
const KEY = 'toolskyt_trip_budget_v1';
let nid = 100;
const DEFAULT: Item[] = [
  { id: 1, name: 'Flights / transport', amount: '25000' },
  { id: 2, name: 'Accommodation', amount: '18000' },
  { id: 3, name: 'Food', amount: '9000' },
  { id: 4, name: 'Activities', amount: '6000' },
  { id: 5, name: 'Shopping & misc', amount: '5000' },
];

export default function TripBudget() {
  const saved = loadJSON<{ items: Item[]; travellers: string; days: string; budget: string } | null>(KEY, null);
  const [items, setItems] = useState<Item[]>(saved?.items ?? DEFAULT);
  const [travellers, setTravellers] = useState(saved?.travellers ?? '2');
  const [days, setDays] = useState(saved?.days ?? '5');
  const [budget, setBudget] = useState(saved?.budget ?? '');

  useEffect(() => saveJSON(KEY, { items, travellers, days, budget }), [items, travellers, days, budget]);

  const total = items.reduce((s, i) => s + (parseFloat(i.amount) || 0), 0);
  const p = Math.max(1, parseInt(travellers, 10) || 1), d = Math.max(1, parseInt(days, 10) || 1);
  const b = parseFloat(budget);
  const patch = (id: number, x: Partial<Item>) => setItems((r) => r.map((i) => (i.id === id ? { ...i, ...x } : i)));
  const inr = (n: number) => Math.round(n);

  return (
    <ToolPageWrapper toolId="trip-budget">
      <div className="tool-layout lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <Card className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <Input label="Travellers" type="number" min="1" value={travellers} onChange={(e) => setTravellers(e.target.value)} />
            <Input label="Days" type="number" min="1" value={days} onChange={(e) => setDays(e.target.value)} />
            <Input label="Budget cap (₹, optional)" type="number" min="0" value={budget} onChange={(e) => setBudget(e.target.value)} />
          </div>
          <ul className="space-y-2">
            {items.map((i) => (
              <li key={i.id} className="grid grid-cols-[1fr_7rem_auto] items-center gap-2">
                <Input aria-label="Category" value={i.name} onChange={(e) => patch(i.id, { name: e.target.value })} />
                <Input aria-label={`${i.name} amount`} type="number" min="0" value={i.amount} onChange={(e) => patch(i.id, { amount: e.target.value })} />
                <button type="button" aria-label={`Remove ${i.name}`} onClick={() => setItems((r) => r.filter((x) => x.id !== i.id))} style={{ color: 'var(--text-tertiary)' }}><Trash2 size={16} /></button>
              </li>
            ))}
          </ul>
          <Button variant="secondary" size="sm" leftIcon={<Plus size={14} />} onClick={() => setItems((r) => [...r, { id: nid++, name: 'New expense', amount: '0' }])}>Add expense</Button>
        </Card>
        <div className="flex flex-col gap-4 content-start">
          <ResultBox label="Total trip cost" value={inr(total)} prefix="₹" highlight />
          <div className="grid grid-cols-2 gap-4">
            <ResultBox label="Per person" value={inr(total / p)} prefix="₹" />
            <ResultBox label="Per day" value={inr(total / d)} prefix="₹" />
          </div>
          {Number.isFinite(b) && b > 0 && (
            <ResultBox label={total <= b ? 'Under budget by' : 'Over budget by'} value={inr(Math.abs(b - total))} prefix="₹" />
          )}
          <ul className="space-y-2" aria-label="Spending share">
            {items.filter((i) => parseFloat(i.amount) > 0).map((i) => (
              <li key={i.id} className="text-sm">
                <div className="flex justify-between"><span className="truncate pr-2">{i.name}</span><span className="tabular-nums">{((parseFloat(i.amount) / total) * 100).toFixed(0)}%</span></div>
                <div className="mt-1 h-2 rounded-full" style={{ background: 'var(--border-subtle)' }}><div className="h-full rounded-full" style={{ width: `${(parseFloat(i.amount) / total) * 100}%`, background: 'var(--primary)' }} /></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
