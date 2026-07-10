import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Input, ResultBox, Callout } from '@/components/ui';

export default function NetWorthCalculator() {
  // Assets State
  const [cash, setCash] = useState<number>(50000);
  const [investments, setInvestments] = useState<number>(200000);
  const [property, setProperty] = useState<number>(1500000);
  const [otherAssets, setOtherAssets] = useState<number>(100000);

  // Liabilities State
  const [mortgage, setMortgage] = useState<number>(600000);
  const [otherLoans, setOtherLoans] = useState<number>(50000);
  const [creditCards, setCreditCards] = useState<number>(15000);
  const [otherLiabilities, setOtherLiabilities] = useState<number>(5000);

  const calculations = useMemo(() => {
    const totalAssets = cash + investments + property + otherAssets;
    const totalLiabilities = mortgage + otherLoans + creditCards + otherLiabilities;
    const netWorth = totalAssets - totalLiabilities;
    const debtToAssetRatio = totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0;

    return {
      totalAssets,
      totalLiabilities,
      netWorth,
      debtToAssetRatio,
    };
  }, [cash, investments, property, otherAssets, mortgage, otherLoans, creditCards, otherLiabilities]);

  return (
    <ToolPageWrapper toolId="net-worth-calculator">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Assets Section */}
          <div className="space-y-6 p-6 card">
            <h2 className="text-lg font-bold text-success flex items-center gap-2">
              <span>Assets</span>
            </h2>
            <div className="space-y-4">
              <Input
                label="Cash & Bank Balances (₹)"
                type="number"
                value={cash || ''}
                onChange={(e) => setCash(Number(e.target.value))}
                min={0}
              />
              <Input
                label="Investments (Stocks, Mutual Funds, FD, Gold) (₹)"
                type="number"
                value={investments || ''}
                onChange={(e) => setInvestments(Number(e.target.value))}
                min={0}
              />
              <Input
                label="Property & Real Estate (₹)"
                type="number"
                value={property || ''}
                onChange={(e) => setProperty(Number(e.target.value))}
                min={0}
              />
              <Input
                label="Other Assets (Vehicles, Jewelry, etc.) (₹)"
                type="number"
                value={otherAssets || ''}
                onChange={(e) => setOtherAssets(Number(e.target.value))}
                min={0}
              />
            </div>
          </div>

          {/* Liabilities Section */}
          <div className="space-y-6 p-6 card">
            <h2 className="text-lg font-bold text-danger flex items-center gap-2">
              <span>Liabilities</span>
            </h2>
            <div className="space-y-4">
              <Input
                label="Home Loan / Mortgage (₹)"
                type="number"
                value={mortgage || ''}
                onChange={(e) => setMortgage(Number(e.target.value))}
                min={0}
              />
              <Input
                label="Other Loans (Car, Personal, Education) (₹)"
                type="number"
                value={otherLoans || ''}
                onChange={(e) => setOtherLoans(Number(e.target.value))}
                min={0}
              />
              <Input
                label="Credit Card Outstanding (₹)"
                type="number"
                value={creditCards || ''}
                onChange={(e) => setCreditCards(Number(e.target.value))}
                min={0}
              />
              <Input
                label="Other Liabilities (Bills, Hand loans) (₹)"
                type="number"
                value={otherLiabilities || ''}
                onChange={(e) => setOtherLiabilities(Number(e.target.value))}
                min={0}
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultBox
              label="Total Assets"
              value={calculations.totalAssets}
              prefix="₹"
              className="text-success font-semibold"
            />
            <ResultBox
              label="Total Liabilities"
              value={calculations.totalLiabilities}
              prefix="₹"
              className="text-danger font-semibold"
            />
            <ResultBox
              label="Net Worth"
              value={calculations.netWorth}
              prefix="₹"
              highlight
            />
          </div>

          {/* Visualization Bar */}
          <div className="card p-6 space-y-4">
            <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Debt-to-Asset Analysis</h3>
            
            <div className="w-full h-4 rounded-full bg-[var(--bg-surface)] border border-[var(--border-default)] overflow-hidden flex">
              {calculations.totalAssets > 0 ? (
                <>
                  <div 
                    className="h-full bg-success transition-all duration-300"
                    style={{ width: `${Math.max(0, 100 - calculations.debtToAssetRatio)}%` }}
                    title={`Equity/Net Worth: ${(100 - calculations.debtToAssetRatio).toFixed(1)}%`}
                  />
                  <div 
                    className="h-full bg-danger transition-all duration-300"
                    style={{ width: `${calculations.debtToAssetRatio}%` }}
                    title={`Liabilities: ${calculations.debtToAssetRatio.toFixed(1)}%`}
                  />
                </>
              ) : (
                <div className="w-full h-full bg-slate-200 dark:bg-slate-800" />
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-success block" /> 
                Equity / Net Worth: {calculations.totalAssets > 0 ? (100 - calculations.debtToAssetRatio).toFixed(1) : 0}%
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-danger block" /> 
                Liabilities: {calculations.debtToAssetRatio.toFixed(1)}%
              </span>
            </div>

            <Callout tone="tip" title="Understanding Net Worth">
              <p className="text-xs text-[var(--text-secondary)]">
                Your net worth represents your true financial value. It is calculated by subtracting everything you owe (liabilities) from everything you own (assets). A positive net worth means your assets exceed your liabilities. Ideally, you want to grow your net worth over time by increasing assets and reducing liabilities.
              </p>
            </Callout>
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
