import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Button, Input } from '@/components/ui';
import { Plus, Trash2, Printer } from 'lucide-react';

interface QuotationItem {
  id: string;
  description: string;
  qty: number;
  price: number;
  discount: number; // percentage
  tax: number;      // percentage
}

export default function QuotationGenerator() {
  const [quoteNumber, setQuoteNumber] = useState<string>('QT-2026-104');
  const [quoteDate, setQuoteDate] = useState<string>('2026-07-10');
  const [validUntil, setValidUntil] = useState<string>('2026-08-10');

  const [companyName, setCompanyName] = useState<string>('Creative Design Agency');
  const [companyContact, setCompanyContact] = useState<string>('hello@creativeagency.com | +91 98765 43210');
  const [companyAddress, setCompanyAddress] = useState<string>('404 Design Tower, Sector 62, Noida, UP');

  const [clientName, setClientName] = useState<string>('Tech Solutions Inc.');
  const [clientContact, setClientContact] = useState<string>('billing@techsolutions.com | +91 99999 88888');
  const [clientAddress, setClientAddress] = useState<string>('808 Tech Park, Whitefield, Bangalore');

  const [items, setItems] = useState<QuotationItem[]>([
    { id: '1', description: 'UI/UX Design - Landing Page', qty: 1, price: 25000, discount: 5, tax: 18 },
    { id: '2', description: 'React Frontend Development', qty: 2, price: 35000, discount: 0, tax: 18 },
  ]);

  const addItem = () => {
    setItems(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        description: 'New Service/Item',
        qty: 1,
        price: 0,
        discount: 0,
        tax: 18,
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length <= 1) {
      setItems([{ id: '1', description: 'New Service/Item', qty: 1, price: 0, discount: 0, tax: 18 }]);
      return;
    }
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof QuotationItem, value: string | number) => {
    setItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const totals = useMemo(() => {
    let subtotal = 0;
    let totalDiscount = 0;
    let totalTax = 0;

    items.forEach(item => {
      const baseVal = item.qty * item.price;
      const discVal = baseVal * (item.discount / 100);
      const postDiscVal = baseVal - discVal;
      const taxVal = postDiscVal * (item.tax / 100);

      subtotal += baseVal;
      totalDiscount += discVal;
      totalTax += taxVal;
    });

    return {
      subtotal,
      totalDiscount,
      totalTax,
      grandTotal: subtotal - totalDiscount + totalTax,
    };
  }, [items]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(val);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <ToolPageWrapper toolId="quotation-generator">
      {/* Styles for printing the quotation neatly */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-quotation, #printable-quotation * {
            visibility: visible;
          }
          #printable-quotation {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: black !important;
            padding: 20px;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Input Fields (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6 no-print">
          <Card className="space-y-4">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Quotation Info
            </h2>
            <Input
              label="Quotation Number"
              value={quoteNumber}
              onChange={(e) => setQuoteNumber(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Quotation Date"
                type="date"
                value={quoteDate}
                onChange={(e) => setQuoteDate(e.target.value)}
              />
              <Input
                label="Valid Until"
                type="date"
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
              />
            </div>
          </Card>

          <Card className="space-y-4">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Company Details (Sender)
            </h2>
            <Input
              label="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <Input
              label="Contact info"
              value={companyContact}
              onChange={(e) => setCompanyContact(e.target.value)}
              placeholder="Email / Phone"
            />
            <Input
              label="Address"
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
            />
          </Card>

          <Card className="space-y-4">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Client Details (Recipient)
            </h2>
            <Input
              label="Client Name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
            <Input
              label="Contact info"
              value={clientContact}
              onChange={(e) => setClientContact(e.target.value)}
              placeholder="Email / Phone"
            />
            <Input
              label="Address"
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
            />
          </Card>
        </div>

        {/* Right Output & Editor (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="space-y-4 no-print">
            <div className="flex justify-between items-center border-b pb-4" style={{ borderColor: 'var(--border-subtle)' }}>
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Line Items
              </h2>
              <Button onClick={addItem} size="sm" className="flex items-center gap-1.5">
                <Plus size={16} />
                <span>Add Item</span>
              </Button>
            </div>

            <div className="space-y-4">
              {items.map((item, idx) => (
                <div key={item.id} className="grid grid-cols-12 gap-3 items-end border-b pb-4 last:border-b-0 last:pb-0" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div className="col-span-4">
                    <Input
                      label={idx === 0 ? "Item/Service" : undefined}
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      placeholder="Description"
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      label={idx === 0 ? "Qty" : undefined}
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) => updateItem(item.id, 'qty', Number(e.target.value))}
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      label={idx === 0 ? "Price (₹)" : undefined}
                      type="number"
                      min="0"
                      value={item.price === 0 ? '' : item.price}
                      onChange={(e) => updateItem(item.id, 'price', Number(e.target.value))}
                    />
                  </div>
                  <div className="col-span-1.5">
                    <Input
                      label={idx === 0 ? "Disc %" : undefined}
                      type="number"
                      min="0"
                      max="100"
                      value={item.discount}
                      onChange={(e) => updateItem(item.id, 'discount', Number(e.target.value))}
                    />
                  </div>
                  <div className="col-span-1.5">
                    <Input
                      label={idx === 0 ? "Tax %" : undefined}
                      type="number"
                      min="0"
                      max="100"
                      value={item.tax}
                      onChange={(e) => updateItem(item.id, 'tax', Number(e.target.value))}
                    />
                  </div>
                  <div className="col-span-1 pb-1 flex justify-center">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-[var(--danger)] hover:bg-[rgba(239,68,68,0.1)] rounded-lg transition-colors"
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Printable Quotation View */}
          <div id="printable-quotation" className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border text-black dark:text-white" style={{ borderColor: 'var(--border-default)' }}>
            <div className="flex justify-between items-start border-b pb-6" style={{ borderColor: 'var(--border-default)' }}>
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>PRICE QUOTATION</h1>
                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Quote No: <span className="font-bold">{quoteNumber}</span></p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Date: {quoteDate} | Valid Until: {validUntil}</p>
              </div>
              <Button onClick={handlePrint} size="sm" variant="secondary" className="flex items-center gap-1.5 no-print">
                <Printer size={16} />
                <span>Print / Download</span>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-8 py-6 border-b" style={{ borderColor: 'var(--border-default)' }}>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Sender / From</h3>
                <p className="text-sm font-bold mt-1" style={{ color: 'var(--text-primary)' }}>{companyName}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{companyContact}</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{companyAddress}</p>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Prepared For / To</h3>
                <p className="text-sm font-bold mt-1" style={{ color: 'var(--text-primary)' }}>{clientName}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{clientContact}</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{clientAddress}</p>
              </div>
            </div>

            <div className="py-6">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>
                    <th className="pb-3 font-semibold">Description</th>
                    <th className="pb-3 font-semibold text-center">Qty</th>
                    <th className="pb-3 font-semibold text-right">Unit Price</th>
                    <th className="pb-3 font-semibold text-center">Disc %</th>
                    <th className="pb-3 font-semibold text-center">Tax %</th>
                    <th className="pb-3 font-semibold text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                  {items.map((item) => {
                    const baseVal = item.qty * item.price;
                    const discVal = baseVal * (item.discount / 100);
                    const postDiscVal = baseVal - discVal;
                    const taxVal = postDiscVal * (item.tax / 100);
                    const itemTotal = postDiscVal + taxVal;

                    return (
                      <tr key={item.id} style={{ color: 'var(--text-primary)' }}>
                        <td className="py-3 font-medium">{item.description}</td>
                        <td className="py-3 text-center">{item.qty}</td>
                        <td className="py-3 text-right">{formatCurrency(item.price)}</td>
                        <td className="py-3 text-center">{item.discount > 0 ? `${item.discount}%` : '—'}</td>
                        <td className="py-3 text-center">{item.tax > 0 ? `${item.tax}%` : '—'}</td>
                        <td className="py-3 text-right font-semibold">{formatCurrency(itemTotal)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="border-t pt-6 flex flex-col items-end" style={{ borderColor: 'var(--border-default)' }}>
              <div className="w-full sm:w-80 space-y-2.5 text-sm">
                <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
                  <span>Gross Subtotal</span>
                  <span className="font-semibold">{formatCurrency(totals.subtotal)}</span>
                </div>
                {totals.totalDiscount > 0 && (
                  <div className="flex justify-between text-[var(--success)]">
                    <span>Discount Deducted</span>
                    <span className="font-semibold">-{formatCurrency(totals.totalDiscount)}</span>
                  </div>
                )}
                {totals.totalTax > 0 && (
                  <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
                    <span>Estimated Tax</span>
                    <span className="font-semibold">{formatCurrency(totals.totalTax)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t pt-3" style={{ borderColor: 'var(--border-default)' }}>
                  <span className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>Grand Total</span>
                  <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">
                    {formatCurrency(totals.grandTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
