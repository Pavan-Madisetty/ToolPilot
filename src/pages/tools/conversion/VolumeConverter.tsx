import { UnitConverterTool, type Unit } from '@/components/tools/UnitConverterTool';

// Base unit: litre
const UNITS: Unit[] = [
  { value: 'ml', label: 'Millilitre (mL)', factor: 0.001 },
  { value: 'l', label: 'Litre (L)', factor: 1 },
  { value: 'm3', label: 'Cubic metre (m³)', factor: 1000 },
  { value: 'cm3', label: 'Cubic centimetre (cm³)', factor: 0.001 },
  { value: 'tsp', label: 'Teaspoon (US)', factor: 0.00492892159375 },
  { value: 'tbsp', label: 'Tablespoon (US)', factor: 0.01478676478125 },
  { value: 'floz', label: 'Fluid ounce (US)', factor: 0.0295735295625 },
  { value: 'cup', label: 'Cup (US)', factor: 0.2365882365 },
  { value: 'pint', label: 'Pint (US)', factor: 0.473176473 },
  { value: 'quart', label: 'Quart (US)', factor: 0.946352946 },
  { value: 'gal', label: 'Gallon (US)', factor: 3.785411784 },
  { value: 'galuk', label: 'Gallon (UK)', factor: 4.54609 },
  { value: 'ft3', label: 'Cubic foot (ft³)', factor: 28.316846592 },
  { value: 'in3', label: 'Cubic inch (in³)', factor: 0.016387064 },
];

export default function VolumeConverter() {
  return <UnitConverterTool toolId="volume-converter" units={UNITS} defaultFrom="l" defaultTo="gal" />;
}
