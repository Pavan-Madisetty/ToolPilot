import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Button, Input, Select, ResultBox } from '@/components/ui';

interface UnitOption {
  value: string;
  label: string;
  factorDecimal: number; // Base 10 factors relative to Byte
  factorBinary: number; // Base 2 factors relative to Byte
}

const UNITS: UnitOption[] = [
  { value: 'B', label: 'Bytes (B)', factorDecimal: 1, factorBinary: 1 },
  { value: 'KB', label: 'Kilobytes (KB / KB)', factorDecimal: 1e3, factorBinary: 1024 },
  { value: 'MB', label: 'Megabytes (MB / MiB)', factorDecimal: 1e6, factorBinary: 1024 ** 2 },
  { value: 'GB', label: 'Gigabytes (GB / GiB)', factorDecimal: 1e9, factorBinary: 1024 ** 3 },
  { value: 'TB', label: 'Terabytes (TB / TiB)', factorDecimal: 1e12, factorBinary: 1024 ** 4 },
  { value: 'PB', label: 'Petabytes (PB / PiB)', factorDecimal: 1e15, factorBinary: 1024 ** 5 },
];

export default function DataStorageConverter() {
  const [value, setValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>('GB');
  const [toUnit, setToUnit] = useState<string>('MB');
  const [baseType, setBaseType] = useState<'decimal' | 'binary'>('binary');

  const convertedValue = useMemo(() => {
    const val = Number(value);
    if (Number.isNaN(val)) return 0;

    const fromUnitOpt = UNITS.find((u) => u.value === fromUnit);
    const toUnitOpt = UNITS.find((u) => u.value === toUnit);

    if (!fromUnitOpt || !toUnitOpt) return 0;

    const fromFactor =
      baseType === 'decimal' ? fromUnitOpt.factorDecimal : fromUnitOpt.factorBinary;
    const toFactor = baseType === 'decimal' ? toUnitOpt.factorDecimal : toUnitOpt.factorBinary;

    // Bytes value
    const bytes = val * fromFactor;
    return bytes / toFactor;
  }, [value, fromUnit, toUnit, baseType]);

  const allConversions = useMemo(() => {
    const val = Number(value);
    if (Number.isNaN(val)) return [];

    const fromUnitOpt = UNITS.find((u) => u.value === fromUnit);
    if (!fromUnitOpt) return [];

    const fromFactor =
      baseType === 'decimal' ? fromUnitOpt.factorDecimal : fromUnitOpt.factorBinary;
    const bytes = val * fromFactor;

    return UNITS.map((unit) => {
      const factor = baseType === 'decimal' ? unit.factorDecimal : unit.factorBinary;
      return {
        label: unit.label,
        value: bytes / factor,
        symbol: unit.value,
      };
    });
  }, [value, fromUnit, baseType]);

  return (
    <ToolPageWrapper toolId="data-storage-converter">
      <div className="tool-layout lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="space-y-6">
            <div
              className="flex justify-between items-center border-b pb-4"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Converter Settings
              </h2>
              <div className="flex gap-2">
                <Button
                  variant={baseType === 'binary' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setBaseType('binary')}
                >
                  Binary (1024)
                </Button>
                <Button
                  variant={baseType === 'decimal' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setBaseType('decimal')}
                >
                  Decimal (1000)
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Input
                  label="Value"
                  type="number"
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                />
              </div>
              <div>
                <Select
                  label="From Unit"
                  options={UNITS.map((u) => ({ value: u.value, label: u.label }))}
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                />
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
                      maximumFractionDigits: 8,
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
              label={`${fromUnit} to ${toUnit} (${baseType === 'binary' ? 'Base 2' : 'Base 10'})`}
              value={convertedValue.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 8,
              })}
              highlight
              shouldFormat={false}
            />

            <div
              className="p-4 rounded-xl space-y-2 text-xs"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-secondary)',
              }}
            >
              <p>
                <strong>Decimal System (Base 10):</strong> Standards used by disk storage
                manufacturers (e.g. 1 KB = 1000 Bytes).
              </p>
              <p>
                <strong>Binary System (Base 2):</strong> Standards used by operating systems (e.g. 1
                KiB = 1024 Bytes).
              </p>
            </div>
          </Card>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
