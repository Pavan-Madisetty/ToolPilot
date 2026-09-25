import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, Input, ResultBox } from '@/components/ui';
import { formatHM, shiftMinutes } from '@/utils/extraToolMath';

interface Row { id: number; label: string; start: string; end: string; brk: string }
let id = 10;
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export default function HoursCalculator() {
  const [rows, setRows] = useState<Row[]>(DAYS.map((d, i) => ({ id: i, label: d, start: '09:00', end: '17:30', brk: '30' })));
  const [rate, setRate] = useState('');
  const [otAfter, setOtAfter] = useState('40');

  const patch = (rid: number, p: Partial<Row>) => setRows((r) => r.map((x) => (x.id === rid ? { ...x, ...p } : x)));
  const mins = rows.map((r) => shiftMinutes(r.start, r.end, parseFloat(r.brk) || 0));
  const total = mins.reduce((a, b) => a + b, 0);
  const hours = total / 60;
  const ot = Math.max(0, hours - (parseFloat(otAfter) || Infinity));
  const r = parseFloat(rate);
  const pay = Number.isFinite(r) ? (hours - ot) * r + ot * r * 1.5 : null;

  return (
    <ToolPageWrapper toolId="hours-calculator">
      <div className="space-y-6">
        <Card className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] text-sm">
              <thead>
                <tr className="text-left" style={{ color: 'var(--text-secondary)' }}>
                  <th className="pb-2 pr-2 font-medium">Day</th><th className="pb-2 pr-2 font-medium">Start</th><th className="pb-2 pr-2 font-medium">End</th><th className="pb-2 pr-2 font-medium">Break (min)</th><th className="pb-2 pr-2 font-medium">Worked</th><th />
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.id} className="border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                    <td className="py-2 pr-2"><Input aria-label="Day label" value={row.label} onChange={(e) => patch(row.id, { label: e.target.value })} /></td>
                    <td className="py-2 pr-2"><Input aria-label={`${row.label} start`} type="time" value={row.start} onChange={(e) => patch(row.id, { start: e.target.value })} /></td>
                    <td className="py-2 pr-2"><Input aria-label={`${row.label} end`} type="time" value={row.end} onChange={(e) => patch(row.id, { end: e.target.value })} /></td>
                    <td className="py-2 pr-2"><Input aria-label={`${row.label} break`} type="number" min="0" value={row.brk} onChange={(e) => patch(row.id, { brk: e.target.value })} /></td>
                    <td className="py-2 pr-2 whitespace-nowrap tabular-nums">{formatHM(mins[i])}</td>
                    <td className="py-2"><button type="button" aria-label={`Remove ${row.label}`} onClick={() => setRows((r2) => r2.filter((x) => x.id !== row.id))} style={{ color: 'var(--text-tertiary)' }}><Trash2 size={16} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button variant="secondary" size="sm" leftIcon={<Plus size={14} />} onClick={() => setRows((r2) => [...r2, { id: id++, label: `Day ${r2.length + 1}`, start: '09:00', end: '17:00', brk: '30' }])}>Add day</Button>
        </Card>
        <div className="tool-layout lg:grid-cols-2">
          <Card className="grid gap-4 sm:grid-cols-2">
            <Input label="Hourly rate (₹, optional)" type="number" min="0" value={rate} onChange={(e) => setRate(e.target.value)} />
            <Input label="Overtime after (hours)" type="number" min="0" value={otAfter} onChange={(e) => setOtAfter(e.target.value)} helperText="Paid at 1.5×" />
          </Card>
          <div className="grid gap-4 sm:grid-cols-3">
            <ResultBox label="Total time" value={formatHM(total)} highlight />
            <ResultBox label="Decimal hours" value={hours.toFixed(2)} />
            <ResultBox label={ot > 0 ? `Pay (incl. ${ot.toFixed(1)}h OT)` : 'Pay'} value={pay === null ? '—' : Math.round(pay).toLocaleString('en-IN')} prefix={pay === null ? '' : '₹'} />
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
