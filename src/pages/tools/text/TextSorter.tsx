import { useMemo, useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, Select, Switch, Textarea } from '@/components/ui';
import { CopyButton } from '@/components/ui/CopyButton';
import { processLines, type SortMode } from '@/utils/extraToolMath';

export default function TextSorter() {
  const [text, setText] = useState('banana\nApple\ncherry\napple\n\nBanana\n10\n9');
  const [mode, setMode] = useState<SortMode>('az');
  const [dedupe, setDedupe] = useState(true);
  const [ignoreCase, setIgnoreCase] = useState(true);
  const [trim, setTrim] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [shuffleSeed, setShuffleSeed] = useState(0);

  const lines = useMemo(
    () => processLines(text, { mode, dedupe, ignoreCase, trim, removeEmpty }),
    // shuffleSeed forces a new shuffle when the user presses the button
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [text, mode, dedupe, ignoreCase, trim, removeEmpty, shuffleSeed]
  );
  const before = text ? text.split(/\r?\n/).length : 0;
  const output = lines.join('\n');

  return (
    <ToolPageWrapper toolId="text-sorter">
      <div className="tool-layout lg:grid-cols-2">
        <Card className="space-y-4">
          <Textarea label="Input (one item per line)" rows={14} value={text} onChange={(e) => setText(e.target.value)} />
          <Select
            label="Order"
            value={mode}
            onChange={(e) => setMode(e.target.value as SortMode)}
            options={[
              { value: 'az', label: 'A → Z (natural)' },
              { value: 'za', label: 'Z → A' },
              { value: 'length', label: 'Shortest first' },
              { value: 'numeric', label: 'Numeric' },
              { value: 'reverse', label: 'Reverse current order' },
              { value: 'shuffle', label: 'Shuffle' },
            ]}
          />
          {mode === 'shuffle' && (
            <Button variant="secondary" size="sm" onClick={() => setShuffleSeed((n) => n + 1)}>Shuffle again</Button>
          )}
          <div className="grid gap-1">
            <Switch label="Remove duplicates" checked={dedupe} onChange={setDedupe} />
            <Switch label="Ignore case" checked={ignoreCase} onChange={setIgnoreCase} />
            <Switch label="Trim whitespace" checked={trim} onChange={setTrim} />
            <Switch label="Remove empty lines" checked={removeEmpty} onChange={setRemoveEmpty} />
          </div>
        </Card>
        <Card className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <span className="label mb-0">
              Result · {lines.length} lines{before > lines.length ? ` (${before - lines.length} removed)` : ''}
            </span>
            <CopyButton text={output} />
          </div>
          <Textarea rows={14} value={output} readOnly aria-label="Result" />
        </Card>
      </div>
    </ToolPageWrapper>
  );
}
