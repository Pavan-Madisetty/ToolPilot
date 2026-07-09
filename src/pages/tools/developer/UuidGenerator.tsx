import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Select, Switch, CopyButton } from '@/components/ui';

const QUANTITY_OPTIONS = [
  { value: '1', label: 'Generate 1' },
  { value: '5', label: 'Generate 5' },
  { value: '10', label: 'Generate 10' },
  { value: '50', label: 'Generate 50' },
  { value: '100', label: 'Generate 100' },
];

const VERSION_OPTIONS = [
  { value: '4', label: 'Version 4 (Random)' },
  { value: '1', label: 'Version 1 (Time-based)' },
];

export default function UuidGenerator() {
  const [version, setVersion] = useState('4');
  const [quantity, setQuantity] = useState('5');
  const [uppercase, setUppercase] = useState(false);
  const [noHyphens, setNoHyphens] = useState(false);
  const [braces, setBraces] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  // V4 UUID generator (fallback if crypto.randomUUID isn't available)
  const generateV4 = (): string => {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) {
      return window.crypto.randomUUID();
    }
    // RFC 4122 compliant fallback
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  // V1 UUID generator (simplified time-based)
  const generateV1 = (): string => {
    const time = Date.now();
    const timeLow = (time & 0xffffffff).toString(16).padStart(8, '0');
    const timeMid = ((time >> 32) & 0xffff).toString(16).padStart(4, '0');
    const timeHiAndVersion = (((time >> 48) & 0x0fff) | 0x1000).toString(16).padStart(4, '0');
    const clockSeqHiAndReserved = ((Math.random() * 64) | 0x80).toString(16).padStart(2, '0');
    const clockSeqLow = ((Math.random() * 256) | 0).toString(16).padStart(2, '0');
    
    const node = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
    ).join('');

    return `${timeLow}-${timeMid}-${timeHiAndVersion}-${clockSeqHiAndReserved}${clockSeqLow}-${node}`;
  };

  const handleGenerate = () => {
    const count = Number(quantity);
    const list: string[] = [];

    for (let i = 0; i < count; i++) {
      let uuid = version === '1' ? generateV1() : generateV4();

      if (noHyphens) {
        uuid = uuid.replace(/-/g, '');
      }
      if (uppercase) {
        uuid = uuid.toUpperCase();
      }
      if (braces) {
        uuid = `{${uuid}}`;
      }

      list.push(uuid);
    }

    setResults(list);
  };

  return (
    <ToolPageWrapper toolId="uuid-generator">
      <div className="tool-layout lg:grid-cols-3">
        {/* Controls Panel */}
        <div className="lg:col-span-1 space-y-6 p-6 card">
          <Select
            label="UUID Version"
            options={VERSION_OPTIONS}
            value={version}
            onChange={(e) => setVersion(e.target.value)}
          />

          <Select
            label="Quantity"
            options={QUANTITY_OPTIONS}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <div className="border-t pt-4 space-y-4" style={{ borderColor: 'var(--border-default)' }}>
            <Switch
              label="Uppercase"
              checked={uppercase}
              onChange={setUppercase}
              description="e.g. A1B2C3..."
            />
            <Switch
              label="Remove Hyphens"
              checked={noHyphens}
              onChange={setNoHyphens}
              description="Remove separator hyphens"
            />
            <Switch
              label="Add Braces {}"
              checked={braces}
              onChange={setBraces}
              description="Wrap inside curly braces"
            />
          </div>

          <Button onClick={handleGenerate} className="w-full">
            Generate UUIDs
          </Button>
        </div>

        {/* Outputs Panel */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="label">Generated Output</span>
            {results.length > 0 && <CopyButton text={results.join('\n')} />}
          </div>

          <textarea
            readOnly
            value={results.join('\n')}
            placeholder="Click Generate to produce UUIDs..."
            className="input-base font-mono text-xs leading-relaxed h-[360px] resize-none bg-slate-50/50 dark:bg-slate-900/30"
            aria-label="UUID list output"
          />
        </div>
      </div>
    </ToolPageWrapper>
  );
}
