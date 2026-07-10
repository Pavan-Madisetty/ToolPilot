import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Input, ResultBox } from '@/components/ui';

export default function BreakEven() {
  const [fixedCosts, setFixedCosts] = useState<number>(50000);
  const [variableCost, setVariableCost] = useState<number>(30);
  const [sellingPrice, setSellingPrice] = useState<number>(50);

  const results = useMemo(() => {
    const fc = Number(fixedCosts) || 0;
    const vc = Number(variableCost) || 0;
    const sp = Number(sellingPrice) || 0;

    const contributionMargin = sp - vc;
    const contributionMarginRatio = sp > 0 ? contributionMargin / sp : 0;

    const breakEvenUnits = contributionMargin > 0 ? fc / contributionMargin : 0;
    const breakEvenRevenue = contributionMarginRatio > 0 ? fc / contributionMarginRatio : 0;

    return {
      contributionMargin,
      contributionMarginRatio,
      breakEvenUnits,
      breakEvenRevenue,
      isValid: sp > vc,
    };
  }, [fixedCosts, variableCost, sellingPrice]);

  return (
    <ToolPageWrapper toolId="break-even">
      <div className="tool-layout lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="space-y-6">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Cost & Sales Values
            </h2>

            <div className="space-y-4">
              <Input
                label="Total Fixed Costs (₹)"
                type="number"
                min="0"
                value={fixedCosts === 0 ? '' : fixedCosts}
                onChange={(e) => setFixedCosts(Number(e.target.value))}
                placeholder="e.g. Rent, Salaries (50000)"
              />

              <Input
                label="Variable Cost per Unit (₹)"
                type="number"
                min="0"
                value={variableCost === 0 ? '' : variableCost}
                onChange={(e) => setVariableCost(Number(e.target.value))}
                placeholder="e.g. Materials, Manufacturing (30)"
              />

              <Input
                label="Selling Price per Unit (₹)"
                type="number"
                min="0"
                value={sellingPrice === 0 ? '' : sellingPrice}
                onChange={(e) => setSellingPrice(Number(e.target.value))}
                placeholder="e.g. Retail Price (50)"
              />
            </div>

            {!results.isValid && sellingPrice > 0 && (
              <div
                className="p-3 text-sm rounded-lg"
                style={{
                  backgroundColor: 'var(--danger-subtle)',
                  color: 'var(--danger)',
                  border: '1px solid var(--danger)',
                }}
              >
                Warning: Selling Price must be higher than the Variable Cost to achieve a break-even
                point.
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="space-y-6">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Break-Even Analysis
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ResultBox
                label="Break-Even Units"
                value={results.isValid ? Math.ceil(results.breakEvenUnits) : 0}
                suffix="units"
                highlight
                shouldFormat={true}
              />
              <ResultBox
                label="Break-Even Revenue"
                value={results.isValid ? results.breakEvenRevenue : 0}
                prefix="₹"
                shouldFormat={true}
              />
            </div>

            <div
              className="p-4 rounded-xl space-y-3"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-default)',
              }}
            >
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--text-secondary)' }}>Contribution Margin per Unit</span>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  ₹{results.contributionMargin.toFixed(2)}
                </span>
              </div>
              <div
                className="flex justify-between text-sm border-t pt-2"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <span style={{ color: 'var(--text-secondary)' }}>Contribution Margin Ratio</span>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {(results.contributionMarginRatio * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            <div
              className="p-4 rounded-xl space-y-2 text-xs"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-secondary)',
              }}
            >
              <p>
                <strong>Break-Even Point:</strong> The stage where business revenues equal
                expenditures, showing zero net profit or loss.
              </p>
              <p>
                <strong>Formulae:</strong>
                <br />
                • Contribution Margin = Price - Variable Cost
                <br />• Break-Even (Units) = Fixed Costs ÷ Contribution Margin
              </p>
            </div>
          </Card>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
