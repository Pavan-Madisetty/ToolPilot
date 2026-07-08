import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button } from '@/components/ui';

export default function WordCounter() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const rawText = text.trim();
    if (!rawText) {
      return { words: 0, chars: 0, charsNoSpace: 0, sentences: 0, paragraphs: 0, readingTime: 0, wordDensity: [] };
    }

    const wordsArray = rawText.split(/\s+/).filter(Boolean);
    const words = wordsArray.length;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, '').length;
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
    const paragraphs = text.split(/\n+/).filter((p) => p.trim().length > 0).length;

    // Reading time: avg 200 words per minute
    const readingTime = Math.max(1, Math.ceil(words / 200));

    // Word Density
    const wordCounts: Record<string, number> = {};
    wordsArray.forEach((word) => {
      const clean = word.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
      if (clean.length > 2) {
        wordCounts[clean] = (wordCounts[clean] || 0) + 1;
      }
    });

    const wordDensity = Object.entries(wordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, count]) => ({ word, count, percentage: ((count / words) * 100).toFixed(1) }));

    return {
      words,
      chars,
      charsNoSpace,
      sentences,
      paragraphs,
      readingTime,
      wordDensity,
    };
  }, [text]);

  return (
    <ToolPageWrapper toolId="word-counter">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <label className="label">Paste Text</label>
          <Button onClick={() => setText('')} variant="ghost" size="xs">Clear</Button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or write text here to analyze statistics..."
          className="input-base font-mono text-xs leading-relaxed h-[180px] resize-none"
          aria-label="Input word counter text"
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border rounded-xl p-4 text-center bg-white dark:bg-slate-800" style={{ borderColor: 'var(--border-default)' }}>
            <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Words</span>
            <p className="text-xl font-bold mt-1">{stats.words}</p>
          </div>
          <div className="border rounded-xl p-4 text-center bg-white dark:bg-slate-800" style={{ borderColor: 'var(--border-default)' }}>
            <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Characters</span>
            <p className="text-xl font-bold mt-1">{stats.chars}</p>
          </div>
          <div className="border rounded-xl p-4 text-center bg-white dark:bg-slate-800" style={{ borderColor: 'var(--border-default)' }}>
            <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Sentences</span>
            <p className="text-xl font-bold mt-1">{stats.sentences}</p>
          </div>
          <div className="border rounded-xl p-4 text-center bg-white dark:bg-slate-800" style={{ borderColor: 'var(--border-default)' }}>
            <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Reading Time</span>
            <p className="text-xl font-bold mt-1">~{stats.readingTime} min</p>
          </div>
        </div>

        {/* Word Density */}
        {stats.wordDensity.length > 0 && (
          <div className="border rounded-2xl p-6 bg-white dark:bg-slate-800" style={{ borderColor: 'var(--border-default)' }}>
            <h3 className="text-sm font-bold mb-4">Keyword Density (Top 5 Words)</h3>
            <div className="space-y-3">
              {stats.wordDensity.map(({ word, count, percentage }) => (
                <div key={word} className="flex items-center justify-between text-xs border-b pb-2 last:border-0 last:pb-0" style={{ borderColor: 'var(--border-subtle)' }}>
                  <span className="font-semibold">{word}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{count} times ({percentage}%)</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolPageWrapper>
  );
}
