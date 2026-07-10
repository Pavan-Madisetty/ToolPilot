import { useState, useEffect, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Button, Input } from '@/components/ui';
import { Plus, Trash2, CheckCircle2, Circle, Calendar, CheckSquare } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';

// Priority weight mappings
const PRIORITY_WEIGHTS = { high: 3, medium: 2, low: 1 };

interface Task {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  dueDate?: string;
}

export default function TodoList() {
  const { addToast } = useUIStore();

  const [tasks, setTasks] = useState<Task[]>(() => {
    const cached = localStorage.getItem('todolist_tasks');
    return cached ? JSON.parse(cached) : [
      { id: '1', title: 'Start using ToolPilot Productivity tools', priority: 'high', completed: true },
      { id: '2', title: 'Schedule calendar focus blocks', priority: 'medium', completed: false },
      { id: '3', title: 'Optimize workspace template options', priority: 'low', completed: false },
    ];
  });

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newDueDate, setNewDueDate] = useState('');
  
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'high'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'alphabetical'>('priority');

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('todolist_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: `task_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      title: newTaskTitle.trim(),
      priority: newPriority,
      completed: false,
      dueDate: newDueDate || undefined,
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    setNewDueDate('');
    addToast({
      type: 'success',
      title: 'Task Created',
      message: `"${newTask.title}" added to your list.`,
    });
  };

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const nextState = !t.completed;
        if (nextState) {
          addToast({
            type: 'info',
            title: 'Task Completed',
            message: `"${t.title}" checked off!`,
          });
        }
        return { ...t, completed: nextState };
      }
      return t;
    }));
  };

  const handleDeleteTask = (id: string, title: string) => {
    setTasks(tasks.filter(t => t.id !== id));
    addToast({
      type: 'error',
      title: 'Task Deleted',
      message: `"${title}" has been removed.`,
    });
  };

  const handleClearCompleted = () => {
    const completedCount = tasks.filter(t => t.completed).length;
    if (completedCount === 0) return;

    if (window.confirm(`Clear all ${completedCount} completed tasks?`)) {
      setTasks(tasks.filter(t => !t.completed));
      addToast({
        type: 'error',
        title: 'Tasks Cleared',
        message: `Removed ${completedCount} completed tasks.`,
      });
    }
  };

  // Stats Calculations
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, active, percentage };
  }, [tasks]);



  // Filter & Sort implementation
  const processedTasks = useMemo(() => {
    let list = [...tasks];

    // Filter
    if (filter === 'active') {
      list = list.filter(t => !t.completed);
    } else if (filter === 'completed') {
      list = list.filter(t => t.completed);
    } else if (filter === 'high') {
      list = list.filter(t => t.priority === 'high');
    }

    // Sort
    list.sort((a, b) => {
      if (sortBy === 'priority') {
        return PRIORITY_WEIGHTS[b.priority] - PRIORITY_WEIGHTS[a.priority];
      }
      if (sortBy === 'date') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return a.title.localeCompare(b.title);
    });

    return list;
  }, [tasks, filter, sortBy]);

  const getPriorityColor = (p: 'low' | 'medium' | 'high') => {
    if (p === 'high') return 'text-red-600 bg-red-50 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900';
    if (p === 'medium') return 'text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900';
    return 'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900';
  };

  return (
    <ToolPageWrapper toolId="todo">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        
        {/* Progress and Stats Panel */}
        <Card
          className="flex flex-col md:flex-row justify-between items-center p-4 gap-4"
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
        >
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-xl text-blue-600 dark:text-blue-400">
              <CheckSquare size={24} />
            </div>
            <div>
              <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                Task Tracker
              </h3>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {stats.active} pending tasks • {stats.completed} checked off
              </p>
            </div>
          </div>

          <div className="w-full md:w-48 flex flex-col gap-1 shrink-0">
            <div className="flex justify-between text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>
              <span>Completion</span>
              <span>{stats.percentage}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${stats.percentage}%` }}
              />
            </div>
          </div>
        </Card>

        {/* Add Task Form */}
        <Card
          className="p-4"
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
        >
          <form onSubmit={handleAddTask} className="flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider border-b pb-2" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-default)' }}>
              Create New Task
            </h3>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <Input
                  id="task-title"
                  placeholder="What needs to be done?"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  requiredMark
                  className="w-full"
                />
              </div>
              <div className="w-full md:w-40">
                <Input
                  id="task-date"
                  type="date"
                  label="Due Date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>Priority:</span>
                <div className="flex gap-1">
                  {(['low', 'medium', 'high'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setNewPriority(p)}
                      className={`text-xs px-2.5 py-1 rounded-md border font-semibold capitalize transition-all ${
                        newPriority === p
                          ? 'border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-950/25 dark:text-blue-400'
                          : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-base)]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <Button type="submit" variant="primary" size="md" className="flex items-center gap-1">
                <Plus size={16} />
                Add Task
              </Button>
            </div>
          </form>
        </Card>

        {/* Task List Controls */}
        <div className="flex items-center justify-between flex-wrap gap-3 bg-[var(--bg-surface)] p-3 border rounded-xl border-[var(--border-default)]">
          {/* Filters */}
          <div className="flex gap-1.5 flex-wrap">
            {(['all', 'active', 'completed', 'high'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs px-3 py-1.5 font-bold rounded-lg capitalize transition-all ${
                  filter === f
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Sorter */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'priority' | 'alphabetical')}
                className="p-1 border rounded bg-[var(--bg-base)] text-[var(--text-primary)] border-[var(--border-default)] outline-none font-semibold cursor-pointer"
              >
                <option value="priority">Priority</option>
                <option value="date">Due Date</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </div>

            {stats.completed > 0 && (
              <button
                onClick={handleClearCompleted}
                className="text-xs font-bold text-red-500 hover:underline flex items-center gap-1"
              >
                <Trash2 size={12} />
                Clear Done
              </button>
            )}
          </div>
        </div>

        {/* Task Grid/List */}
        <div className="flex flex-col gap-2.5">
          {processedTasks.length > 0 ? (
            processedTasks.map((t) => (
              <Card
                key={t.id}
                padding="sm"
                className={`flex items-center justify-between gap-4 border transition-all ${
                  t.completed ? 'opacity-65' : ''
                }`}
                style={{
                  background: 'var(--bg-surface)',
                  borderColor: 'var(--border-default)',
                }}
              >
                {/* Complete checkbox + title */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={() => handleToggleTask(t.id)}
                    className="mt-0.5 text-blue-600 dark:text-blue-400 flex-shrink-0"
                    aria-label={t.completed ? 'Mark task as incomplete' : 'Mark task as complete'}
                  >
                    {t.completed ? (
                      <CheckCircle2 size={18} className="fill-current" />
                    ) : (
                      <Circle size={18} className="text-slate-400 dark:text-slate-600 hover:text-blue-500" />
                    )}
                  </button>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-sm font-medium break-words leading-relaxed ${
                        t.completed ? 'line-through text-slate-400 dark:text-slate-600' : ''
                      }`}
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {t.title}
                    </p>
                    {/* Meta info */}
                    <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-1 text-[10px] text-slate-500">
                      <span className={`px-2 py-0.2 rounded border text-[9px] font-bold uppercase ${getPriorityColor(t.priority)}`}>
                        {t.priority}
                      </span>
                      {t.dueDate && (
                        <span className="flex items-center gap-1">
                          <Calendar size={10} />
                          Due: {t.dueDate}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => handleDeleteTask(t.id, t.title)}
                  className="p-1.5 hover:bg-[var(--bg-elevated)] rounded-lg text-red-500 hover:text-red-600 transition-colors flex-shrink-0"
                  aria-label={`Delete task: ${t.title}`}
                >
                  <Trash2 size={14} />
                </button>
              </Card>
            ))
          ) : (
            <div className="py-16 text-center border border-dashed rounded-2xl bg-[var(--bg-surface)] border-[var(--border-default)]">
              <div className="text-5xl mb-3">📝</div>
              <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                No Tasks Found
              </h3>
              <p className="text-xs max-w-xs mx-auto" style={{ color: 'var(--text-secondary)' }}>
                {filter === 'all'
                  ? 'All caught up! Add a new task above to get started.'
                  : 'No tasks match the active filter criteria.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </ToolPageWrapper>
  );
}
