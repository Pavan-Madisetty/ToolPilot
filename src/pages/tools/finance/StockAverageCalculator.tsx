import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Input, Button, ResultBox } from '@/components/ui';
import { Plus, Trash2 } from 'lucide-react';

interface BuyTransaction {
  id: string;
  qty: number | '';
  price: number | '';
}

export default function StockAverageCalculator() {
  const [buys, setBuys] = useState<BuyTransaction[]>([
    { id: '1', qty: 10, price: 150 },
    { id: '2', qty: 20, price: 140 },
  ]);

  const addBuyRow = () => {
    const nextId = String(Date.now());
    setBuys([...buys, { id: nextId, qty: '', price: '' }]);
  };

  const deleteBuyRow = (id: string) => {
    if (buys.length <= 1) return;
    setBuys(buys.filter((b) => b.id !== id));
  };

  const updateRow = (id: string, field: 'qty' | 'price', value: string) => {
    setBuys(
      buys.map((b) => {
        if (b.id === id) {
          const numVal = value === '' ? '' : Number(value);
          return { ...b, [field]: numVal };
        }
        return b;
      })
    );
  };

  const results = useMemo(() => {
    let totalQty = 0;
    let totalInvested = 0;

    buys.forEach((b) => {
      const q = typeof b.qty === 'number' ? b.qty : 0;
      const p = typeof b.price === 'number' ? b.price : 0;
      totalQty += q;
      totalInvested += q * p;
    });

    const averagePrice = totalQty > 0 ? totalInvested / totalQty : 0;

    return {
      totalQty,
      totalInvested,
      averagePrice,
    };
  }, [buys]);

  return (
    <ToolPageWrapper toolId="stock-average-calculator">
      <div className="tool-layout lg:grid-cols-2 gap-6">
        {/* Left Side: Input Form */}
        <div className="space-y-6 p-6 card">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Buy Transactions</h2>
          <div className="space-y-4">
            {buys.map((buy, idx) => (
              <div key={buy.id} className="flex items-end gap-3 p-3 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] relative">
                <span className="absolute top-1 left-2 text-[10px] font-semibold text-[var(--text-tertiary)]">
                  Buy #{idx + 1}
                </span>
                
                <div className="flex-1 mt-2">
                  <Input
                    label="Quantity"
                    type="number"
                    value={buy.qty}
                    onChange={(e) => updateRow(buy.id, 'qty', e.target.value)}
                    placeholder="e.g. 50"
                    min={1}
                  />
                </div>
                
                <div className="flex-1 mt-2">
                  <Input
                    label="Purchase Price (₹)"
                    type="number"
                    value={buy.price}
                    onChange={(e) => updateRow(buy.id, 'price', e.target.value)}
                    placeholder="e.g. 250"
                    min={0.01}
                    step="any"
                  />
                </div>

                <Button
                  variant="danger"
                  className="p-2 shrink-0 mb-[2px]"
                  disabled={buys.length <= 1}
                  onClick={() => deleteBuyRow(buy.id)}
                  aria-label={`Delete Transaction ${idx + 1}`}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
          </div>

          <Button
            variant="secondary"
            className="w-full flex items-center justify-center gap-2"
            onClick={addBuyRow}
          >
            <Plus size={16} /> Add Buy Row
          </Button>
        </div>

        {/* Right Side: Results */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultBox
              label="Total Quantity"
              value={results.totalQty}
              shouldFormat={true}
            />
            <ResultBox
              label="Average Stock Price"
              value={results.averagePrice}
              prefix="₹"
              highlight
            />
            <ResultBox
              label="Total Invested"
              value={results.totalInvested}
              prefix="₹"
            />
          </div>

          {/* Allocation & Transaction Breakdown Table */}
          <div className="card p-6 overflow-x-auto">
            <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Investment Allocation</h3>
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-default)]" style={{ color: 'var(--text-secondary)' }}>
                  <th className="py-2">Transaction</th>
                  <th className="py-2 text-right">Quantity</th>
                  <th className="py-2 text-right">Price</th>
                  <th className="py-2 text-right">Cost</th>
                  <th className="py-2 text-right">Weight (%)</th>
                </tr>
              </thead>
              <tbody>
                {buys.map((buy, idx) => {
                  const qty = typeof buy.qty === 'number' ? buy.qty : 0;
                  const price = typeof buy.price === 'number' ? buy.price : 0;
                  const cost = qty * price;
                  const weight = results.totalInvested > 0 ? (cost / results.totalInvested) * 100 : 0;

                  return (
                    <tr key={buy.id} className="border-b border-[var(--border-default)]" style={{ color: 'var(--text-secondary)' }}>
                      <td className="py-2 font-medium">Buy #{idx + 1}</td>
                      <td className="py-2 text-right">{qty.toLocaleString('en-IN')}</td>
                      <td className="py-2 text-right">₹{price.toLocaleString('en-IN')}</td>
                      <td className="py-2 text-right">₹{cost.toLocaleString('en-IN')}</td>
                      <td className="py-2 text-right">{weight.toFixed(1)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
