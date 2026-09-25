import { UnitConverterTool, type Unit } from '@/components/tools/UnitConverterTool';

// Base unit: metre per second
const UNITS: Unit[] = [
  { value: 'ms', label: 'Metre / second (m/s)', factor: 1 },
  { value: 'kmh', label: 'Kilometre / hour (km/h)', factor: 1 / 3.6 },
  { value: 'mph', label: 'Mile / hour (mph)', factor: 0.44704 },
  { value: 'kn', label: 'Knot (kn)', factor: 1852 / 3600 },
  { value: 'fts', label: 'Foot / second (ft/s)', factor: 0.3048 },
  { value: 'mach', label: 'Mach (sea level, 15 °C)', factor: 340.29 },
  { value: 'c', label: 'Speed of light (c)', factor: 299792458 },
];

export default function SpeedConverter() {
  return <UnitConverterTool toolId="speed-converter" units={UNITS} defaultFrom="kmh" defaultTo="mph" defaultValue={100} />;
}
