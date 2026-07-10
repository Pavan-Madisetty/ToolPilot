import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Input, Select, Button, ResultBox } from '@/components/ui';
import { Plus, Trash2 } from 'lucide-react';

interface Subscription {
  id: string;
  name: string;
  cost: number | '';
  cycle: 'monthly' | 'annual';
}

export default function SubscriptionTracker() {
  const [subs, setSubs] = useState<Subscription[]>([
    { id: '1', name: 'Netflix', cost: 649, cycle: 'monthly' },
    { id: '2', name: 'Amazon Prime', cost: 1499, cycle: 'annual' },
    { id: '3', name: 'Spotify Premium', cost: 119, cycle: 'monthly' },
  ]);

  const cycleOptions = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'annual', label: 'Annual' },
  ];

  const addSub = () => {
    const nextId = String(Date.now());
    setSubs([...subs, { id: nextId, name: '', cost: '', cycle: 'monthly' }]);
  };

  const deleteSub = (id: string) => {
    setSubs(subs.filter((s) => s.id !== id));
  };

  const updateSub = (id: string, field: keyof Subscription, value: string | number) => {
    setSubs(
      subs.map((s) => {
        if (s.id === id) {
          return { ...s, [field]: value };
        }
        return s;
      })
    );
  };

  const calculations = useMemo(() => {
    let totalMonthly = 0;
    let totalAnnual = 0;

    subs.forEach((s) => {
      const c = typeof s.cost === 'number' ? s.cost : 0;
      if (s.cycle === 'monthly') {
        totalMonthly += c;
        totalAnnual += c * 12;
      } else {
        totalMonthly += c / 12;
        totalAnnual += c;
      }
    });

    return {
      totalMonthly,
      totalAnnual,
    };
  }, [subs]);

  return (
    <ToolPageWrapper toolId="subscription-tracker">
      <div className="tool-layout lg:grid-cols-2 gap-6">
        {/* Left Side: Subscription Manager */}
        <div className="space-y-6 p-6 card">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            Manage Subscriptions
          </h2>
          <div className="space-y-4">
            {subs.map((sub, idx) => (
              <div
                key={sub.id}
                className="flex items-end gap-3 p-3 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] relative"
              >
                <span className="absolute top-1 left-2 text-[10px] font-semibold text-[var(--text-tertiary)]">
                  Subscription #{idx + 1}
                </span>

                <div className="flex-[2] mt-2">
                  <Input
                    label="Name"
                    value={sub.name}
                    onChange={(e) => updateSub(sub.id, 'name', e.target.value)}
                    placeholder="e.g. Netflix"
                  />
                </div>

                <div className="flex-1 mt-2">
                  <Input
                    label="Cost (₹)"
                    type="number"
                    value={sub.cost}
                    onChange={(e) =>
                      updateSub(sub.id, 'cost', e.target.value === '' ? '' : Number(e.target.value))
                    }
                    placeholder="Cost"
                    min={0}
                  />
                </div>

                <div className="flex-1 mt-2">
                  <Select
                    label="Billing Cycle"
                    options={cycleOptions}
                    value={sub.cycle}
                    onChange={(e) =>
                      updateSub(sub.id, 'cycle', e.target.value as 'monthly' | 'annual')
                    }
                  />
                </div>

                <Button
                  variant="danger"
                  className="p-2 shrink-0 mb-[2px]"
                  onClick={() => deleteSub(sub.id)}
                  aria-label={`Delete Subscription ${idx + 1}`}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
          </div>

          <Button
            variant="secondary"
            className="w-full flex items-center justify-center gap-2"
            onClick={addSub}
          >
            <Plus size={16} /> Add Subscription
          </Button>
        </div>

        {/* Right Side: Results & Summary */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ResultBox
              label="Total Monthly Cost"
              value={calculations.totalMonthly}
              prefix="₹"
              highlight
            />
            <ResultBox
              label="Total Annual Cost"
              value={calculations.totalAnnual}
              prefix="₹"
              highlight
            />
          </div>

          {/* Detailed Summary Card */}
          <div className="card p-6 overflow-x-auto">
            <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Expenses Breakdown
            </h3>
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr
                  className="border-b border-[var(--border-default)]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <th className="py-2">Subscription Name</th>
                  <th className="py-2 text-right">Cycle Cost</th>
                  <th className="py-2 text-right">Billing Cycle</th>
                  <th className="py-2 text-right">Monthly Cost</th>
                  <th className="py-2 text-right">Annual Cost</th>
                </tr>
              </thead>
              <tbody>
                {subs.map((sub, idx) => {
                  const cost = typeof sub.cost === 'number' ? sub.cost : 0;
                  const monthlyEquivalent = sub.cycle === 'monthly' ? cost : cost / 12;
                  const annualEquivalent = sub.cycle === 'annual' ? cost : cost * 12;

                  return (
                    <tr
                      key={sub.id}
                      className="border-b border-[var(--border-default)]"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <td className="py-2 font-medium">
                        {sub.name || `Unlabelled Subscription #${idx + 1}`}
                      </td>
                      <td className="py-2 text-right">₹{cost.toLocaleString('en-IN')}</td>
                      <td className="py-2 text-right capitalize">{sub.cycle}</td>
                      <td className="py-2 text-right text-warning">
                        ₹{monthlyEquivalent.toLocaleString('en-IN', { maximumFractionDigits: 1 })}
                      </td>
                      <td className="py-2 text-right text-danger">
                        ₹{annualEquivalent.toLocaleString('en-IN', { maximumFractionDigits: 1 })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
