import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, Input, ResultBox, Select, Tabs } from '@/components/ui';

function rand(n: number): number {
  const buf = new Uint32Array(1);
  const limit = Math.floor(0x100000000 / n) * n;
  do crypto.getRandomValues(buf); while (buf[0] >= limit);
  return (buf[0] % n) + 1;
}

export default function DiceCoin() {
  const [tab, setTab] = useState<'dice' | 'coin'>('dice');
  const [count, setCount] = useState('2');
  const [sides, setSides] = useState('6');
  const [rolls, setRolls] = useState<number[]>([]);
  const [flips, setFlips] = useState<('Heads' | 'Tails')[]>([]);
  const [coins, setCoins] = useState('1');

  const roll = () => setRolls(Array.from({ length: Math.min(10, Math.max(1, parseInt(count, 10) || 1)) }, () => rand(parseInt(sides, 10))));
  const flip = () => setFlips(Array.from({ length: Math.min(100, Math.max(1, parseInt(coins, 10) || 1)) }, () => (rand(2) === 1 ? 'Heads' : 'Tails')));
  const heads = flips.filter((f) => f === 'Heads').length;

  return (
    <ToolPageWrapper toolId="dice-coin">
      <div className="space-y-6">
        <Tabs activeTab={tab} onTabChange={(k) => setTab(k as 'dice' | 'coin')} ariaLabel="Mode" tabs={[{ key: 'dice', name: 'Roll dice' }, { key: 'coin', name: 'Flip coins' }]} />
        {tab === 'dice' ? (
          <div className="tool-layout lg:grid-cols-2">
            <Card className="space-y-5">
              <Input label="Number of dice (1–10)" type="number" min="1" max="10" value={count} onChange={(e) => setCount(e.target.value)} />
              <Select label="Sides" value={sides} onChange={(e) => setSides(e.target.value)} options={[4, 6, 8, 10, 12, 20, 100].map((n) => ({ value: String(n), label: `d${n}` }))} />
              <Button size="lg" onClick={roll}>Roll</Button>
            </Card>
            <div className="flex flex-col gap-4">
              {rolls.length > 0 ? (
                <>
                  <div className="flex flex-wrap gap-3" aria-live="polite" aria-label="Dice results">
                    {rolls.map((r, i) => <div key={i} className="grid h-16 w-16 place-items-center rounded-2xl border-2 text-2xl font-bold" style={{ borderColor: 'var(--primary)', background: 'var(--primary-subtle)' }}>{r}</div>)}
                  </div>
                  <ResultBox label="Total" value={rolls.reduce((a, b) => a + b, 0)} highlight />
                </>
              ) : <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Press Roll to throw the dice.</p>}
            </div>
          </div>
        ) : (
          <div className="tool-layout lg:grid-cols-2">
            <Card className="space-y-5">
              <Input label="Number of coins (1–100)" type="number" min="1" max="100" value={coins} onChange={(e) => setCoins(e.target.value)} />
              <Button size="lg" onClick={flip}>Flip</Button>
            </Card>
            <div className="flex flex-col gap-4" aria-live="polite">
              {flips.length === 1 && <p className="text-4xl font-bold" style={{ color: 'var(--primary)' }}>{flips[0]}</p>}
              {flips.length > 1 && (
                <div className="grid grid-cols-2 gap-4">
                  <ResultBox label="Heads" value={heads} highlight />
                  <ResultBox label="Tails" value={flips.length - heads} />
                </div>
              )}
              {flips.length === 0 && <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Press Flip to toss.</p>}
            </div>
          </div>
        )}
      </div>
    </ToolPageWrapper>
  );
}
