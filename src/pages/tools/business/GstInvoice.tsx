import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Button, Input, Select } from '@/components/ui';
import { Plus, Trash2, Printer } from 'lucide-react';

interface InvoiceItem {
  id: string;
  description: string;
  hsn: string;
  qty: number;
  price: number;
  gstRate: number; // 0, 5, 12, 18, 28
}

const GST_RATES = [
  { value: '0', label: '0%' },
  { value: '5', label: '5%' },
  { value: '12', label: '12%' },
  { value: '18', label: '18%' },
  { value: '28', label: '28%' },
];

export default function GstInvoice() {
  const [sellerName, setSellerName] = useState<string>('Acme Corporation');
  const [sellerGstin, setSellerGstin] = useState<string>('27AAAAA1111A1Z1');
  const [buyerName, setBuyerName] = useState<string>('Client Private Limited');
  const [buyerGstin, setBuyerGstin] = useState<string>('27BBBBB2222B2Z2');
  const [invoiceNumber, setInvoiceNumber] = useState<string>('INV-2026-001');
  const [invoiceDate, setInvoiceDate] = useState<string>('2026-07-10');
  const [isInterstate, setIsInterstate] = useState<boolean>(false); // Interstate (IGST) vs Intrastate (CGST+SGST)

  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: 'Consulting Services', hsn: '998311', qty: 1, price: 15000, gstRate: 18 },
    { id: '2', description: 'Hardware Server Supply', hsn: '847130', qty: 2, price: 45000, gstRate: 12 },
  ]);

  const addItem = () => {
    setItems(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        description: 'New Item',
        hsn: '',
        qty: 1,
        price: 0,
        gstRate: 18,
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length <= 1) {
      setItems([{ id: '1', description: 'New Item', hsn: '', qty: 1, price: 0, gstRate: 18 }]);
      return;
    }
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
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
    let totalTax = 0;
    let cgst = 0;
    let sgst = 0;
    let igst = 0;

    items.forEach(item => {
      const itemSubtotal = item.qty * item.price;
      const tax = itemSubtotal * (item.gstRate / 100);
      subtotal += itemSubtotal;
      totalTax += tax;

      if (isInterstate) {
        igst += tax;
      } else {
        cgst += tax / 2;
        sgst += tax / 2;
      }
    });

    return {
      subtotal,
      totalTax,
      cgst,
      sgst,
      igst,
      grandTotal: subtotal + totalTax,
    };
  }, [items, isInterstate]);

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
    <ToolPageWrapper toolId="gst-invoice">
      {/* Styles for printing the invoice neatly */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-invoice, #printable-invoice * {
            visibility: visible;
          }
          #printable-invoice {
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
        {/* Left inputs column (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6 no-print">
          <Card className="space-y-4">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Invoice Information
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Invoice Number"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />
              <Input
                label="Invoice Date"
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
              />
            </div>

            <Select
              label="Transaction Type"
              options={[
                { value: 'intra', label: 'Intra-state (CGST + SGST)' },
                { value: 'inter', label: 'Inter-state (IGST)' },
              ]}
              value={isInterstate ? 'inter' : 'intra'}
              onChange={(e) => setIsInterstate(e.target.value === 'inter')}
            />
          </Card>

          <Card className="space-y-4">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Seller Details
            </h2>
            <Input
              label="Seller Name"
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
            />
            <Input
              label="Seller GSTIN"
              value={sellerGstin}
              onChange={(e) => setSellerGstin(e.target.value)}
            />
          </Card>

          <Card className="space-y-4">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Buyer Details
            </h2>
            <Input
              label="Buyer Name"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
            />
            <Input
              label="Buyer GSTIN"
              value={buyerGstin}
              onChange={(e) => setBuyerGstin(e.target.value)}
            />
          </Card>
        </div>

        {/* Right preview/items column (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Item entry table */}
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
                      label={idx === 0 ? "Description" : undefined}
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      placeholder="Item name"
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      label={idx === 0 ? "HSN" : undefined}
                      value={item.hsn}
                      onChange={(e) => updateItem(item.id, 'hsn', e.target.value)}
                      placeholder="HSN"
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
                    <Select
                      label={idx === 0 ? "GST" : undefined}
                      options={GST_RATES}
                      value={item.gstRate.toString()}
                      onChange={(e) => updateItem(item.id, 'gstRate', Number(e.target.value))}
                    />
                  </div>
                  <div className="col-span-0.5 pb-1 flex justify-center">
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

          {/* Printable Invoice Display */}
          <div id="printable-invoice" className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border text-black dark:text-white" style={{ borderColor: 'var(--border-default)' }}>
            <div className="flex justify-between items-start border-b pb-6" style={{ borderColor: 'var(--border-default)' }}>
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>GST TAX INVOICE</h1>
                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Invoice No: <span className="font-bold">{invoiceNumber}</span></p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Date: {invoiceDate}</p>
              </div>
              <Button onClick={handlePrint} size="sm" variant="secondary" className="flex items-center gap-1.5 no-print">
                <Printer size={16} />
                <span>Print Invoice</span>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-8 py-6 border-b" style={{ borderColor: 'var(--border-default)' }}>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Seller / Bill From</h3>
                <p className="text-sm font-bold mt-1" style={{ color: 'var(--text-primary)' }}>{sellerName}</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>GSTIN: <span className="font-mono">{sellerGstin || 'N/A'}</span></p>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Buyer / Bill To</h3>
                <p className="text-sm font-bold mt-1" style={{ color: 'var(--text-primary)' }}>{buyerName}</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>GSTIN: <span className="font-mono">{buyerGstin || 'N/A'}</span></p>
              </div>
            </div>

            {/* Invoice items list */}
            <div className="py-6">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>
                    <th className="pb-3 font-semibold">Description</th>
                    <th className="pb-3 font-semibold text-center">HSN</th>
                    <th className="pb-3 font-semibold text-center">Qty</th>
                    <th className="pb-3 font-semibold text-right">Price</th>
                    <th className="pb-3 font-semibold text-center">GST</th>
                    <th className="pb-3 font-semibold text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                  {items.map((item) => {
                    const baseTotal = item.qty * item.price;
                    return (
                      <tr key={item.id} style={{ color: 'var(--text-primary)' }}>
                        <td className="py-3 font-medium">{item.description}</td>
                        <td className="py-3 text-center font-mono text-xs">{item.hsn || '—'}</td>
                        <td className="py-3 text-center">{item.qty}</td>
                        <td className="py-3 text-right">{formatCurrency(item.price)}</td>
                        <td className="py-3 text-center">{item.gstRate}%</td>
                        <td className="py-3 text-right font-semibold">{formatCurrency(baseTotal + baseTotal * (item.gstRate / 100))}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Calculations Totals Block */}
            <div className="border-t pt-6 flex flex-col items-end" style={{ borderColor: 'var(--border-default)' }}>
              <div className="w-full sm:w-80 space-y-2.5 text-sm">
                <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
                  <span>Subtotal (Base Value)</span>
                  <span className="font-semibold">{formatCurrency(totals.subtotal)}</span>
                </div>
                {isInterstate ? (
                  <div className="flex justify-between animate-fade-in" style={{ color: 'var(--text-secondary)' }}>
                    <span>Integrated Tax (IGST)</span>
                    <span className="font-semibold">{formatCurrency(totals.igst)}</span>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
                      <span>Central Tax (CGST)</span>
                      <span className="font-semibold">{formatCurrency(totals.cgst)}</span>
                    </div>
                    <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
                      <span>State Tax (SGST)</span>
                      <span className="font-semibold">{formatCurrency(totals.sgst)}</span>
                    </div>
                  </>
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
