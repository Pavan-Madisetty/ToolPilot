import { UnitConverterTool, type Unit } from '@/components/tools/UnitConverterTool';

// Base unit: square metre
const UNITS: Unit[] = [
  { value: 'sqmm', label: 'Square millimetre (mm²)', factor: 1e-6 },
  { value: 'sqcm', label: 'Square centimetre (cm²)', factor: 1e-4 },
  { value: 'sqm', label: 'Square metre (m²)', factor: 1 },
  { value: 'ha', label: 'Hectare (ha)', factor: 10000 },
  { value: 'sqkm', label: 'Square kilometre (km²)', factor: 1e6 },
  { value: 'sqin', label: 'Square inch (in²)', factor: 0.00064516 },
  { value: 'sqft', label: 'Square foot (ft²)', factor: 0.09290304 },
  { value: 'sqyd', label: 'Square yard (yd²)', factor: 0.83612736 },
  { value: 'acre', label: 'Acre', factor: 4046.8564224 },
  { value: 'sqmi', label: 'Square mile (mi²)', factor: 2589988.110336 },
  { value: 'cent', label: 'Cent (India)', factor: 40.468564224 },
  { value: 'gunta', label: 'Guntha (India)', factor: 101.17141056 },
];

export default function AreaConverter() {
  return <UnitConverterTool toolId="area-converter" units={UNITS} defaultFrom="sqft" defaultTo="sqm" defaultValue={1000} />;
}
