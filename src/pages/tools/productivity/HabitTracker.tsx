import { useState, useEffect, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Button, Input, Select, ResultBox } from '@/components/ui';
import { Plus, Trash2, Calendar, Check, Flame } from 'lucide-react';
import { clsx } from 'clsx';

interface Habit {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly';
  category: string;
  color: string; // 'blue' | 'green' | 'red' | 'orange' | 'purple' | 'pink'
  createdAt: string;
}

interface HabitLogs {
  [habitId: string]: string[]; // Array of YYYY-MM-DD strings indicating completed days
}

const CATEGORIES = [
  { value: 'Health', label: 'Health & Fitness' },
  { value: 'Work', label: 'Work & Career' },
  { value: 'Personal', label: 'Personal Growth' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Routine', label: 'Daily Routine' },
];

const COLORS = [
  { value: 'blue', label: 'Blue', colorVar: 'var(--primary)' },
  { value: 'green', label: 'Green', colorVar: 'var(--success)' },
  { value: 'red', label: 'Red', colorVar: 'var(--danger)' },
  { value: 'orange', label: 'Orange', colorVar: '#f97316' },
  { value: 'purple', label: 'Purple', colorVar: '#8b5cf6' },
  { value: 'pink', label: 'Pink', colorVar: '#ec4899' },
];

const getStartOfWeek = (d: Date) => {
  const date = new Date(d);
  const day = date.getDay();
  // Adjust so Monday is the first day of the week
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(date.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday;
};

const formatDateString = (date: Date): string => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export default function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [logs, setLogs] = useState<HabitLogs>({});
  
  // New habit form states
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
  const [category, setCategory] = useState('Health');
  const [color, setColor] = useState('blue');
  const [error, setError] = useState('');

  // Load from local storage
  useEffect(() => {
    try {
      const savedHabits = localStorage.getItem('habit_tracker_habits');
      const savedLogs = localStorage.getItem('habit_tracker_logs');
      if (savedHabits) setHabits(JSON.parse(savedHabits));
      if (savedLogs) setLogs(JSON.parse(savedLogs));
    } catch (e) {
      console.error('Failed to parse habits or logs from localStorage', e);
    }
  }, []);

  // Save to local storage
  const saveToStorage = (updatedHabits: Habit[], updatedLogs: HabitLogs) => {
    localStorage.setItem('habit_tracker_habits', JSON.stringify(updatedHabits));
    localStorage.setItem('habit_tracker_logs', JSON.stringify(updatedLogs));
  };

  // Get current week's Mon-Sun dates
  const weekDays = useMemo(() => {
    const today = new Date();
    const start = getStartOfWeek(today);
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      return {
        dateString: formatDateString(day),
        dayName: day.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: day.getDate(),
        isToday: formatDateString(day) === formatDateString(today),
      };
    });
  }, []);

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Habit name is required');
      return;
    }
    setError('');

    const newHabit: Habit = {
      id: Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      frequency,
      category,
      color,
      createdAt: new Date().toISOString(),
    };

    const updatedHabits = [...habits, newHabit];
    const updatedLogs = { ...logs, [newHabit.id]: [] };

    setHabits(updatedHabits);
    setLogs(updatedLogs);
    saveToStorage(updatedHabits, updatedLogs);

    // Reset form
    setName('');
  };

  const handleDeleteHabit = (id: string) => {
    const updatedHabits = habits.filter((h) => h.id !== id);
    const updatedLogs = { ...logs };
    delete updatedLogs[id];

    setHabits(updatedHabits);
    setLogs(updatedLogs);
    saveToStorage(updatedHabits, updatedLogs);
  };

  const toggleDay = (habitId: string, dateStr: string) => {
    const habitLogs = logs[habitId] || [];
    const isCompleted = habitLogs.includes(dateStr);
    
    let updatedHabitLogs: string[];
    if (isCompleted) {
      updatedHabitLogs = habitLogs.filter((d) => d !== dateStr);
    } else {
      updatedHabitLogs = [...habitLogs, dateStr];
    }

    const updatedLogs = { ...logs, [habitId]: updatedHabitLogs };
    setLogs(updatedLogs);
    saveToStorage(habits, updatedLogs);
  };

  // Streak calculator
  const calculateStreak = (habit: Habit, habitLogs: string[]): number => {
    if (!habitLogs || habitLogs.length === 0) return 0;
    
    const todayStr = formatDateString(new Date());
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = formatDateString(yesterday);

    if (habit.frequency === 'daily') {
      let streak = 0;
      let checkDate = new Date();

      // If today is not checked, check if yesterday was. If not, streak is 0.
      if (!habitLogs.includes(todayStr) && !habitLogs.includes(yesterdayStr)) {
        return 0;
      }

      // Start counting from today or yesterday
      if (!habitLogs.includes(todayStr) && habitLogs.includes(yesterdayStr)) {
        checkDate = yesterday;
      }

      while (true) {
        const checkStr = formatDateString(checkDate);
        if (habitLogs.includes(checkStr)) {
          streak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }
      return streak;
    } else {
      // Weekly habit streak
      // A weekly habit is complete for a week if there is at least one log in that week.
      let streak = 0;
      let checkWeekStart = getStartOfWeek(new Date());

      const isWeekCompleted = (weekStart: Date) => {
        const weekDates = Array.from({ length: 7 }, (_, i) => {
          const d = new Date(weekStart);
          d.setDate(weekStart.getDate() + i);
          return formatDateString(d);
        });
        return weekDates.some((d) => habitLogs.includes(d));
      };

      // Check current week
      const currentWeekCompleted = isWeekCompleted(checkWeekStart);
      
      // Check previous week
      const prevWeekStart = new Date(checkWeekStart);
      prevWeekStart.setDate(checkWeekStart.getDate() - 7);
      const prevWeekCompleted = isWeekCompleted(prevWeekStart);

      if (!currentWeekCompleted && !prevWeekCompleted) {
        return 0;
      }

      if (!currentWeekCompleted && prevWeekCompleted) {
        checkWeekStart = prevWeekStart;
      }

      while (true) {
        if (isWeekCompleted(checkWeekStart)) {
          streak++;
          checkWeekStart.setDate(checkWeekStart.getDate() - 7);
        } else {
          break;
        }
      }
      return streak;
    }
  };

  // Stats summary for display
  const stats = useMemo(() => {
    if (habits.length === 0) return { completionRate: 0, highestStreak: 0, totalCompletions: 0 };

    let totalCompletions = 0;
    let highestStreak = 0;
    let totalPossibleLogs = 0;
    let actualLogs = 0;

    habits.forEach((habit) => {
      const habitLogs = logs[habit.id] || [];
      totalCompletions += habitLogs.length;

      // Calculate streak
      const streak = calculateStreak(habit, habitLogs);
      if (streak > highestStreak) highestStreak = streak;

      // For completion rate this week
      const thisWeeksDates = weekDays.map((wd) => wd.dateString);
      const logsThisWeek = habitLogs.filter((d) => thisWeeksDates.includes(d)).length;

      if (habit.frequency === 'daily') {
        totalPossibleLogs += 7;
        actualLogs += logsThisWeek;
      } else {
        totalPossibleLogs += 1;
        actualLogs += logsThisWeek > 0 ? 1 : 0;
      }
    });

    const completionRate = totalPossibleLogs > 0 ? Math.round((actualLogs / totalPossibleLogs) * 100) : 0;

    return {
      completionRate,
      highestStreak,
      totalCompletions,
    };
  }, [habits, logs, weekDays]);

  const getColorVar = (colorName: string) => {
    return COLORS.find((c) => c.value === colorName)?.colorVar || 'var(--primary)';
  };

  return (
    <ToolPageWrapper toolId="habit-tracker">
      <div className="tool-layout lg:grid-cols-12 gap-6">
        
        {/* Habit Form & List - 5 Columns */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="space-y-4">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Create New Habit
            </h2>
            <form onSubmit={handleAddHabit} className="space-y-4">
              <Input
                label="Habit Name"
                placeholder="e.g. 30 Mins Morning Run"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={error}
                requiredMark
              />

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Frequency"
                  options={[
                    { value: 'daily', label: 'Daily' },
                    { value: 'weekly', label: 'Weekly' },
                  ]}
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly')}
                />
                <Select
                  label="Category"
                  options={CATEGORIES}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              <div>
                <label className="label">Habit Color</label>
                <div className="flex gap-2.5 pt-1">
                  {COLORS.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setColor(c.value)}
                      className={clsx(
                        'w-8 h-8 rounded-full border-2 transition-transform cursor-pointer',
                        color === c.value ? 'scale-110 border-current' : 'border-transparent opacity-80 hover:opacity-100'
                      )}
                      style={{
                        backgroundColor: c.colorVar,
                        color: 'var(--text-primary)',
                        boxShadow: color === c.value ? `0 0 0 2px var(--bg-surface), 0 0 0 4px ${c.colorVar}` : 'none',
                      }}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full flex items-center justify-center gap-1.5 pt-3">
                <Plus size={16} />
                <span>Add Habit</span>
              </Button>
            </form>
          </Card>

          {/* Habit Details/List Card */}
          <Card className="space-y-4">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              My Habits ({habits.length})
            </h2>
            {habits.length === 0 ? (
              <div className="text-center py-6 text-[var(--text-tertiary)]">
                No habits added yet. Start by adding one above!
              </div>
            ) : (
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {habits.map((habit) => {
                  const habitLogs = logs[habit.id] || [];
                  const streak = calculateStreak(habit, habitLogs);
                  return (
                    <div
                      key={habit.id}
                      className="flex items-center justify-between p-3 rounded-lg border"
                      style={{
                        borderColor: 'var(--border-subtle)',
                        backgroundColor: 'var(--bg-elevated)',
                        borderLeft: `4px solid ${getColorVar(habit.color)}`,
                      }}
                    >
                      <div className="space-y-1">
                        <span className="font-semibold block text-sm" style={{ color: 'var(--text-primary)' }}>
                          {habit.name}
                        </span>
                        <div className="flex gap-2 flex-wrap">
                          <span
                            className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                            style={{
                              backgroundColor: `${getColorVar(habit.color)}20`,
                              color: getColorVar(habit.color),
                            }}
                          >
                            {habit.category}
                          </span>
                          <span className="text-[10px] text-[var(--text-tertiary)] bg-[var(--border-subtle)] px-1.5 py-0.5 rounded-full font-medium">
                            {habit.frequency === 'daily' ? 'Daily' : 'Weekly'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--text-secondary)' }} title="Current streak">
                          <Flame size={14} className="text-orange-500" />
                          <span>{streak}d</span>
                        </div>
                        <button
                          onClick={() => handleDeleteHabit(habit.id)}
                          className="p-1.5 text-[var(--danger)] hover:bg-[rgba(239,68,68,0.1)] rounded-lg transition-colors cursor-pointer"
                          title="Delete habit"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>

        {/* Weekly Checklist & Stats - 7 Columns */}
        <div className="lg:col-span-7 space-y-6">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <ResultBox
              label="Completion Rate"
              value={stats.completionRate}
              suffix="%"
              highlight
              shouldFormat={true}
            />
            <ResultBox
              label="Best Streak"
              value={stats.highestStreak}
              suffix="d"
              shouldFormat={true}
            />
            <ResultBox
              label="Total Done"
              value={stats.totalCompletions}
              shouldFormat={true}
            />
          </div>

          {/* Weekly Check-off Card */}
          <Card className="space-y-6">
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="space-y-1">
                <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  Weekly Tracker
                </h2>
                <p className="text-xs text-[var(--text-tertiary)]">
                  Check off completed tasks for the current week
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)]">
                <Calendar size={14} />
                <span>Current Week</span>
              </div>
            </div>

            {habits.length === 0 ? (
              <div className="text-center py-12 text-[var(--text-tertiary)] border-2 border-dashed rounded-xl" style={{ borderColor: 'var(--border-subtle)' }}>
                Create habits to view your weekly checklist here.
              </div>
            ) : (
              <div className="space-y-4">
                {/* Header row with days */}
                <div className="grid grid-cols-12 gap-2 text-center pb-2 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div className="col-span-5 text-left text-xs font-bold text-[var(--text-tertiary)]">HABIT</div>
                  {weekDays.map((day) => (
                    <div
                      key={day.dateString}
                      className={clsx(
                        'col-span-1 flex flex-col items-center justify-center p-1 rounded',
                        day.isToday && 'bg-indigo-50/50 dark:bg-indigo-950/20 ring-1 ring-indigo-500/20'
                      )}
                    >
                      <span className="text-[10px] font-semibold text-[var(--text-tertiary)] uppercase">{day.dayName}</span>
                      <span className={clsx('text-xs font-bold mt-0.5', day.isToday ? 'text-indigo-600 dark:text-indigo-400' : 'text-[var(--text-secondary)]')}>
                        {day.dayNum}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Habits Rows */}
                <div className="space-y-4">
                  {habits.map((habit) => {
                    const habitLogs = logs[habit.id] || [];
                    const habitColor = getColorVar(habit.color);

                    return (
                      <div key={habit.id} className="grid grid-cols-12 gap-2 items-center py-1">
                        <div className="col-span-5 flex flex-col justify-center">
                          <span className="font-semibold text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                            {habit.name}
                          </span>
                          <span className="text-[10px] text-[var(--text-tertiary)]">
                            {habit.frequency === 'daily' ? 'Daily Goal' : 'Weekly Goal'}
                          </span>
                        </div>
                        {weekDays.map((day) => {
                          const isCompleted = habitLogs.includes(day.dateString);
                          return (
                            <div key={day.dateString} className="col-span-1 flex justify-center">
                              <button
                                onClick={() => toggleDay(habit.id, day.dateString)}
                                className={clsx(
                                  'w-7 h-7 rounded-lg border transition-all flex items-center justify-center cursor-pointer',
                                  isCompleted
                                    ? 'border-transparent shadow-sm scale-105'
                                    : 'border-[var(--border-strong)] hover:border-[var(--text-secondary)] bg-[var(--bg-surface)]'
                                )}
                                style={{
                                  backgroundColor: isCompleted ? habitColor : undefined,
                                  color: isCompleted ? '#ffffff' : 'transparent',
                                }}
                                title={`${habit.name} - ${day.dayName} ${day.dayNum}`}
                              >
                                <Check size={14} strokeWidth={3} className={clsx(!isCompleted && 'opacity-0')} />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
