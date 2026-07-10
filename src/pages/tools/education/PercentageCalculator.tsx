import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Input, Select } from '@/components/ui';
import { Percent, TrendingUp, Calculator, HelpCircle } from 'lucide-react';

export default function PercentageCalculator() {
  // Mode 1: What is X% of Y?
  const [m1X, setM1X] = useState<number | ''>(10);
  const [m1Y, setM1Y] = useState<number | ''>(200);

  // Mode 2: X is what % of Y?
  const [m2X, setM2X] = useState<number | ''>(25);
  const [m2Y, setM2Y] = useState<number | ''>(200);

  // Mode 3: Percentage increase/decrease from X to Y
  const [m3X, setM3X] = useState<number | ''>(150);
  const [m3Y, setM3Y] = useState<number | ''>(180);

  // Mode 4: Add/subtract X% to Y
  const [m4X, setM4X] = useState<number | ''>(10);
  const [m4Y, setM4Y] = useState<number | ''>(200);
  const [m4Op, setM4Op] = useState<'add' | 'subtract'>('add');

  // Real-time calculation memos
  const m1Result = useMemo(() => {
    if (m1X === '' || m1Y === '') return '';
    const val = (m1X / 100) * m1Y;
    return Number(val.toFixed(4)).toString();
  }, [m1X, m1Y]);

  const m2Result = useMemo(() => {
    if (m2X === '' || m2Y === '') return '';
    if (m2Y === 0) return 'Cannot divide by zero';
    const val = (m2X / m2Y) * 100;
    return `${Number(val.toFixed(4))}%`;
  }, [m2X, m2Y]);

  const m3Result = useMemo(() => {
    if (m3X === '' || m3Y === '') return null;
    if (m3X === 0) return { text: 'Cannot calculate from zero', type: 'error' };
    const diff = m3Y - m3X;
    const pct = (diff / m3X) * 100;
    const isIncrease = pct >= 0;
    return {
      percent: `${Number(Math.abs(pct).toFixed(4))}%`,
      text: isIncrease ? 'Increase' : 'Decrease',
      type: isIncrease ? 'success' : 'danger',
    };
  }, [m3X, m3Y]);

  const m4Result = useMemo(() => {
    if (m4X === '' || m4Y === '') return '';
    const fraction = (m4X / 100) * m4Y;
    const val = m4Op === 'add' ? m4Y + fraction : m4Y - fraction;
    return Number(val.toFixed(4)).toString();
  }, [m4X, m4Y, m4Op]);

  // Safe parsed input helper
  const handleInputChange = (val: string, setter: (v: number | '') => void) => {
    if (val === '') {
      setter('');
      return;
    }
    const num = Number(val);
    if (!isNaN(num)) {
      setter(num);
    }
  };

  return (
    <ToolPageWrapper toolId="percentage-calculator">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: What is X% of Y? */}
        <Card className="space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b pb-2" style={{ borderColor: 'var(--border-subtle)' }}>
              <Percent className="text-[var(--primary)]" size={20} />
              <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                Calculate Percentage Value
              </h2>
            </div>
            
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Calculates the actual value of a percentage of a number. (e.g. What is 10% of 200?)
            </p>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Percentage (X) %"
                type="number"
                value={m1X}
                onChange={(e) => handleInputChange(e.target.value, setM1X)}
                placeholder="e.g. 10"
              />
              <Input
                label="Total Value (Y)"
                type="number"
                value={m1Y}
                onChange={(e) => handleInputChange(e.target.value, setM1Y)}
                placeholder="e.g. 200"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl border mt-4 flex items-center justify-between"
               style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-default)' }}>
            <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
              Result:
            </span>
            <span className="text-xl font-extrabold text-right break-all" style={{ color: 'var(--text-primary)' }}>
              {m1Result !== '' ? (
                <>
                  <span className="text-[var(--primary)]">{m1X}%</span> of <span className="font-semibold">{m1Y}</span> is <span className="text-[var(--success)]">{m1Result}</span>
                </>
              ) : (
                '—'
              )}
            </span>
          </div>
        </Card>

        {/* Card 2: X is what % of Y? */}
        <Card className="space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b pb-2" style={{ borderColor: 'var(--border-subtle)' }}>
              <HelpCircle className="text-[var(--primary)]" size={20} />
              <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                Calculate Ratio Percentage
              </h2>
            </div>

            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Calculates what percentage a number is of another number. (e.g. 25 is what % of 200?)
            </p>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Part Value (X)"
                type="number"
                value={m2X}
                onChange={(e) => handleInputChange(e.target.value, setM2X)}
                placeholder="e.g. 25"
              />
              <Input
                label="Whole Value (Y)"
                type="number"
                value={m2Y}
                onChange={(e) => handleInputChange(e.target.value, setM2Y)}
                placeholder="e.g. 200"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl border mt-4 flex items-center justify-between"
               style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-default)' }}>
            <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
              Result:
            </span>
            <span className="text-xl font-extrabold text-right break-all" style={{ color: 'var(--text-primary)' }}>
              {m2Result !== '' ? (
                m2Result === 'Cannot divide by zero' ? (
                  <span className="text-[var(--danger)] text-sm">{m2Result}</span>
                ) : (
                  <>
                    <span>{m2X}</span> is <span className="text-[var(--success)]">{m2Result}</span> of <span>{m2Y}</span>
                  </>
                )
              ) : (
                '—'
              )}
            </span>
          </div>
        </Card>

        {/* Card 3: Percentage Increase/Decrease */}
        <Card className="space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b pb-2" style={{ borderColor: 'var(--border-subtle)' }}>
              <TrendingUp className="text-[var(--primary)]" size={20} />
              <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                Percentage Increase / Decrease
              </h2>
            </div>

            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Calculates the percent change between an initial and final value. (e.g. 150 to 180)
            </p>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Initial Value (X)"
                type="number"
                value={m3X}
                onChange={(e) => handleInputChange(e.target.value, setM3X)}
                placeholder="e.g. 150"
              />
              <Input
                label="Final Value (Y)"
                type="number"
                value={m3Y}
                onChange={(e) => handleInputChange(e.target.value, setM3Y)}
                placeholder="e.g. 180"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl border mt-4 flex items-center justify-between"
               style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-default)' }}>
            <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
              Change:
            </span>
            <span className="text-xl font-extrabold text-right break-all" style={{ color: 'var(--text-primary)' }}>
              {m3Result ? (
                m3Result.type === 'error' ? (
                  <span className="text-[var(--danger)] text-sm">{m3Result.text}</span>
                ) : (
                  <>
                    From {m3X} to {m3Y} is a{' '}
                    <span style={{ color: m3Result.type === 'success' ? 'var(--success)' : 'var(--danger)' }}>
                      {m3Result.percent} {m3Result.text}
                    </span>
                  </>
                )
              ) : (
                '—'
              )}
            </span>
          </div>
        </Card>

        {/* Card 4: Add/Subtract Percentage */}
        <Card className="space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b pb-2" style={{ borderColor: 'var(--border-subtle)' }}>
              <Calculator className="text-[var(--primary)]" size={20} />
              <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                Add / Subtract Percentage
              </h2>
            </div>

            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Adds or subtracts a percentage value to/from a base number. (e.g. Add 10% to 200)
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <Select
                  label="Operation"
                  options={[
                    { value: 'add', label: 'Add (+)' },
                    { value: 'subtract', label: 'Subtract (-)' },
                  ]}
                  value={m4Op}
                  onChange={(e) => setM4Op(e.target.value as 'add' | 'subtract')}
                />
              </div>
              <div className="sm:col-span-1">
                <Input
                  label="Percentage (X) %"
                  type="number"
                  value={m4X}
                  onChange={(e) => handleInputChange(e.target.value, setM4X)}
                  placeholder="e.g. 10"
                />
              </div>
              <div className="sm:col-span-1">
                <Input
                  label="Base Value (Y)"
                  type="number"
                  value={m4Y}
                  onChange={(e) => handleInputChange(e.target.value, setM4Y)}
                  placeholder="e.g. 200"
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border mt-4 flex items-center justify-between"
               style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-default)' }}>
            <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
              Result:
            </span>
            <span className="text-xl font-extrabold text-right break-all" style={{ color: 'var(--text-primary)' }}>
              {m4Result !== '' ? (
                <>
                  {m4Op === 'add' ? 'Adding' : 'Subtracting'} <span className="text-[var(--primary)]">{m4X}%</span> {m4Op === 'add' ? 'to' : 'from'} <span>{m4Y}</span> is <span className="text-[var(--success)]">{m4Result}</span>
                </>
              ) : (
                '—'
              )}
            </span>
          </div>
        </Card>

      </div>
    </ToolPageWrapper>
  );
}
