import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';


export default function TextDiff() {
  const [original, setOriginal] = useState('Welcome to ToolPilot.\nThis is a free platform.');
  const [modified, setModified] = useState('Welcome to ToolPilot v2!\nThis is a free online platform.');

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
          <div className="space-y-2">
            <span className="label">Original Text</span>
            <textarea
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              className="input-base font-mono text-xs leading-relaxed h-[120px] resize-none"
              aria-label="Original text input"
            />
          </div>

          {/* Modified */}
          <div className="space-y-2">
            <span className="label">Modified Text</span>
            <textarea
              value={modified}
              onChange={(e) => setModified(e.target.value)}
              className="input-base font-mono text-xs leading-relaxed h-[120px] resize-none"
              aria-label="Modified text input"
            />
          </div>
        </div>

        {/* Diff Output Panel */}
        <div className="border rounded-2xl p-6 bg-white dark:bg-slate-800 space-y-4" style={{ borderColor: 'var(--border-default)' }}>
          <h3 className="text-sm font-bold">Line Comparison (Diff Output)</h3>
          <div className="p-4 rounded-xl font-mono text-xs leading-relaxed whitespace-pre-wrap bg-slate-50/50 dark:bg-slate-900/30 border" style={{ borderColor: 'var(--border-default)' }}>
            {diffLines.map((line, idx) => (
              <div
                key={idx}
                className={
                  line.type === 'added'
                    ? 'text-green-600 dark:text-green-400 bg-green-50/50 dark:bg-green-950/20 px-1'
                    : line.type === 'removed'
                    ? 'text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-950/20 px-1'
                    : 'text-gray-500'
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
