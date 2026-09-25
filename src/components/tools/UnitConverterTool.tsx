import { useMemo, useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, Input, Select } from '@/components/ui';
import { CopyButton } from '@/components/ui/CopyButton';
import { formatNumber } from '@/utils/extraToolMath';

export interface Unit {
  value: string;
  label: string;
  /** How many base units make one of this unit. */
  factor: number;
}

interface Props {
  toolId: string;
  units: Unit[];
  defaultFrom: string;
  defaultTo: string;
  defaultValue?: number;
}

/** Generic, table-driven unit converter (linear units only). */
export function UnitConverterTool({ toolId, units, defaultFrom, defaultTo, defaultValue = 1 }: Props) {
  const [value, setValue] = useState(String(defaultValue));
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);

  const num = parseFloat(value);
  const fromU = units.find((u) => u.value === from) ?? units[0];
  const toU = units.find((u) => u.value === to) ?? units[1];
  const result = useMemo(() => (Number.isFinite(num) ? (num * fromU.factor) / toU.factor : NaN), [num, fromU, toU]);
  const all = useMemo(() => units.map((u) => ({ ...u, out: Number.isFinite(num) ? (num * fromU.factor) / u.factor : NaN })), [units, num, fromU]);
  const options = units.map((u) => ({ value: u.value, label: u.label }));

  return (
    <ToolPageWrapper toolId={toolId}>
      <div className="tool-layout lg:grid-cols-2">
        <Card className="space-y-5">
          <Input label="Value" type="number" step="any" value={value} onChange={(e) => setValue(e.target.value)} error={value !== '' && !Number.isFinite(num) ? 'Enter a valid number' : undefined} />
          <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3">
            <Select label="From" value={from} onChange={(e) => setFrom(e.target.value)} options={options} />
            <Button variant="secondary" size="sm" aria-label="Swap units" onClick={() => { setFrom(to); setTo(from); }}><ArrowLeftRight size={16} /></Button>
            <Select label="To" value={to} onChange={(e) => setTo(e.target.value)} options={options} />
          </div>
          <div className="rounded-xl p-5" style={{ background: 'var(--primary-subtle)' }}>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{Number.isFinite(num) ? `${formatNumber(num)} ${fromU.label}` : '—'} =</p>
            <div className="mt-1 flex items-center justify-between gap-3">
              <p className="text-3xl font-bold break-all" style={{ color: 'var(--primary)' }}>{formatNumber(result)}</p>
              <CopyButton text={formatNumber(result)} />
            </div>
            <p className="text-sm mt-1">{toU.label}</p>
          </div>
        </Card>
        <Card className="space-y-2">
          <h2 className="text-lg font-bold">All conversions</h2>
          <ul className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
            {all.map((u) => (
              <li key={u.value} className="flex items-center justify-between gap-3 py-2 text-sm">
                <span style={{ color: 'var(--text-secondary)' }}>{u.label}</span>
                <span className="font-mono tabular-nums break-all text-right">{formatNumber(u.out)}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </ToolPageWrapper>
  );
}
