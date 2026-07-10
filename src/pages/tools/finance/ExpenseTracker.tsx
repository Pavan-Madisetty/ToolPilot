import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Input, Select, Button } from '@/components/ui';

interface Expense {
  id: string;
  name: string;
  amount: number;
  category: string;
}

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
};

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', name: 'Grocery Shop', amount: 3500, category: 'Food' },
    { id: '2', name: 'Rent Payment', amount: 18000, category: 'Rent' },
    { id: '3', name: 'Electricity Bill', amount: 2400, category: 'Bills' },
  ]);

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  const categories = [
    { value: 'Food', label: 'Food & Groceries' },
    { value: 'Rent', label: 'Housing & Rent' },
    { value: 'Bills', label: 'Bills & Utilities' },
    { value: 'Transport', label: 'Transport & Fuel' },
    { value: 'Other', label: 'Other Miscellaneous' },
  ];

  const total = useMemo(() => {
    return expenses.reduce((sum, exp) => sum + exp.amount, 0);
  }, [expenses]);

  const addExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!name.trim() || isNaN(numAmount) || numAmount <= 0) return;

    const newExpense: Expense = {
      id: Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      amount: numAmount,
      category,
    };

    setExpenses([newExpense, ...expenses]);
    setName('');
    setAmount('');
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  return (
    <ToolPageWrapper toolId="expense-tracker">
      <div className="tool-layout">
        {/* Input Form Sidebar */}
        <div className="p-6 card">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
            Add New Expense
          </h3>
          <form onSubmit={addExpense} className="space-y-4">
            <Input
              label="Expense Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Petrol fill"
              required
            />
            <Input
              label="Amount (₹)"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 1500"
              min="1"
              required
            />
            <Select
              label="Category"
              options={categories}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <Button type="submit" className="w-full">
              Add Expense
            </Button>
          </form>
        </div>

        {/* Expense List and Total */}
        <div className="flex flex-col gap-6">
          <div className="result-box text-center py-6">
            <span className="result-label">Total Monthly Expenses</span>
            <div className="result-value text-rose-500">{formatCurrency(total)}</div>
          </div>

          <div className="p-6 card">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
              Expense Log list ({expenses.length})
            </h3>
            {expenses.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-8">No expenses added yet.</p>
            ) : (
              <div className="divide-y divide-[var(--border-default)]">
                {expenses.map((exp) => (
                  <div key={exp.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                    <div>
                      <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {exp.name}
                      </div>
                      <span className="text-[11px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-medium mt-1 inline-block">
                        {exp.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                        {formatCurrency(exp.amount)}
                      </span>
                      <button
                        onClick={() => removeExpense(exp.id)}
                        className="text-xs font-semibold text-rose-500 hover:text-rose-600 transition"
                        aria-label={`Remove expense ${exp.name}`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
