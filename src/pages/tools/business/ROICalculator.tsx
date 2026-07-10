import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Input, Select, ResultBox, Slider } from '@/components/ui';

export default function ROICalculator() {
  const [invested, setInvested] = useState<number>(100000);
  const [returned, setReturned] = useState<number>(150000);
  const [period, setPeriod] = useState<number>(3);
  const [periodType, setPeriodType] = useState<string>('years');

  const { netProfit, totalRoi, annualizedRoi, years } = useMemo(() => {
    const inv = Number(invested);
    const ret = Number(returned);
    const per = Number(period);

    if (Number.isNaN(inv) || Number.isNaN(ret) || Number.isNaN(per) || inv <= 0) {
      return { netProfit: 0, totalRoi: 0, annualizedRoi: 0, years: 0 };
    }

    const net = ret - inv;
    const total = (net / inv) * 100;

    // Convert period to years for annualization
    const yrs = periodType === 'months' ? per / 12 : per;

    let annualized = 0;
    if (yrs > 0) {
      // Annualized ROI = ((Returned / Invested) ** (1 / Years)) - 1
      annualized = (Math.pow(ret / inv, 1 / yrs) - 1) * 100;
    }

    return {
      netProfit: net,
      totalRoi: total,
      annualizedRoi: annualized,
      years: yrs,
    };
  }, [invested, returned, period, periodType]);

  const summaryText = useMemo(() => {
    if (invested <= 0) return 'Please enter a valid investment amount greater than zero.';

    const formattedInvested = invested.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    });
    const formattedReturned = returned.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    });
    const formattedProfit = netProfit.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    });

    return `An investment of ${formattedInvested} returning ${formattedReturned} over ${period} ${periodType} yields a net profit of ${formattedProfit}. This is a total ROI of ${totalRoi.toFixed(2)}%, equivalent to an annualized growth rate (CAGR) of ${annualizedRoi.toFixed(2)}%.`;
  }, [invested, returned, period, periodType, netProfit, totalRoi, annualizedRoi]);

  const projectionSchedule = useMemo(() => {
    if (years <= 0 || invested <= 0 || annualizedRoi === 0) return [];

    const rate = annualizedRoi / 100;
    const schedule = [];

    // We project up to 5 intervals or standard duration
    const steps = Math.min(Math.max(Math.ceil(years), 3), 10);

    for (let i = 1; i <= steps; i++) {
      const projectedVal = invested * Math.pow(1 + rate, i);
      const profit = projectedVal - invested;
      const roi = (profit / invested) * 100;
      schedule.push({
        year: i,
        value: projectedVal,
        profit: profit,
        roi: roi,
      });
    }

    return schedule;
  }, [invested, annualizedRoi, years]);

  return (
    <ToolPageWrapper toolId="roi-calculator">
      <div className="tool-layout lg:grid-cols-2 gap-6">
        {/* Left Column: Inputs */}
        <div className="space-y-6">
          <Card className="space-y-6">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Investment Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Amount Invested (₹)"
                type="number"
                value={Number.isNaN(invested) ? '' : invested}
                onChange={(e) => setInvested(e.target.value === '' ? NaN : Number(e.target.value))}
              />
              <Input
                label="Amount Returned (₹)"
                type="number"
                value={Number.isNaN(returned) ? '' : returned}
                onChange={(e) => setReturned(e.target.value === '' ? NaN : Number(e.target.value))}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <div className="sm:col-span-2">
                <Slider
                  label={`Investment Period (${periodType})`}
                  value={period}
                  onChange={setPeriod}
                  min={1}
                  max={periodType === 'years' ? 30 : 60}
                  step={1}
                  suffix=""
                />
              </div>
              <div>
                <Select
                  label="Period Type"
                  options={[
                    { value: 'years', label: 'Years' },
                    { value: 'months', label: 'Months' },
                  ]}
                  value={periodType}
                  onChange={(e) => {
                    setPeriodType(e.target.value);
                    setPeriod(e.target.value === 'years' ? 3 : 24);
                  }}
                />
              </div>
            </div>
          </Card>

          {projectionSchedule.length > 0 && (
            <Card className="space-y-4">
              <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                Compounding Growth Schedule (CAGR: {annualizedRoi.toFixed(2)}%)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr
                      className="border-b"
                      style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-tertiary)' }}
                    >
                      <th className="py-2 text-xs font-semibold uppercase">Year</th>
                      <th className="py-2 text-xs font-semibold uppercase">Projected Value</th>
                      <th className="py-2 text-xs font-semibold uppercase">Net Gain</th>
                      <th className="py-2 text-xs font-semibold uppercase">ROI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                    {projectionSchedule.map((row) => (
                      <tr key={row.year} className="text-sm">
                        <td className="py-3 font-semibold text-[var(--text-secondary)]">
                          Year {row.year}
                        </td>
                        <td
                          className="py-3 font-mono font-bold"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {row.value.toLocaleString('en-IN', {
                            style: 'currency',
                            currency: 'INR',
                            maximumFractionDigits: 0,
                          })}
                        </td>
                        <td className="py-3 font-mono text-emerald-600 dark:text-emerald-400">
                          +
                          {row.profit.toLocaleString('en-IN', {
                            style: 'currency',
                            currency: 'INR',
                            maximumFractionDigits: 0,
                          })}
                        </td>
                        <td className="py-3 font-mono font-medium text-emerald-600 dark:text-emerald-400">
                          {row.roi.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>

        {/* Right Column: Results */}
        <div className="space-y-6">
          <Card className="space-y-6">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Calculation Results
            </h2>

            <div className="grid grid-cols-1 gap-4">
              <ResultBox label="Investment Net Profit" value={netProfit} prefix="₹" highlight />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ResultBox
                  label="Total ROI"
                  value={totalRoi.toFixed(2)}
                  suffix="%"
                  shouldFormat={false}
                />
                <ResultBox
                  label="Annualized ROI (CAGR)"
                  value={annualizedRoi ? annualizedRoi.toFixed(2) : '—'}
                  suffix="%"
                  shouldFormat={false}
                />
              </div>
            </div>

            <div
              className="p-4 rounded-xl space-y-2 text-sm leading-relaxed"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-primary)',
              }}
            >
              <div
                className="font-semibold text-xs uppercase tracking-wider mb-1"
                style={{ color: 'var(--text-tertiary)' }}
              >
                Analysis Summary
              </div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                {summaryText}
              </p>
              <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>
                * Annualized ROI is calculated using the Compound Annual Growth Rate (CAGR) method.
                It represents the geometric mean rate of return that would be required for an
                investment to grow from its initial balance to its final balance, assuming the
                profits were reinvested at the end of each year.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
