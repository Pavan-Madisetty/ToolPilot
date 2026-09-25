import { useEffect, useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card } from '@/components/ui';
import { CopyButton } from '@/components/ui/CopyButton';

function collect(): [string, string][] {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { effectiveType?: string; downlink?: number } };
  return [
    ['Screen resolution', `${screen.width} × ${screen.height}`],
    ['Available screen', `${screen.availWidth} × ${screen.availHeight}`],
    ['Viewport (window)', `${window.innerWidth} × ${window.innerHeight}`],
    ['Device pixel ratio', String(window.devicePixelRatio)],
    ['Colour depth', `${screen.colorDepth}-bit`],
    ['Orientation', screen.orientation?.type ?? (window.innerWidth > window.innerHeight ? 'landscape' : 'portrait')],
    ['Colour scheme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Dark' : 'Light'],
    ['Reduced motion', window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'Yes' : 'No'],
    ['Touch points', String(nav.maxTouchPoints ?? 0)],
    ['Language', nav.language],
    ['Languages', (nav.languages ?? []).join(', ')],
    ['Time zone', Intl.DateTimeFormat().resolvedOptions().timeZone],
    ['CPU threads', String(nav.hardwareConcurrency ?? 'n/a')],
    ['Device memory', nav.deviceMemory ? `≥ ${nav.deviceMemory} GB` : 'n/a'],
    ['Online', nav.onLine ? 'Yes' : 'No'],
    ['Cookies enabled', nav.cookieEnabled ? 'Yes' : 'No'],
    ['Connection', nav.connection?.effectiveType ? `${nav.connection.effectiveType} (${nav.connection.downlink ?? '?'} Mbps)` : 'n/a'],
    ['Platform', nav.platform || 'n/a'],
    ['User agent', nav.userAgent],
  ];
}

export default function DeviceInfo() {
  const [rows, setRows] = useState<[string, string][]>(() => collect());
  useEffect(() => {
    const update = () => setRows(collect());
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  const asText = rows.map(([k, v]) => `${k}: ${v}`).join('\n');

  return (
    <ToolPageWrapper toolId="device-info">
      <Card className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Read locally from your browser — nothing is sent anywhere. Resize the window to see live values.</p>
          <CopyButton text={asText} label="Copy all" />
        </div>
        <dl className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
          {rows.map(([k, v]) => (
            <div key={k} className="grid gap-1 py-2 sm:grid-cols-[14rem_1fr] sm:gap-4">
              <dt className="text-sm" style={{ color: 'var(--text-secondary)' }}>{k}</dt>
              <dd className="break-words font-mono text-sm">{v || '—'}</dd>
            </div>
          ))}
        </dl>
      </Card>
    </ToolPageWrapper>
  );
}
