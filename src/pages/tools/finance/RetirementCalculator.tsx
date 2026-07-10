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
import { Slider } from '@/components/ui';

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

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
};

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30); // 30 years old default
  const [retirementAge, setRetirementAge] = useState(60); // 60 years retirement default
  const [monthlyExpense, setMonthlyExpense] = useState(40000); // ₹40,000 monthly expense default
  const [inflationRate, setInflationRate] = useState(6); // 6% annual inflation
  const [expectedPreReturn, setExpectedPreReturn] = useState(12); // 12% equity return pre-retirement
  const [expectedPostReturn, setExpectedPostReturn] = useState(8); // 8% conservative return post-retirement
  const [lifeExpectancy, setLifeExpectancy] = useState(85); // 85 years life expectancy

  const retirementDetails = useMemo(() => {
    const yearsToRetire = retirementAge - currentAge;
    const postRetirementYears = lifeExpectancy - retirementAge;

    // 1. Calculate monthly expense at retirement (adjusted for inflation)
    const monthlyExpenseAtRetirement =
      monthlyExpense * Math.pow(1 + inflationRate / 100, yearsToRetire);
    const annualExpenseAtRetirement = monthlyExpenseAtRetirement * 12;

    // 2. Inflation adjusted post-retirement rate (Real Rate of Return)
    // Formula: Real Return = ((1 + PostReturn) / (1 + Inflation)) - 1
    const rPost = expectedPostReturn / 100;
    const inf = inflationRate / 100;
    const realReturn = (1 + rPost) / (1 + inf) - 1;

    // 3. Retirement Corpus needed to sustain annual expenses (PV of Annuity growing with inflation)
    // Using annuity formula with real return rate
    let corpusNeeded: number;
    if (realReturn > 0) {
      corpusNeeded =
        annualExpenseAtRetirement *
        ((1 - Math.pow(1 + realReturn, -postRetirementYears)) / realReturn);
    } else {
      corpusNeeded = annualExpenseAtRetirement * postRetirementYears;
    }

    // 4. Monthly savings required today to accumulate this corpus (FV of monthly deposits)
    const rPreMonthly = expectedPreReturn / 12 / 100;
    const totalMonths = yearsToRetire * 12;
    let monthlySavingsNeeded = 0;
    if (rPreMonthly > 0 && totalMonths > 0) {
      // PMT formula: PMT = FV * r / ((1+r)^n - 1)
      monthlySavingsNeeded =
        (corpusNeeded * rPreMonthly) / (Math.pow(1 + rPreMonthly, totalMonths) - 1);
    } else if (totalMonths > 0) {
      monthlySavingsNeeded = corpusNeeded / totalMonths;
    }

    const yearlyLabels = [];
    const targetData = [];
    const accumulatedData = [];

    // Simulate year-by-year accumulation
    let currentCorpusAccumulated = 0;
    for (let yr = 1; yr <= yearsToRetire; yr++) {
      const annualContrib = monthlySavingsNeeded * 12;
      currentCorpusAccumulated =
        (currentCorpusAccumulated + annualContrib) * (1 + expectedPreReturn / 100);

      yearlyLabels.push(`Age ${currentAge + yr}`);
      accumulatedData.push(currentCorpusAccumulated);
      targetData.push(corpusNeeded);
    }

    return {
      monthlyExpenseAtRetirement,
      corpusNeeded,
      monthlySavingsNeeded,
      yearlyLabels,
      accumulatedData,
      targetData,
    };
  }, [
    currentAge,
    retirementAge,
    monthlyExpense,
    inflationRate,
    expectedPreReturn,
    expectedPostReturn,
    lifeExpectancy,
  ]);

  const chartData = {
    labels: retirementDetails.yearlyLabels,
    datasets: [
      {
        label: 'Accumulated Savings Target',
        data: retirementDetails.accumulatedData,
        fill: true,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.2,
      },
      {
        label: 'Target Corpus Required',
        data: retirementDetails.targetData,
        borderColor: '#EC4899',
        borderDash: [5, 5],
        fill: false,
        tension: 0,
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
    <ToolPageWrapper toolId="retirement-calculator">
      <div className="tool-layout">
        {/* Controls Sidebar */}
        <div className="space-y-6 p-6 card">
          <Slider
            label="Current Monthly Expenses (₹)"
            min={5000}
            max={500000}
            step={1000}
            value={monthlyExpense}
            onChange={setMonthlyExpense}
          />
          <div className="grid grid-cols-2 gap-4">
            <Slider
              label="Current Age"
              min={18}
              max={59}
              step={1}
              value={currentAge}
              onChange={setCurrentAge}
            />
            <Slider
              label="Retirement Age"
              min={retirementAge <= currentAge ? currentAge + 1 : 40}
              max={75}
              step={1}
              value={retirementAge}
              onChange={setRetirementAge}
            />
          </div>
          <Slider
            label="Inflation Rate (%)"
            min={1}
            max={15}
            step={0.5}
            value={inflationRate}
            onChange={setInflationRate}
            suffix="%"
          />
          <Slider
            label="Expected Returns (Pre-Retire)"
            min={1}
            max={25}
            step={0.5}
            value={expectedPreReturn}
            onChange={setExpectedPreReturn}
            suffix="%"
          />
          <Slider
            label="Expected Returns (Post-Retire)"
            min={1}
            max={15}
            step={0.5}
            value={expectedPostReturn}
            onChange={setExpectedPostReturn}
            suffix="%"
          />
          <Slider
            label="Life Expectancy"
            min={retirementAge + 1}
            max={100}
            step={1}
            value={lifeExpectancy}
            onChange={setLifeExpectancy}
            suffix=" Yr"
          />
        </div>

        {/* Results layout */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="result-box text-center">
              <span className="result-label">Inflation-Adjusted Monthly Expense</span>
              <div className="result-value text-danger">
                {formatCurrency(retirementDetails.monthlyExpenseAtRetirement)}
              </div>
            </div>
            <div className="result-box text-center">
              <span className="result-label">Target Corpus Needed</span>
              <div className="result-value text-success">
                {formatCurrency(retirementDetails.corpusNeeded)}
              </div>
            </div>
            <div className="result-box text-center">
              <span className="result-label">Monthly Savings Required</span>
              <div className="result-value text-primary">
                {formatCurrency(retirementDetails.monthlySavingsNeeded)}
              </div>
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
