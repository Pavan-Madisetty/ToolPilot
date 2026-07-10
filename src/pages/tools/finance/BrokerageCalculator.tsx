import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Input, Select, ResultBox } from '@/components/ui';

export default function BrokerageCalculator() {
  const [tradeType, setTradeType] = useState<string>('delivery');
  const [buyPrice, setBuyPrice] = useState<number>(1000);
  const [sellPrice, setSellPrice] = useState<number>(1100);
  const [quantity, setQuantity] = useState<number>(100);

  const tradeOptions = [
    { value: 'delivery', label: 'Equity Delivery' },
    { value: 'intraday', label: 'Equity Intraday' },
  ];

  const calculations = useMemo(() => {
    const buyTurnover = buyPrice * quantity;
    const sellTurnover = sellPrice * quantity;
    const totalTurnover = buyTurnover + sellTurnover;

    // Brokerage: 0.05% of turnover or flat ₹20 per trade leg (whichever is lower)
    const brokerageBuy = Math.min(0.0005 * buyTurnover, 20);
    const brokerageSell = Math.min(0.0005 * sellTurnover, 20);
    const brokerage = brokerageBuy + brokerageSell;

    // STT (Securities Transaction Tax)
    // Delivery: 0.1% on buy & sell. Intraday: 0.025% on sell side only.
    let stt: number;
    if (tradeType === 'delivery') {
      stt = 0.001 * buyTurnover + 0.001 * sellTurnover;
    } else {
      stt = 0.00025 * sellTurnover;
    }

    // Exchange Transaction Charges (NSE standard: 0.00322% of turnover)
    const exchangeCharges = 0.0000322 * totalTurnover;

    // SEBI Charges: 0.0001% of turnover (₹10 / crore)
    const sebiCharges = 0.000001 * totalTurnover;

    // Stamp Duty: Delivery (0.015% on buy only), Intraday (0.003% on buy only)
    const stampDuty = (tradeType === 'delivery' ? 0.00015 : 0.00003) * buyTurnover;

    // GST: 18% of (Brokerage + Exchange Charges)
    const gst = 0.18 * (brokerage + exchangeCharges);

    const totalCharges = brokerage + stt + exchangeCharges + sebiCharges + stampDuty + gst;
    const grossProfit = (sellPrice - buyPrice) * quantity;
    const netProfit = grossProfit - totalCharges;

    return {
      buyTurnover,
      sellTurnover,
      totalTurnover,
      brokerage,
      stt,
      exchangeCharges,
      sebiCharges,
      stampDuty,
      gst,
      totalCharges,
      grossProfit,
      netProfit,
    };
  }, [tradeType, buyPrice, sellPrice, quantity]);

  return (
    <ToolPageWrapper toolId="brokerage-calculator">
      <div className="tool-layout lg:grid-cols-2 gap-6">
        {/* Left Side: Inputs */}
        <div className="space-y-6 p-6 card">
          <Select
            label="Trade Type"
            options={tradeOptions}
            value={tradeType}
            onChange={(e) => setTradeType(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Buy Price (₹)"
              type="number"
              value={buyPrice}
              onChange={(e) => setBuyPrice(Math.max(0, Number(e.target.value)))}
              min={0.05}
              step="any"
            />
            <Input
              label="Sell Price (₹)"
              type="number"
              value={sellPrice}
              onChange={(e) => setSellPrice(Math.max(0, Number(e.target.value)))}
              min={0.05}
              step="any"
            />
          </div>

          <Input
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            min={1}
          />
        </div>

        {/* Right Side: Results */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultBox
              label="Total Charges"
              value={calculations.totalCharges}
              prefix="₹"
            />
            <ResultBox
              label="Net Profit / Loss"
              value={calculations.netProfit}
              prefix="₹"
              highlight
              className={calculations.netProfit >= 0 ? 'text-success' : 'text-danger'}
            />
            <ResultBox
              label="Gross Profit / Loss"
              value={calculations.grossProfit}
              prefix="₹"
            />
          </div>

          {/* Breakdown Table */}
          <div className="card p-6">
            <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Charges Breakdown</h3>
            <div className="space-y-3 text-xs text-[var(--text-secondary)]">
              <div className="flex justify-between border-b border-[var(--border-default)] pb-2">
                <span>Turnover</span>
                <span className="font-semibold">₹{calculations.totalTurnover.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between border-b border-[var(--border-default)] pb-2">
                <span>Brokerage (0.05% or flat ₹20/leg)</span>
                <span className="font-semibold">₹{calculations.brokerage.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between border-b border-[var(--border-default)] pb-2">
                <span>STT (Securities Transaction Tax)</span>
                <span className="font-semibold">₹{calculations.stt.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between border-b border-[var(--border-default)] pb-2">
                <span>Exchange Transaction Charges</span>
                <span className="font-semibold">₹{calculations.exchangeCharges.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between border-b border-[var(--border-default)] pb-2">
                <span>GST (18% on Brokerage + Exchange)</span>
                <span className="font-semibold">₹{calculations.gst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between border-b border-[var(--border-default)] pb-2">
                <span>SEBI Turnover Charges</span>
                <span className="font-semibold">₹{calculations.sebiCharges.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between border-b border-[var(--border-default)] pb-2">
                <span>Stamp Duty</span>
                <span className="font-semibold">₹{calculations.stampDuty.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
