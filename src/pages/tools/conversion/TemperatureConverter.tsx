import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Button, Input, Select, ResultBox } from '@/components/ui';
import { ArrowLeftRight } from 'lucide-react';

type TempUnit = 'C' | 'F' | 'K';

interface TempUnitOption {
  value: TempUnit;
  label: string;
  symbol: string;
}

const UNITS: TempUnitOption[] = [
  { value: 'C', label: 'Celsius (°C)', symbol: '°C' },
  { value: 'F', label: 'Fahrenheit (°F)', symbol: '°F' },
  { value: 'K', label: 'Kelvin (K)', symbol: 'K' },
];

export default function TemperatureConverter() {
  const [value, setValue] = useState<number>(0);
  const [fromUnit, setFromUnit] = useState<TempUnit>('C');
  const [toUnit, setToUnit] = useState<TempUnit>('F');

  const { convertedValue, formula } = useMemo(() => {
    const val = Number(value);
    if (Number.isNaN(val)) return { convertedValue: 0, formula: '' };

    if (fromUnit === toUnit) {
      return { convertedValue: val, formula: 'No conversion needed' };
    }

    let result = 0;
    let formulaText = '';

    if (fromUnit === 'C') {
      if (toUnit === 'F') {
        result = (val * 9) / 5 + 32;
        formulaText = `(${val}°C × 9/5) + 32 = ${result.toFixed(2)}°F`;
      } else if (toUnit === 'K') {
        result = val + 273.15;
        formulaText = `${val}°C + 273.15 = ${result.toFixed(2)}K`;
      }
    } else if (fromUnit === 'F') {
      if (toUnit === 'C') {
        result = ((val - 32) * 5) / 9;
        formulaText = `(${val}°F − 32) × 5/9 = ${result.toFixed(2)}°C`;
      } else if (toUnit === 'K') {
        result = ((val - 32) * 5) / 9 + 273.15;
        formulaText = `(${val}°F − 32) × 5/9 + 273.15 = ${result.toFixed(2)}K`;
      }
    } else if (fromUnit === 'K') {
      if (toUnit === 'C') {
        result = val - 273.15;
        formulaText = `${val}K − 273.15 = ${result.toFixed(2)}°C`;
      } else if (toUnit === 'F') {
        result = ((val - 273.15) * 9) / 5 + 32;
        formulaText = `(${val}K − 273.15) × 9/5 + 32 = ${result.toFixed(2)}°F`;
      }
    }

    return { convertedValue: result, formula: formulaText };
  }, [value, fromUnit, toUnit]);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const milestones = [
    { label: 'Absolute Zero', c: '-273.15°C', f: '-459.67°F', k: '0 K' },
    { label: 'Freezing point of Water', c: '0°C', f: '32°F', k: '273.15 K' },
    { label: 'Room Temperature', c: '20°C', f: '68°F', k: '293.15 K' },
    { label: 'Human Body Temperature', c: '37°C', f: '98.6°F', k: '310.15 K' },
    { label: 'Boiling point of Water', c: '100°C', f: '212°F', k: '373.15 K' },
  ];

  return (
    <ToolPageWrapper toolId="temperature-converter">
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
                    onChange={(e) => setFromUnit(e.target.value as TempUnit)}
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
                  onChange={(e) => setToUnit(e.target.value as TempUnit)}
                />
              </div>
            </div>
          </Card>

          <Card className="space-y-4">
            <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
              Temperature Milestone Reference Table
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr
                    className="border-b"
                    style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-tertiary)' }}
                  >
                    <th className="py-2 text-xs font-semibold uppercase">Milestone</th>
                    <th className="py-2 text-xs font-semibold uppercase">Celsius</th>
                    <th className="py-2 text-xs font-semibold uppercase">Fahrenheit</th>
                    <th className="py-2 text-xs font-semibold uppercase">Kelvin</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                  {milestones.map((ms, idx) => (
                    <tr key={idx} className="text-sm">
                      <td className="py-3 font-medium" style={{ color: 'var(--text-primary)' }}>
                        {ms.label}
                      </td>
                      <td className="py-3 font-mono" style={{ color: 'var(--text-secondary)' }}>
                        {ms.c}
                      </td>
                      <td className="py-3 font-mono" style={{ color: 'var(--text-secondary)' }}>
                        {ms.f}
                      </td>
                      <td className="py-3 font-mono" style={{ color: 'var(--text-secondary)' }}>
                        {ms.k}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                maximumFractionDigits: 4,
              })}
              suffix={UNITS.find((u) => u.value === toUnit)?.symbol}
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
                Mathematical Formula
              </div>
              <div className="font-mono text-base font-bold" style={{ color: 'var(--primary)' }}>
                {formula || '—'}
              </div>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                Fahrenheit to Celsius conversion is derived by subtracting 32 from the Fahrenheit
                temperature and multiplying by 5/9. Kelvin is an absolute thermodynamic scale, with
                its zero point defined at absolute zero.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
