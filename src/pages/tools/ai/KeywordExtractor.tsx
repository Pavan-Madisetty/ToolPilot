import { useMemo, useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Slider, Textarea } from '@/components/ui';
import { CopyButton } from '@/components/ui/CopyButton';
import { keywordFrequency } from '@/utils/extraToolMath';

export default function KeywordExtractor() {
  const [text, setText] = useState('');
  const [limit, setLimit] = useState(15);
  const rows = useMemo(() => keywordFrequency(text, limit), [text, limit]);
  const max = rows[0]?.count ?? 1;

  return (
    <ToolPageWrapper toolId="keyword-extractor">
      <div className="tool-layout lg:grid-cols-2">
        <Card className="space-y-4">
          <Textarea label="Text" rows={14} value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste an article, product description or page copy…" />
          <Slider label="Keywords to show" min={5} max={50} step={5} value={limit} onChange={setLimit} />
        </Card>
        <Card className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <span className="label mb-0">Top keywords</span>
            <CopyButton text={rows.map((r) => r.word).join(', ')} label="Copy list" />
          </div>
          {rows.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Keywords appear here as you type. Common stop-words are ignored.</p>
          ) : (
            <ul className="space-y-2" aria-label="Keyword frequency">
              {rows.map((r) => (
                <li key={r.word} className="grid grid-cols-[minmax(0,8rem)_1fr_auto] items-center gap-3 text-sm">
                  <span className="truncate font-medium">{r.word}</span>
                  <span className="h-2 overflow-hidden rounded-full" style={{ background: 'var(--border-subtle)' }}>
                    <span className="block h-full rounded-full" style={{ width: `${(r.count / max) * 100}%`, background: 'var(--primary)' }} />
                  </span>
                  <span className="tabular-nums" style={{ color: 'var(--text-secondary)' }}>{r.count} · {r.density.toFixed(1)}%</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </ToolPageWrapper>
  );
}
