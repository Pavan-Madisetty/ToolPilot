import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Input, ResultBox, Tabs } from '@/components/ui';
import { Notice } from '@/components/tools/Notice';
import { fromCostMargin, fromCostMarkup, fromCostPrice } from '@/utils/extraToolMath';

type Mode = 'markup' | 'margin' | 'price';

export default function MarkupCalculator() {
  const [mode, setMode] = useState<Mode>('markup');
  const [cost, setCost] = useState('800');
  const [markup, setMarkup] = useState('25');
  const [margin, setMargin] = useState('20');
  const [price, setPrice] = useState('1000');

  const c = parseFloat(cost);
  const valid = Number.isFinite(c) && c >= 0;
  let r: ReturnType<typeof fromCostMarkup> | null = null;
  if (valid) {
    if (mode === 'markup' && Number.isFinite(parseFloat(markup))) r = fromCostMarkup(c, parseFloat(markup));
    if (mode === 'margin' && Number.isFinite(parseFloat(margin))) r = fromCostMargin(c, parseFloat(margin));
    if (mode === 'price' && Number.isFinite(parseFloat(price))) r = fromCostPrice(c, parseFloat(price));
  }

  return (
    <ToolPageWrapper toolId="markup-calculator">
      <div className="space-y-6">
        <Tabs
          activeTab={mode}
          onTabChange={(k) => setMode(k as Mode)}
          ariaLabel="Calculate from"
          tabs={[
            { key: 'markup', name: 'Cost + Markup %' },
            { key: 'margin', name: 'Cost + Margin %' },
            { key: 'price', name: 'Cost + Price' },
          ]}
        />
        <div className="tool-layout lg:grid-cols-2">
          <Card className="space-y-5">
            <Input label="Cost (₹)" type="number" min="0" value={cost} onChange={(e) => setCost(e.target.value)} />
            {mode === 'markup' && <Input label="Markup (%)" type="number" value={markup} onChange={(e) => setMarkup(e.target.value)} />}
            {mode === 'margin' && <Input label="Margin (%)" type="number" max="99.99" value={margin} onChange={(e) => setMargin(e.target.value)} helperText="Margin must be below 100%" />}
            {mode === 'price' && <Input label="Selling price (₹)" type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} />}
            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              Markup = profit ÷ cost. Margin = profit ÷ price. They are different numbers — a 25% markup is only a 20% margin.
            </p>
          </Card>
          <div className="flex flex-col gap-4">
            {r ? (
              <>
                <ResultBox label="Selling price" value={Math.round(r.price * 100) / 100} prefix="₹" highlight />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <ResultBox label="Profit" value={Math.round(r.profit * 100) / 100} prefix="₹" />
                  <ResultBox label="Markup" value={r.markup.toFixed(2)} suffix="%" />
                  <ResultBox label="Margin" value={r.margin.toFixed(2)} suffix="%" />
                </div>
              </>
            ) : (
              <Notice tone="info" title="Enter valid numbers">Cost and the selected value are required{mode === 'margin' ? ' (margin must be under 100%)' : ''}.</Notice>
            )}
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
