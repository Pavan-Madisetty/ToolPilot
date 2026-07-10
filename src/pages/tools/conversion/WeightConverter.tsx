import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Button, Input, Select, ResultBox } from '@/components/ui';
import { ArrowLeftRight } from 'lucide-react';

interface WeightUnit {
  value: string;
  label: string;
  factor: number; // Factor to convert to Grams (g)
}

const UNITS: WeightUnit[] = [
  { value: 'mg', label: 'Milligrams (mg)', factor: 0.001 },
  { value: 'g', label: 'Grams (g)', factor: 1 },
  { value: 'kg', label: 'Kilograms (kg)', factor: 1000 },
  { value: 'ton', label: 'Metric Tons (t)', factor: 1000000 },
  { value: 'oz', label: 'Ounces (oz)', factor: 28.349523125 },
  { value: 'lb', label: 'Pounds (lb)', factor: 453.59237 },
  { value: 'stone', label: 'Stones (st)', factor: 6350.29318 }, // 1 stone = 14 lb
];

export default function WeightConverter() {
  const [value, setValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>('kg');
  const [toUnit, setToUnit] = useState<string>('lb');

  const convertedValue = useMemo(() => {
    const val = Number(value);
    if (Number.isNaN(val)) return 0;

    const fromOpt = UNITS.find((u) => u.value === fromUnit);
    const toOpt = UNITS.find((u) => u.value === toUnit);

    if (!fromOpt || !toOpt) return 0;

    // Convert value to grams first, then to target unit
    const grams = val * fromOpt.factor;
    return grams / toOpt.factor;
  }, [value, fromUnit, toUnit]);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const allConversions = useMemo(() => {
    const val = Number(value);
    if (Number.isNaN(val)) return [];

    const fromOpt = UNITS.find((u) => u.value === fromUnit);
    if (!fromOpt) return [];

    const grams = val * fromOpt.factor;

    return UNITS.map((unit) => ({
      label: unit.label,
      value: grams / unit.factor,
      symbol: unit.value,
    }));
  }, [value, fromUnit]);

  return (
    <ToolPageWrapper toolId="weight-converter">
      <div className="tool-layout lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="space-y-6">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Converter Settings
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <div>
                <Input
                  label="From Value"
                  type="number"
                  value={Number.isNaN(value) ? '' : value}
                  onChange={(e) => setValue(e.target.value === '' ? NaN : Number(e.target.value))}
                />
              </div>

              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <Select
                    label="From Unit"
                    options={UNITS.map((u) => ({ value: u.value, label: u.label }))}
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                  />
                </div>
                <Button
                  variant="secondary"
                  onClick={swapUnits}
                  className="mb-0 px-3 shrink-0 h-[42px]"
                  title="Swap units"
                  aria-label="Swap units"
                >
                  <ArrowLeftRight size={16} />
                </Button>
              </div>

              <div>
                <Select
                  label="To Unit"
                  options={UNITS.map((u) => ({ value: u.value, label: u.label }))}
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                />
              </div>
            </div>
          </Card>

          <Card className="space-y-4">
            <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
              All Weight Conversions Comparison
            </h3>
            <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
              {allConversions.map((conv, idx) => (
                <div key={idx} className="flex justify-between py-2.5 text-sm">
                  <span style={{ color: 'var(--text-secondary)' }}>{conv.label}</span>
                  <span
                    className="font-mono font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {conv.value.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 6,
                    })}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="space-y-6">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Conversion Result
            </h2>

            <ResultBox
              label={`${UNITS.find((u) => u.value === fromUnit)?.label} to ${UNITS.find((u) => u.value === toUnit)?.label}`}
              value={convertedValue.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 6,
              })}
              highlight
              shouldFormat={false}
            />

            <div
              className="p-4 rounded-xl space-y-2 text-sm"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-primary)',
              }}
            >
              <div
                className="font-semibold text-xs uppercase tracking-wider"
                style={{ color: 'var(--text-tertiary)' }}
              >
                Conversion Factors
              </div>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                Units are based on the standard International Yard and Pound Agreement of 1959. 1
                pound is defined to be exactly 0.45359237 kilograms, and 1 stone is defined as
                exactly 14 pounds.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
