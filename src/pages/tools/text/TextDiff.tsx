import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Textarea } from '@/components/ui';

export default function TextDiff() {
  const [original, setOriginal] = useState('Welcome to ToolPilot.\nThis is a free platform.');
  const [modified, setModified] = useState(
    'Welcome to ToolPilot v2!\nThis is a free online platform.'
  );

  const diffLines = useMemo(() => {
    const origLines = original.split('\n');
    const modLines = modified.split('\n');
    const maxLength = Math.max(origLines.length, modLines.length);
    const result = [];

    for (let i = 0; i < maxLength; i++) {
      const o = origLines[i];
      const m = modLines[i];

      if (o === m) {
        result.push({ type: 'unchanged', text: o || '' });
      } else {
        if (o !== undefined) {
          result.push({ type: 'removed', text: `- ${o}` });
        }
        if (m !== undefined) {
          result.push({ type: 'added', text: `+ ${m}` });
        }
      }
    }

    return result;
  }, [original, modified]);

  return (
    <ToolPageWrapper toolId="text-diff">
      <div className="space-y-6">
        <div className="tool-layout lg:grid-cols-2">
          {/* Original */}
          <Textarea
            label="Original Text"
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            className="font-mono text-xs leading-relaxed h-[120px] resize-none"
            aria-label="Original text input"
          />

          {/* Modified */}
          <Textarea
            label="Modified Text"
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            className="font-mono text-xs leading-relaxed h-[120px] resize-none"
            aria-label="Modified text input"
          />
        </div>

        {/* Diff Output Panel */}
        <div className="p-6 card space-y-4">
          <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
            Line Comparison (Diff Output)
          </h3>
          <div
            className="p-4 rounded-xl font-mono text-xs leading-relaxed whitespace-pre-wrap border"
            style={{
              borderColor: 'var(--border-default)',
              background: 'var(--bg-surface)',
            }}
          >
            {diffLines.map((line, idx) => (
              <div
                key={idx}
                className={
                  line.type === 'added'
                    ? 'text-[var(--success)] bg-[rgba(16,185,129,0.08)] px-1'
                    : line.type === 'removed'
                      ? 'text-[var(--danger)] bg-[rgba(239,68,68,0.08)] px-1'
                      : 'text-[var(--text-tertiary)]'
                }
              >
                {line.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
