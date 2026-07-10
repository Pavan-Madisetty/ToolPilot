import { useState, useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Slider } from '@/components/ui';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
};

export default function LoanComparison() {
  // Loan A State
  const [pA, setPA] = useState(2000000); // ₹20 Lakhs
  const [rA, setRA] = useState(8.5); // 8.5%
  const [tA, setTA] = useState(15); // 15 years

  // Loan B State
  const [pB, setPB] = useState(2000000); // ₹20 Lakhs
  const [rB, setRB] = useState(9.2); // 9.2%
  const [tB, setTB] = useState(15); // 15 years

  const results = useMemo(() => {
    // Loan A calculations
    const monthlyRateA = rA / 12 / 100;
    const monthsA = tA * 12;
    let emiA: number;
    if (monthlyRateA > 0) {
      emiA = (pA * monthlyRateA * Math.pow(1 + monthlyRateA, monthsA)) / (Math.pow(1 + monthlyRateA, monthsA) - 1);
    } else {
      emiA = pA / monthsA;
    }
    const totalPayableA = emiA * monthsA;
    const totalInterestA = totalPayableA - pA;

    // Loan B calculations
    const monthlyRateB = rB / 12 / 100;
    const monthsB = tB * 12;
    let emiB: number;
    if (monthlyRateB > 0) {
      emiB = (pB * monthlyRateB * Math.pow(1 + monthlyRateB, monthsB)) / (Math.pow(1 + monthlyRateB, monthsB) - 1);
    } else {
      emiB = pB / monthsB;
    }
    const totalPayableB = emiB * monthsB;
    const totalInterestB = totalPayableB - pB;

    const emiDiff = emiB - emiA;
    const interestDiff = totalInterestB - totalInterestA;
    const totalDiff = totalPayableB - totalPayableA;

    return {
      emiA,
      totalInterestA,
      totalPayableA,
      emiB,
      totalInterestB,
      totalPayableB,
      emiDiff,
      interestDiff,
      totalDiff,
    };
  }, [pA, rA, tA, pB, rB, tB]);

  const chartData = {
    labels: ['Loan A', 'Loan B'],
    datasets: [
      {
        label: 'Principal Amount',
        data: [pA, pB],
        backgroundColor: '#4F46E5',
        borderRadius: 6,
      },
      {
        label: 'Total Interest',
        data: [results.totalInterestA, results.totalInterestB],
        backgroundColor: '#EF4444',
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'var(--text-primary)',
        },
      },
    },
    scales: {
      y: {
        stacked: true,
        grid: {
          color: 'var(--border-subtle)',
        },
        ticks: {
          callback: (value: string | number) => formatCurrency(Number(value)),
        },
      },
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <ToolPageWrapper toolId="loan-comparison">
      <div className="tool-layout lg:grid-cols-2 gap-8">
        
        {/* Left Side: Inputs for both Loan A and Loan B */}
        <div className="space-y-8">
          {/* Loan A card */}
          <div className="p-6 card space-y-6">
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-default)' }}>
              <h3 className="font-bold text-sm uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Loan Option A</h3>
              <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded">Option A</span>
            </div>
            <Slider
              label="Loan Amount A (₹)"
              min={100000}
              max={100000000}
              step={50000}
              value={pA}
              onChange={setPA}
            />
            <Slider
              label="Interest Rate A (p.a.)"
              min={5}
              max={25}
              step={0.1}
              value={rA}
              onChange={setRA}
              suffix="%"
            />
            <Slider
              label="Tenure A (Years)"
              min={1}
              max={30}
              step={1}
              value={tA}
              onChange={setTA}
              suffix=" Yr"
            />
          </div>

          {/* Loan B card */}
          <div className="p-6 card space-y-6">
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-default)' }}>
              <h3 className="font-bold text-sm uppercase tracking-wider text-rose-500">Loan Option B</h3>
              <span className="text-xs font-semibold px-2 py-0.5 bg-rose-50 text-rose-500 rounded">Option B</span>
            </div>
            <Slider
              label="Loan Amount B (₹)"
              min={100000}
              max={100000000}
              step={50000}
              value={pB}
              onChange={setPB}
            />
            <Slider
              label="Interest Rate B (p.a.)"
              min={5}
              max={25}
              step={0.1}
              value={rB}
              onChange={setRB}
              suffix="%"
            />
            <Slider
              label="Tenure B (Years)"
              min={1}
              max={30}
              step={1}
              value={tB}
              onChange={setTB}
              suffix=" Yr"
            />
          </div>
        </div>

        {/* Right Side: Comparative Output & Chart */}
        <div className="space-y-6 flex flex-col">
          {/* Side-by-Side Comparison grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border bg-slate-50/50 dark:bg-slate-800/20 text-center" style={{ borderColor: 'var(--border-default)' }}>
              <span className="text-xs text-slate-500 dark:text-slate-400">Monthly EMI (A)</span>
              <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{formatCurrency(results.emiA)}</div>
            </div>
            <div className="p-4 rounded-xl border bg-slate-50/50 dark:bg-slate-800/20 text-center" style={{ borderColor: 'var(--border-default)' }}>
              <span className="text-xs text-slate-500 dark:text-slate-400">Monthly EMI (B)</span>
              <div className="text-xl font-bold text-rose-500 mt-1">{formatCurrency(results.emiB)}</div>
            </div>
            <div className="p-4 rounded-xl border bg-slate-50/50 dark:bg-slate-800/20 text-center" style={{ borderColor: 'var(--border-default)' }}>
              <span className="text-xs text-slate-500 dark:text-slate-400">Total Interest (A)</span>
              <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mt-1">{formatCurrency(results.totalInterestA)}</div>
            </div>
            <div className="p-4 rounded-xl border bg-slate-50/50 dark:bg-slate-800/20 text-center" style={{ borderColor: 'var(--border-default)' }}>
              <span className="text-xs text-slate-500 dark:text-slate-400">Total Interest (B)</span>
              <div className="text-lg font-bold text-rose-500 mt-1">{formatCurrency(results.totalInterestB)}</div>
            </div>
          </div>

          {/* Difference / Savings Box */}
          <div className="p-5 rounded-2xl border text-center bg-white dark:bg-slate-900/40" style={{ borderColor: 'var(--border-default)' }}>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Difference (Option B - Option A)</span>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">EMI Difference</div>
                <div className={`text-sm font-bold mt-1 ${results.emiDiff >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {results.emiDiff >= 0 ? '+' : ''}{formatCurrency(results.emiDiff)}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Interest Diff.</div>
                <div className={`text-sm font-bold mt-1 ${results.interestDiff >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {results.interestDiff >= 0 ? '+' : ''}{formatCurrency(results.interestDiff)}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Total Cost Diff.</div>
                <div className={`text-sm font-bold mt-1 ${results.totalDiff >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {results.totalDiff >= 0 ? '+' : ''}{formatCurrency(results.totalDiff)}
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-4">
              {results.totalDiff > 0 
                ? `Option A saves you a total of ${formatCurrency(results.totalDiff)} compared to Option B.`
                : results.totalDiff < 0
                ? `Option B saves you a total of ${formatCurrency(Math.abs(results.totalDiff))} compared to Option A.`
                : 'Both options have identical total repayment costs.'
              }
            </p>
          </div>

          {/* Comparison Bar Chart */}
          <div className="p-6 card flex-1 h-[280px] relative">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

      </div>
    </ToolPageWrapper>
  );
}
