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

export default function InflationCalculator() {
  const [currentAmount, setCurrentAmount] = useState<number>(100000); // Default: ₹1,00,000
  const [inflationRate, setInflationRate] = useState<number>(6); // Default: 6%
  const [years, setYears] = useState<number>(10); // Default: 10 years

  const calculation = useMemo(() => {
    const rate = inflationRate / 100;
    const futureValue = currentAmount * Math.pow(1 + rate, years);
    const purchasingPower = currentAmount / Math.pow(1 + rate, years);
    const powerLoss = currentAmount - purchasingPower;

    const yearlyLabels = [];
    const futureValueData = [];
    const purchasingPowerData = [];

    for (let i = 1; i <= years; i++) {
      yearlyLabels.push(`Year ${i}`);
      futureValueData.push(currentAmount * Math.pow(1 + rate, i));
      purchasingPowerData.push(currentAmount / Math.pow(1 + rate, i));
    }

    return {
      futureValue,
      purchasingPower,
      powerLoss,
      yearlyLabels,
      futureValueData,
      purchasingPowerData,
    };
  }, [currentAmount, inflationRate, years]);

  const chartData = {
    labels: calculation.yearlyLabels,
    datasets: [
      {
        label: 'Future Value (Required to buy same goods)',
        data: calculation.futureValueData,
        fill: false,
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.2,
      },
      {
        label: "Purchasing Power (Real value of today's amount)",
        data: calculation.purchasingPowerData,
        fill: true,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
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
    <ToolPageWrapper toolId="inflation-calculator">
      <div className="tool-layout">
        {/* Input Card */}
        <div className="space-y-6 p-6 card">
          <Slider
            label="Current Amount (₹)"
            min={1000}
            max={10000000}
            step={1000}
            value={currentAmount}
            onChange={setCurrentAmount}
          />
          <Slider
            label="Expected Inflation Rate (%)"
            min={1}
            max={20}
            step={0.1}
            value={inflationRate}
            onChange={setInflationRate}
            suffix="%"
          />
          <Slider
            label="Time Period (Years)"
            min={1}
            max={40}
            step={1}
            value={years}
            onChange={setYears}
            suffix=" Yr"
          />
        </div>

        {/* Output & Chart */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultBox label="Future Value" value={calculation.futureValue} prefix="₹" highlight />
            <ResultBox label="Purchasing Power" value={calculation.purchasingPower} prefix="₹" />
            <ResultBox label="Purchasing Power Loss" value={calculation.powerLoss} prefix="₹" />
          </div>

          <div className="p-6 card h-[320px] relative">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
