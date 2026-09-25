import { useMemo, useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Input, Switch, Textarea } from '@/components/ui';
import { CopyButton } from '@/components/ui/CopyButton';
import { Notice } from '@/components/tools/Notice';

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export default function FindReplace() {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog. The end.');
  const [find, setFind] = useState('the');
  const [replace, setReplace] = useState('a');
  const [useRegex, setUseRegex] = useState(false);
  const [matchCase, setMatchCase] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);

  const result = useMemo(() => {
    if (!find) return { out: text, count: 0, error: '' };
    try {
      let src = useRegex ? find : escapeRe(find);
      if (wholeWord) src = `\\b(?:${src})\\b`;
      const re = new RegExp(src, matchCase ? 'g' : 'gi');
      let count = 0;
      const out = text.replace(re, (...args) => {
        count++;
        // Support $1, $&, etc. only in regex mode; treat replacement literally otherwise.
        if (!useRegex) return replace;
        const groups = args.slice(1, -2) as string[];
        return replace.replace(/\$(\d+|&)/g, (_, k: string) => (k === '&' ? args[0] : groups[Number(k) - 1] ?? ''));
      });
      return { out, count, error: '' };
    } catch (e) {
      return { out: text, count: 0, error: e instanceof Error ? e.message : 'Invalid pattern' };
    }
  }, [text, find, replace, useRegex, matchCase, wholeWord]);

  return (
    <ToolPageWrapper toolId="find-replace">
      <div className="tool-layout lg:grid-cols-2">
        <Card className="space-y-4">
          <Textarea label="Text" rows={10} value={text} onChange={(e) => setText(e.target.value)} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Find" value={find} onChange={(e) => setFind(e.target.value)} />
            <Input label="Replace with" value={replace} onChange={(e) => setReplace(e.target.value)} helperText={useRegex ? 'Use $1, $2 or $& for groups' : undefined} />
          </div>
          <div className="grid gap-1">
            <Switch label="Regular expression" checked={useRegex} onChange={setUseRegex} />
            <Switch label="Match case" checked={matchCase} onChange={setMatchCase} />
            <Switch label="Whole word" checked={wholeWord} onChange={setWholeWord} />
          </div>
        </Card>
        <Card className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <span className="label mb-0">Result · {result.count} replacement{result.count === 1 ? '' : 's'}</span>
            <CopyButton text={result.out} />
          </div>
          {result.error && <Notice tone="danger" title="Invalid pattern">{result.error}</Notice>}
          <Textarea rows={10} value={result.out} readOnly aria-label="Result" />
        </Card>
      </div>
    </ToolPageWrapper>
  );
}
