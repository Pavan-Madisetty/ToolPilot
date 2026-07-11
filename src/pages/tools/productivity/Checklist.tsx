import { useState, useEffect, useMemo, KeyboardEvent } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, Input, Textarea } from '@/components/ui';
import { Trash2, Plus, CheckSquare, Square, RotateCcw, ListPlus } from 'lucide-react';

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

export default function Checklist() {
  const [items, setItems] = useState<ChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem('toolpilot_checklist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading checklist:', e);
    }
    // Default initial items if empty
    return [
      { id: '1', text: 'Plan weekly objectives and tasks', checked: true },
      { id: '2', text: 'Review team updates and backlog', checked: false },
      { id: '3', text: 'Complete code reviews and push updates', checked: false },
      { id: '4', text: 'Respond to urgent client emails', checked: false },
    ];
  });

  const [newItemText, setNewItemText] = useState('');
  const [bulkText, setBulkText] = useState('');

  // Persist items to local storage
  useEffect(() => {
    try {
      localStorage.setItem('toolpilot_checklist', JSON.stringify(items));
    } catch (e) {
      console.error('Error saving checklist:', e);
    }
  }, [items]);

  const handleAddItem = () => {
    if (!newItemText.trim()) return;
    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      text: newItemText.trim(),
      checked: false,
    };
    setItems([...items, newItem]);
    setNewItemText('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };

  const handleToggleCheck = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleBulkAdd = () => {
    if (!bulkText.trim()) return;
    const newLines = bulkText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const newItems: ChecklistItem[] = newLines.map((line, idx) => ({
      id: (Date.now() + idx).toString(),
      text: line,
      checked: false,
    }));

    setItems([...items, ...newItems]);
    setBulkText('');
  };

  const handleUncheckAll = () => {
    setItems(items.map((item) => ({ ...item, checked: false })));
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all items?')) {
      setItems([]);
    }
  };

  // Memoized calculations
  const totalCount = items.length;
  const completedCount = useMemo(() => items.filter((i) => i.checked).length, [items]);
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <ToolPageWrapper toolId="checklist">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Bulk Add Tool (Left Column) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Card
            className="flex flex-col gap-6"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
          >
            <div>
              <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                Bulk Addition
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Add multiple checklist items at once. Enter one item per line.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Textarea
                label="Checklist Items"
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                placeholder="e.g.&#10;Buy groceries&#10;Pay utility bills&#10;Call support team"
                rows={6}
              />
              <Button
                onClick={handleBulkAdd}
                disabled={!bulkText.trim()}
                className="flex items-center justify-center gap-1.5 w-full py-2.5 font-semibold"
                style={{
                  backgroundColor: bulkText.trim() ? 'var(--primary)' : 'var(--border-strong)',
                  color: '#fff',
                }}
              >
                <ListPlus size={16} />
                <span>Bulk Add Items</span>
              </Button>
            </div>
          </Card>

          {/* Quick Stats / Summary Card */}
          <Card
            className="flex flex-col gap-4"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
          >
            <h4
              className="text-sm font-bold uppercase tracking-wider"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Checklist Progress
            </h4>
            <div className="flex justify-between items-baseline">
              <span className="text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
                {progressPercent}%
              </span>
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {completedCount} of {totalCount} completed
              </span>
            </div>

            <div
              className="w-full rounded-full h-2.5 overflow-hidden"
              style={{ background: 'var(--bg-elevated)' }}
            >
              <div
                className="h-full transition-all duration-300 ease-out"
                style={{
                  width: `${progressPercent}%`,
                  backgroundColor: progressPercent === 100 ? 'var(--success)' : 'var(--primary)',
                }}
              />
            </div>
          </Card>
        </div>

        {/* Main Checklist Card (Right Columns) */}
        <Card
          className="lg:col-span-2 flex flex-col gap-6"
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                My Checklist
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Manage, check, and track your daily tasks below.
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleUncheckAll}
                variant="secondary"
                size="xs"
                disabled={totalCount === 0}
                className="flex items-center gap-1"
              >
                <RotateCcw size={12} />
                <span>Reset Checks</span>
              </Button>
              <Button
                onClick={handleClearAll}
                variant="secondary"
                size="xs"
                disabled={totalCount === 0}
                className="flex items-center gap-1"
                style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}
              >
                <Trash2 size={12} />
                <span>Clear All</span>
              </Button>
            </div>
          </div>

          {/* Quick Add Item Bar */}
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a new checklist item..."
                aria-label="New checklist item input"
              />
            </div>
            <div className="self-end pb-[2px]">
              <Button
                onClick={handleAddItem}
                disabled={!newItemText.trim()}
                className="px-4 py-2.5"
                style={{
                  backgroundColor: newItemText.trim() ? 'var(--primary)' : 'var(--border-strong)',
                  color: '#fff',
                }}
              >
                <Plus size={18} />
              </Button>
            </div>
          </div>

          {/* Checklist Items Container */}
          <div className="flex-1 min-h-[300px]">
            {items.length > 0 ? (
              <div className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3.5 rounded-lg border transition-all"
                    style={{
                      background: 'var(--bg-elevated)',
                      borderColor: 'var(--border-default)',
                      opacity: item.checked ? 0.6 : 1,
                    }}
                  >
                    <button
                      onClick={() => handleToggleCheck(item.id)}
                      className="flex items-center gap-3 text-left flex-1"
                    >
                      <span
                        className="shrink-0"
                        style={{ color: item.checked ? 'var(--success)' : 'var(--text-secondary)' }}
                      >
                        {item.checked ? <CheckSquare size={20} /> : <Square size={20} />}
                      </span>
                      <span
                        className={`text-sm break-all font-medium transition-all ${
                          item.checked ? 'line-through' : ''
                        }`}
                        style={{
                          color: item.checked ? 'var(--text-tertiary)' : 'var(--text-primary)',
                        }}
                      >
                        {item.text}
                      </span>
                    </button>

                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-1 rounded hover:bg-[var(--bg-surface)] transition-colors"
                      style={{ color: 'var(--text-tertiary)' }}
                      aria-label="Delete item"
                    >
                      <Trash2 size={16} className="transition-colors" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="h-full min-h-[250px] flex flex-col items-center justify-center text-center p-8 border border-dashed rounded-lg"
                style={{ borderColor: 'var(--border-default)' }}
              >
                <span className="text-3xl mb-2" aria-hidden="true">
                  🎉
                </span>
                <h4 className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                  All Caught Up!
                </h4>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Your checklist is currently empty. Add items above to get started.
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </ToolPageWrapper>
  );
}
