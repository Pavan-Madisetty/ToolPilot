import { useState, useEffect } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Input, ResultBox, Textarea } from '@/components/ui';

export default function TimestampConverter() {
  const [liveEpoch, setLiveEpoch] = useState<number>(() => Math.floor(Date.now() / 1000));
  const [epochInput, setEpochInput] = useState<string>('');
  const [epochResult, setEpochResult] = useState<string>('');

  const [dateInput, setDateInput] = useState<string>('');
  const [dateResult, setDateResult] = useState<string>('');

  // Update live counter clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Epoch to Date translation
  const handleEpochConvert = () => {
    if (!epochInput) return;
    try {
      const ms = Number(epochInput) * 1000;
      const date = new Date(ms);
      if (isNaN(date.getTime())) {
        setEpochResult('Invalid Unix timestamp');
        return;
      }
      setEpochResult(
        `Local: ${date.toLocaleString()}\nUTC: ${date.toUTCString()}\nISO: ${date.toISOString()}`
      );
    } catch {
      setEpochResult('Conversion error');
    }
  };

  // Date to Epoch parsing
  const handleDateConvert = () => {
    if (!dateInput) return;
    try {
      const date = new Date(dateInput);
      if (isNaN(date.getTime())) {
        setDateResult('Invalid date string');
        return;
      }
      setDateResult(Math.floor(date.getTime() / 1000).toString());
    } catch {
      setDateResult('Conversion error');
    }
  };

  return (
    <ToolPageWrapper toolId="timestamp-converter">
      <div className="space-y-8">
        {/* Live Clock Card */}
        <div className="grid grid-cols-1 gap-4 max-w-md">
          <ResultBox align="left" label="Current Unix Epoch Timestamp (p.s. updates live)" value={liveEpoch} highlight />
        </div>

        <div className="tool-layout lg:grid-cols-2">
          {/* Epoch to Date conversion panel */}
          <div className="space-y-4 p-6 card">
            <h3 className="text-base font-bold">Convert Unix Timestamp to Date</h3>
            <Input
              label="Unix Epoch Timestamp (seconds)"
              placeholder="e.g. 1718000000"
              value={epochInput}
              onChange={(e) => setEpochInput(e.target.value)}
            />
            <Button onClick={handleEpochConvert} className="w-full">
              Convert to Date
            </Button>
            {epochResult && (
              <Textarea
                readOnly
                rows={4}
                value={epochResult}
                className="font-mono text-xs leading-relaxed resize-none mt-4"
                aria-label="Timestamp translation output"
              />
            )}
          </div>

          {/* Date to Epoch conversion panel */}
          <div className="space-y-4 p-6 card">
            <h3 className="text-base font-bold">Convert Date to Unix Timestamp</h3>
            <Input
              label="Date / Time String"
              type="datetime-local"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
            />
            <Button onClick={handleDateConvert} className="w-full">
              Convert to Epoch
            </Button>
            {dateResult && (
              <div
                className="mt-4 p-4 border rounded-xl"
                style={{ borderColor: 'var(--border-default)', background: 'var(--bg-surface)' }}
              >
                <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Epoch Timestamp (seconds)</span>
                <p className="text-lg font-bold font-mono mt-1" style={{ color: 'var(--text-primary)' }}>{dateResult}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
