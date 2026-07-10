import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Textarea } from '@/components/ui';

interface DiffLine {
  type: 'added' | 'removed' | 'unchanged';
  text: string;
  originalLineNum?: number;
  modifiedLineNum?: number;
}

export default function DiffChecker() {
  const [original, setOriginal] = useState(
    'Welcome to ToolPilot.\nThis is a free offline-first platform.'
  );
  const [modified, setModified] = useState(
    'Welcome to ToolPilot v2!\nThis is a free online platform.'
  );
  const [diffResult, setDiffResult] = useState<DiffLine[] | null>(null);

  const handleCompare = () => {
    const origLines = original.split('\n');
    const modLines = modified.split('\n');

    const diffs: DiffLine[] = [];
    let origIdx = 0;
    let modIdx = 0;

    // Simple LCS-based Diff algorithm
    while (origIdx < origLines.length || modIdx < modLines.length) {
      if (origIdx < origLines.length && modIdx < modLines.length) {
        if (origLines[origIdx] === modLines[modIdx]) {
          diffs.push({
            type: 'unchanged',
            text: origLines[origIdx],
            originalLineNum: origIdx + 1,
            modifiedLineNum: modIdx + 1,
          });
          origIdx++;
          modIdx++;
        } else {
          // Lookahead to find next match
          let lookaheadOrig = origIdx;
          let foundMatch = false;

          while (lookaheadOrig < origLines.length) {
            if (origLines[lookaheadOrig] === modLines[modIdx]) {
              foundMatch = true;
              break;
            }
            lookaheadOrig++;
          }

          if (foundMatch) {
            // Lines deleted in original
            while (origIdx < lookaheadOrig) {
              diffs.push({
                type: 'removed',
                text: origLines[origIdx],
                originalLineNum: origIdx + 1,
              });
              origIdx++;
            }
          } else {
            // Line added in modified
            diffs.push({
              type: 'added',
              text: modLines[modIdx],
              modifiedLineNum: modIdx + 1,
            });
            modIdx++;
          }
        }
      } else if (origIdx < origLines.length) {
        // Remaining original lines deleted
        diffs.push({
          type: 'removed',
          text: origLines[origIdx],
          originalLineNum: origIdx + 1,
        });
        origIdx++;
      } else if (modIdx < modLines.length) {
        // Remaining modified lines added
        diffs.push({
          type: 'added',
          text: modLines[modIdx],
          modifiedLineNum: modIdx + 1,
        });
        modIdx++;
      }
    }

    setDiffResult(diffs);
  };

  const clearAll = () => {
    setOriginal('');
    setModified('');
    setDiffResult(null);
  };

  return (
    <ToolPageWrapper toolId="diff-checker">
      <div className="space-y-6">
        <div className="tool-layout lg:grid-cols-2">
          <Textarea
            label="Original Text"
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="Paste original text or code here..."
            className="font-mono text-xs leading-relaxed h-[200px] resize-none"
            aria-label="Original text input"
          />

          <Textarea
            label="Modified Text"
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            placeholder="Paste modified text or code here..."
            className="font-mono text-xs leading-relaxed h-[200px] resize-none"
            aria-label="Modified text input"
          />
        </div>

        <div
          className="flex justify-end gap-3 border-t pt-4"
          style={{ borderColor: 'var(--border-default)' }}
        >
          <Button onClick={clearAll} variant="secondary">
            Clear
          </Button>
          <Button onClick={handleCompare}>Find Differences</Button>
        </div>

        {/* Diff Results Output Panel */}
        {diffResult && (
          <div className="flex flex-col gap-3 p-5 card">
            <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
              Comparison Results
            </h3>

            <div
              className="border rounded-xl overflow-hidden font-mono text-xs leading-relaxed"
              style={{ borderColor: 'var(--border-default)', background: 'var(--bg-surface)' }}
            >
              <div className="overflow-x-auto max-h-[500px]">
                <table className="w-full border-collapse">
                  <tbody>
                    {diffResult.map((line, idx) => {
                      const isRemoved = line.type === 'removed';
                      const isAdded = line.type === 'added';

                      let bgClass = 'bg-transparent text-[var(--text-secondary)]';
                      let prefix = ' ';
                      let numColor = 'text-[var(--text-tertiary)]';

                      if (isRemoved) {
                        bgClass = 'bg-[rgba(239,68,68,0.06)] text-[var(--danger)]';
                        prefix = '-';
                        numColor = 'bg-[rgba(239,68,68,0.12)] text-[var(--danger)]';
                      } else if (isAdded) {
                        bgClass = 'bg-[rgba(16,185,129,0.06)] text-[var(--success)]';
                        prefix = '+';
                        numColor = 'bg-[rgba(16,185,129,0.12)] text-[var(--success)]';
                      }

                      return (
                        <tr key={idx} className={bgClass}>
                          {/* Line Number columns */}
                          <td
                            className={`w-10 select-none text-right pr-2 border-r border-default font-mono text-[10px] ${numColor}`}
                            style={{ borderColor: 'var(--border-default)' }}
                          >
                            {line.originalLineNum || ''}
                          </td>
                          <td
                            className={`w-10 select-none text-right pr-2 border-r border-default font-mono text-[10px] ${numColor}`}
                            style={{ borderColor: 'var(--border-default)' }}
                          >
                            {line.modifiedLineNum || ''}
                          </td>
                          {/* Prefix */}
                          <td className="w-6 select-none text-center font-bold text-xs">
                            {prefix}
                          </td>
                          {/* Code Content */}
                          <td className="px-4 py-0.5 whitespace-pre font-mono text-xs leading-normal">
                            {line.text}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolPageWrapper>
  );
}
