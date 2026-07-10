import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Button, Input, Select, ResultBox } from '@/components/ui';
import { ArrowLeftRight } from 'lucide-react';

interface LengthUnit {
  value: string;
  label: string;
  factor: number; // Factor to convert to Meters (m)
}

const UNITS: LengthUnit[] = [
  { value: 'mm', label: 'Millimeters (mm)', factor: 0.001 },
  { value: 'cm', label: 'Centimeters (cm)', factor: 0.01 },
  { value: 'm', label: 'Meters (m)', factor: 1 },
  { value: 'km', label: 'Kilometers (km)', factor: 1000 },
  { value: 'inch', label: 'Inches (in)', factor: 0.0254 },
  { value: 'foot', label: 'Feet (ft)', factor: 0.3048 },
  { value: 'yard', label: 'Yards (yd)', factor: 0.9144 },
  { value: 'mile', label: 'Miles (mi)', factor: 1609.344 },
];

export default function LengthConverter() {
  const [value, setValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('foot');

  const convertedValue = useMemo(() => {
    const val = Number(value);
    if (Number.isNaN(val)) return 0;

    const fromOpt = UNITS.find((u) => u.value === fromUnit);
    const toOpt = UNITS.find((u) => u.value === toUnit);

    if (!fromOpt || !toOpt) return 0;

    // Convert value to meters first, then to target unit
    const meters = val * fromOpt.factor;
    return meters / toOpt.factor;
  }, [value, fromUnit, toUnit]);

  const multiplierExplanation = useMemo(() => {
    const fromOpt = UNITS.find((u) => u.value === fromUnit);
    const toOpt = UNITS.find((u) => u.value === toUnit);

    if (!fromOpt || !toOpt) return '';

    const ratio = fromOpt.factor / toOpt.factor;
    const formattedRatio = ratio.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 6,
    });
    return `1 ${fromOpt.value} = ${formattedRatio} ${toOpt.value}`;
  }, [fromUnit, toUnit]);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const allConversions = useMemo(() => {
    const val = Number(value);
    if (Number.isNaN(val)) return [];

    const fromOpt = UNITS.find((u) => u.value === fromUnit);
    if (!fromOpt) return [];

    const meters = val * fromOpt.factor;

    return UNITS.map((unit) => ({
      label: unit.label,
      value: meters / unit.factor,
      symbol: unit.value,
    }));
  }, [value, fromUnit]);

  return (
    <ToolPageWrapper toolId="length-converter">
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
              All Conversions Comparison
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
                Multiplier Explanation
              </div>
              <div className="font-mono text-base font-bold" style={{ color: 'var(--primary)' }}>
                {multiplierExplanation}
              </div>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                This is calculated using standard international unit conversion factors: metric
                units are defined with standard prefix powers of 10, while US/Imperial units (in,
                ft, yd, mi) are based on the standard international definition (1 inch = 2.54 cm).
              </p>
            </div>
          </Card>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
