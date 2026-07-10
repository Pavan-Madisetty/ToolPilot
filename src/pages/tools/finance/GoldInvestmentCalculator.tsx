import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Slider, ResultBox, Callout } from '@/components/ui';

export default function GoldInvestmentCalculator() {
  const [grams, setGrams] = useState<number>(10); // grams
  const [buyPrice, setBuyPrice] = useState<number>(6000); // Buy price per gram
  const [sellPrice, setSellPrice] = useState<number>(7500); // Sell price per gram
  const [duration, setDuration] = useState<number>(3); // years

  const calculations = useMemo(() => {
    const initialValue = grams * buyPrice;
    const finalValue = grams * sellPrice;
    const profit = finalValue - initialValue;

    // CAGR = (Final Value / Initial Value)^(1 / duration) - 1
    let cagr = 0;
    if (initialValue > 0 && duration > 0) {
      cagr = (Math.pow(finalValue / initialValue, 1 / duration) - 1) * 100;
    }

    return {
      initialValue,
      finalValue,
      profit,
      cagr,
    };
  }, [grams, buyPrice, sellPrice, duration]);

  return (
    <ToolPageWrapper toolId="gold-investment-calculator">
      <div className="tool-layout">
        {/* Left Side: Inputs */}
        <div className="space-y-6 p-6 card">
          <Slider
            label="Grams of Gold"
            min={1}
            max={1000}
            step={1}
            value={grams}
            onChange={setGrams}
            suffix=" g"
          />
          <Slider
            label="Buy Price (per gram) (₹)"
            min={1000}
            max={20000}
            step={50}
            value={buyPrice}
            onChange={setBuyPrice}
          />
          <Slider
            label="Sell Price (per gram) (₹)"
            min={1000}
            max={20000}
            step={50}
            value={sellPrice}
            onChange={setSellPrice}
          />
          <Slider
            label="Investment Duration (Years)"
            min={1}
            max={20}
            step={1}
            value={duration}
            onChange={setDuration}
            suffix=" Yr"
          />
        </div>

        {/* Right Side: Results */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ResultBox
              label="Initial Investment Value"
              value={calculations.initialValue}
              prefix="₹"
            />
            <ResultBox
              label="Final Value"
              value={calculations.finalValue}
              prefix="₹"
            />
            <ResultBox
              label="Absolute Profit / Loss"
              value={calculations.profit}
              prefix="₹"
              highlight
              className={calculations.profit >= 0 ? 'text-success' : 'text-danger'}
            />
            <ResultBox
              label="CAGR (Annualized Return)"
              value={calculations.cagr.toFixed(2) + '%'}
              shouldFormat={false}
              highlight
            />
          </div>

          <Callout tone="info" title="CAGR Explained">
            <div className="text-xs space-y-2 text-[var(--text-secondary)]">
              <p>
                <strong>CAGR (Compound Annual Growth Rate)</strong> represents the mean annual growth rate of an investment over a specified period of time longer than one year, assuming the investment compounds annually.
              </p>
              <p>
                <strong>Formula:</strong> CAGR = [ (Final Value &divide; Initial Value)<sup>(1 &divide; Duration)</sup> &minus; 1 ] &times; 100
              </p>
              <p>
                Gold is historically considered a safe-haven asset and a hedge against inflation. A positive CAGR indicates steady appreciation of your gold holding.
              </p>
            </div>
          </Callout>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
