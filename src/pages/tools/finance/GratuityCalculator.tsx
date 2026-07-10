import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Slider, ResultBox, Callout } from '@/components/ui';

export default function GratuityCalculator() {
  const [salary, setSalary] = useState<number>(50000); // Monthly salary (Basic + DA)
  const [years, setYears] = useState<number>(5); // Years of service

  const gratuityData = useMemo(() => {
    // Rounding years of service as per standard gratuity rules (>= 6 months rounded up)
    const roundedYears = Math.round(years);
    const gratuity = (15 * salary * roundedYears) / 26;
    const maxExempt = 2000000; // ₹20 Lakhs max limit
    const taxable = Math.max(0, gratuity - maxExempt);
    const exempt = Math.min(gratuity, maxExempt);

    return {
      roundedYears,
      gratuity,
      taxable,
      exempt,
      eligible: years >= 5,
    };
  }, [salary, years]);

  return (
    <ToolPageWrapper toolId="gratuity-calculator">
      <div className="tool-layout">
        {/* Input Card */}
        <div className="space-y-6 p-6 card">
          <Slider
            label="Monthly Salary (Basic + DA) (₹)"
            min={5000}
            max={1000000}
            step={1000}
            value={salary}
            onChange={setSalary}
          />
          <Slider
            label="Years of Service"
            min={1}
            max={50}
            step={0.5}
            value={years}
            onChange={setYears}
            suffix=" Yrs"
          />

          {!gratuityData.eligible && (
            <div className="p-4 rounded-xl border border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/20 text-yellow-800 dark:text-yellow-200 text-xs">
              <strong>Note:</strong> Under the Payment of Gratuity Act 1972, a minimum of 5 years of continuous service is generally required to be eligible for gratuity (except in cases of death or disablement).
            </div>
          )}
        </div>

        {/* Output & Info */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultBox
              label="Gratuity Amount"
              value={gratuityData.gratuity}
              prefix="₹"
              highlight
            />
            <ResultBox
              label="Tax-Exempt Gratuity"
              value={gratuityData.exempt}
              prefix="₹"
            />
            <ResultBox
              label="Taxable Gratuity"
              value={gratuityData.taxable}
              prefix="₹"
            />
          </div>

          <Callout tone="info" title="Gratuity Formula & Rules">
            <div className="text-xs space-y-2 text-[var(--text-secondary)]">
              <p>
                <strong>Formula:</strong> Gratuity = (15 &times; Monthly Salary &times; Service Years) &divide; 26
              </p>
              <p>
                Where:
                <br />
                &bull; <strong>Salary</strong> is the last drawn Basic Salary + Dearness Allowance (DA).
                <br />
                &bull; <strong>Service Years</strong> are rounded to the nearest full year. If the remaining fraction is 6 months or more, it is rounded up to 1 year; otherwise, it is ignored (modeled as <code>Math.round(Years)</code>).
              </p>
              <p>
                The maximum tax-exempt gratuity limit under Section 10(10) of the Income Tax Act is <strong>₹20,00,000</strong>. Any gratuity received exceeding this limit is subject to income tax.
              </p>
            </div>
          </Callout>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
