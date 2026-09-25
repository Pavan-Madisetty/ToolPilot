import { useMemo, useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Slider, Textarea } from '@/components/ui';
import { CopyButton } from '@/components/ui/CopyButton';
import { Notice } from '@/components/tools/Notice';
import { summarize } from '@/utils/extraToolMath';

export default function TextSummarizer() {
  const [text, setText] = useState('');
  const [count, setCount] = useState(3);
  const sentences = useMemo(() => summarize(text, count), [text, count]);
  const words = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0);
  const summary = sentences.join(' ');

  return (
    <ToolPageWrapper toolId="text-summarizer">
      <div className="space-y-6">
        <Notice tone="info" title="Runs entirely on your device">
          This is an <strong>extractive</strong> summariser: it scores sentences by keyword importance and keeps the best ones — no AI service or upload involved.
        </Notice>
        <div className="tool-layout lg:grid-cols-2">
          <Card className="space-y-4">
            <Textarea label={`Article or notes · ${words(text)} words`} rows={14} value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste a long article, report or notes…" />
            <Slider label="Sentences in summary" min={1} max={10} step={1} value={count} onChange={setCount} />
          </Card>
          <Card className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <span className="label mb-0">Summary · {words(summary)} words{words(text) ? ` (${Math.round((words(summary) / words(text)) * 100)}% of original)` : ''}</span>
              <CopyButton text={summary} />
            </div>
            {summary ? (
              <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed">
                {sentences.map((s, i) => <li key={i}>{s}</li>)}
              </ol>
            ) : (
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Your summary will appear here.</p>
            )}
          </Card>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
