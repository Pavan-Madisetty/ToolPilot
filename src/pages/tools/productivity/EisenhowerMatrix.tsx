import { useEffect, useState } from 'react';
import { Check, Trash2 } from 'lucide-react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, Input, Select } from '@/components/ui';
import { loadJSON, saveJSON } from '@/utils/safeStorage';

type Q = 'do' | 'plan' | 'delegate' | 'drop';
interface Task { id: string; text: string; q: Q; done: boolean }

const KEY = 'toolskyt_eisenhower_v1';
const QUADS: { key: Q; title: string; sub: string; color: string }[] = [
  { key: 'do', title: 'Do first', sub: 'Urgent · Important', color: 'var(--danger)' },
  { key: 'plan', title: 'Schedule', sub: 'Not urgent · Important', color: 'var(--primary)' },
  { key: 'delegate', title: 'Delegate', sub: 'Urgent · Not important', color: 'var(--warning)' },
  { key: 'drop', title: 'Eliminate', sub: 'Not urgent · Not important', color: 'var(--text-tertiary)' },
];
const uid = () => (crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()));

export default function EisenhowerMatrix() {
  const [tasks, setTasks] = useState<Task[]>(() => loadJSON<Task[]>(KEY, []));
  const [text, setText] = useState('');
  const [q, setQ] = useState<Q>('do');

  useEffect(() => saveJSON(KEY, tasks), [tasks]);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    setTasks((p) => [...p, { id: uid(), text: t, q, done: false }]);
    setText('');
  };
  const update = (id: string, patch: Partial<Task>) => setTasks((p) => p.map((t) => (t.id === id ? { ...t, ...patch } : t)));

  return (
    <ToolPageWrapper toolId="eisenhower-matrix">
      <div className="space-y-6">
        <form onSubmit={add} className="grid gap-3 sm:grid-cols-[1fr_14rem_auto] items-end">
          <Input label="New task" value={text} onChange={(e) => setText(e.target.value)} placeholder="What needs doing?" />
          <Select label="Quadrant" value={q} onChange={(e) => setQ(e.target.value as Q)} options={QUADS.map((x) => ({ value: x.key, label: x.title }))} />
          <Button type="submit" disabled={!text.trim()}>Add task</Button>
        </form>
        <div className="grid gap-4 md:grid-cols-2">
          {QUADS.map((quad) => {
            const list = tasks.filter((t) => t.q === quad.key);
            return (
              <Card key={quad.key} className="space-y-3 min-h-[12rem]" style={{ borderTop: `3px solid ${quad.color}` }}>
                <div>
                  <h2 className="text-lg font-bold">{quad.title}</h2>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{quad.sub}</p>
                </div>
                {list.length === 0 && <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>No tasks</p>}
                <ul className="space-y-2">
                  {list.map((t) => (
                    <li key={t.id} className="flex items-center gap-2 rounded-lg border p-2 text-sm" style={{ borderColor: 'var(--border-subtle)' }}>
                      <button type="button" onClick={() => update(t.id, { done: !t.done })} aria-label={t.done ? 'Mark as not done' : 'Mark as done'} className="grid h-5 w-5 shrink-0 place-items-center rounded border" style={{ borderColor: quad.color, background: t.done ? quad.color : 'transparent', color: '#fff' }}>
                        {t.done && <Check size={12} />}
                      </button>
                      <span className={`min-w-0 flex-1 break-words ${t.done ? 'line-through opacity-60' : ''}`}>{t.text}</span>
                      <select aria-label={`Move “${t.text}”`} value={t.q} onChange={(e) => update(t.id, { q: e.target.value as Q })} className="max-w-[6.5rem] rounded border bg-transparent text-xs" style={{ borderColor: 'var(--border-default)' }}>
                        {QUADS.map((x) => <option key={x.key} value={x.key}>{x.title}</option>)}
                      </select>
                      <button type="button" aria-label={`Delete “${t.text}”`} onClick={() => setTasks((p) => p.filter((x) => x.id !== t.id))} style={{ color: 'var(--text-tertiary)' }}><Trash2 size={14} /></button>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
        {tasks.some((t) => t.done) && <Button variant="ghost" size="sm" onClick={() => setTasks((p) => p.filter((t) => !t.done))}>Clear completed</Button>}
        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Tasks are stored only in this browser (local storage).</p>
      </div>
    </ToolPageWrapper>
  );
}
