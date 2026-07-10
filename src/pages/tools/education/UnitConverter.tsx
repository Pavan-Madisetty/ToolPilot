import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Input, Select, ResultBox } from '@/components/ui';

type Category = 'length' | 'weight' | 'temperature' | 'area';

interface UnitOption {
  value: string;
  label: string;
}

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'length', label: 'Length' },
  { value: 'weight', label: 'Weight' },
  { value: 'temperature', label: 'Temperature' },
  { value: 'area', label: 'Area' },
];

const UNITS: Record<Category, UnitOption[]> = {
  length: [
    { value: 'm', label: 'Meters (m)' },
    { value: 'km', label: 'Kilometers (km)' },
    { value: 'cm', label: 'Centimeters (cm)' },
    { value: 'mm', label: 'Millimeters (mm)' },
    { value: 'mi', label: 'Miles (mi)' },
    { value: 'yd', label: 'Yards (yd)' },
    { value: 'ft', label: 'Feet (ft)' },
    { value: 'in', label: 'Inches (in)' },
  ],
  weight: [
    { value: 'kg', label: 'Kilograms (kg)' },
    { value: 'g', label: 'Grams (g)' },
    { value: 'mg', label: 'Milligrams (mg)' },
    { value: 'lbs', label: 'Pounds (lbs)' },
    { value: 'oz', label: 'Ounces (oz)' },
    { value: 'st', label: 'Stone (st)' },
  ],
  temperature: [
    { value: 'C', label: 'Celsius (°C)' },
    { value: 'F', label: 'Fahrenheit (°F)' },
    { value: 'K', label: 'Kelvin (K)' },
  ],
  area: [
    { value: 'm2', label: 'Square Meters (m²)' },
    { value: 'km2', label: 'Square Kilometers (km²)' },
    { value: 'ft2', label: 'Square Feet (ft²)' },
    { value: 'yd2', label: 'Square Yards (yd²)' },
    { value: 'ac', label: 'Acres (ac)' },
    { value: 'ha', label: 'Hectares (ha)' },
  ],
};

const LENGTH_RATIOS: Record<string, number> = {
  m: 1,
  km: 0.001,
  cm: 100,
  mm: 1000,
  mi: 0.000621371,
  yd: 1.09361,
  ft: 3.28084,
  in: 39.3701,
};

const WEIGHT_RATIOS: Record<string, number> = {
  kg: 1,
  g: 1000,
  mg: 1000000,
  lbs: 2.20462,
  oz: 35.274,
  st: 0.157473,
};

const AREA_RATIOS: Record<string, number> = {
  m2: 1,
  km2: 0.000001,
  ft2: 10.7639,
  yd2: 1.19599,
  ac: 0.000247105,
  ha: 0.0001,
};

export default function UnitConverter() {
  const [category, setCategory] = useState<Category>('length');
  const [value, setValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('km');

  const handleCategoryChange = (cat: Category) => {
    setCategory(cat);
    const options = UNITS[cat];
    setFromUnit(options[0].value);
    setToUnit(options[1]?.value || options[0].value);
  };

  const convertedValue = useMemo(() => {
    const val = Number(value);
    if (Number.isNaN(val)) return 0;

    if (category === 'temperature') {
      if (fromUnit === toUnit) return val;
      // Convert to Celsius first
      let celsius = val;
      if (fromUnit === 'F') {
        celsius = ((val - 32) * 5) / 9;
      } else if (fromUnit === 'K') {
        celsius = val - 273.15;
      }

      // Convert from Celsius to Target
      if (toUnit === 'C') return celsius;
      if (toUnit === 'F') return (celsius * 9) / 5 + 32;
      if (toUnit === 'K') return celsius + 273.15;
      return celsius;
    }

    let ratios: Record<string, number> = {};
    if (category === 'length') ratios = LENGTH_RATIOS;
    else if (category === 'weight') ratios = WEIGHT_RATIOS;
    else if (category === 'area') ratios = AREA_RATIOS;

    const fromRate = ratios[fromUnit];
    const toRate = ratios[toUnit];

    if (!fromRate || !toRate) return 0;
    // Value in base unit
    const baseValue = val / fromRate;
    // Value in target unit
    return baseValue * toRate;
  }, [category, value, fromUnit, toUnit]);

  // List of all conversions for visual comparison
  const allConversions = useMemo(() => {
    const val = Number(value);
    if (Number.isNaN(val)) return [];

    const options = UNITS[category];
    return options.map((opt) => {
      let result = 0;
      if (category === 'temperature') {
        if (fromUnit === opt.value) result = val;
        else {
          let celsius = val;
          if (fromUnit === 'F') celsius = ((val - 32) * 5) / 9;
          else if (fromUnit === 'K') celsius = val - 273.15;

          if (opt.value === 'C') result = celsius;
          else if (opt.value === 'F') result = (celsius * 9) / 5 + 32;
          else if (opt.value === 'K') result = celsius + 273.15;
        }
      } else {
        let ratios: Record<string, number> = {};
        if (category === 'length') ratios = LENGTH_RATIOS;
        else if (category === 'weight') ratios = WEIGHT_RATIOS;
        else if (category === 'area') ratios = AREA_RATIOS;

        const fromRate = ratios[fromUnit];
        const toRate = ratios[opt.value];
        if (fromRate && toRate) {
          result = (val / fromRate) * toRate;
        }
      }

      return {
        unit: opt.label,
        value: result,
      };
    });
  }, [category, value, fromUnit]);

  return (
    <ToolPageWrapper toolId="unit-converter">
      <div className="tool-layout lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="space-y-6">
            <div className="flex flex-col gap-2">
              <span className="label">Category</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => handleCategoryChange(cat.value)}
                    className={`btn btn-secondary py-2 text-xs font-semibold ${
                      category === cat.value
                        ? 'bg-[rgba(79,70,229,0.08)] border-[var(--text-link)]'
                        : ''
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
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
                  options={UNITS[category].map((u) => ({ value: u.value, label: u.label }))}
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                />
              </div>
              <div>
                <Select
                  label="To Unit"
                  options={UNITS[category].map((u) => ({ value: u.value, label: u.label }))}
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                />
              </div>
            </div>
          </Card>

          <Card className="space-y-4">
            <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
              All Conversions
            </h3>
            <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
              {allConversions.map((conv, idx) => (
                <div key={idx} className="flex justify-between py-2.5 text-sm">
                  <span style={{ color: 'var(--text-secondary)' }}>{conv.unit}</span>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
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
              label={`${UNITS[category].find((u) => u.value === fromUnit)?.label} to ${
                UNITS[category].find((u) => u.value === toUnit)?.label
              }`}
              value={convertedValue.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 6,
              })}
              highlight
              shouldFormat={false}
            />
          </Card>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
