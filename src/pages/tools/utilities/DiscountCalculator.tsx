import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Input, Slider, Switch, StatCard } from '@/components/ui';

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(val);
};

const DISCOUNT_PRESETS = [5, 10, 15, 20, 25, 30, 40, 50];

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState<number>(1000);
  const [discountPercent, setDiscountPercent] = useState<number>(20);
  const [useAdditionalDiscount, setUseAdditionalDiscount] = useState<boolean>(false);
  const [additionalDiscountPercent, setAdditionalDiscountPercent] = useState<number>(10);
  const [taxRate, setTaxRate] = useState<number>(0);

  const calculations = useMemo(() => {
    const orig = originalPrice || 0;
    const disc1 = discountPercent || 0;
    const disc2 = useAdditionalDiscount ? additionalDiscountPercent : 0;
    const tax = taxRate || 0;

    // First discount
    const savings1 = orig * (disc1 / 100);
    const subtotal1 = orig - savings1;

    // Second discount (sequential)
    const savings2 = subtotal1 * (disc2 / 100);
    const salePrice = subtotal1 - savings2;

    const totalSavings = savings1 + savings2;
    const taxAmount = salePrice * (tax / 100);
    const totalPrice = salePrice + taxAmount;

    return {
      savings1,
      savings2,
      totalSavings,
      salePrice,
      taxAmount,
      totalPrice,
    };
  }, [originalPrice, discountPercent, useAdditionalDiscount, additionalDiscountPercent, taxRate]);

  return (
    <ToolPageWrapper toolId="discount-calculator">
      <div className="tool-layout lg:grid-cols-2 gap-6">
        
        {/* Left Side: Inputs */}
        <div className="space-y-6 p-6 card">
          <h3 className="text-lg font-bold border-b pb-4" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-default)' }}>
            Discount Details
          </h3>

          <div className="space-y-6">
            {/* Original Price */}
            <Input
              label="Original Price (₹)"
              type="number"
              value={originalPrice === 0 ? '' : originalPrice}
              onChange={(e) => setOriginalPrice(Number(e.target.value))}
              placeholder="Enter original price"
              min={0}
            />

            {/* Discount Percentage */}
            <div className="space-y-2">
              <Slider
                label="Discount"
                min={0}
                max={100}
                value={discountPercent}
                onChange={setDiscountPercent}
                suffix="%"
              />
              
              {/* Presets */}
              <div className="flex flex-wrap gap-1.5">
                {DISCOUNT_PRESETS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setDiscountPercent(p)}
                    className={`btn btn-secondary btn-xs ${
                      discountPercent === p ? 'bg-[rgba(79,70,229,0.08)] border-[var(--text-link)] font-semibold' : ''
                    }`}
                  >
                    {p}% OFF
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Discount Toggle & Slider */}
            <div className="border-t pt-4 space-y-4" style={{ borderColor: 'var(--border-default)' }}>
              <Switch
                label="Add Stacked/Additional Discount"
                checked={useAdditionalDiscount}
                onChange={setUseAdditionalDiscount}
                description="Apply an extra discount sequentially (e.g. 20% + 10% off)"
              />

              {useAdditionalDiscount && (
                <Slider
                  label="Additional Discount"
                  min={0}
                  max={100}
                  value={additionalDiscountPercent}
                  onChange={setAdditionalDiscountPercent}
                  suffix="%"
                />
              )}
            </div>

            {/* Tax Rate */}
            <div className="border-t pt-4" style={{ borderColor: 'var(--border-default)' }}>
              <Slider
                label="Tax Rate"
                min={0}
                max={50}
                value={taxRate}
                onChange={setTaxRate}
                suffix="%"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Results */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard
              label="Sale Price (Subtotal)"
              value={formatCurrency(calculations.salePrice)}
            />
            <StatCard
              label="Total Savings"
              value={formatCurrency(calculations.totalSavings)}
              highlight
            />
          </div>

          {/* Breakdown Card */}
          <div className="p-6 card space-y-4">
            <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>Price Breakdown</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-1.5 border-b" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>
                <span>Original Price</span>
                <span className="font-semibold">{formatCurrency(originalPrice)}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>
                <span>Discount ({discountPercent}%)</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  -{formatCurrency(calculations.savings1)}
                </span>
              </div>

              {useAdditionalDiscount && (
                <div className="flex items-center justify-between py-1.5 border-b" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>
                  <span>Additional Discount ({additionalDiscountPercent}%)</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    -{formatCurrency(calculations.savings2)}
                  </span>
                </div>
              )}

              {taxRate > 0 && (
                <div className="flex items-center justify-between py-1.5 border-b" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>
                  <span>Tax ({taxRate}%)</span>
                  <span className="font-semibold text-red-600 dark:text-red-400">
                    +{formatCurrency(calculations.taxAmount)}
                  </span>
                </div>
              )}

              <div className="pt-4 flex items-center justify-between border-t font-bold" style={{ borderColor: 'var(--border-default)' }}>
                <span className="text-base" style={{ color: 'var(--text-primary)' }}>Final Price</span>
                <span className="text-2xl font-extrabold text-primary">
                  {formatCurrency(calculations.totalPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </ToolPageWrapper>
  );
}
