import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Button, Input, ResultBox } from '@/components/ui';

export default function FuelCostCalculator() {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [distance, setDistance] = useState<number>(300);
  const [mileage, setMileage] = useState<number>(15); // km/L or mpg
  const [fuelPrice, setFuelPrice] = useState<number>(96.5); // price/L or price/gal
  const [people, setPeople] = useState<number>(3);

  const results = useMemo(() => {
    const dist = Number(distance) || 0;
    const eff = Number(mileage) || 1;
    const price = Number(fuelPrice) || 0;
    const count = Number(people) || 1;

    const totalFuel = eff > 0 ? dist / eff : 0;
    const totalCost = totalFuel * price;
    const costPerPerson = count > 0 ? totalCost / count : 0;

    return {
      totalFuel,
      totalCost,
      costPerPerson,
    };
  }, [distance, mileage, fuelPrice, people]);

  return (
    <ToolPageWrapper toolId="fuel-cost">
      <div className="tool-layout lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="space-y-6">
            <div
              className="flex justify-between items-center border-b pb-4"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Trip Parameters
              </h2>
              <div className="flex gap-2">
                <Button
                  variant={unitSystem === 'metric' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => {
                    setUnitSystem('metric');
                    setMileage(15);
                    setFuelPrice(96.5);
                  }}
                >
                  Metric (km, L)
                </Button>
                <Button
                  variant={unitSystem === 'imperial' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => {
                    setUnitSystem('imperial');
                    setMileage(25);
                    setFuelPrice(3.5);
                  }}
                >
                  Imperial (mi, gal)
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Input
                label={unitSystem === 'metric' ? 'Distance (km)' : 'Distance (miles)'}
                type="number"
                min="0"
                value={distance === 0 ? '' : distance}
                onChange={(e) => setDistance(Number(e.target.value))}
              />

              <Input
                label={unitSystem === 'metric' ? 'Fuel Efficiency (km/L)' : 'Fuel Efficiency (MPG)'}
                type="number"
                min="0.1"
                step="0.1"
                value={mileage === 0 ? '' : mileage}
                onChange={(e) => setMileage(Number(e.target.value))}
              />

              <Input
                label={
                  unitSystem === 'metric'
                    ? 'Fuel Price per Liter (₹ or $)'
                    : 'Fuel Price per Gallon ($)'
                }
                type="number"
                min="0"
                step="0.01"
                value={fuelPrice === 0 ? '' : fuelPrice}
                onChange={(e) => setFuelPrice(Number(e.target.value))}
              />

              <Input
                label="Number of Travelers"
                type="number"
                min="1"
                value={people === 0 ? '' : people}
                onChange={(e) => setPeople(Number(e.target.value))}
              />
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="space-y-6">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Calculation Summary
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ResultBox
                label="Total Fuel Required"
                value={results.totalFuel}
                suffix={unitSystem === 'metric' ? 'L' : 'gal'}
                shouldFormat={true}
              />
              <ResultBox
                label="Total Fuel Cost"
                value={results.totalCost}
                prefix={unitSystem === 'metric' ? '₹' : '$'}
                highlight
                shouldFormat={true}
              />
            </div>

            <ResultBox
              label="Split Cost per Person"
              value={results.costPerPerson}
              prefix={unitSystem === 'metric' ? '₹' : '$'}
              shouldFormat={true}
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
                <strong>Calculation Method:</strong> Fuel needed = Distance ÷ Mileage. Cost = Fuel
                needed × Fuel price. Split cost = Cost ÷ Travelers.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
