import { useMemo, useRef, useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, Switch, Textarea } from '@/components/ui';
import { Notice } from '@/components/tools/Notice';

const COLORS = ['#4648d4', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6'];

function secureIndex(n: number): number {
  const buf = new Uint32Array(1);
  const limit = Math.floor(0x100000000 / n) * n;
  do crypto.getRandomValues(buf); while (buf[0] >= limit);
  return buf[0] % n;
}

export default function RandomPicker() {
  const [raw, setRaw] = useState('Asha\nRavi\nMeera\nKabir\nDiya');
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [removeWinner, setRemoveWinner] = useState(false);
  const rot = useRef(0);

  const options = useMemo(() => raw.split(/\r?\n/).map((s) => s.trim()).filter(Boolean).slice(0, 60), [raw]);
  const n = options.length;
  const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const spin = () => {
    if (spinning || n < 2) return;
    const idx = secureIndex(n);
    const slice = 360 / n;
    // Pointer is at the top (0°). Slice i spans [i*slice, (i+1)*slice] before rotation.
    const target = 360 - (idx * slice + slice / 2);
    const jitter = (Math.random() - 0.5) * slice * 0.7;
    const next = rot.current + 360 * 5 + ((target + jitter - (rot.current % 360)) + 360) % 360;
    rot.current = next;
    setWinner(null);
    setSpinning(true);
    setRotation(next);
    const done = () => {
      setSpinning(false);
      setWinner(options[idx]);
      if (removeWinner) setRaw(options.filter((_, i) => i !== idx).join('\n'));
    };
    if (reduced) done(); else window.setTimeout(done, 4200);
  };

  const R = 150;
  const slices = options.map((label, i) => {
    const a0 = ((i * 360) / n - 90) * (Math.PI / 180);
    const a1 = (((i + 1) * 360) / n - 90) * (Math.PI / 180);
    const large = 360 / n > 180 ? 1 : 0;
    const d = n === 1 ? `M0 0 L${R} 0 A${R} ${R} 0 1 1 ${-R} 0 A${R} ${R} 0 1 1 ${R} 0Z` : `M0 0 L${R * Math.cos(a0)} ${R * Math.sin(a0)} A${R} ${R} 0 ${large} 1 ${R * Math.cos(a1)} ${R * Math.sin(a1)}Z`;
    const mid = (a0 + a1) / 2;
    return { label, d, color: COLORS[i % COLORS.length], tx: R * 0.62 * Math.cos(mid), ty: R * 0.62 * Math.sin(mid), rot: (mid * 180) / Math.PI };
  });

  return (
    <ToolPageWrapper toolId="random-picker">
      <div className="tool-layout lg:grid-cols-2">
        <Card className="space-y-4">
          <Textarea label={`Options · ${n}`} rows={12} value={raw} onChange={(e) => setRaw(e.target.value)} helperText="One option per line (max 60)" />
          <Switch label="Remove winner after each spin" checked={removeWinner} onChange={setRemoveWinner} />
        </Card>
        <div className="flex flex-col items-center gap-5">
          <div className="relative w-full max-w-sm">
            <div className="absolute left-1/2 top-[-6px] z-10 -translate-x-1/2" aria-hidden="true">
              <svg width="26" height="30" viewBox="0 0 26 30"><path d="M13 30 L0 4 Q13 -4 26 4Z" fill="var(--text-primary)" /></svg>
            </div>
            <svg viewBox="-160 -160 320 320" className="w-full" role="img" aria-label={`Wheel with ${n} options`} style={{ transform: `rotate(${rotation}deg)`, transition: spinning && !reduced ? 'transform 4s cubic-bezier(0.12, 0.7, 0.1, 1)' : 'none' }}>
              {n === 0 && <circle r={R} fill="var(--border-subtle)" />}
              {slices.map((s, i) => (
                <g key={i}>
                  <path d={s.d} fill={s.color} stroke="#fff" strokeWidth="1.5" />
                  {n > 1 && <text x={s.tx} y={s.ty} fill="#fff" fontSize={n > 20 ? 7 : n > 10 ? 10 : 13} fontWeight="600" textAnchor="middle" dominantBaseline="middle" transform={`rotate(${s.rot} ${s.tx} ${s.ty})`}>{s.label.length > 14 ? `${s.label.slice(0, 13)}…` : s.label}</text>}
                </g>
              ))}
              <circle r="14" fill="#fff" stroke="var(--border-default)" />
            </svg>
          </div>
          <Button size="lg" onClick={spin} disabled={spinning || n < 2}>{spinning ? 'Spinning…' : 'Spin the wheel'}</Button>
          {n < 2 && <Notice tone="info">Add at least two options to spin.</Notice>}
          <div aria-live="polite" className="min-h-[3rem] text-center">
            {winner && <p className="text-2xl font-bold break-words" style={{ color: 'var(--primary)' }}>🎉 {winner}</p>}
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
