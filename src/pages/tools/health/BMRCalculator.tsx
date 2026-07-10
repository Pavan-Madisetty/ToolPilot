import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Button, Input, ResultBox } from '@/components/ui';

export default function BMRCalculator() {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(25);

  // Metric states
  const [weightKg, setWeightKg] = useState<number>(70);
  const [heightCm, setHeightCm] = useState<number>(170);

  // Imperial states
  const [weightLbs, setWeightLbs] = useState<number>(154);
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(7);

  const bmr = useMemo(() => {
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
  }, [unitSystem, gender, age, weightKg, heightCm, weightLbs, heightFeet, heightInches]);

  // Calorie needs by activity level multiplier
  const activityLevels = useMemo(() => {
    if (!bmr) return [];
    return [
      { name: 'Basal Metabolic Rate (BMR)', multiplier: 1.0, desc: 'Calories burned resting' },
      { name: 'Sedentary', multiplier: 1.2, desc: 'Little or no exercise' },
      { name: 'Lightly Active', multiplier: 1.375, desc: 'Light exercise 1-3 days/week' },
      { name: 'Moderately Active', multiplier: 1.55, desc: 'Moderate exercise 3-5 days/week' },
      { name: 'Very Active', multiplier: 1.725, desc: 'Hard exercise 6-7 days/week' },
      { name: 'Extra Active', multiplier: 1.9, desc: 'Very hard exercise, physical job' },
    ].map((level) => ({
      ...level,
      calories: Math.round(bmr * level.multiplier),
    }));
  }, [bmr]);

  return (
    <ToolPageWrapper toolId="bmr-calculator">
      <div className="tool-layout lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Your Metrics
              </h2>
              <div className="flex gap-2">
                <Button
                  variant={unitSystem === 'metric' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setUnitSystem('metric')}
                >
                  Metric (kg/cm)
                </Button>
                <Button
                  variant={unitSystem === 'imperial' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setUnitSystem('imperial')}
                >
                  Imperial (lbs/ft)
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Gender */}
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

              {/* Age */}
              <Input
                label="Age (years)"
                type="number"
                min="1"
                max="120"
                value={age === 0 ? '' : age}
                onChange={(e) => setAge(Number(e.target.value))}
              />

              {/* Weight */}
              {unitSystem === 'metric' ? (
                <Input
                  label="Weight (kg)"
                  type="number"
                  min="1"
                  value={weightKg === 0 ? '' : weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                />
              ) : (
                <Input
                  label="Weight (lbs)"
                  type="number"
                  min="1"
                  value={weightLbs === 0 ? '' : weightLbs}
                  onChange={(e) => setWeightLbs(Number(e.target.value))}
                />
              )}

              {/* Height */}
              {unitSystem === 'metric' ? (
                <Input
                  label="Height (cm)"
                  type="number"
                  min="1"
                  value={heightCm === 0 ? '' : heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                />
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Height (feet)"
                    type="number"
                    min="1"
                    value={heightFeet === 0 ? '' : heightFeet}
                    onChange={(e) => setHeightFeet(Number(e.target.value))}
                  />
                  <Input
                    label="Height (inches)"
                    type="number"
                    min="0"
                    max="11"
                    value={heightInches}
                    onChange={(e) => setHeightInches(Number(e.target.value))}
                  />
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="space-y-6">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Basal Metabolic Rate
            </h2>
            <ResultBox
              label="BMR Result"
              value={Math.round(bmr)}
              suffix="kcal/day"
              highlight
              shouldFormat={true}
            />

            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                Daily Calorie Target Estimates
              </h3>
              <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                {activityLevels.map((lvl, index) => (
                  <div key={index} className="flex justify-between items-center py-2.5 text-sm">
                    <div>
                      <span
                        className="font-semibold block"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {lvl.name}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                        {lvl.desc} (x{lvl.multiplier})
                      </span>
                    </div>
                    <span
                      className="text-base font-extrabold"
                      style={{ color: index === 0 ? 'var(--text-primary)' : 'var(--primary)' }}
                    >
                      {lvl.calories} kcal
                    </span>
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
