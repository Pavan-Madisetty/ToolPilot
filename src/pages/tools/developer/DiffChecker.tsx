import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button } from '@/components/ui';

interface DiffLine {
  type: 'added' | 'removed' | 'unchanged';
  value: string;
  originalLineNum?: number;
  modifiedLineNum?: number;
}

function computeDiff(original: string, modified: string): DiffLine[] {
  const origLines = original.split('\n');
  const modLines = modified.split('\n');
  const diffs: DiffLine[] = [];
  
  let o = 0;
  let m = 0;
  
  while (o < origLines.length || m < modLines.length) {
    if (o < origLines.length && m < modLines.length) {
      if (origLines[o] === modLines[m]) {
        diffs.push({
          type: 'unchanged',
          value: origLines[o],
          originalLineNum: o + 1,
          modifiedLineNum: m + 1,
        });
        o++;
        m++;
      } else {
        const nextModMatch = modLines.slice(m).indexOf(origLines[o]);
        const nextOrigMatch = origLines.slice(o).indexOf(modLines[m]);
        
        if (nextModMatch !== -1 && (nextOrigMatch === -1 || nextModMatch < nextOrigMatch)) {
          for (let i = 0; i < nextModMatch; i++) {
            diffs.push({
              type: 'added',
              value: modLines[m + i],
              modifiedLineNum: m + i + 1,
            });
          }
          m += nextModMatch;
        } else if (nextOrigMatch !== -1 && (nextModMatch === -1 || nextOrigMatch <= nextModMatch)) {
          for (let i = 0; i < nextOrigMatch; i++) {
            diffs.push({
              type: 'removed',
              value: origLines[o + i],
              originalLineNum: o + i + 1,
            });
          }
          o += nextOrigMatch;
        } else {
          diffs.push({
            type: 'removed',
            value: origLines[o],
            originalLineNum: o + 1,
          });
          diffs.push({
            type: 'added',
            value: modLines[m],
            modifiedLineNum: m + 1,
          });
          o++;
          m++;
        }
      }
    } else if (o < origLines.length) {
      diffs.push({
        type: 'removed',
        value: origLines[o],
        originalLineNum: o + 1,
      });
      o++;
    } else if (m < modLines.length) {
      diffs.push({
        type: 'added',
        value: modLines[m],
        modifiedLineNum: m + 1,
      });
      m++;
    }
  }
  
  return diffs;
}

export default function DiffChecker() {
  const [original, setOriginal] = useState('');
  const [modified, setModified] = useState('');
  const [diffResult, setDiffResult] = useState<DiffLine[] | null>(null);

  const handleCompare = () => {
    const results = computeDiff(original, modified);
    setDiffResult(results);
  };

  const clearAll = () => {
    setOriginal('');
    setModified('');
    setDiffResult(null);
  };

  return (
    <ToolPageWrapper toolId="diff-checker">
      <div className="flex flex-col gap-6">
        {/* Editor Inputs Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <span className="label">Original Text</span>
            <textarea
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              placeholder="Paste original text or code here..."
              className="input-base font-mono text-xs leading-relaxed h-[200px] resize-none"
              aria-label="Original text input"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="label">Modified Text</span>
            <textarea
              value={modified}
              onChange={(e) => setModified(e.target.value)}
              placeholder="Paste modified text or code here..."
              className="input-base font-mono text-xs leading-relaxed h-[200px] resize-none"
              aria-label="Modified text input"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t pt-4" style={{ borderColor: 'var(--border-default)' }}>
          <Button onClick={clearAll} variant="secondary">
            Clear
          </Button>
          <Button onClick={handleCompare}>
            Find Differences
          </Button>
        </div>

        {/* Diff Results Output Panel */}
        {diffResult && (
          <div className="flex flex-col gap-3 p-5 card">
            <h3 className="text-base font-bold">Comparison Results</h3>
            
            <div className="border rounded-xl overflow-hidden font-mono text-xs leading-relaxed bg-slate-50 dark:bg-slate-950" style={{ borderColor: 'var(--border-default)' }}>
              <div className="overflow-x-auto max-h-[500px]">
                <table className="w-full border-collapse">
                  <tbody>
                    {diffResult.map((line, idx) => {
                      const isRemoved = line.type === 'removed';
                      const isAdded = line.type === 'added';
                      
                      let bgClass = 'bg-transparent';
                      let prefix = ' ';
                      let numColor = 'text-slate-400 dark:text-slate-600';
                      
                      if (isRemoved) {
                        bgClass = 'bg-red-100/50 dark:bg-red-950/20 text-red-700 dark:text-red-400';
                        prefix = '-';
                        numColor = 'bg-red-200/40 dark:bg-red-950/40 text-red-500';
                      } else if (isAdded) {
                        bgClass = 'bg-emerald-100/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400';
                        prefix = '+';
                        numColor = 'bg-emerald-200/40 dark:bg-emerald-950/40 text-emerald-500';
                      }

                      return (
                        <tr key={idx} className={bgClass}>
                          {/* Line Number columns */}
                          <td className={`w-10 select-none text-right pr-2 border-r border-default font-mono text-[10px] ${numColor}`} style={{ borderColor: 'var(--border-default)' }}>
                            {line.originalLineNum || ''}
                          </td>
                          <td className={`w-10 select-none text-right pr-2 border-r border-default font-mono text-[10px] ${numColor}`} style={{ borderColor: 'var(--border-default)' }}>
                            {line.modifiedLineNum || ''}
                          </td>
                          {/* Prefix */}
                          <td className="w-6 select-none text-center font-bold text-xs">
                            {prefix}
                          </td>
                          {/* Content */}
                          <td className="whitespace-pre pr-4 pl-1">
                            {line.value || ' '}
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
