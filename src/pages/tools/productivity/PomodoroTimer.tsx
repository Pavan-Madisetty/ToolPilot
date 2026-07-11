import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Button, Input } from '@/components/ui';
import { Play, Pause, RotateCcw, SkipForward, Settings, Volume2, VolumeX, Award } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';

type TimerMode = 'work' | 'short' | 'long';

interface ModeConfig {
  label: string;
  duration: number; // in minutes
  color: string;
}

export default function PomodoroTimer() {
  const { addToast } = useUIStore();

  // Mode durations (in minutes)
  const [workDuration, setWorkDuration] = useState<number>(25);
  const [shortDuration, setShortDuration] = useState<number>(5);
  const [longDuration, setLongDuration] = useState<number>(15);

  const modeConfigs = useMemo<Record<TimerMode, ModeConfig>>(() => ({
    work: { label: 'Work Focus', duration: workDuration, color: 'var(--primary)' },
    short: { label: 'Short Break', duration: shortDuration, color: 'var(--success)' },
    long: { label: 'Long Break', duration: longDuration, color: 'var(--info)' },
  }), [workDuration, shortDuration, longDuration]);

  const [mode, setMode] = useState<TimerMode>('work');
  const [secondsRemaining, setSecondsRemaining] = useState<number>(workDuration * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Stats stored in localStorage (synced manually)
  const [completedSessions, setCompletedSessions] = useState<number>(() => {
    return Number(localStorage.getItem('pomodoro_completed_sessions') || '0');
  });
  const [focusMinutes, setFocusMinutes] = useState<number>(() => {
    return Number(localStorage.getItem('pomodoro_focus_minutes') || '0');
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Audio synthesizer for end-of-timer alert (no external files)
  const playAlertSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      
      // Play a nice double chime
      const playTone = (time: number, freq: number, duration: number) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.frequency.value = freq;
        gainNode.gain.setValueAtTime(0, time);
        gainNode.gain.linearRampToValueAtTime(0.4, time + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, time + duration);

        osc.start(time);
        osc.stop(time + duration);
      };

      playTone(audioCtx.currentTime, 523.25, 0.4); // C5
      playTone(audioCtx.currentTime + 0.25, 659.25, 0.5); // E5
    } catch {
      // Audio context block support
    }
  }, [soundEnabled]);

  const handleTimerComplete = useCallback(() => {
    setIsRunning(false);
    playAlertSound();
    
    const config = modeConfigs[mode];
    addToast({
      type: 'success',
      title: `${config.label} Complete`,
      message: mode === 'work' ? 'Time for a well-deserved break!' : 'Ready to start focusing again?',
    });

    if (mode === 'work') {
      const nextSessions = completedSessions + 1;
      const nextMinutes = focusMinutes + workDuration;
      setCompletedSessions(nextSessions);
      setFocusMinutes(nextMinutes);
      localStorage.setItem('pomodoro_completed_sessions', String(nextSessions));
      localStorage.setItem('pomodoro_focus_minutes', String(nextMinutes));
      
      // Auto transition to short break
      setMode('short');
    } else {
      // Transition back to work
      setMode('work');
    }
  }, [mode, modeConfigs, completedSessions, focusMinutes, workDuration, playAlertSound, addToast]);

  // Timer Tick hook
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            // Timer finished
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, handleTimerComplete]);

  const handleToggleStart = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsRemaining(modeConfigs[mode].duration * 60);
  };

  const handleSkip = () => {
    setIsRunning(false);
    if (mode === 'work') {
      setMode('short');
    } else if (mode === 'short') {
      setMode('long');
    } else {
      setMode('work');
    }
  };

  const handleClearStats = () => {
    if (window.confirm('Reset all timer focus statistics?')) {
      setCompletedSessions(0);
      setFocusMinutes(0);
      localStorage.removeItem('pomodoro_completed_sessions');
      localStorage.removeItem('pomodoro_focus_minutes');
    }
  };

  // Formatting MM:SS
  const formattedTime = useMemo(() => {
    const mins = Math.floor(secondsRemaining / 60);
    const secs = secondsRemaining % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, [secondsRemaining]);

  // Circle Progress
  const totalSeconds = modeConfigs[mode].duration * 60;
  const progressPercent = totalSeconds > 0 ? (secondsRemaining / totalSeconds) * 100 : 0;
  const strokeDashoffset = 283 - (283 * progressPercent) / 100;

  return (
    <ToolPageWrapper toolId="pomodoro">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        {/* Main Timer Display */}
        <Card
          className="flex flex-col items-center py-10 px-6 text-center relative overflow-hidden"
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
        >
          {/* Mode Toggles */}
          <div className="flex gap-1.5 p-1 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-default)] mb-8">
            {(['work', 'short', 'long'] as TimerMode[]).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setIsRunning(false);
                  setMode(m);
                  setSecondsRemaining(modeConfigs[m].duration * 60);
                }}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  mode === m
                    ? 'shadow-sm text-white'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-base)]'
                }`}
                style={{
                  backgroundColor: mode === m ? modeConfigs[m].color : 'transparent',
                }}
              >
                {modeConfigs[m].label}
              </button>
            ))}
          </div>

          {/* Progress Ring Visualizer */}
          <div className="relative w-64 h-64 flex items-center justify-center mb-8">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Back track */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="transparent"
                stroke="var(--bg-elevated)"
                strokeWidth="6"
              />
              {/* Active fill */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="transparent"
                stroke={modeConfigs[mode].color}
                strokeWidth="6"
                strokeDasharray="283"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            </svg>

            {/* Time readout */}
            <div className="absolute flex flex-col items-center">
              <span
                className="text-5xl font-extrabold tracking-tight font-mono transition-all"
                style={{ color: 'var(--text-primary)' }}
              >
                {formattedTime}
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest mt-1 text-[var(--text-tertiary)]">
                {isRunning ? 'Focusing' : 'Paused'}
              </span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              size="md"
              onClick={handleReset}
              aria-label="Reset timer"
              className="rounded-full w-12 h-12 p-0 flex items-center justify-center border-[var(--border-strong)]"
            >
              <RotateCcw size={18} />
            </Button>

            <button
              onClick={handleToggleStart}
              aria-label={isRunning ? 'Pause timer' : 'Start timer'}
              className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: modeConfigs[mode].color }}
            >
              {isRunning ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
            </button>

            <Button
              variant="secondary"
              size="md"
              onClick={handleSkip}
              aria-label="Skip mode"
              className="rounded-full w-12 h-12 p-0 flex items-center justify-center border-[var(--border-strong)]"
            >
              <SkipForward size={18} />
            </Button>
          </div>

          {/* Sub actions toolbar */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 hover:bg-[var(--bg-elevated)] rounded-lg text-[var(--text-secondary)] transition-colors"
              aria-label={soundEnabled ? 'Mute alert sounds' : 'Unmute alert sounds'}
            >
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-lg text-[var(--text-secondary)] transition-colors ${
                showSettings ? 'bg-[var(--bg-elevated)]' : 'hover:bg-[var(--bg-elevated)]'
              }`}
              aria-label="Toggle custom settings"
            >
              <Settings size={18} />
            </button>
          </div>
        </Card>

        {/* Settings panel */}
        {showSettings && (
          <Card
            className="flex flex-col gap-4 p-4 border rounded-xl"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider border-b pb-2" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-default)' }}>
              Interval Durations (Minutes)
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Work Focus"
                type="number"
                min={1}
                max={120}
                value={workDuration}
                onChange={(e) => {
                  const val = Math.max(1, Number(e.target.value));
                  setWorkDuration(val);
                  if (mode === 'work') setSecondsRemaining(val * 60);
                }}
              />
              <Input
                label="Short Break"
                type="number"
                min={1}
                max={60}
                value={shortDuration}
                onChange={(e) => {
                  const val = Math.max(1, Number(e.target.value));
                  setShortDuration(val);
                  if (mode === 'short') setSecondsRemaining(val * 60);
                }}
              />
              <Input
                label="Long Break"
                type="number"
                min={1}
                max={120}
                value={longDuration}
                onChange={(e) => {
                  const val = Math.max(1, Number(e.target.value));
                  setLongDuration(val);
                  if (mode === 'long') setSecondsRemaining(val * 60);
                }}
              />
            </div>
          </Card>
        )}

        {/* Focus Stats display */}
        <Card
          className="flex flex-col gap-4 p-4 border rounded-xl"
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
        >
          <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: 'var(--border-default)' }}>
            <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
              <Award size={16} style={{ color: 'var(--warning)' }} />
              Focus Stats
            </h3>
            {(completedSessions > 0 || focusMinutes > 0) && (
              <button
                onClick={handleClearStats}
                className="text-xs font-semibold hover:underline"
                style={{ color: 'var(--danger)' }}
              >
                Reset Stats
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-default)]">
              <span className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                {completedSessions}
              </span>
              <p className="text-xs font-medium mt-1" style={{ color: 'var(--text-secondary)' }}>
                Sessions Completed
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-default)]">
              <span className="text-2xl font-bold" style={{ color: 'var(--success)' }}>
                {focusMinutes}
              </span>
              <p className="text-xs font-medium mt-1" style={{ color: 'var(--text-secondary)' }}>
                Total Focus Minutes
              </p>
            </div>
          </div>
        </Card>
      </div>
    </ToolPageWrapper>
  );
}
