import { useState, useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Slider } from '@/components/ui';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
};

export default function RDCalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState(5000); // ₹5,000 monthly investment
  const [interestRate, setInterestRate] = useState(6.8); // 6.8% interest rate default
  const [tenureYears, setTenureYears] = useState(5); // 5 years default

  const projection = useMemo(() => {
    const P = monthlyAmount;
    const r = interestRate / 100;
    const t = tenureYears;
    const n = 4; // Compounded quarterly (standard bank RD rule in India)

    let totalInvested = 0;
    let balance = 0;
    
    const yearlyLabels = [];
    const investedData = [];
    const maturityData = [];

    // Loop through each year
    for (let yr = 1; yr <= t; yr++) {
      // In RD, each month's investment compounds for the remaining months of that year/tenure
      // Formula for RD maturity value:
      // M = P * ((1 + r/n)^(nt) - 1) / (1 - (1 + r/n)^(-1/3)) // where n=4 (quarterly compounding)
      const currentMonths = yr * 12;
      totalInvested = P * currentMonths;
      
      // Calculate compound interest compounding quarterly for recurring monthly deposits
      // Let's compute monthly additions:
      let tempBalance = 0;
      for (let m = 1; m <= currentMonths; m++) {
        // Compound each month's payment for the remaining periods
        const compoundingPeriods = (currentMonths - m + 1) / 3; // divided by quarterly period
        tempBalance += P * Math.pow(1 + r / n, compoundingPeriods);
      }
      balance = tempBalance;

      yearlyLabels.push(`Year ${yr}`);
      investedData.push(totalInvested);
      maturityData.push(balance);
    }

    const interestEarned = Math.max(0, balance - totalInvested);

    return {
      totalInvested: P * t * 12,
      interestEarned,
      maturityAmount: balance,
      yearlyLabels,
      investedData,
      maturityData,
    };
  }, [monthlyAmount, interestRate, tenureYears]);

  const chartData = {
    labels: projection.yearlyLabels,
    datasets: [
      {
        label: 'Maturity Value',
        data: projection.maturityData,
        fill: true,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.2,
      },
      {
        label: 'Invested Amount',
        data: projection.investedData,
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
    <ToolPageWrapper toolId="rd-calculator">
      <div className="tool-layout">
        {/* Sliders sidebar */}
        <div className="space-y-6 p-6 card">
          <Slider
            label="Monthly Deposit Amount (₹)"
            min={500}
            max={1000000}
            step={500}
            value={monthlyAmount}
            onChange={setMonthlyAmount}
          />
          <Slider
            label="Rate of Interest (p.a.)"
            min={1}
            max={15}
            step={0.1}
            value={interestRate}
            onChange={setInterestRate}
            suffix="%"
          />
          <Slider
            label="Tenure (Years)"
            min={1}
            max={25}
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
              <span className="result-label">Invested Amount</span>
              <div className="result-value text-primary">{formatCurrency(projection.totalInvested)}</div>
            </div>
            <div className="result-box text-center">
              <span className="result-label">Est. Interest</span>
              <div className="result-value text-success">{formatCurrency(projection.interestEarned)}</div>
            </div>
            <div className="result-box text-center">
              <span className="result-label">Maturity Value</span>
              <div className="result-value">{formatCurrency(projection.maturityAmount)}</div>
            </div>
          </div>

          {/* Growth chart */}
          <div className="p-6 card h-[320px] relative">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
