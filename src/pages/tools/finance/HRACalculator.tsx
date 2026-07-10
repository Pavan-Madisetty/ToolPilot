import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Slider, Select } from '@/components/ui';

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
};

export default function HRACalculator() {
  const [basicSalary, setBasicSalary] = useState(50000); // Monthly Basic Salary default
  const [hraReceived, setHraReceived] = useState(25000); // Monthly HRA received default
  const [rentPaid, setRentPaid] = useState(20000); // Monthly Rent paid default
  const [isMetro, setIsMetro] = useState<string>('metro'); // Metro vs Non-metro

  const cityOptions = [
    { value: 'metro', label: 'Metro City (Delhi, Mumbai, Kolkata, Chennai)' },
    { value: 'non-metro', label: 'Non-Metro City' },
  ];

  const calculation = useMemo(() => {
    const annualBasic = basicSalary * 12;
    const annualHRA = hraReceived * 12;
    const annualRent = rentPaid * 12;

    // HRA Exemption calculation under Section 10(13A) is the minimum of:
    // 1. Actual HRA received
    // 2. 50% of salary for metro, 40% for non-metro
    // 3. Rent paid minus 10% of salary

    const limitPercentage = isMetro === 'metro' ? 0.50 : 0.40;
    const baseExempt2 = annualBasic * limitPercentage;
    const baseExempt3 = Math.max(0, annualRent - (annualBasic * 0.10));

    const annualExemptHRA = Math.min(annualHRA, baseExempt2, baseExempt3);
    const annualTaxableHRA = Math.max(0, annualHRA - annualExemptHRA);

    return {
      monthlyExemptHRA: annualExemptHRA / 12,
      monthlyTaxableHRA: annualTaxableHRA / 12,
      annualExemptHRA,
      annualTaxableHRA,
    };
  }, [basicSalary, hraReceived, rentPaid, isMetro]);

  return (
    <ToolPageWrapper toolId="hra-calculator">
      <div className="tool-layout">
        {/* Sliders Sidebar */}
        <div className="space-y-6 p-6 card">
          <Slider
            label="Monthly Basic Salary (₹)"
            min={5000}
            max={500000}
            step={1000}
            value={basicSalary}
            onChange={setBasicSalary}
          />
          <Slider
            label="Monthly HRA Received (₹)"
            min={0}
            max={500000}
            step={1000}
            value={hraReceived}
            onChange={setHraReceived}
          />
          <Slider
            label="Monthly Rent Paid (₹)"
            min={0}
            max={500000}
            step={1000}
            value={rentPaid}
            onChange={setRentPaid}
          />
          <Select
            label="Accommodation Location"
            options={cityOptions}
            value={isMetro}
            onChange={(e) => setIsMetro(e.target.value)}
          />
        </div>

        {/* Results layout */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="result-box text-center">
              <span className="result-label">Exempt HRA (Monthly / Annual)</span>
              <div className="result-value text-success">{formatCurrency(calculation.monthlyExemptHRA)}</div>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">
                {formatCurrency(calculation.annualExemptHRA)} / Year
              </span>
            </div>
            <div className="result-box text-center">
              <span className="result-label">Taxable HRA (Monthly / Annual)</span>
              <div className="result-value text-danger">{formatCurrency(calculation.monthlyTaxableHRA)}</div>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">
                {formatCurrency(calculation.annualTaxableHRA)} / Year
              </span>
            </div>
          </div>

          {/* Section 10(13A) Explanation Details */}
          <div className="p-6 card">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
              Section 10(13A) Exemption Criteria
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              The HRA tax exemption is calculated as the minimum of the three following statutory rules:
            </p>
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex justify-between border-b pb-2" style={{ borderColor: 'var(--border-default)' }}>
                <span>1. Actual HRA Received (Annual):</span>
                <span className="font-semibold">{formatCurrency(hraReceived * 12)}</span>
              </div>
              <div className="flex justify-between border-b pb-2" style={{ borderColor: 'var(--border-default)' }}>
                <span>2. Salary percentage limit ({isMetro === 'metro' ? '50%' : '40%'}):</span>
                <span className="font-semibold">{formatCurrency(basicSalary * 12 * (isMetro === 'metro' ? 0.50 : 0.40))}</span>
              </div>
              <div className="flex justify-between">
                <span>3. Rent Paid minus 10% of Basic Salary:</span>
                <span className="font-semibold">{formatCurrency(Math.max(0, (rentPaid * 12) - (basicSalary * 12 * 0.10)))}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
