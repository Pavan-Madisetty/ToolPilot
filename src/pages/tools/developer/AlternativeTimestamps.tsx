import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Input, Select, ResultBox } from '@/components/ui';
import { RefreshCw, Clipboard, Check, HelpCircle, Calendar } from 'lucide-react';

type EpochKey = 'unix_s' | 'unix_ms' | 'ldap' | 'webkit' | 'ntp' | 'cocoa' | 'hfs' | 'dotnet' | 'gps';

interface EpochDefinition {
  key: EpochKey;
  name: string;
  unit: string;
  epochStart: string;
  description: string;
  toUnixMs: (value: bigint) => number;
  fromUnixMs: (ms: number) => bigint;
}

const EPOCHS: Record<EpochKey, EpochDefinition> = {
  unix_s: {
    key: 'unix_s',
    name: 'Unix Epoch (Seconds)',
    unit: 'Seconds',
    epochStart: 'Jan 1, 1970',
    description: 'Seconds elapsed since Jan 1, 1970 UTC. Standard across Unix, Linux, and web applications.',
    toUnixMs: (val) => Number(val * 1000n),
    fromUnixMs: (ms) => BigInt(Math.floor(ms / 1000)),
  },
  unix_ms: {
    key: 'unix_ms',
    name: 'Unix Epoch (Milliseconds)',
    unit: 'Milliseconds',
    epochStart: 'Jan 1, 1970',
    description: 'Milliseconds elapsed since Jan 1, 1970 UTC. Standard in JavaScript, Java, and JSON APIs.',
    toUnixMs: (val) => Number(val),
    fromUnixMs: (ms) => BigInt(ms),
  },
  ldap: {
    key: 'ldap',
    name: 'Active Directory / LDAP Ticks',
    unit: '100-Nanosecond intervals',
    epochStart: 'Jan 1, 1601',
    description: '100-nanosecond intervals elapsed since Jan 1, 1601 UTC. Used in Windows Active Directory and LDAP.',
    toUnixMs: (val) => Number((val / 10000n) - 11644473600000n),
    fromUnixMs: (ms) => (BigInt(ms) + 11644473600000n) * 10000n,
  },
  webkit: {
    key: 'webkit',
    name: 'Chrome / WebKit Timestamp',
    unit: 'Microseconds',
    epochStart: 'Jan 1, 1601',
    description: 'Microseconds elapsed since Jan 1, 1601 UTC. Used by Chromium-based browsers (Chrome, WebKit, Opera).',
    toUnixMs: (val) => Number((val / 1000n) - 11644473600000n),
    fromUnixMs: (ms) => (BigInt(ms) + 11644473600000n) * 1000n,
  },
  ntp: {
    key: 'ntp',
    name: 'NTP (Network Time Protocol)',
    unit: 'Seconds',
    epochStart: 'Jan 1, 1900',
    description: 'Seconds elapsed since Jan 1, 1900 UTC. Used by Network Time Protocol for synchronization.',
    toUnixMs: (val) => Number((val - 2208988800n) * 1000n),
    fromUnixMs: (ms) => BigInt(Math.floor(ms / 1000) + 2208988800),
  },
  cocoa: {
    key: 'cocoa',
    name: 'Cocoa (Core Data) Timestamp',
    unit: 'Seconds',
    epochStart: 'Jan 1, 2001',
    description: 'Seconds elapsed since Jan 1, 2001 UTC. Used by Apple Cocoa framework, Core Data, and macOS/iOS.',
    toUnixMs: (val) => Number((val + 978307200n) * 1000n),
    fromUnixMs: (ms) => BigInt(Math.floor(ms / 1000) - 978307200),
  },
  hfs: {
    key: 'hfs',
    name: 'Mac HFS+ Timestamp',
    unit: 'Seconds',
    epochStart: 'Jan 1, 1904',
    description: 'Seconds elapsed since Jan 1, 1904 UTC. Used in older Apple HFS+ filesystems.',
    toUnixMs: (val) => Number((val - 2082844800n) * 1000n),
    fromUnixMs: (ms) => BigInt(Math.floor(ms / 1000) + 2082844800),
  },
  dotnet: {
    key: 'dotnet',
    name: '.NET DateTime Ticks',
    unit: '100-Nanosecond intervals',
    epochStart: 'Jan 1, 0001',
    description: '100-nanosecond intervals elapsed since Jan 1, 0001 UTC. Standard in C# / .NET DateTime struct.',
    toUnixMs: (val) => Number((val / 10000n) - 62135596800000n),
    fromUnixMs: (ms) => (BigInt(ms) + 62135596800000n) * 10000n,
  },
  gps: {
    key: 'gps',
    name: 'GPS Timestamp',
    unit: 'Seconds',
    epochStart: 'Jan 6, 1980',
    description: 'Seconds elapsed since Jan 6, 1980 UTC. Used by GPS satellites and tracking receivers.',
    toUnixMs: (val) => Number((val + 315964800n) * 1000n),
    fromUnixMs: (ms) => BigInt(Math.floor(ms / 1000) - 315964800),
  },
};

const SELECT_OPTIONS = Object.values(EPOCHS).map((d) => ({
  value: d.key,
  label: `${d.name} (${d.unit})`,
}));

export default function AlternativeTimestamps() {
  const [sourceFormat, setSourceFormat] = useState<EpochKey>('unix_s');
  const [timestampVal, setTimestampVal] = useState<string>(() => {
    const ms = Date.now();
    return Math.floor(ms / 1000).toString();
  });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Set the input to "now" in the selected format
  const handleSetToNow = () => {
    const ms = Date.now();
    const def = EPOCHS[sourceFormat];
    setTimestampVal(def.fromUnixMs(ms).toString());
  };

  const handleFormatChange = (newFormat: EpochKey) => {
    setSourceFormat(newFormat);
    const ms = Date.now();
    const def = EPOCHS[newFormat];
    setTimestampVal(def.fromUnixMs(ms).toString());
  };

  // Convert inputs to date
  const parsedData = useMemo(() => {
    if (!timestampVal.trim()) {
      return { error: 'Please enter a numerical timestamp value.' };
    }

    try {
      const cleanVal = timestampVal.trim().replace(/[,_\s]/g, '');
      if (!cleanVal || !/^-?\d+$/.test(cleanVal)) {
        return { error: 'Invalid numerical timestamp character sequence.' };
      }

      const bigintVal = BigInt(cleanVal);
      const def = EPOCHS[sourceFormat];
      const ms = def.toUnixMs(bigintVal);
      const date = new Date(ms);

      if (isNaN(date.getTime())) {
        return { error: 'Calculated date is out of range for JS Date objects.' };
      }

      // Generate comparisons
      const comparisons = Object.values(EPOCHS).map((d) => {
        let valStr: string;
        try {
          valStr = d.fromUnixMs(ms).toString();
        } catch {
          valStr = 'Out of bounds';
        }
        return {
          ...d,
          calculatedValue: valStr,
        };
      });

      return {
        date,
        localStr: date.toLocaleString(),
        utcStr: date.toUTCString(),
        isoStr: date.toISOString(),
        comparisons,
      };
    } catch {
      return { error: 'Unable to parse numerical timestamp value.' };
    }
  }, [timestampVal, sourceFormat]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    });
  };

  return (
    <ToolPageWrapper toolId="alternative-timestamps">
      <div className="space-y-8">
        {/* Converter Card */}
        <div className="card p-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <Select
                label="Source Epoch / Format"
                options={SELECT_OPTIONS}
                value={sourceFormat}
                onChange={(e) => handleFormatChange(e.target.value as EpochKey)}
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <Input
                label="Timestamp Value"
                placeholder="e.g. 132649033740000000"
                value={timestampVal}
                onChange={(e) => setTimestampVal(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Button onClick={handleSetToNow} variant="secondary" className="flex items-center gap-1.5 flex-1 md:flex-initial">
                <RefreshCw size={14} />
                Now
              </Button>
              <Button onClick={() => setTimestampVal('')} variant="ghost" className="flex-1 md:flex-initial">
                Clear
              </Button>
            </div>
          </div>

          {/* Validation Error Message */}
          {'error' in parsedData && parsedData.error && (
            <div className="p-4 border rounded-xl" style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface)' }}>
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                {parsedData.error}
              </span>
            </div>
          )}
        </div>

        {/* Date Result Readout Cards */}
        {!('error' in parsedData) && parsedData.date && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ResultBox
              align="left"
              label="Local Timezone Date"
              value={parsedData.localStr}
              shouldFormat={false}
              highlight
            />
            <ResultBox
              align="left"
              label="UTC Date String"
              value={parsedData.utcStr}
              shouldFormat={false}
            />
            <ResultBox
              align="left"
              label="ISO 8601 String"
              value={parsedData.isoStr}
              shouldFormat={false}
            />
          </div>
        )}

        {/* Comparison Grid Table */}
        {!('error' in parsedData) && parsedData.comparisons && (
          <div className="card p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--border-default)' }}>
              <div className="flex items-center gap-2">
                <Calendar className="shrink-0" size={18} style={{ color: 'var(--primary)' }} />
                <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                  Equivalent Values Across Epochs
                </h3>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr
                    className="border-b text-xs font-semibold uppercase"
                    style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-tertiary)' }}
                  >
                    <th className="py-2.5 px-3">System / Epoch</th>
                    <th className="py-2.5 px-3">Start Date</th>
                    <th className="py-2.5 px-3">Unit Resolution</th>
                    <th className="py-2.5 px-3">Equivalent Value</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                  {parsedData.comparisons.map((c) => (
                    <tr
                      key={c.key}
                      className="text-sm transition-colors hover:bg-opacity-5 hover:bg-black"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <td className="py-3 px-3 font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {c.name}
                      </td>
                      <td className="py-3 px-3 text-xs">{c.epochStart}</td>
                      <td className="py-3 px-3 text-xs">{c.unit}</td>
                      <td className="py-3 px-3 font-mono text-xs max-w-[200px] break-all select-all">
                        {c.calculatedValue}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <Button
                          onClick={() => handleCopy(c.calculatedValue, c.key)}
                          variant="secondary"
                          size="xs"
                          className="inline-flex items-center gap-1"
                        >
                          {copiedKey === c.key ? <Check size={12} /> : <Clipboard size={12} />}
                          {copiedKey === c.key ? 'Copied' : 'Copy'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Info Explanatory Card */}
        <div className="card p-6 space-y-6">
          <div className="flex items-center gap-2 border-b pb-4" style={{ borderColor: 'var(--border-default)' }}>
            <HelpCircle size={18} style={{ color: 'var(--text-secondary)' }} />
            <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
              Understanding System Epochs &amp; Precision
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-primary)' }}>
                  Active Directory / LDAP (Windows NT)
                </h4>
                <p>
                  Calculates 100-nanosecond intervals since Jan 1, 1601. Because of the high resolution and ancient epoch start, values are 18-digit numbers. Commonly seen in LDAP directory databases and file security access tables.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-primary)' }}>
                  Chrome / WebKit (Chromium Ticks)
                </h4>
                <p>
                  Measures microseconds (1/1,000,000s) since Jan 1, 1601. Used inside Chrome history logs, cookie expirations, and SQLite database storage in chromium engines.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-primary)' }}>
                  NTP (Network Time Protocol)
                </h4>
                <p>
                  Counts seconds since Jan 1, 1900. NTP standard wraps around every 136 years (with the next epoch rollover occurring in 2036).
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-primary)' }}>
                  .NET DateTime Ticks
                </h4>
                <p>
                  A single tick represents one 100-nanosecond interval since 12:00:00 midnight, Jan 1, 0001. Widely used in the C# and F# frameworks for absolute date calculations.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-primary)' }}>
                  Apple Cocoa / Core Data
                </h4>
                <p>
                  Measures seconds since Jan 1, 2001 (also referred to as Mac Absolute Time). Epoch is offset from standard Unix by exactly 31 years (978,307,200 seconds).
                </p>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-primary)' }}>
                  GPS (Global Positioning System)
                </h4>
                <p>
                  Measures seconds since Sunday, Jan 6, 1980. Unlike standard UTC, GPS time is continuous and doesn't adjust for leap seconds, causing it to run slightly ahead of UTC.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
