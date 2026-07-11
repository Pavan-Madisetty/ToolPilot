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

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
};

export default function EPFCalculator() {
  const chartTheme = useChartTheme();
  const [basicSalary, setBasicSalary] = useState(50000); // ₹50,000 basic salary default
  const [currentAge, setCurrentAge] = useState(30); // 30 years old default
  const [annualIncrement, setAnnualIncrement] = useState(6); // 6% increment p.a.
  const [epfContributionRate, setEpfContributionRate] = useState(12); // 12% employee contribution standard

  const currentEPFRate = 8.15; // 8.15% current statutory EPF interest rate

  const projection = useMemo(() => {
    const age = currentAge;
    const retirementAge = 58;
    const yearsToRetire = retirementAge - age;

    let employeeBalance = 0;
    let employerBalance = 0;
    let accumulatedBasic = basicSalary;
    let totalInvested = 0;

    const yearlyLabels = [];
    const investedData = [];
    const corpusData = [];

    const monthlyInterestRate = currentEPFRate / 100 / 12;

    for (let yr = 1; yr <= yearsToRetire; yr++) {
      // 12% employee contribution
      const monthlyEmployeeContribution = accumulatedBasic * (epfContributionRate / 100);

      // 3.67% employer share goes to EPF (remainder 8.33% goes to EPS pension fund)
      const monthlyEmployerEPFContribution = accumulatedBasic * 0.0367;

      let yearInvestment = 0;

      for (let month = 1; month <= 12; month++) {
        const employeeContribution = monthlyEmployeeContribution;
        const employerContribution = monthlyEmployerEPFContribution;

        employeeBalance += employeeContribution;
        employerBalance += employerContribution;

        // Calculate monthly interest accrued
        const monthlyInterest = (employeeBalance + employerBalance) * monthlyInterestRate;
        employeeBalance += monthlyInterest;
        yearInvestment += employeeContribution + employerContribution;
      }

      totalInvested += yearInvestment;

      yearlyLabels.push(`Age ${age + yr}`);
      investedData.push(totalInvested);
      corpusData.push(employeeBalance + employerBalance);

      // Increment salary at the end of each year
      accumulatedBasic = accumulatedBasic * (1 + annualIncrement / 100);
    }

    const finalCorpus = employeeBalance + employerBalance;
    const interestEarned = Math.max(0, finalCorpus - totalInvested);

    return {
      totalInvested,
      interestEarned,
      finalCorpus,
      yearlyLabels,
      investedData,
      corpusData,
    };
  }, [basicSalary, currentAge, annualIncrement, epfContributionRate]);

  const chartData = {
    labels: projection.yearlyLabels,
    datasets: [
      {
        label: 'EPF Corpus Accumulated',
        data: projection.corpusData,
        fill: true,
        borderColor: chartTheme.success,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.2,
      },
      {
        label: 'Total Contributions',
        data: projection.investedData,
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
        labels: { color: chartTheme.textSecondary },
      },
    },
    scales: {
      y: {
        grid: {
          color: chartTheme.borderSubtle,
        },
        ticks: {
          color: chartTheme.textTertiary,
          callback: (value: string | number) => formatCurrency(Number(value)),
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
    <ToolPageWrapper toolId="epf-calculator">
      <div className="tool-layout">
        {/* Controls Sidebar */}
        <div className="space-y-6 p-6 card">
          <Slider
            label="Monthly Basic Salary + DA (₹)"
            min={5000}
            max={500000}
            step={1000}
            value={basicSalary}
            onChange={setBasicSalary}
          />
          <Slider
            label="Current Age (Years)"
            min={18}
            max={57}
            step={1}
            value={currentAge}
            onChange={setCurrentAge}
          />
          <div>
            <Slider
              label="Employee EPF Share (%)"
              min={12}
              max={12}
              step={0}
              value={epfContributionRate}
              onChange={setEpfContributionRate}
              suffix="%"
            />
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
              Statutory EPF employee contribution is fixed at 12%.
            </span>
          </div>
          <Slider
            label="Expected Annual Salary Increment"
            min={0}
            max={25}
            step={1}
            value={annualIncrement}
            onChange={setAnnualIncrement}
            suffix="%"
          />
        </div>

        {/* Results layout */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="result-box text-center">
              <span className="result-label">Total Contributions</span>
              <div className="result-value text-primary">
                {formatCurrency(projection.totalInvested)}
              </div>
            </div>
            <div className="result-box text-center">
              <span className="result-label">Total Interest Earned</span>
              <div className="result-value text-success">
                {formatCurrency(projection.interestEarned)}
              </div>
            </div>
            <div className="result-box text-center">
              <span className="result-label">Corpus at Retirement (Age 58)</span>
              <div className="result-value">{formatCurrency(projection.finalCorpus)}</div>
            </div>
          </div>

          {/* Line progression chart */}
          <div className="p-6 card h-[320px] relative">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
