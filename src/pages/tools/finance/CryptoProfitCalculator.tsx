import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Input, Slider, ResultBox, Callout } from '@/components/ui';

export default function CryptoProfitCalculator() {
  const [investment, setInvestment] = useState<number>(50000); // Investment Amount
  const [buyPrice, setBuyPrice] = useState<number>(4000000); // Buy Price per Coin (e.g. BTC)
  const [sellPrice, setSellPrice] = useState<number>(4500000); // Sell Price per Coin
  const [taxRate, setTaxRate] = useState<number>(30); // Tax Rate (%) - 30% default in India

  const calculations = useMemo(() => {
    const qty = buyPrice > 0 ? investment / buyPrice : 0;
    const grossSellValue = qty * sellPrice;
    const grossProfit = grossSellValue - investment;
    const taxAmount = grossProfit > 0 ? grossProfit * (taxRate / 100) : 0;
    const netProfit = grossProfit - taxAmount;

    return {
      qty,
      grossSellValue,
      grossProfit,
      taxAmount,
      netProfit,
    };
  }, [investment, buyPrice, sellPrice, taxRate]);

  return (
    <ToolPageWrapper toolId="crypto-profit-calculator">
      <div className="tool-layout lg:grid-cols-2 gap-6">
        {/* Left Side: Inputs */}
        <div className="space-y-6 p-6 card">
          <Input
            label="Investment Amount (₹)"
            type="number"
            value={investment || ''}
            onChange={(e) => setInvestment(Math.max(0, Number(e.target.value)))}
            min={0}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Buy Price (per Coin) (₹)"
              type="number"
              value={buyPrice || ''}
              onChange={(e) => setBuyPrice(Math.max(0, Number(e.target.value)))}
              min={0.00001}
              step="any"
            />
            <Input
              label="Sell Price (per Coin) (₹)"
              type="number"
              value={sellPrice || ''}
              onChange={(e) => setSellPrice(Math.max(0, Number(e.target.value)))}
              min={0.00001}
              step="any"
            />
          </div>
          <Slider
            label="Crypto Tax Rate (%)"
            min={0}
            max={50}
            step={1}
            value={taxRate}
            onChange={setTaxRate}
            suffix="%"
          />
        </div>

        {/* Right Side: Results */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <ResultBox
              label="Quantity Purchased"
              value={calculations.qty.toFixed(8)}
              shouldFormat={false}
            />
            <ResultBox
              label="Gross Profit / Loss"
              value={calculations.grossProfit}
              prefix="₹"
              highlight
              className={calculations.grossProfit >= 0 ? 'text-success' : 'text-danger'}
            />
            <ResultBox
              label="Tax Amount"
              value={calculations.taxAmount}
              prefix="₹"
              className="text-danger"
            />
            <ResultBox
              label="Net Profit / Loss"
              value={calculations.netProfit}
              prefix="₹"
              highlight
              className={calculations.netProfit >= 0 ? 'text-success' : 'text-danger'}
            />
          </div>

          <div className="card p-6">
            <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Transaction Details
            </h3>
            <div className="space-y-3 text-xs text-[var(--text-secondary)]">
              <div className="flex justify-between border-b border-[var(--border-default)] pb-2">
                <span>Investment Amount</span>
                <span>₹{investment.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between border-b border-[var(--border-default)] pb-2">
                <span>Estimated Sale Value</span>
                <span>
                  ₹
                  {calculations.grossSellValue.toLocaleString('en-IN', {
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between border-b border-[var(--border-default)] pb-2">
                <span>Gross Profit / Loss</span>
                <span
                  className={
                    calculations.grossProfit >= 0
                      ? 'text-success font-semibold'
                      : 'text-danger font-semibold'
                  }
                >
                  ₹{calculations.grossProfit.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between border-b border-[var(--border-default)] pb-2">
                <span>Crypto Tax ({taxRate}%)</span>
                <span className="text-danger font-semibold">
                  ₹{calculations.taxAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between border-b border-[var(--border-default)] pb-2">
                <span>Net In-hand Profit / Loss</span>
                <span
                  className={
                    calculations.netProfit >= 0 ? 'text-success font-bold' : 'text-danger font-bold'
                  }
                >
                  ₹{calculations.netProfit.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          <Callout tone="info" title="Indian Crypto Tax Policy">
            <p className="text-xs text-[var(--text-secondary)]">
              Under Indian Income Tax rules, a flat **30% tax** is levied on all profits earned from
              Virtual Digital Assets (VDAs) / Cryptocurrencies. Additionally, losses from one crypto
              asset cannot be set off against gains from another, and no deductions are allowed
              other than the cost of acquisition. A **1% TDS** is also applicable on sell
              transactions.
            </p>
          </Callout>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
