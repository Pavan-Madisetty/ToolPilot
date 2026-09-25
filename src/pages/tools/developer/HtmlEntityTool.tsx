import { useMemo, useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Tabs, Textarea, Switch } from '@/components/ui';
import { CopyButton } from '@/components/ui/CopyButton';
import { encodeHtmlEntities, decodeHtmlEntities } from '@/utils/extraToolMath';

export default function HtmlEntityTool() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('<p class="note">Fish & Chips — £5 © 2026</p>');
  const [nonAscii, setNonAscii] = useState(true);

  const output = useMemo(
    () => (mode === 'encode' ? encodeHtmlEntities(input, nonAscii) : decodeHtmlEntities(input)),
    [mode, input, nonAscii]
  );

  return (
    <ToolPageWrapper toolId="html-entity-encoder">
      <div className="space-y-6">
        <Tabs
          activeTab={mode}
          onTabChange={(k) => setMode(k as 'encode' | 'decode')}
          ariaLabel="Mode"
          tabs={[
            { key: 'encode', name: 'Encode' },
            { key: 'decode', name: 'Decode' },
          ]}
        />
        <div className="tool-layout lg:grid-cols-2">
          <Card className="space-y-4">
            <Textarea
              label={mode === 'encode' ? 'Text / HTML' : 'Text with entities'}
              variant="code"
              rows={12}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck={false}
            />
            {mode === 'encode' && (
              <Switch label="Encode non-ASCII characters" description="é → &#233;" checked={nonAscii} onChange={setNonAscii} />
            )}
          </Card>
          <Card className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <span className="label mb-0">Result</span>
              <CopyButton text={output} />
            </div>
            <Textarea variant="code" rows={12} value={output} readOnly aria-label="Result" />
          </Card>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
