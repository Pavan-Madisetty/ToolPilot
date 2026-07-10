import { useState, useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Slider } from '@/components/ui';

ChartJS.register(ArcElement, Tooltip, Legend);

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
};

export default function BudgetPlanner() {
  const [monthlyIncome, setMonthlyIncome] = useState(80000); // ₹80,000 monthly income
  const [housing, setHousing] = useState(25000); // ₹25,000 housing
  const [food, setFood] = useState(12000); // ₹12,000 food
  const [utilities, setUtilities] = useState(6000); // ₹6,000 utilities
  const [transport, setTransport] = useState(5000); // ₹5,000 transport
  const [entertainment, setEntertainment] = useState(7000); // ₹7,000 entertainment

  const calculation = useMemo(() => {
    const totalExpenses = housing + food + utilities + transport + entertainment;
    const netSavings = Math.max(0, monthlyIncome - totalExpenses);
    const savingsRate = monthlyIncome > 0 ? (netSavings / monthlyIncome) * 100 : 0;

    return {
      totalExpenses,
      netSavings,
      savingsRate,
    };
  }, [monthlyIncome, housing, food, utilities, transport, entertainment]);

  const chartData = {
    labels: ['Housing', 'Food', 'Utilities', 'Transport', 'Entertainment', 'Savings'],
    datasets: [
      {
        data: [housing, food, utilities, transport, entertainment, calculation.netSavings],
        backgroundColor: [
          '#3B82F6', // Blue for housing
          '#F59E0B', // Amber for food
          '#10B981', // Emerald for utilities
          '#EC4899', // Pink for transport
          '#8B5CF6', // Purple for entertainment
          '#10B981', // Emerald for savings (lightened / separate in design)
        ],
        hoverBackgroundColor: ['#2563EB', '#D97706', '#059669', '#DB2777', '#7C3AED', '#059669'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: 'var(--text-primary)',
        },
      },
    },
  };

  return (
    <ToolPageWrapper toolId="budget-planner">
      <div className="tool-layout">
        {/* Sliders sidebar */}
        <div className="space-y-6 p-6 card">
          <Slider
            label="Monthly Net Income (₹)"
            min={5000}
            max={1000000}
            step={1000}
            value={monthlyIncome}
            onChange={setMonthlyIncome}
          />
          <Slider
            label="Housing & Rent (₹)"
            min={0}
            max={500000}
            step={500}
            value={housing}
            onChange={setHousing}
          />
          <Slider
            label="Food & Groceries (₹)"
            min={0}
            max={100000}
            step={500}
            value={food}
            onChange={setFood}
          />
          <Slider
            label="Utilities & Bills (₹)"
            min={0}
            max={100000}
            step={500}
            value={utilities}
            onChange={setUtilities}
          />
          <Slider
            label="Transportation (₹)"
            min={0}
            max={100000}
            step={500}
            value={transport}
            onChange={setTransport}
          />
          <Slider
            label="Leisure & Fun (₹)"
            min={0}
            max={100000}
            step={500}
            value={entertainment}
            onChange={setEntertainment}
          />
        </div>

        {/* Results layout */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="result-box text-center">
              <span className="result-label">Monthly Income</span>
              <div className="result-value text-primary">{formatCurrency(monthlyIncome)}</div>
            </div>
            <div className="result-box text-center">
              <span className="result-label">Total Expenses</span>
              <div className="result-value text-danger">
                {formatCurrency(calculation.totalExpenses)}
              </div>
            </div>
            <div className="result-box text-center">
              <span className="result-label">
                Net Savings ({calculation.savingsRate.toFixed(1)}%)
              </span>
              <div className="result-value text-success">
                {formatCurrency(calculation.netSavings)}
              </div>
            </div>
          </div>

          {/* Allocation Doughnut Chart */}
          <div className="p-6 card h-[320px] flex items-center justify-center relative">
            <div className="w-full h-full max-w-[280px] sm:max-w-none">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
