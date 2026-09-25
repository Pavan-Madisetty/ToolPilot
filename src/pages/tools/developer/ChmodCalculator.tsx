import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Input } from '@/components/ui';
import { CopyButton } from '@/components/ui/CopyButton';
import { octalMode, symbolicMode } from '@/utils/extraToolMath';

const ROWS = ['Owner', 'Group', 'Others'] as const;
const COLS = [
  { label: 'Read', bit: 4 },
  { label: 'Write', bit: 2 },
  { label: 'Execute', bit: 1 },
];

const PRESETS: [string, number][] = [
  ['644 · files', 0o644],
  ['755 · scripts/dirs', 0o755],
  ['600 · private', 0o600],
  ['700 · private dir', 0o700],
  ['777 · everyone (avoid)', 0o777],
];

export default function ChmodCalculator() {
  const [bits, setBits] = useState(0o755);
  const [octalText, setOctalText] = useState('755');
  const [file, setFile] = useState('file.sh');

  const apply = (n: number) => {
    setBits(n);
    setOctalText(octalMode(n));
  };
  const toggle = (rowIdx: number, bit: number) => apply(bits ^ (bit << ((2 - rowIdx) * 3)));
  const has = (rowIdx: number, bit: number) => Boolean(bits & (bit << ((2 - rowIdx) * 3)));

  const onOctal = (v: string) => {
    const clean = v.replace(/[^0-7]/g, '').slice(0, 3);
    setOctalText(clean);
    if (clean.length === 3) setBits(parseInt(clean, 8));
  };

  const cmd = `chmod ${octalMode(bits)} ${file || 'file'}`;

  return (
    <ToolPageWrapper toolId="chmod-calculator">
      <div className="tool-layout lg:grid-cols-2">
        <Card className="space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Permission matrix">
              <thead>
                <tr style={{ color: 'var(--text-secondary)' }}>
                  <th className="text-left py-2 font-medium">&nbsp;</th>
                  {COLS.map((c) => (
                    <th key={c.label} className="py-2 font-medium">{c.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, ri) => (
                  <tr key={row} className="border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                    <th scope="row" className="text-left py-3 font-medium">{row}</th>
                    {COLS.map((c) => (
                      <td key={c.label} className="text-center py-3">
                        <input
                          type="checkbox"
                          className="h-5 w-5 cursor-pointer accent-[var(--primary)]"
                          checked={has(ri, c.bit)}
                          onChange={() => toggle(ri, c.bit)}
                          aria-label={`${row} ${c.label}`}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <p className="label">Common presets</p>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map(([label, n]) => (
                <button key={label} type="button" className="btn btn-secondary btn-sm" onClick={() => apply(n)}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </Card>
        <Card className="space-y-5">
          <Input label="Octal" value={octalText} onChange={(e) => onOctal(e.target.value)} maxLength={3} inputMode="numeric" helperText="Three digits, each 0–7" />
          <Input label="File name" value={file} onChange={(e) => setFile(e.target.value)} />
          <div className="space-y-2">
            <p className="label">Symbolic</p>
            <code className="block rounded-xl p-3 font-mono text-lg" style={{ background: 'var(--bg-subtle, var(--bg-surface))' }}>-{symbolicMode(bits)}</code>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="label mb-0">Command</p>
              <CopyButton text={cmd} />
            </div>
            <code className="block rounded-xl p-3 font-mono break-all" style={{ background: 'var(--bg-subtle, var(--bg-surface))' }}>{cmd}</code>
          </div>
        </Card>
      </div>
    </ToolPageWrapper>
  );
}
