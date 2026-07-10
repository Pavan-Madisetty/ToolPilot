import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Select, Slider, Switch, StatCard, Badge } from '@/components/ui';

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

export default function BMICalculator() {
  const [isImperial, setIsImperial] = useState<boolean>(false);
  const [gender, setGender] = useState<string>('male');
  const [age, setAge] = useState<number>(25);

  // Height states
  const [heightCm, setHeightCm] = useState<number>(170);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(7);

  // Weight states
  const [weightKg, setWeightKg] = useState<number>(70);
  const [weightLbs, setWeightLbs] = useState<number>(154);

  // Compute BMI & ranges
  const results = useMemo(() => {
    let wKg = weightKg;
    let hM = heightCm / 100;
    let hInches = (heightFt * 12) + heightIn;

    if (isImperial) {
      wKg = weightLbs * 0.45359237;
      hM = hInches * 0.0254;
    } else {
      hInches = heightCm / 2.54;
    }

    if (hM <= 0 || wKg <= 0) {
      return {
        bmi: 0,
        status: 'Invalid Input',
        statusColor: 'var(--text-tertiary)',
        statusClass: 'bg-slate-100 text-slate-700',
        minIdealWeight: 0,
        maxIdealWeight: 0,
        devineIdealWeight: 0,
      };
    }

    const bmi = wKg / (hM * hM);

    let status: string;
    let statusColor: string;
    let statusClass: string;

    if (bmi < 18.5) {
      status = 'Underweight';
      statusColor = '#3b82f6'; // Blue
      statusClass = 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400';
    } else if (bmi >= 18.5 && bmi < 25) {
      status = 'Normal';
      statusColor = 'var(--success)';
      statusClass = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400';
    } else if (bmi >= 25 && bmi < 30) {
      status = 'Overweight';
      statusColor = '#f59e0b'; // Amber
      statusClass = 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400';
    } else {
      status = 'Obese';
      statusColor = 'var(--danger)'; // Red
      statusClass = 'bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-400';
    }

    // Healthy weight range (BMI 18.5 to 24.9)
    let minIdeal = 18.5 * hM * hM;
    let maxIdeal = 24.9 * hM * hM;

    // Devine formula for Ideal Weight (1974)
    // Male: 50.0 kg + 2.3 kg per inch over 5 feet
    // Female: 45.5 kg + 2.3 kg per inch over 5 feet
    let devine: number;
    const inchesOver5Ft = hInches - 60;
    if (inchesOver5Ft >= 0) {
      const baseWeight = gender === 'male' ? 50.0 : 45.5;
      devine = baseWeight + (2.3 * inchesOver5Ft);
    } else {
      // Scale down if under 5 feet
      const baseWeight = gender === 'male' ? 50.0 : 45.5;
      devine = baseWeight - (2.3 * Math.abs(inchesOver5Ft));
      if (devine < 10) devine = 10; // safety limit
    }

    if (isImperial) {
      minIdeal = minIdeal / 0.45359237;
      maxIdeal = maxIdeal / 0.45359237;
      devine = devine / 0.45359237;
    }

    return {
      bmi,
      status,
      statusColor,
      statusClass,
      minIdealWeight: minIdeal,
      maxIdealWeight: maxIdeal,
      devineIdealWeight: devine,
    };
  }, [isImperial, gender, heightCm, heightFt, heightIn, weightKg, weightLbs]);

  // Position of gauge indicator (15 to 35 range)
  const gaugePercent = useMemo(() => {
    const min = 15;
    const max = 35;
    if (results.bmi < min) return 0;
    if (results.bmi > max) return 100;
    return ((results.bmi - min) / (max - min)) * 100;
  }, [results.bmi]);

  return (
    <ToolPageWrapper toolId="bmi-calculator">
      <div className="tool-layout lg:grid-cols-2 gap-6">
        
        {/* Left Side: Inputs */}
        <div className="space-y-6 p-6 card">
          <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--border-default)' }}>
            <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Your Parameters</h3>
            <Switch
              label="Imperial System"
              checked={isImperial}
              onChange={setIsImperial}
              description="Use lbs / ft-in instead of kg / cm"
            />
          </div>

          {/* Gender and Age */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Gender"
              options={genderOptions}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
            <Slider
              label="Age"
              min={2}
              max={120}
              value={age}
              onChange={setAge}
              suffix=" yrs"
            />
          </div>

          {/* Height Input */}
          <div className="space-y-4">
            {isImperial ? (
              <div className="grid grid-cols-2 gap-4">
                <Slider
                  label="Height (Feet)"
                  min={3}
                  max={8}
                  value={heightFt}
                  onChange={setHeightFt}
                  suffix=" ft"
                />
                <Slider
                  label="Height (Inches)"
                  min={0}
                  max={11}
                  value={heightIn}
                  onChange={setHeightIn}
                  suffix=" in"
                />
              </div>
            ) : (
              <Slider
                label="Height"
                min={90}
                max={240}
                value={heightCm}
                onChange={setHeightCm}
                suffix=" cm"
              />
            )}
          </div>

          {/* Weight Input */}
          <div>
            {isImperial ? (
              <Slider
                label="Weight"
                min={20}
                max={500}
                value={weightLbs}
                onChange={setWeightLbs}
                suffix=" lbs"
              />
            ) : (
              <Slider
                label="Weight"
                min={10}
                max={250}
                value={weightKg}
                onChange={setWeightKg}
                suffix=" kg"
              />
            )}
          </div>
        </div>

        {/* Right Side: Results */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="flex flex-col items-center justify-center text-center p-6">
              <span className="text-sm font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Your BMI Score</span>
              <span className="text-5xl font-extrabold text-primary mb-2">
                {results.bmi.toFixed(1)}
              </span>
              <Badge className={`text-sm px-3 py-1 font-semibold rounded-full ${results.statusClass}`}>
                {results.status}
              </Badge>
            </Card>

            <div className="space-y-4">
              <StatCard
                label={`Healthy Weight Range`}
                value={`${results.minIdealWeight.toFixed(1)} - ${results.maxIdealWeight.toFixed(1)}`}
                suffix={isImperial ? 'lbs' : 'kg'}
              />
              <StatCard
                label="Ideal Weight (Devine Formula)"
                value={results.devineIdealWeight.toFixed(1)}
                suffix={isImperial ? 'lbs' : 'kg'}
              />
            </div>
          </div>

          {/* Visual BMI Gauge */}
          <div className="p-6 card space-y-6">
            <div>
              <h4 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>BMI Category Gauge</h4>
              
              {/* Gauge Bar */}
              <div className="relative w-full pt-6 pb-2">
                {/* Pointer Marker */}
                <div 
                  className="absolute top-0 flex flex-col items-center transition-all duration-300 ease-out -ml-3"
                  style={{ left: `${gaugePercent}%` }}
                >
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-sm" style={{ color: 'var(--text-primary)' }}>
                    {results.bmi.toFixed(1)}
                  </span>
                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[var(--text-primary)]" />
                </div>

                {/* Track */}
                <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 dark:bg-slate-800">
                  <div className="bg-blue-400 dark:bg-blue-500 h-full" style={{ width: '17.5%' }} title="Underweight (&lt;18.5)" />
                  <div className="bg-emerald-500 dark:bg-emerald-600 h-full" style={{ width: '32.5%' }} title="Normal (18.5 - 25)" />
                  <div className="bg-amber-400 dark:bg-amber-500 h-full" style={{ width: '25%' }} title="Overweight (25 - 30)" />
                  <div className="bg-red-500 dark:bg-red-600 h-full" style={{ width: '25%' }} title="Obese (&gt;=30)" />
                </div>
              </div>

              {/* Labels below the bar */}
              <div className="flex justify-between text-[10px] mt-1 px-1 font-semibold" style={{ color: 'var(--text-tertiary)' }}>
                <span className="text-blue-500">Underweight (&lt;18.5)</span>
                <span className="text-emerald-500">Normal (18.5-25)</span>
                <span className="text-amber-500">Overweight (25-30)</span>
                <span className="text-red-500">Obese (&gt;30)</span>
              </div>
            </div>

            {/* Health Info Summary */}
            <div className="border-t pt-4 text-sm space-y-2" style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>
              <p>
                <strong>What does this mean?</strong>
              </p>
              {results.bmi < 18.5 && (
                <p>A BMI under 18.5 indicates that you are underweight. You may need to gain weight in a healthy manner. Consulting with a healthcare provider is recommended.</p>
              )}
              {results.bmi >= 18.5 && results.bmi < 25 && (
                <p>A BMI of 18.5 to 24.9 is considered normal or healthy. Maintaining this range reduces the risk of serious health conditions like heart disease and diabetes.</p>
              )}
              {results.bmi >= 25 && results.bmi < 30 && (
                <p>A BMI of 25 to 29.9 is classified as overweight. Incorporating balanced nutrition and moderate physical activity can help manage your weight.</p>
              )}
              {results.bmi >= 30 && (
                <p>A BMI of 30 or higher indicates obesity. This classification is associated with elevated health risks. It is recommended to speak with a healthcare professional.</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </ToolPageWrapper>
  );
}
