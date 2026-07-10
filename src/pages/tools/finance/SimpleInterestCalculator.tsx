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

export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState<number>(100000); // Default: ₹1,00,000
  const [rate, setRate] = useState<number>(10); // Default: 10%
  const [years, setYears] = useState<number>(5); // Default: 5 years

  const calculation = useMemo(() => {
    const interest = (principal * rate * years) / 100;
    const totalAmount = principal + interest;

    const yearlyLabels = [];
    const principalData = [];
    const interestData = [];
    const totalData = [];

    for (let i = 1; i <= years; i++) {
      const currentInterest = (principal * rate * i) / 100;
      yearlyLabels.push(`Year ${i}`);
      principalData.push(principal);
      interestData.push(currentInterest);
      totalData.push(principal + currentInterest);
    }

    return {
      simpleInterest: interest,
      totalAmount,
      yearlyLabels,
      principalData,
      interestData,
      totalData,
    };
  }, [principal, rate, years]);

  const chartData = {
    labels: calculation.yearlyLabels,
    datasets: [
      {
        label: 'Total Amount',
        data: calculation.totalData,
        fill: true,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.2,
      },
      {
        label: 'Simple Interest',
        data: calculation.interestData,
        fill: true,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
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
          color: 'var(--text-secondary)',
        },
      },
    },
    scales: {
      y: {
        grid: {
          color: 'var(--border-subtle)',
        },
        ticks: {
          color: 'var(--text-secondary)',
          callback: (value: string | number) => '₹' + Number(value).toLocaleString('en-IN'),
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'var(--text-secondary)',
        },
      },
    },
  };

  return (
    <ToolPageWrapper toolId="simple-interest-calculator">
      <div className="tool-layout">
        {/* Input Card */}
        <div className="space-y-6 p-6 card">
          <Slider
            label="Principal Amount (₹)"
            min={1000}
            max={10000000}
            step={1000}
            value={principal}
            onChange={setPrincipal}
          />
          <Slider
            label="Rate of Interest (p.a. %)"
            min={1}
            max={30}
            step={0.1}
            value={rate}
            onChange={setRate}
            suffix="%"
          />
          <Slider
            label="Time Period (Years)"
            min={1}
            max={30}
            step={1}
            value={years}
            onChange={setYears}
            suffix=" Yr"
          />
        </div>

        {/* Output & Chart */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultBox label="Principal Amount" value={principal} prefix="₹" />
            <ResultBox
              label="Simple Interest"
              value={calculation.simpleInterest}
              prefix="₹"
              highlight
            />
            <ResultBox label="Total Amount" value={calculation.totalAmount} prefix="₹" />
          </div>

          <div className="p-6 card h-[320px] relative">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
