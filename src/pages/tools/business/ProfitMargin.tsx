import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Button, Input, ResultBox } from '@/components/ui';

type CalculationMode = 'prices' | 'margin' | 'markup';

export default function ProfitMargin() {
  const [mode, setMode] = useState<CalculationMode>('prices');
  const [costPrice, setCostPrice] = useState<number>(100);
  const [sellingPrice, setSellingPrice] = useState<number>(150);
  const [targetMargin, setTargetMargin] = useState<number>(33.33);
  const [targetMarkup, setTargetMarkup] = useState<number>(50);

  const results = useMemo(() => {
    const cp = Number(costPrice) || 0;
    let sp = Number(sellingPrice) || 0;
    let margin = 0;
    let markup = 0;
    let profit = 0;

    if (mode === 'prices') {
      profit = sp - cp;
      margin = sp > 0 ? (profit / sp) * 100 : 0;
      markup = cp > 0 ? (profit / cp) * 100 : 0;
    } else if (mode === 'margin') {
      const tm = Number(targetMargin) || 0;
      if (tm >= 100) {
        sp = 0;
        profit = 0;
        margin = 0;
        markup = 0;
      } else {
        sp = cp / (1 - tm / 100);
        profit = sp - cp;
        margin = tm;
        markup = cp > 0 ? (profit / cp) * 100 : 0;
      }
    } else if (mode === 'markup') {
      const tmu = Number(targetMarkup) || 0;
      sp = cp * (1 + tmu / 100);
      profit = sp - cp;
      margin = sp > 0 ? (profit / sp) * 100 : 0;
      markup = tmu;
    }

    return {
      costPrice: cp,
      sellingPrice: sp,
      profit,
      margin,
      markup,
    };
  }, [mode, costPrice, sellingPrice, targetMargin, targetMarkup]);

  return (
    <ToolPageWrapper toolId="profit-margin">
      <div className="tool-layout lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="space-y-6">
            <div className="flex flex-col gap-2">
              <span className="label">Calculation Mode</span>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={mode === 'prices' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setMode('prices')}
                >
                  Enter Prices
                </Button>
                <Button
                  variant={mode === 'margin' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setMode('margin')}
                >
                  Target Margin
                </Button>
                <Button
                  variant={mode === 'markup' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setMode('markup')}
                >
                  Target Markup
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Input
                label="Cost Price (₹)"
                type="number"
                min="0"
                value={costPrice === 0 ? '' : costPrice}
                onChange={(e) => setCostPrice(Number(e.target.value))}
              />

              {mode === 'prices' && (
                <Input
                  label="Selling Price (₹)"
                  type="number"
                  min="0"
                  value={sellingPrice === 0 ? '' : sellingPrice}
                  onChange={(e) => setSellingPrice(Number(e.target.value))}
                />
              )}

              {mode === 'margin' && (
                <Input
                  label="Target Profit Margin (%)"
                  type="number"
                  min="0"
                  max="99.9"
                  step="0.01"
                  value={targetMargin === 0 ? '' : targetMargin}
                  onChange={(e) => setTargetMargin(Number(e.target.value))}
                />
              )}

              {mode === 'markup' && (
                <Input
                  label="Target Markup (%)"
                  type="number"
                  min="0"
                  step="0.01"
                  value={targetMarkup === 0 ? '' : targetMarkup}
                  onChange={(e) => setTargetMarkup(Number(e.target.value))}
                />
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="space-y-6">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Profit Analysis
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ResultBox
                label="Gross Profit"
                value={results.profit.toFixed(2)}
                prefix="₹"
                highlight
                shouldFormat={false}
              />
              <ResultBox
                label="Selling Price"
                value={results.sellingPrice.toFixed(2)}
                prefix="₹"
                shouldFormat={false}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ResultBox
                label="Profit Margin"
                value={results.margin.toFixed(2)}
                suffix="%"
                shouldFormat={false}
              />
              <ResultBox
                label="Markup"
                value={results.markup.toFixed(2)}
                suffix="%"
                shouldFormat={false}
              />
            </div>

            <div className="p-4 rounded-xl space-y-2 text-xs" style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}>
              <p>
                <strong>Margin vs Markup:</strong> Margin is profit as a percentage of the selling price. Markup is profit as a percentage of the cost price.
              </p>
              <p>
                <strong>Formulae:</strong>
                <br />
                • Margin % = (Profit ÷ Selling Price) × 100
                <br />
                • Markup % = (Profit ÷ Cost Price) × 100
              </p>
            </div>
          </Card>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
