import { useMemo, useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, ResultBox, Textarea } from '@/components/ui';
import { readability } from '@/utils/extraToolMath';

function band(flesch: number): { label: string; note: string } {
  if (flesch >= 90) return { label: 'Very easy', note: 'Easily understood by an 11-year-old.' };
  if (flesch >= 80) return { label: 'Easy', note: 'Conversational English.' };
  if (flesch >= 70) return { label: 'Fairly easy', note: 'Plain English — good for the web.' };
  if (flesch >= 60) return { label: 'Standard', note: 'Understood by 13–15 year olds.' };
  if (flesch >= 50) return { label: 'Fairly difficult', note: 'High-school level.' };
  if (flesch >= 30) return { label: 'Difficult', note: 'College level.' };
  return { label: 'Very difficult', note: 'Best understood by university graduates.' };
}

export default function ReadabilityChecker() {
  const [text, setText] = useState(
    'Writing clearly is a skill worth practising. Short sentences help readers. Long, winding sentences filled with complicated vocabulary and multiple subordinate clauses tend to exhaust the reader before the point is made.'
  );
  const r = useMemo(() => readability(text), [text]);
  const b = r ? band(r.flesch) : null;

  return (
    <ToolPageWrapper toolId="readability-checker">
      <div className="tool-layout lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <Card>
          <Textarea label="Paste your text" rows={16} value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste at least a couple of sentences…" />
        </Card>
        <div className="flex flex-col gap-4">
          {r && b ? (
            <>
              <ResultBox label={`Flesch Reading Ease · ${b.label}`} value={Math.max(0, Math.min(100, r.flesch)).toFixed(1)} highlight />
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{b.note}</p>
              <div className="grid grid-cols-2 gap-4">
                <ResultBox label="Grade level (F-K)" value={Math.max(0, r.grade).toFixed(1)} />
                <ResultBox label="Gunning Fog" value={Math.max(0, r.fog).toFixed(1)} />
                <ResultBox label="Words" value={r.words} />
                <ResultBox label="Sentences" value={r.sentences} />
                <ResultBox label="Avg. words / sentence" value={r.avgSentence.toFixed(1)} />
                <ResultBox label="Syllables" value={r.syllables} />
              </div>
            </>
          ) : (
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Paste some English text to see its readability scores.</p>
          )}
        </div>
      </div>
    </ToolPageWrapper>
  );
}
