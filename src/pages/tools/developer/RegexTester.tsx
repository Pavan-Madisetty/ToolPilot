import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Input, Switch } from '@/components/ui';

export default function RegexTester() {
  const [pattern, setPattern] = useState('[a-zA-Z]+');
  const [text, setText] = useState('Welcome to ToolPilot 2026!');
  const [isCaseInsensitive, setIsCaseInsensitive] = useState(false);
  const [isGlobal, setIsGlobal] = useState(true);

  // Parse Regex and calculate matches
  const regexResults = useMemo(() => {
    if (!pattern) return { matches: [], error: null };

    try {
      let flags = '';
      if (isCaseInsensitive) flags += 'i';
      if (isGlobal) flags += 'g';

      const regex = new RegExp(pattern, flags);
      const matches = Array.from(text.matchAll(regex));

      return {
        matches,
        error: null,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Invalid regular expression';
      return {
        matches: [],
        error: msg,
      };
    }
  }, [pattern, text, isCaseInsensitive, isGlobal]);

  // Generate highlighted text blocks
  const highlightedData = useMemo(() => {
    if (regexResults.error || !pattern || regexResults.matches.length === 0) {
      return null;
    }

    try {
      let flags = '';
      if (isCaseInsensitive) flags += 'i';
      if (isGlobal) flags += 'g';

      const regex = new RegExp(pattern, flags);
      const parts = text.split(regex);
      const rawMatches = text.match(regex) || [];

      return { parts, rawMatches };
    } catch {
      return null;
    }
  }, [pattern, text, regexResults, isCaseInsensitive, isGlobal]);

  return (
    <ToolPageWrapper toolId="regex-tester">
      <div className="tool-layout lg:grid-cols-3">
        {/* Parameters Panel */}
        <div className="lg:col-span-1 space-y-6 p-6 border rounded-2xl bg-white dark:bg-slate-800" style={{ borderColor: 'var(--border-default)' }}>
          <h3 className="text-base font-bold">Regex Parameters</h3>
          <Input
            label="Expression Pattern"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="e.g. [a-z]+"
            error={regexResults.error || undefined}
          />

          <div className="border-t pt-4 space-y-4" style={{ borderColor: 'var(--border-default)' }}>
            <Switch
              label="Global Search (g)"
              checked={isGlobal}
              onChange={setIsGlobal}
              description="Test all matches instead of stopping at first"
            />
            <Switch
              label="Case Insensitive (i)"
              checked={isCaseInsensitive}
              onChange={setIsCaseInsensitive}
              description="Ignore uppercase/lowercase differences"
            />
          </div>
        </div>

        {/* Inputs and Match Highlight Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <span className="label">Test String</span>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text here to test regex patterns..."
              className="input-base font-mono text-xs leading-relaxed h-[120px] resize-none"
              aria-label="Test string pattern input"
            />
          </div>

          <div className="border rounded-2xl p-6 bg-white dark:bg-slate-800 space-y-4" style={{ borderColor: 'var(--border-default)' }}>
            <div className="flex items-center justify-between">
              <span className="label">Matches Highlighted</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/20 text-blue-500">
                {regexResults.matches.length} Matches Found
              </span>
            </div>

            <div
              className="p-4 border rounded-xl font-mono text-xs leading-relaxed whitespace-pre-wrap min-h-[140px] bg-slate-50/50 dark:bg-slate-900/30"
              style={{ borderColor: 'var(--border-default)' }}
            >
              {highlightedData ? (
                <span>
                  {highlightedData.parts.flatMap((part, i) => {
                    const match = highlightedData.rawMatches[i];
                    return [
                      <span key={`p_${i}`}>{part}</span>,
                      match ? (
                        <mark key={`m_${i}`} className="bg-yellow-200 dark:bg-yellow-900/50 text-current rounded px-0.5 font-bold border border-yellow-300 dark:border-yellow-800">
                          {match}
                        </mark>
                      ) : null,
                    ];
                  })}
                </span>
              ) : (
                <span>{text}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
