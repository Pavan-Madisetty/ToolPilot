import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Button, Input, Switch, Select } from '@/components/ui';
import { CopyButton } from '@/components/ui/CopyButton';

type SortOrder = 'none' | 'asc' | 'desc';

export default function RandomNumber() {
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(100);
  const [count, setCount] = useState<number>(5);
  const [allowDuplicates, setAllowDuplicates] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>('none');
  const [numbers, setNumbers] = useState<number[]>([]);
  const [error, setError] = useState<string>('');

  const handleGenerate = () => {
    setError('');
    const minVal = Math.floor(min);
    const maxVal = Math.floor(max);
    const countVal = Math.floor(count);

    if (minVal > maxVal) {
      setError('Minimum value cannot be greater than Maximum value.');
      setNumbers([]);
      return;
    }

    if (countVal < 1) {
      setError('Count must be at least 1.');
      setNumbers([]);
      return;
    }

    const range = maxVal - minVal + 1;
    if (!allowDuplicates && countVal > range) {
      setError(
        `Cannot generate ${countVal} unique numbers in a range of ${range}. Please reduce count or enable duplicates.`
      );
      setNumbers([]);
      return;
    }

    const generated: number[] = [];
    if (allowDuplicates) {
      for (let i = 0; i < countVal; i++) {
        const rand = Math.floor(Math.random() * range) + minVal;
        generated.push(rand);
      }
    } else {
      const pool = Array.from({ length: range }, (_, i) => i + minVal);
      for (let i = 0; i < countVal; i++) {
        const randIndex = Math.floor(Math.random() * pool.length);
        generated.push(pool[randIndex]);
        pool.splice(randIndex, 1);
      }
    }

    if (sortOrder === 'asc') {
      generated.sort((a, b) => a - b);
    } else if (sortOrder === 'desc') {
      generated.sort((a, b) => b - a);
    }

    setNumbers(generated);
  };

  const copyString = useMemo(() => {
    return numbers.join(', ');
  }, [numbers]);

  return (
    <ToolPageWrapper toolId="random-number">
      <div className="tool-layout lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="space-y-6">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Configuration
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Minimum Value"
                type="number"
                value={min}
                onChange={(e) => setMin(Number(e.target.value))}
              />
              <Input
                label="Maximum Value"
                type="number"
                value={max}
                onChange={(e) => setMax(Number(e.target.value))}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Quantity to Generate"
                type="number"
                min="1"
                max="1000"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
              />
              <Select
                label="Sort Order"
                options={[
                  { value: 'none', label: 'Do not sort' },
                  { value: 'asc', label: 'Ascending' },
                  { value: 'desc', label: 'Descending' },
                ]}
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
              />
            </div>

            <div className="border-t pt-4" style={{ borderColor: 'var(--border-default)' }}>
              <Switch
                label="Allow Duplicates"
                checked={allowDuplicates}
                onChange={setAllowDuplicates}
                description="If disabled, all generated numbers will be unique."
              />
            </div>

            {error && (
              <div
                className="p-3 text-sm rounded-lg"
                style={{
                  backgroundColor: 'var(--danger-subtle)',
                  color: 'var(--danger)',
                  border: '1px solid var(--danger)',
                }}
              >
                {error}
              </div>
            )}

            <Button onClick={handleGenerate} className="w-full">
              Generate Random Numbers
            </Button>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="space-y-6">
            <div
              className="flex justify-between items-center border-b pb-4"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Generated Output
              </h2>
              {numbers.length > 0 && <CopyButton text={copyString} />}
            </div>

            {numbers.length > 0 ? (
              <div className="space-y-4">
                <div
                  className="p-6 rounded-2xl text-center font-mono text-2xl font-bold break-all flex flex-wrap justify-center gap-3"
                  style={{
                    backgroundColor: 'var(--bg-elevated)',
                    border: '1px solid var(--border-default)',
                    color: 'var(--primary)',
                  }}
                >
                  {numbers.map((num, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 shadow-sm border text-lg"
                      style={{ borderColor: 'var(--border-default)', color: 'var(--text-primary)' }}
                    >
                      {num}
                    </span>
                  ))}
                </div>

                <div
                  className="p-4 rounded-xl"
                  style={{
                    backgroundColor: 'var(--bg-elevated)',
                    border: '1px solid var(--border-default)',
                  }}
                >
                  <span
                    className="text-xs font-semibold block mb-1"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Comma-separated Raw Text
                  </span>
                  <p
                    className="font-mono text-xs break-all"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {copyString}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12" style={{ color: 'var(--text-tertiary)' }}>
                Click "Generate Random Numbers" to produce output.
              </div>
            )}
          </Card>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
