import { useState, useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Slider, Select } from '@/components/ui';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
};

export default function MutualFundCalculator() {
  const [investmentType, setInvestmentType] = useState<string>('sip'); // 'sip' or 'lump-sum'
  const [amount, setAmount] = useState<number>(5000); // 5000 SIP / Lumpsum default
  const [expectedReturn, setExpectedReturn] = useState<number>(12); // 12% default returns
  const [tenureYears, setTenureYears] = useState<number>(10); // 10 years default

  const investmentTypeOptions = [
    { value: 'sip', label: 'SIP (Systematic Investment Plan)' },
    { value: 'lumpsum', label: 'Lump Sum (One-time Investment)' },
  ];

  const results = useMemo(() => {
    const P = amount;
    const r = expectedReturn / 100;
    const t = tenureYears;

    let totalInvested: number;
    let maturityAmount: number;

    const yearlyLabels = [];
    const investedData = [];
    const maturityData = [];

    if (investmentType === 'sip') {
      const i = r / 12; // Monthly rate
      const months = t * 12;
      
      // Future Value of SIP formula:
      // FV = P * [((1 + i)^n - 1) / i] * (1 + i)
      totalInvested = P * months;
      if (i > 0) {
        maturityAmount = P * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
      } else {
        maturityAmount = totalInvested;
      }

      // Projections over years
      for (let yr = 1; yr <= t; yr++) {
        const m = yr * 12;
        const currentInvested = P * m;
        const currentMaturity = i > 0 
          ? P * ((Math.pow(1 + i, m) - 1) / i) * (1 + i)
          : currentInvested;
        yearlyLabels.push(`Year ${yr}`);
        investedData.push(currentInvested);
        maturityData.push(currentMaturity);
      }

    } else {
      // Lump sum compound interest formula:
      // FV = P * (1 + r)^t
      totalInvested = P;
      maturityAmount = P * Math.pow(1 + r, t);

      // Projections over years
      for (let yr = 1; yr <= t; yr++) {
        yearlyLabels.push(`Year ${yr}`);
        investedData.push(P);
        maturityData.push(P * Math.pow(1 + r, yr));
      }
    }

    const interestEarned = Math.max(0, maturityAmount - totalInvested);

    return {
      totalInvested,
      interestEarned,
      maturityAmount,
      yearlyLabels,
      investedData,
      maturityData,
    };
  }, [investmentType, amount, expectedReturn, tenureYears]);

  const chartData = {
    labels: results.yearlyLabels,
    datasets: [
      {
        label: 'Maturity Value',
        data: results.maturityData,
        fill: true,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.2,
      },
      {
        label: 'Invested Amount',
        data: results.investedData,
        fill: true,
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        tension: 0.2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        grid: {
          color: 'var(--border-subtle)',
        },
        ticks: {
          callback: (value: string | number) => formatCurrency(Number(value)),
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <ToolPageWrapper toolId="mutual-fund-calculator">
      <div className="tool-layout">
        {/* Sliders Sidebar */}
        <div className="space-y-6 p-6 card">
          <Select
            label="Investment Type"
            options={investmentTypeOptions}
            value={investmentType}
            onChange={(e) => setInvestmentType(e.target.value)}
          />
          <Slider
            label={investmentType === 'sip' ? 'Monthly SIP Amount (₹)' : 'Lump Sum Investment (₹)'}
            min={investmentType === 'sip' ? 500 : 5000}
            max={investmentType === 'sip' ? 1000000 : 10000000}
            step={500}
            value={amount}
            onChange={setAmount}
          />
          <Slider
            label="Expected Return Rate (p.a.)"
            min={1}
            max={30}
            step={0.1}
            value={expectedReturn}
            onChange={setExpectedReturn}
            suffix="%"
          />
          <Slider
            label="Tenure (Years)"
            min={1}
            max={40}
            step={1}
            value={tenureYears}
            onChange={setTenureYears}
            suffix=" Yr"
          />
        </div>

        {/* Results layout */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="result-box text-center">
              <span className="result-label">Total Invested</span>
              <div className="result-value text-blue-500">{formatCurrency(results.totalInvested)}</div>
            </div>
            <div className="result-box text-center">
              <span className="result-label">Est. Returns</span>
              <div className="result-value text-emerald-500">{formatCurrency(results.interestEarned)}</div>
            </div>
            <div className="result-box text-center">
              <span className="result-label">Total Future Value</span>
              <div className="result-value">{formatCurrency(results.maturityAmount)}</div>
            </div>
          </div>

          {/* Line Growth Chart */}
          <div className="p-6 card h-[320px] relative">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
