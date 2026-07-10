import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card } from '@/components/ui';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';

interface Lap {
  id: number;
  cumulativeTime: number;
  lapTime: number;
}

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const elapsedTimeRef = useRef<number>(0);
  const tickRef = useRef<() => void>(() => {});

  const tick = useCallback(() => {
    const now = performance.now();
    const elapsed = now - startTimeRef.current + elapsedTimeRef.current;
    setTime(elapsed);
    timerRef.current = requestAnimationFrame(tickRef.current);
  }, []);

  useEffect(() => {
    tickRef.current = tick;
  }, [tick]);

  useEffect(() => {
    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
    };
  }, []);

  const handleStartPause = useCallback(() => {
    if (isRunning) {
      // Pause
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
      elapsedTimeRef.current = time;
      setIsRunning(false);
    } else {
      // Start
      startTimeRef.current = performance.now();
      setIsRunning(true);
      timerRef.current = requestAnimationFrame(tick);
    }
  }, [isRunning, time, tick]);

  const handleReset = useCallback(() => {
    if (timerRef.current) cancelAnimationFrame(timerRef.current);
    timerRef.current = null;
    elapsedTimeRef.current = 0;
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  }, []);

  const handleLap = useCallback(() => {
    const totalLaps = laps.length;
    const previousCumulative = totalLaps > 0 ? laps[0].cumulativeTime : 0;
    const currentLapTime = time - previousCumulative;

    const newLap: Lap = {
      id: totalLaps + 1,
      cumulativeTime: time,
      lapTime: currentLapTime,
    };

    // Prepend to show newest at the top
    setLaps([newLap, ...laps]);
  }, [laps, time]);

  // Find min/max lap times to highlight
  const { fastestLapId, slowestLapId } = useMemo(() => {
    if (laps.length < 2) return { fastestLapId: null, slowestLapId: null };
    let fast = laps[0];
    let slow = laps[0];
    for (const lap of laps) {
      if (lap.lapTime < fast.lapTime) fast = lap;
      if (lap.lapTime > slow.lapTime) slow = lap;
    }
    return { fastestLapId: fast.id, slowestLapId: slow.id };
  }, [laps]);

  const formatTime = (timeMs: number) => {
    const minutes = Math.floor(timeMs / 60000);
    const seconds = Math.floor((timeMs % 60000) / 1000);
    const centiseconds = Math.floor((timeMs % 1000) / 10);

    const pad = (num: number) => num.toString().padStart(2, '0');
    return `${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;
  };

  return (
    <ToolPageWrapper toolId="stopwatch">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Stopwatch Readout Card */}
        <Card className="flex flex-col items-center justify-center p-8 md:p-12 text-center" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
          <div className="flex flex-col gap-6 w-full">
            <div>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                Stopwatch
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                High-precision millisecond timer.
              </p>
            </div>

            {/* Readout */}
            <div 
              className="py-10 px-4 rounded-2xl font-mono text-5xl md:text-6xl tracking-wider font-bold select-none border"
              style={{ 
                background: 'var(--bg-elevated)', 
                borderColor: 'var(--border-default)',
                color: isRunning ? 'var(--primary)' : 'var(--text-primary)' 
              }}
            >
              {formatTime(time)}
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center gap-4 pt-4">
              <Button
                onClick={handleReset}
                variant="secondary"
                disabled={time === 0}
                className="flex items-center gap-1.5 px-5 py-2.5"
              >
                <RotateCcw size={16} />
                <span>Reset</span>
              </Button>

              <Button
                onClick={handleStartPause}
                className="flex items-center gap-1.5 px-6 py-2.5 font-semibold"
                style={{
                  backgroundColor: isRunning ? 'var(--danger)' : 'var(--primary)',
                  color: '#fff'
                }}
              >
                {isRunning ? (
                  <>
                    <Pause size={16} />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play size={16} />
                    <span>Start</span>
                  </>
                )}
              </Button>

              <Button
                onClick={handleLap}
                variant="secondary"
                disabled={!isRunning}
                className="flex items-center gap-1.5 px-5 py-2.5"
              >
                <Flag size={16} />
                <span>Lap</span>
              </Button>
            </div>
          </div>
        </Card>

        {/* Laps List Card */}
        <Card className="flex flex-col gap-6 max-h-[500px]" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
          <div>
            <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              Laps & Splits
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Lap splits will appear here in reverse order.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto pr-1">
            {laps.length > 0 ? (
              <div className="flex flex-col border rounded-lg divide-y divide-[var(--border-default)]" style={{ borderColor: 'var(--border-default)' }}>
                {/* Header row */}
                <div className="grid grid-cols-3 p-3 font-semibold text-xs tracking-wider uppercase bg-slate-50 dark:bg-slate-900/40" style={{ color: 'var(--text-tertiary)' }}>
                  <span>Lap</span>
                  <span className="text-right">Split Time</span>
                  <span className="text-right">Total Time</span>
                </div>

                {/* Lap Rows */}
                {laps.map((lap) => {
                  const isFastest = lap.id === fastestLapId;
                  const isSlowest = lap.id === slowestLapId;

                  let rowColor = 'var(--text-primary)';
                  let splitBadge = null;

                  if (isFastest) {
                    rowColor = 'var(--success)';
                    splitBadge = <span className="text-[10px] font-bold uppercase ml-2 text-emerald-500">(Fastest)</span>;
                  } else if (isSlowest) {
                    rowColor = 'var(--danger)';
                    splitBadge = <span className="text-[10px] font-bold uppercase ml-2 text-red-500">(Slowest)</span>;
                  }

                  return (
                    <div 
                      key={lap.id} 
                      className="grid grid-cols-3 p-3 text-sm font-mono items-center transition-colors"
                      style={{ background: isFastest ? 'rgba(16, 185, 129, 0.04)' : isSlowest ? 'rgba(239, 68, 68, 0.04)' : 'transparent' }}
                    >
                      <span className="font-semibold" style={{ color: 'var(--text-secondary)' }}>
                        #{lap.id}
                      </span>
                      <span className="text-right font-medium" style={{ color: rowColor }}>
                        {formatTime(lap.lapTime)}
                        {splitBadge}
                      </span>
                      <span className="text-right font-medium" style={{ color: 'var(--text-secondary)' }}>
                        {formatTime(lap.cumulativeTime)}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div 
                className="h-full flex items-center justify-center text-center p-8 border border-dashed rounded-lg"
                style={{ borderColor: 'var(--border-default)' }}
              >
                <p className="text-sm italic" style={{ color: 'var(--text-tertiary)' }}>
                  Click Start and Lap to record splits.
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </ToolPageWrapper>
  );
}
