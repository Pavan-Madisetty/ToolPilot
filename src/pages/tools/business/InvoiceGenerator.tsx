import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Button, Input, Select, Tabs } from '@/components/ui';
import { Plus, Trash2, Printer } from 'lucide-react';

interface InvoiceItem {
  id: string;
  description: string;
  rate: number;
  qty: number;
  taxPercent: number;
}

export default function InvoiceGenerator() {
  const [activeTab, setActiveTab] = useState<string>('details');
  const [logoText, setLogoText] = useState<string>('ACME CORPORATION');
  const [invoiceNo, setInvoiceNo] = useState<string>('INV-2026-001');
  const [invoiceDate, setInvoiceDate] = useState<string>(
    () => new Date().toISOString().split('T')[0]
  );
  const [dueDate, setDueDate] = useState<string>(
    () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [currency, setCurrency] = useState<string>('INR');

  // Billed From
  const [fromName, setFromName] = useState<string>('ACME Corp Ltd');
  const [fromAddress, setFromAddress] = useState<string>(
    '123 Business Park, Sector 62, Noida, UP, India'
  );
  const [fromEmail, setFromEmail] = useState<string>('billing@acme.com');
  const [fromPhone, setFromPhone] = useState<string>('+91 120 456789');
  const [fromGstin, setFromGstin] = useState<string>('09AAACA1234A1Z1');

  // Billed To
  const [toName, setToName] = useState<string>('Client Business Pvt Ltd');
  const [toAddress, setToAddress] = useState<string>(
    '456 Tech Towers, Hitec City, Hyderabad, Telangana, India'
  );
  const [toEmail, setToEmail] = useState<string>('accounts@client.com');
  const [toPhone, setToPhone] = useState<string>('+91 40 987654');
  const [toGstin, setToGstin] = useState<string>('36BBBCB5678B2Z2');

  const [notes, setNotes] = useState<string>(
    'Thank you for your business. Please pay within 30 days.'
  );

  // Line items
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: '1',
      description: 'Web Development Services',
      rate: 75000,
      qty: 1,
      taxPercent: 18,
    },
    {
      id: '2',
      description: 'Cloud Hosting Setup',
      rate: 15000,
      qty: 1,
      taxPercent: 18,
    },
  ]);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: Math.random().toString(),
        description: '',
        rate: 0,
        qty: 1,
        taxPercent: 0,
      },
    ]);
  };

  const handleUpdateItem = (id: string, field: keyof InvoiceItem, val: string | number) => {
    setItems(
      items.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          [field]: val,
        };
      })
    );
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const totals = useMemo(() => {
    let subtotal = 0;
    let totalTax = 0;

    items.forEach((item) => {
      const itemSubtotal = item.rate * item.qty;
      const itemTax = (itemSubtotal * item.taxPercent) / 100;
      subtotal += itemSubtotal;
      totalTax += itemTax;
    });

    return {
      subtotal,
      totalTax,
      grandTotal: subtotal + totalTax,
    };
  }, [items]);

  const formatCurrency = (val: number) => {
    const locale = currency === 'INR' ? 'en-IN' : 'en-US';
    return val.toLocaleString(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <ToolPageWrapper toolId="invoice-generator">
      {/* Styles for print output */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
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
            margin: 0;
            padding: 20px;
            box-shadow: none !important;
            background: white !important;
            color: black !important;
          }
          /* Hide print page header and footer */
          @page {
            size: auto;
            margin: 0mm;
          }
        }
      `,
        }}
      />

      <div className="tool-layout lg:grid-cols-2 gap-6">
        {/* Left Column - Controls */}
        <div className="space-y-6">
          <Card className="p-0 overflow-hidden">
            <div className="p-6 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Invoice Settings
              </h2>
            </div>

            <Tabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              tabs={[
                { key: 'details', name: 'General Details' },
                { key: 'billing', name: 'Billing Info' },
                { key: 'items', name: 'Line Items' },
              ]}
              className="px-6 pt-4"
            />

            <div className="p-6 space-y-6">
              {activeTab === 'details' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Logo Text / Business Name"
                      value={logoText}
                      onChange={(e) => setLogoText(e.target.value)}
                    />
                    <Select
                      label="Currency"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      options={[
                        { value: 'INR', label: 'INR (₹) Indian Rupee' },
                        { value: 'USD', label: 'USD ($) US Dollar' },
                        { value: 'EUR', label: 'EUR (€) Euro' },
                        { value: 'GBP', label: 'GBP (£) British Pound' },
                      ]}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input
                      label="Invoice No"
                      value={invoiceNo}
                      onChange={(e) => setInvoiceNo(e.target.value)}
                    />
                    <Input
                      label="Invoice Date"
                      type="date"
                      value={invoiceDate}
                      onChange={(e) => setInvoiceDate(e.target.value)}
                    />
                    <Input
                      label="Due Date"
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </div>

                  <Input
                    label="Notes / Terms"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              )}

              {activeTab === 'billing' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Billed From */}
                  <div className="space-y-4">
                    <h3
                      className="text-sm font-bold uppercase tracking-wider"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      Billed From (Seller)
                    </h3>
                    <Input
                      label="Business Name"
                      value={fromName}
                      onChange={(e) => setFromName(e.target.value)}
                    />
                    <Input
                      label="Address"
                      value={fromAddress}
                      onChange={(e) => setFromAddress(e.target.value)}
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={fromEmail}
                      onChange={(e) => setFromEmail(e.target.value)}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <Input
                        label="Phone"
                        value={fromPhone}
                        onChange={(e) => setFromPhone(e.target.value)}
                      />
                      <Input
                        label="GSTIN / VAT ID"
                        value={fromGstin}
                        onChange={(e) => setFromGstin(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Billed To */}
                  <div className="space-y-4">
                    <h3
                      className="text-sm font-bold uppercase tracking-wider"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      Billed To (Buyer)
                    </h3>
                    <Input
                      label="Client Name"
                      value={toName}
                      onChange={(e) => setToName(e.target.value)}
                    />
                    <Input
                      label="Address"
                      value={toAddress}
                      onChange={(e) => setToAddress(e.target.value)}
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={toEmail}
                      onChange={(e) => setToEmail(e.target.value)}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <Input
                        label="Phone"
                        value={toPhone}
                        onChange={(e) => setToPhone(e.target.value)}
                      />
                      <Input
                        label="GSTIN / VAT ID"
                        value={toGstin}
                        onChange={(e) => setToGstin(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'items' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3
                      className="text-sm font-bold uppercase tracking-wider"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      Invoice Items
                    </h3>
                    <Button
                      onClick={handleAddItem}
                      variant="primary"
                      size="sm"
                      leftIcon={<Plus size={16} />}
                    >
                      Add Item
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {items.map((item, idx) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl space-y-3 relative border"
                        style={{
                          backgroundColor: 'var(--bg-elevated)',
                          borderColor: 'var(--border-default)',
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-semibold text-[var(--text-tertiary)]">
                            Item #{idx + 1}
                          </span>
                          {items.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-500 hover:text-red-700 cursor-pointer"
                              aria-label="Remove item"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                          <div className="sm:col-span-6">
                            <Input
                              label="Description"
                              value={item.description}
                              onChange={(e) =>
                                handleUpdateItem(item.id, 'description', e.target.value)
                              }
                              placeholder="e.g. Product or service name"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <Input
                              label="Rate"
                              type="number"
                              value={item.rate}
                              onChange={(e) =>
                                handleUpdateItem(item.id, 'rate', Number(e.target.value))
                              }
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <Input
                              label="Qty"
                              type="number"
                              value={item.qty}
                              onChange={(e) =>
                                handleUpdateItem(item.id, 'qty', Number(e.target.value))
                              }
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <Input
                              label="Tax %"
                              type="number"
                              value={item.taxPercent}
                              onChange={(e) =>
                                handleUpdateItem(item.id, 'taxPercent', Number(e.target.value))
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column - Live Preview */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Invoice Preview
            </h2>
            <Button onClick={handlePrint} variant="success" leftIcon={<Printer size={16} />}>
              Print / Save PDF
            </Button>
          </div>

          <div
            id="printable-invoice"
            className="p-8 rounded-xl shadow-lg border text-left bg-white text-slate-800"
            style={{
              borderColor: 'var(--border-default)',
            }}
          >
            {/* Invoice Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-slate-200">
              <div>
                <div className="text-2xl font-black text-slate-900 tracking-tight">
                  {logoText || 'MY BUSINESS'}
                </div>
                <div className="text-xs text-slate-500 mt-2 font-mono">
                  {fromGstin && <div>GSTIN: {fromGstin}</div>}
                  <div>{fromEmail}</div>
                  <div>{fromPhone}</div>
                </div>
              </div>

              <div className="text-right sm:text-right">
                <h1 className="text-3xl font-extrabold text-slate-900 leading-none">INVOICE</h1>
                <div className="mt-2 text-sm text-slate-600">
                  <div className="font-mono font-semibold">No: {invoiceNo}</div>
                  <div>Date: {invoiceDate}</div>
                  <div>Due Date: {dueDate}</div>
                </div>
              </div>
            </div>

            {/* Address Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-6 text-sm">
              <div>
                <div className="font-bold text-slate-500 uppercase text-[10px] tracking-wider mb-1">
                  From:
                </div>
                <div className="font-bold text-slate-900 text-base">{fromName}</div>
                <div className="text-slate-600 mt-1 whitespace-pre-line leading-relaxed">
                  {fromAddress}
                </div>
              </div>

              <div>
                <div className="font-bold text-slate-500 uppercase text-[10px] tracking-wider mb-1">
                  Billed To:
                </div>
                <div className="font-bold text-slate-900 text-base">{toName}</div>
                <div className="text-slate-600 mt-1 whitespace-pre-line leading-relaxed">
                  {toAddress}
                </div>
                {toGstin && (
                  <div className="text-xs text-slate-500 mt-1 font-mono">GSTIN: {toGstin}</div>
                )}
                {toPhone && (
                  <div className="text-xs text-slate-500 font-mono">Phone: {toPhone}</div>
                )}
                {toEmail && (
                  <div className="text-xs text-slate-500 font-mono">Email: {toEmail}</div>
                )}
              </div>
            </div>

            {/* Items Table */}
            <div className="py-4 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-300 text-xs uppercase tracking-wider font-bold text-slate-500">
                    <th className="py-2.5">Item Description</th>
                    <th className="py-2.5 text-right">Rate</th>
                    <th className="py-2.5 text-right">Qty</th>
                    <th className="py-2.5 text-right">Tax</th>
                    <th className="py-2.5 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {items.map((item) => {
                    const amt = item.rate * item.qty;
                    return (
                      <tr key={item.id} className="text-slate-700">
                        <td className="py-3.5 font-medium text-slate-900 max-w-[200px] break-words">
                          {item.description || 'Untitled Item'}
                        </td>
                        <td className="py-3.5 text-right font-mono">{formatCurrency(item.rate)}</td>
                        <td className="py-3.5 text-right font-mono">{item.qty}</td>
                        <td className="py-3.5 text-right font-mono">{item.taxPercent}%</td>
                        <td className="py-3.5 text-right font-mono font-semibold text-slate-900">
                          {formatCurrency(amt)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-6 border-t border-slate-200">
              <div className="max-w-xs text-xs text-slate-500 italic">
                {notes && (
                  <>
                    <div className="font-bold text-slate-600 not-italic uppercase tracking-wider text-[10px] mb-1">
                      Notes & Terms:
                    </div>
                    <div>{notes}</div>
                  </>
                )}
              </div>

              <div className="w-full sm:w-64 text-sm space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-mono">{formatCurrency(totals.subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax Amount</span>
                  <span className="font-mono">{formatCurrency(totals.totalTax)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Grand Total</span>
                  <span className="font-mono text-lg text-slate-950">
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
