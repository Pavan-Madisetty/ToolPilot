import { useState, useMemo } from 'react';
import { DollarSign, TrendingUp, Percent, Calendar, ShieldCheck } from 'lucide-react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';

export default function CompoundInterestCalculator() {
  const [initialDeposit, setInitialDeposit] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [years, setYears] = useState<number>(15);
  const [compoundFrequency, setCompoundFrequency] = useState<number>(12); // monthly default
  const [taxRate, setTaxRate] = useState<number>(15);
  const [activeView, setActiveView] = useState<'chart' | 'table'>('chart');

  // Compound Interest Calculation with monthly contributions and tax drag
  const calculatedData = useMemo(() => {
    let balance = initialDeposit;
    let totalContributions = initialDeposit;
    let totalInterest = 0;
    const history = [];

    const r = interestRate / 100;
    const n = compoundFrequency;
    const t = years;

    history.push({
      year: 0,
      balance: Math.round(balance),
      contributions: Math.round(totalContributions),
      interest: 0,
      taxPaid: 0,
    });

    let totalTaxPaid = 0;

    for (let y = 1; y <= t; y++) {
      let yearlyContributions = 0;
      let yearlyInterest = 0;

      for (let m = 0; m < 12; m++) {
        const ratePerPeriod = r / n;
        const interestEarned = balance * ratePerPeriod;
        balance += interestEarned;
        yearlyInterest += interestEarned;

        balance += monthlyContribution;
        yearlyContributions += monthlyContribution;
      }

      const taxOnInterest = yearlyInterest * (taxRate / 100);
      balance -= taxOnInterest; // Apply tax drag
      totalTaxPaid += taxOnInterest;

      totalContributions += yearlyContributions;
      totalInterest += (yearlyInterest - taxOnInterest);

      history.push({
        year: y,
        balance: Math.round(balance),
        contributions: Math.round(totalContributions),
        interest: Math.round(totalInterest),
        taxPaid: Math.round(totalTaxPaid),
      });
    }

    return {
      finalBalance: Math.round(balance),
      totalContributions: Math.round(totalContributions),
      totalInterestEarned: Math.round(totalInterest),
      totalTaxPaid: Math.round(totalTaxPaid),
      history,
    };
  }, [initialDeposit, monthlyContribution, interestRate, years, compoundFrequency, taxRate]);

  const maxBalance = useMemo(() => {
    if (calculatedData.history.length === 0) return 0;
    return Math.max(...calculatedData.history.map(h => h.balance));
  }, [calculatedData]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <ToolPageWrapper toolId="compound-interest-calculator">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 font-sans text-left">
        
        {/* LEFT: Inputs Block (5 cols) */}
        <div className="lg:col-span-5 p-8 bg-gray-50/50 border-r border-gray-100 space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-primary tracking-wider uppercase bg-primary/10 px-2 py-0.5 rounded-full">FINANCE MATRIX</span>
            <h2 className="font-display text-xl font-bold text-gray-900">Compound Estimator</h2>
            <p className="text-xs text-gray-500 font-medium">Model custom scenarios with real-time tax impact & contribution patterns.</p>
          </div>

          {/* Input sliders & groups */}
          <div className="space-y-5 pt-2">
            {/* Initial Deposit */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-700">Initial Deposit</span>
                <span className="font-mono font-bold text-primary">{formatCurrency(initialDeposit)}</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <DollarSign className="w-3.5 h-3.5" />
                </div>
                <input
                  type="number"
                  value={initialDeposit}
                  onChange={(e) => setInitialDeposit(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-white border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 text-xs font-semibold outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>
              <input
                type="range"
                min="0"
                max="500000"
                step="5000"
                value={initialDeposit}
                onChange={(e) => setInitialDeposit(parseInt(e.target.value))}
                className="w-full accent-primary h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Monthly Contribution */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-700">Monthly Contribution</span>
                <span className="font-mono font-bold text-primary">{formatCurrency(monthlyContribution)}/mo</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-white border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 text-xs font-semibold outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(parseInt(e.target.value))}
                className="w-full accent-primary h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Rate of Return */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-700">Annual Return Rate</span>
                <span className="font-mono font-bold text-primary">{interestRate}%</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Percent className="w-3.5 h-3.5" />
                </div>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full bg-white border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 text-xs font-semibold outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>
              <input
                type="range"
                min="0"
                max="25"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                className="w-full accent-primary h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Investment Horizon */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-700">Investment Horizon</span>
                <span className="font-mono font-bold text-primary">{years} Years</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-white border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 text-xs font-semibold outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={years}
                onChange={(e) => setYears(parseInt(e.target.value))}
                className="w-full accent-primary h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Compound & Tax rate row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Compounding</label>
                <select
                  value={compoundFrequency}
                  onChange={(e) => setCompoundFrequency(parseInt(e.target.value))}
                  className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-600 outline-none cursor-pointer focus:border-primary"
                >
                  <option value={12}>Monthly (12x)</option>
                  <option value={4}>Quarterly (4x)</option>
                  <option value={2}>Bi-Annually (2x)</option>
                  <option value={1}>Annually (1x)</option>
                  <option value={365}>Daily (365x)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Est. Tax Drag</label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={taxRate}
                    onChange={(e) => setTaxRate(Math.min(50, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold outline-none focus:border-primary"
                  />
                  <span className="absolute right-3.5 top-2 text-gray-400 font-mono text-[10px] font-bold">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Real-time Dashboard (7 cols) */}
        <div className="lg:col-span-7 p-8 flex flex-col justify-between space-y-6">
          
          {/* Real-time stats card blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
              <span className="text-[9px] font-bold text-primary uppercase tracking-wider block">Total Wealth</span>
              <span className="text-xl font-display font-extrabold text-gray-900 block mt-1">
                {formatCurrency(calculatedData.finalBalance)}
              </span>
            </div>

            <div className="bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/10">
              <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider block">Total Growth</span>
              <span className="text-xl font-display font-extrabold text-emerald-600 block mt-1">
                {formatCurrency(calculatedData.totalInterestEarned)}
              </span>
            </div>

            <div className="bg-slate-500/5 p-4 rounded-xl border border-slate-500/10">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Tax Drag Lost</span>
              <span className="text-xl font-display font-extrabold text-slate-700 block mt-1">
                {formatCurrency(calculatedData.totalTaxPaid)}
              </span>
            </div>
          </div>

          {/* View Switcher */}
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Compound Curve</span>
            <div className="flex items-center gap-1.5 bg-gray-105 p-0.5 bg-gray-100 rounded-lg font-sans">
              <button
                onClick={() => setActiveView('chart')}
                className={`px-3 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider transition-all cursor-pointer ${activeView === 'chart' ? 'bg-white text-gray-800 shadow-xs' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Graph View
              </button>
              <button
                onClick={() => setActiveView('table')}
                className={`px-3 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider transition-all cursor-pointer ${activeView === 'table' ? 'bg-white text-gray-800 shadow-xs' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Spreadsheet
              </button>
            </div>
          </div>

          {/* Core Visualization Container */}
          <div className="flex-grow flex items-center justify-center min-h-[220px]">
            {activeView === 'chart' ? (
              <div className="w-full h-full flex flex-col justify-end space-y-4">
                <div className="h-44 w-full relative group">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line x1="0" y1="25" x2="100" y2="25" stroke="#f1f5f9" strokeWidth="0.5" />
                    <line x1="0" y1="50" x2="100" y2="50" stroke="#f1f5f9" strokeWidth="0.5" />
                    <line x1="0" y1="75" x2="100" y2="75" stroke="#f1f5f9" strokeWidth="0.5" />

                    <path
                      d={`
                        M 0 100
                        ${calculatedData.history.map((h, i) => {
                          const x = (i / (calculatedData.history.length - 1)) * 100;
                          const y = 100 - (h.balance / maxBalance) * 90;
                          return `L ${x} ${y}`;
                        }).join(' ')}
                        L 100 100 Z
                      `}
                      fill="url(#primary-grad)"
                      opacity="0.15"
                    />

                    <path
                      d={`
                        M 0 100
                        ${calculatedData.history.map((h, i) => {
                          const x = (i / (calculatedData.history.length - 1)) * 100;
                          const y = 100 - (h.contributions / maxBalance) * 90;
                          return `L ${x} ${y}`;
                        }).join(' ')}
                        L 100 100 Z
                      `}
                      fill="#3b82f6"
                      opacity="0.08"
                    />

                    <path
                      d={calculatedData.history.map((h, i) => {
                        const x = (i / (calculatedData.history.length - 1)) * 100;
                        const y = 100 - (h.balance / maxBalance) * 90;
                        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }).join(' ')}
                      fill="none"
                      stroke="#4648d4"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    <defs>
                      <linearGradient id="primary-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4648d4" />
                        <stop offset="100%" stopColor="#ffffff" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div className="absolute top-0 left-0 bg-slate-900 text-white text-[9px] font-mono px-1.5 py-0.5 rounded font-bold">
                    {formatCurrency(maxBalance)}
                  </div>
                  <div className="absolute bottom-0 right-0 bg-primary text-white text-[9px] font-mono px-1.5 py-0.5 rounded font-bold">
                    {years}y End
                  </div>
                </div>

                <div className="flex gap-4 text-[10px] font-semibold text-gray-500 justify-center">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-primary" />
                    <span>Total Capital Accumulation</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-blue-300" />
                    <span>Net Deposits Added</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full max-h-[220px] overflow-y-auto border border-gray-100 rounded-lg font-mono text-[11px]">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-[9px] font-bold sticky top-0 border-b border-gray-100">
                    <tr>
                      <th className="p-2.5 pl-4">Year</th>
                      <th className="p-2.5">Total Deposits</th>
                      <th className="p-2.5">Total Growth</th>
                      <th className="p-2.5 pr-4 text-right">Wealth Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-gray-600 font-medium">
                    {calculatedData.history.map((h) => (
                      <tr key={h.year} className="hover:bg-slate-50/55">
                        <td className="p-2.5 pl-4 font-bold text-gray-800">Yr {h.year}</td>
                        <td className="p-2.5">{formatCurrency(h.contributions)}</td>
                        <td className="p-2.5 text-emerald-650 text-emerald-600">{formatCurrency(h.interest)}</td>
                        <td className="p-2.5 pr-4 text-right font-bold text-slate-950">{formatCurrency(h.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Security */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Executed entirely offline using client-side matrices. No data transit.</span>
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(`Compound Wealth: ${formatCurrency(calculatedData.finalBalance)} in ${years} Years.`);
              }}
              className="text-primary font-bold hover:underline cursor-pointer"
            >
              Copy Summary
            </button>
          </div>

        </div>
      </div>
    </ToolPageWrapper>
  );
}
