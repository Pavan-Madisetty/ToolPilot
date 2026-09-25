import { useMemo, useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Input, Select } from '@/components/ui';
import { CopyButton } from '@/components/ui/CopyButton';
import { convertBase } from '@/utils/extraToolMath';

const COMMON: [string, number][] = [['Binary', 2], ['Octal', 8], ['Decimal', 10], ['Hexadecimal', 16], ['Base 32', 32], ['Base 36', 36]];

export default function NumberBaseConverter() {
  const [value, setValue] = useState('255');
  const [from, setFrom] = useState(10);
  const [custom, setCustom] = useState(3);

  const valid = value.trim() !== '' && convertBase(value, from, 10) !== '';
  const rows = useMemo(() => [...COMMON, [`Base ${custom} (custom)`, custom] as [string, number]].map(([label, base]) => ({ label, base, out: valid ? convertBase(value, from, base) : '' })), [value, from, custom, valid]);

  return (
    <ToolPageWrapper toolId="number-base-converter">
      <div className="tool-layout lg:grid-cols-2">
        <Card className="space-y-5">
          <Input label="Number" value={value} onChange={(e) => setValue(e.target.value)} spellCheck={false} autoCapitalize="off" error={value.trim() && !valid ? `Not a valid base-${from} number` : undefined} />
          <Select label="Input base" value={String(from)} onChange={(e) => setFrom(Number(e.target.value))} options={Array.from({ length: 35 }, (_, i) => i + 2).map((b) => ({ value: String(b), label: COMMON.find(([, cb]) => cb === b)?.[0] ? `${COMMON.find(([, cb]) => cb === b)?.[0]} (${b})` : `Base ${b}` }))} />
          <Select label="Custom output base" value={String(custom)} onChange={(e) => setCustom(Number(e.target.value))} options={Array.from({ length: 35 }, (_, i) => i + 2).map((b) => ({ value: String(b), label: `Base ${b}` }))} />
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Uses arbitrary-precision integers, so very large numbers convert exactly. Digits above 9 use letters a–z.</p>
        </Card>
        <Card className="space-y-2">
          <ul className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
            {rows.map((r) => (
              <li key={r.label} className="flex items-center justify-between gap-3 py-3">
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{r.label}</span>
                <span className="flex min-w-0 items-center gap-2">
                  <code className="break-all text-right font-mono text-sm">{r.out || '—'}</code>
                  {r.out && <CopyButton text={r.out} size="xs" />}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </ToolPageWrapper>
  );
}
