import { useState, useEffect, useRef } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, Input } from '@/components/ui';
import { Play, Pause, X, BellOff, Volume2 } from 'lucide-react';

type Mode = 'duration' | 'target';

export default function Countdown() {
  const [mode, setMode] = useState<Mode>('duration');
  
  // Duration Inputs
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  // Target Date Input
  const [targetDate, setTargetDate] = useState('');

  // Timer states
  const [totalDuration, setTotalDuration] = useState(0); // in seconds
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const intervalRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const chimeIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      stopTimer();
      stopChime();
    };
  }, []);

  // Syntherized audio alert
  const playChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContextClass();
      }
      const ctx = audioContextRef.current;
      
      const playBeep = (startTime: number, freq: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        
        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration - 0.05);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      const now = ctx.currentTime;
      playBeep(now, 880, 0.25);
      playBeep(now + 0.3, 880, 0.25);
      playBeep(now + 0.6, 1109.73, 0.5); // C#6 note
    } catch (err) {
      console.error('Web Audio API error:', err);
    }
  };

  const startChimeLoop = () => {
    playChime();
    chimeIntervalRef.current = window.setInterval(() => {
      playChime();
    }, 2500);
  };

  const stopChime = () => {
    if (chimeIntervalRef.current) {
      clearInterval(chimeIntervalRef.current);
      chimeIntervalRef.current = null;
    }
  };

  const startTimer = () => {
    let initialSeconds = 0;

    if (mode === 'duration') {
      initialSeconds = hours * 3600 + minutes * 60 + seconds;
      if (initialSeconds <= 0) return;
    } else {
      if (!targetDate) return;
      const targetTime = new Date(targetDate).getTime();
      const now = Date.now();
      initialSeconds = Math.floor((targetTime - now) / 1000);
      if (initialSeconds <= 0) {
        alert('Please select a future date and time.');
        return;
      }
    }

    setTotalDuration(initialSeconds);
    setTimeLeft(initialSeconds);
    setIsActive(true);
    setIsPaused(false);
    setIsCompleted(false);

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleComplete = () => {
    setIsActive(false);
    setIsCompleted(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    startChimeLoop();
  };

  const togglePause = () => {
    if (isPaused) {
      // Resume
      setIsPaused(false);
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      // Pause
      setIsPaused(true);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  };

  const stopTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setIsCompleted(false);
    setTimeLeft(0);
    setTotalDuration(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    stopChime();
  };

  const dismissAlarm = () => {
    setIsCompleted(false);
    stopChime();
  };

  const formatTime = (totalSecs: number) => {
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;

    const pad = (val: number) => val.toString().padStart(2, '0');
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  };

  const progressPercentage = totalDuration > 0 ? (timeLeft / totalDuration) * 100 : 0;

  return (
    <ToolPageWrapper toolId="countdown">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Settings Card */}
        <Card className="flex flex-col gap-6" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
          <div>
            <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              Timer Settings
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Set a relative duration or select a specific target date/time.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex rounded-lg p-1" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}>
            <button
              onClick={() => { if (!isActive) setMode('duration'); }}
              className="flex-1 py-2 text-xs font-semibold rounded-md transition-colors"
              style={{
                background: mode === 'duration' ? 'var(--bg-surface)' : 'transparent',
                color: mode === 'duration' ? 'var(--text-primary)' : 'var(--text-secondary)',
                cursor: isActive ? 'not-allowed' : 'pointer',
                opacity: isActive && mode !== 'duration' ? 0.5 : 1
              }}
              disabled={isActive}
            >
              Custom Duration
            </button>
            <button
              onClick={() => { if (!isActive) setMode('target'); }}
              className="flex-1 py-2 text-xs font-semibold rounded-md transition-colors"
              style={{
                background: mode === 'target' ? 'var(--bg-surface)' : 'transparent',
                color: mode === 'target' ? 'var(--text-primary)' : 'var(--text-secondary)',
                cursor: isActive ? 'not-allowed' : 'pointer',
                opacity: isActive && mode !== 'target' ? 0.5 : 1
              }}
              disabled={isActive}
            >
              Target Date / Time
            </button>
          </div>

          {/* Inputs Section */}
          <div className="flex-1">
            {mode === 'duration' ? (
              <div className="grid grid-cols-3 gap-4" style={{ opacity: isActive ? 0.6 : 1 }}>
                <Input
                  label="Hours"
                  type="number"
                  min={0}
                  max={23}
                  value={hours}
                  onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                  disabled={isActive}
                />
                <Input
                  label="Minutes"
                  type="number"
                  min={0}
                  max={59}
                  value={minutes}
                  onChange={(e) => setMinutes(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                  disabled={isActive}
                />
                <Input
                  label="Seconds"
                  type="number"
                  min={0}
                  max={59}
                  value={seconds}
                  onChange={(e) => setSeconds(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                  disabled={isActive}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-1" style={{ opacity: isActive ? 0.6 : 1 }}>
                <label className="label">Select Target Date & Time</label>
                <input
                  type="datetime-local"
                  className="input-base w-full"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  disabled={isActive}
                  style={{
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-default)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
            )}
          </div>

          {/* Setup Actions */}
          <div className="flex justify-end pt-4 border-t" style={{ borderColor: 'var(--border-default)' }}>
            {!isActive && !isCompleted && (
              <Button
                onClick={startTimer}
                className="flex items-center gap-1.5 px-6 py-2.5 font-semibold"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: '#fff'
                }}
                disabled={(mode === 'duration' && hours === 0 && minutes === 0 && seconds === 0) || (mode === 'target' && !targetDate)}
              >
                <Play size={16} />
                <span>Start Timer</span>
              </Button>
            )}

            {isActive && (
              <div className="flex gap-2">
                <Button onClick={togglePause} variant="secondary" className="flex items-center gap-1.5">
                  {isPaused ? <Play size={16} /> : <Pause size={16} />}
                  <span>{isPaused ? 'Resume' : 'Pause'}</span>
                </Button>
                <Button onClick={stopTimer} variant="secondary" className="flex items-center gap-1.5" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>
                  <X size={16} />
                  <span>Cancel</span>
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Display Card */}
        <Card className="flex flex-col items-center justify-center p-8 md:p-12 text-center" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
          <div className="flex flex-col gap-6 w-full items-center justify-center">
            {/* Alarm Ringing Screen */}
            {isCompleted ? (
              <div className="flex flex-col items-center gap-6 animate-bounce">
                <div className="w-20 h-20 rounded-full flex items-center justify-center bg-red-100 dark:bg-red-950/40 border border-red-500">
                  <Volume2 size={36} className="text-red-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold" style={{ color: 'var(--danger)' }}>
                    Time is Up!
                  </h3>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                    Your countdown timer has finished.
                  </p>
                </div>
                <Button
                  onClick={dismissAlarm}
                  className="flex items-center gap-1.5 px-6 py-2.5 font-semibold"
                  style={{
                    backgroundColor: 'var(--danger)',
                    color: '#fff'
                  }}
                >
                  <BellOff size={16} />
                  <span>Dismiss Alarm</span>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-6 w-full items-center">
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                    Time Remaining
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {isActive ? (isPaused ? 'Timer paused' : 'Counting down...') : 'Timer not started'}
                  </p>
                </div>

                {/* Main Readout */}
                <div 
                  className="py-10 px-6 rounded-2xl font-mono text-5xl md:text-6xl tracking-wider font-bold select-none border w-full text-center"
                  style={{ 
                    background: 'var(--bg-elevated)', 
                    borderColor: 'var(--border-default)',
                    color: isActive && !isPaused ? 'var(--primary)' : 'var(--text-primary)' 
                  }}
                >
                  {formatTime(timeLeft)}
                </div>

                {/* Progress Indicator */}
                {isActive && (
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                    <div 
                      className="h-full transition-all duration-1000 ease-linear"
                      style={{ 
                        width: `${progressPercentage}%`, 
                        backgroundColor: 'var(--primary)'
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </ToolPageWrapper>
  );
}
