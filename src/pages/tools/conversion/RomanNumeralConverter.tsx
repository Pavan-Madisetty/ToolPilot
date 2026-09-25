import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Input, ResultBox, Tabs } from '@/components/ui';
import { Notice } from '@/components/tools/Notice';
import { fromRoman, toRoman } from '@/utils/extraToolMath';

export default function RomanNumeralConverter() {
  const [mode, setMode] = useState<'toRoman' | 'toNumber'>('toRoman');
  const [num, setNum] = useState('2026');
  const [roman, setRoman] = useState('MMXXVI');

  const n = Number(num);
  const romanOut = Number.isInteger(n) ? toRoman(n) : '';
  const numOut = fromRoman(roman);

  return (
    <ToolPageWrapper toolId="roman-numeral-converter">
      <div className="space-y-6">
        <Tabs activeTab={mode} onTabChange={(k) => setMode(k as 'toRoman' | 'toNumber')} ariaLabel="Direction" tabs={[{ key: 'toRoman', name: 'Number → Roman' }, { key: 'toNumber', name: 'Roman → Number' }]} />
        <div className="tool-layout lg:grid-cols-2">
          <Card className="space-y-4">
            {mode === 'toRoman' ? (
              <Input label="Number (1–3999)" type="number" min="1" max="3999" value={num} onChange={(e) => setNum(e.target.value)} />
            ) : (
              <Input label="Roman numeral" value={roman} onChange={(e) => setRoman(e.target.value.toUpperCase())} spellCheck={false} autoCapitalize="characters" />
            )}
          </Card>
          <div className="flex flex-col gap-4">
            {mode === 'toRoman' ? (
              romanOut ? <ResultBox label="Roman numeral" value={romanOut} highlight /> : <Notice tone="info" title="Out of range">Roman numerals cover whole numbers from 1 to 3999.</Notice>
            ) : Number.isNaN(numOut) ? (
              <Notice tone="info" title="Not a valid Roman numeral">Use the letters I, V, X, L, C, D, M in standard form (e.g. XIV, not IIII).</Notice>
            ) : (
              <ResultBox label="Number" value={String(numOut)} highlight />
            )}
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
