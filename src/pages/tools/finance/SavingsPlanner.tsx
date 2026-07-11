import { useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Slider, ResultBox } from '@/components/ui';
import { useChartTheme } from '@/hooks/useChartTheme';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function SavingsPlanner() {
  const chartTheme = useChartTheme();
  const [targetAmount, setTargetAmount] = useState<number>(1000000); // Default: ₹10,00,000 (10 Lakhs)
  const [years, setYears] = useState<number>(10); // Default: 10 years
  const [interestRate, setInterestRate] = useState<number>(8); // Default: 8%

  const calculations = useMemo(() => {
    const totalMonths = years * 12;
    const r = interestRate / 100 / 12;

    // Monthly deposit required formula (ordinary annuity):
    // FV = PMT * [((1 + r)^n - 1) / r] => PMT = FV * r / [((1 + r)^n - 1)]
    let monthlyDeposit: number;
    if (r > 0) {
      monthlyDeposit = (targetAmount * r) / (Math.pow(1 + r, totalMonths) - 1);
    } else {
      monthlyDeposit = targetAmount / totalMonths;
    }

    const totalInvested = monthlyDeposit * totalMonths;
    const totalInterest = targetAmount - totalInvested;

    // Generate projection data for the chart (annual breakdown)
    const yearlyLabels = [];
    const investedData = [];
    const balanceData = [];

    for (let yr = 1; yr <= years; yr++) {
      const months = yr * 12;
      let balance: number;
      if (r > 0) {
        balance = monthlyDeposit * ((Math.pow(1 + r, months) - 1) / r);
      } else {
        balance = monthlyDeposit * months;
      }
      yearlyLabels.push(`Year ${yr}`);
      investedData.push(monthlyDeposit * months);
      balanceData.push(balance);
    }

    return {
      monthlyDeposit,
      totalInvested,
      totalInterest,
      yearlyLabels,
      investedData,
      balanceData,
    };
  }, [targetAmount, years, interestRate]);

  const chartData = {
    labels: calculations.yearlyLabels,
    datasets: [
      {
        label: 'Target / Accumulated Balance',
        data: calculations.balanceData,
        fill: true,
        borderColor: chartTheme.success,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.2,
      },
      {
        label: 'Total Principal Invested',
        data: calculations.investedData,
        fill: true,
        borderColor: chartTheme.primary,
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
        labels: {
          color: chartTheme.textSecondary,
        },
      },
    },
    scales: {
      y: {
        grid: {
          color: chartTheme.borderSubtle,
        },
        ticks: {
          color: chartTheme.textTertiary,
          callback: (value: string | number) => '₹' + Number(value).toLocaleString('en-IN'),
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: chartTheme.textTertiary,
        },
      },
    },
  };

  return (
    <ToolPageWrapper toolId="savings-planner">
      <div className="tool-layout">
        {/* Input Card */}
        <div className="space-y-6 p-6 card">
          <Slider
            label="Target Amount (₹)"
            min={10000}
            max={100000000}
            step={10000}
            value={targetAmount}
            onChange={setTargetAmount}
          />
          <Slider
            label="Time Horizon (Years)"
            min={1}
            max={40}
            step={1}
            value={years}
            onChange={setYears}
            suffix=" Yr"
          />
          <Slider
            label="Expected Interest Rate (% p.a.)"
            min={1}
            max={25}
            step={0.5}
            value={interestRate}
            onChange={setInterestRate}
            suffix="%"
          />
        </div>

        {/* Output & Chart */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultBox
              label="Monthly Deposit Required"
              value={calculations.monthlyDeposit}
              prefix="₹"
              highlight
            />
            <ResultBox label="Total Invested" value={calculations.totalInvested} prefix="₹" />
            <ResultBox
              label="Total Interest Earned"
              value={calculations.totalInterest}
              prefix="₹"
            />
          </div>

          <div className="p-6 card h-[320px] relative">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
