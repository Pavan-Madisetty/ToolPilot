import { useMemo, useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Input } from '@/components/ui';
import { CopyButton } from '@/components/ui/CopyButton';
import { Notice } from '@/components/tools/Notice';

export default function UrlParser() {
  const [value, setValue] = useState('https://user:pass@example.com:8080/path/to/page?utm_source=news&tag=a&tag=b#section-2');

  const parsed = useMemo(() => {
    const raw = value.trim();
    if (!raw) return null;
    try {
      const url = new URL(/^[a-z][a-z0-9+.-]*:/i.test(raw) ? raw : `https://${raw}`);
      return { url, params: [...url.searchParams.entries()] };
    } catch {
      return 'invalid' as const;
    }
  }, [value]);

  const parts =
    parsed && parsed !== 'invalid'
      ? ([
          ['Protocol', parsed.url.protocol],
          ['Username', parsed.url.username],
          ['Password', parsed.url.password],
          ['Hostname', parsed.url.hostname],
          ['Port', parsed.url.port],
          ['Origin', parsed.url.origin],
          ['Path', parsed.url.pathname],
          ['Query string', parsed.url.search],
          ['Hash', parsed.url.hash],
        ] as [string, string][])
      : [];

  return (
    <ToolPageWrapper toolId="url-parser">
      <div className="space-y-6">
        <Card>
          <Input label="URL" value={value} onChange={(e) => setValue(e.target.value)} placeholder="https://example.com/path?x=1" spellCheck={false} />
        </Card>
        {parsed === 'invalid' && <Notice tone="danger" title="Not a valid URL">Check the address and try again.</Notice>}
        {parsed && parsed !== 'invalid' && (
          <div className="tool-layout lg:grid-cols-2">
            <Card className="space-y-2">
              <h2 className="text-lg font-bold">Components</h2>
              <dl className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                {parts.map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-3 py-2">
                    <dt className="text-sm" style={{ color: 'var(--text-secondary)' }}>{k}</dt>
                    <dd className="flex min-w-0 items-center gap-2">
                      <code className="truncate text-sm">{v || '—'}</code>
                      {v && <CopyButton text={v} size="xs" label="" />}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>
            <Card className="space-y-2">
              <h2 className="text-lg font-bold">Query parameters ({parsed.params.length})</h2>
              {parsed.params.length === 0 ? (
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>No query parameters.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ color: 'var(--text-secondary)' }}>
                        <th className="text-left py-2 font-medium">Key</th>
                        <th className="text-left py-2 font-medium">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {parsed.params.map(([k, v], i) => (
                        <tr key={`${k}-${i}`} className="border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                          <td className="py-2 pr-4 font-mono break-all">{k}</td>
                          <td className="py-2 font-mono break-all">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
    </ToolPageWrapper>
  );
}
