import { UnitConverterTool, type Unit } from '@/components/tools/UnitConverterTool';

// Base unit: second. Month = 30.436875 days, year = 365.2425 days (Gregorian average).
const UNITS: Unit[] = [
  { value: 'ms', label: 'Millisecond', factor: 0.001 },
  { value: 's', label: 'Second', factor: 1 },
  { value: 'min', label: 'Minute', factor: 60 },
  { value: 'h', label: 'Hour', factor: 3600 },
  { value: 'd', label: 'Day', factor: 86400 },
  { value: 'w', label: 'Week', factor: 604800 },
  { value: 'mo', label: 'Month (average)', factor: 2629746 },
  { value: 'y', label: 'Year (average)', factor: 31556952 },
  { value: 'dec', label: 'Decade', factor: 315569520 },
];

export default function TimeConverter() {
  return <UnitConverterTool toolId="time-converter" units={UNITS} defaultFrom="h" defaultTo="min" defaultValue={2.5} />;
}
