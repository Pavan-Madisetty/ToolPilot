import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Button, Input, Select, ResultBox } from '@/components/ui';

const ACTIVITY_OPTIONS = [
  { value: '1.2', label: 'Sedentary (little or no exercise)' },
  { value: '1.375', label: 'Lightly active (light exercise/sports 1-3 days/week)' },
  { value: '1.55', label: 'Moderately active (moderate exercise/sports 3-5 days/week)' },
  { value: '1.725', label: 'Very active (hard exercise/sports 6-7 days/week)' },
  { value: '1.9', label: 'Extra active (very hard exercise/sports & physical job)' },
];

export default function CalorieCalculator() {
  const [inputType, setInputType] = useState<'direct' | 'calculate'>('calculate');

  // Direct BMR Input
  const [directBmr, setDirectBmr] = useState<number>(1500);

  // Calculate BMR Inputs
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(25);
  const [weightKg, setWeightKg] = useState<number>(70);
  const [heightCm, setHeightCm] = useState<number>(170);
  const [weightLbs, setWeightLbs] = useState<number>(154);
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(7);

  // Common Activity Level
  const [activityMultiplier, setActivityMultiplier] = useState<string>('1.55');

  const calculatedBmr = useMemo(() => {
    if (inputType === 'direct') {
      return directBmr || 0;
    }

    let weight = weightKg;
    let height = heightCm;

    if (unitSystem === 'imperial') {
      weight = weightLbs * 0.45359237;
      height = (heightFeet * 12 + heightInches) * 2.54;
    }

    if (!weight || !height || !age) return 0;

    // Mifflin-St Jeor Equation
    if (gender === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  }, [
    inputType,
    directBmr,
    unitSystem,
    gender,
    age,
    weightKg,
    heightCm,
    weightLbs,
    heightFeet,
    heightInches,
  ]);

  const maintenanceCalories = useMemo(() => {
    const mult = Number(activityMultiplier) || 1.2;
    return Math.round(calculatedBmr * mult);
  }, [calculatedBmr, activityMultiplier]);

  const caloriePlans = useMemo(() => {
    const tdee = maintenanceCalories;
    if (!tdee) return [];

    return [
      {
        name: 'Mild Weight Loss',
        change: '-250 kcal',
        target: tdee - 250,
        desc: 'Lose ~0.25 kg (0.5 lbs) per week',
        color: 'var(--success)',
      },
      {
        name: 'Weight Loss',
        change: '-500 kcal',
        target: tdee - 500,
        desc: 'Lose ~0.5 kg (1 lb) per week',
        color: 'var(--success)',
      },
      {
        name: 'Extreme Weight Loss',
        change: '-1000 kcal',
        target: tdee - 1000,
        desc: 'Lose ~1 kg (2 lbs) per week',
        color: 'var(--danger)',
      },
      {
        name: 'Maintenance',
        change: '0 kcal',
        target: tdee,
        desc: 'Keep current weight',
        color: 'var(--text-secondary)',
      },
      {
        name: 'Mild Weight Gain',
        change: '+250 kcal',
        target: tdee + 250,
        desc: 'Gain ~0.25 kg (0.5 lbs) per week',
        color: 'var(--primary)',
      },
      {
        name: 'Weight Gain',
        change: '+500 kcal',
        target: tdee + 500,
        desc: 'Gain ~0.5 kg (1 lb) per week',
        color: 'var(--primary)',
      },
    ];
  }, [maintenanceCalories]);

  return (
    <ToolPageWrapper toolId="calorie-calculator">
      <div className="tool-layout lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="space-y-6">
            <div
              className="flex justify-between items-center border-b pb-4"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                BMR / Metric Inputs
              </h2>
              <div className="flex gap-2">
                <Button
                  variant={inputType === 'calculate' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setInputType('calculate')}
                >
                  Calculate BMR
                </Button>
                <Button
                  variant={inputType === 'direct' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setInputType('direct')}
                >
                  Direct BMR
                </Button>
              </div>
            </div>

            {inputType === 'direct' ? (
              <Input
                label="Basal Metabolic Rate (BMR) in kcal"
                type="number"
                value={directBmr === 0 ? '' : directBmr}
                onChange={(e) => setDirectBmr(Number(e.target.value))}
                placeholder="e.g. 1500"
              />
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="label">Unit System</span>
                  <div className="flex gap-2">
                    <Button
                      variant={unitSystem === 'metric' ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => setUnitSystem('metric')}
                    >
                      Metric
                    </Button>
                    <Button
                      variant={unitSystem === 'imperial' ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => setUnitSystem('imperial')}
                    >
                      Imperial
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="label">Gender</span>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant={gender === 'male' ? 'primary' : 'secondary'}
                      onClick={() => setGender('male')}
                      type="button"
                    >
                      Male
                    </Button>
                    <Button
                      variant={gender === 'female' ? 'primary' : 'secondary'}
                      onClick={() => setGender('female')}
                      type="button"
                    >
                      Female
                    </Button>
                  </div>
                </div>

                <Input
                  label="Age (years)"
                  type="number"
                  value={age === 0 ? '' : age}
                  onChange={(e) => setAge(Number(e.target.value))}
                />

                {unitSystem === 'metric' ? (
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Weight (kg)"
                      type="number"
                      value={weightKg === 0 ? '' : weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value))}
                    />
                    <Input
                      label="Height (cm)"
                      type="number"
                      value={heightCm === 0 ? '' : heightCm}
                      onChange={(e) => setHeightCm(Number(e.target.value))}
                    />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Input
                      label="Weight (lbs)"
                      type="number"
                      value={weightLbs === 0 ? '' : weightLbs}
                      onChange={(e) => setWeightLbs(Number(e.target.value))}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        label="Height (feet)"
                        type="number"
                        value={heightFeet === 0 ? '' : heightFeet}
                        onChange={(e) => setHeightFeet(Number(e.target.value))}
                      />
                      <Input
                        label="Height (inches)"
                        type="number"
                        value={heightInches}
                        onChange={(e) => setHeightInches(Number(e.target.value))}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="border-t pt-4" style={{ borderColor: 'var(--border-default)' }}>
              <Select
                label="Activity Level"
                options={ACTIVITY_OPTIONS}
                value={activityMultiplier}
                onChange={(e) => setActivityMultiplier(e.target.value)}
              />
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="space-y-6">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Daily Calorie Needs
            </h2>

            <ResultBox
              label="Maintenance Calories (TDEE)"
              value={maintenanceCalories}
              suffix="kcal/day"
              highlight
              shouldFormat={true}
            />

            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                Goals and Calorie Targets
              </h3>
              <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                {caloriePlans.map((plan, index) => (
                  <div key={index} className="flex justify-between items-center py-2.5 text-sm">
                    <div>
                      <span
                        className="font-semibold block animate-fade-in"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {plan.name}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                        {plan.desc}
                      </span>
                    </div>
                    <div className="text-right">
                      <span
                        className="text-base font-extrabold block"
                        style={{ color: plan.target > 0 ? 'var(--text-primary)' : 'var(--danger)' }}
                      >
                        {plan.target > 0 ? `${plan.target} kcal` : 'N/A'}
                      </span>
                      <span className="text-[10px] font-medium" style={{ color: plan.color }}>
                        {plan.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
