import { useState, useMemo, useRef, useEffect } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Button, Input, Select, Dropzone } from '@/components/ui';
import { Plus, Trash2, Printer, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InvoiceItem {
  id: string;
  description: string;
  rate: number;
  qty: number;
  taxPercent: number;
}

interface SignatureCanvasProps {
  value: string;
  onChange: (val: string) => void;
}

function SignatureCanvas({ value, onChange }: SignatureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const isLocalDrawingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const w = rect.width || 400;
    const h = 150;

    canvas.width = w;
    canvas.height = h;

    if (value) {
      if (isLocalDrawingRef.current) {
        isLocalDrawingRef.current = false;
        return;
      }
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      img.src = value;
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [value]);

  const getEventCoords = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in e) {
      if (e.touches && e.touches.length > 0) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      }
      if (e.changedTouches && e.changedTouches.length > 0) {
        return {
          x: e.changedTouches[0].clientX - rect.left,
          y: e.changedTouches[0].clientY - rect.top,
        };
      }
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
    return { x: 0, y: 0 };
  };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const coords = getEventCoords(e, canvas);
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0f172a';
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getEventCoords(e, canvas);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    isLocalDrawingRef.current = true;
    onChange(canvas.toDataURL('image/png'));
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    isLocalDrawingRef.current = false;
    onChange('');
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="w-full h-[150px] bg-slate-50 cursor-crosshair touch-none"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute bottom-2 right-2 px-2 py-1 bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 text-xs rounded border border-slate-200 shadow-sm cursor-pointer transition-colors"
        >
          Clear
        </button>
      )}
    </div>
  );
}

export default function InvoiceGenerator() {
  const [activeTab, setActiveTab] = useState<string>('details');
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const TABS_ORDER = useMemo(() => ['details', 'billing', 'items', 'signature'], []);
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

  // Digital Signature States
  const [enableSignature, setEnableSignature] = useState<boolean>(false);
  const [signatureType, setSignatureType] = useState<'draw' | 'type' | 'upload'>('draw');
  const [signatureText, setSignatureText] = useState<string>('ACME Corp Ltd');
  const [signatureFont, setSignatureFont] = useState<string>('Great Vibes');
  const [signatureImage, setSignatureImage] = useState<string>('');
  const [signatureDrawn, setSignatureDrawn] = useState<string>('');
  const [signatureLabel, setSignatureLabel] = useState<string>('Authorized Signatory');

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

  const currentStepIndex = TABS_ORDER.indexOf(activeTab);

  return (
    <ToolPageWrapper toolId="invoice-generator">
      {/* Styles for print output and Google Fonts */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Great+Vibes&family=Sacramento&display=swap');
        
        @media print {
          /* Hide all elements on the page */
          body * {
            visibility: hidden !important;
          }
          
          /* Show only the printable invoice and its child contents */
          #printable-invoice,
          #printable-invoice * {
            visibility: visible !important;
          }
          
          /* Unset layout constraints on all parent wrappers to prevent clipping and scrolling */
          html, body, #root, [class*="layout"], [class*="wrapper"], [class*="modal"], [class*="Dialog"], [class*="Overlay"], [class*="presence"] {
            height: auto !important;
            min-height: 100% !important;
            overflow: visible !important;
            position: static !important;
            transform: none !important;
            margin: 0 !important;
            padding: 0 !important;
            background: transparent !important;
            box-shadow: none !important;
          }
          
          /* Enforce A4 dimensions, padding, colors, and margins on print layout */
          #printable-invoice {
            visibility: visible !important;
            position: relative !important;
            width: 210mm !important;
            min-height: 297mm !important;
            margin: 0 auto !important;
            padding: 20mm !important;
            box-shadow: none !important;
            background: white !important;
            color: black !important;
            box-sizing: border-box !important;
            display: block !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Configure page settings for borderless A4 layout */
          @page {
            size: A4;
            margin: 0mm;
          }
        }
      `,
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Stepper Progress Bar */}
        <Card className="p-6 md:p-8">
          <div className="flex justify-between items-center relative">
            {/* Background Line */}
            <div 
              className="absolute left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-800" 
              style={{ top: '20px', transform: 'translateY(-50%)', zIndex: 0 }}
            ></div>
            {/* Active Progress Line */}
            <div
              className="absolute left-0 h-0.5 bg-[var(--primary)] transition-all duration-300"
              style={{
                top: '20px',
                transform: 'translateY(-50%)',
                width: `${(currentStepIndex / (TABS_ORDER.length - 1)) * 100}%`,
                zIndex: 0,
              }}
            ></div>

            {TABS_ORDER.map((tabKey, idx) => {
              const isActive = activeTab === tabKey;
              const isCompleted = currentStepIndex > idx;
              const tabNames: Record<string, string> = {
                details: 'Details',
                billing: 'Billing',
                items: 'Items',
                signature: 'Signature',
              };

              return (
                <button
                  key={tabKey}
                  onClick={() => setActiveTab(tabKey)}
                  className="flex flex-col items-center relative z-10 focus:outline-none cursor-pointer"
                  type="button"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all relative z-20 ${
                      isActive
                        ? 'bg-[var(--primary)] text-white ring-4 ring-primary-subtle'
                        : isCompleted
                        ? 'bg-green-600 text-white'
                        : 'bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 text-slate-500'
                    }`}
                  >
                    <span className="leading-none">{isCompleted ? '✓' : idx + 1}</span>
                  </div>
                  <span
                    className={`text-xs font-semibold mt-2 transition-all ${
                      isActive ? 'text-[var(--primary)] font-bold' : 'text-[var(--text-secondary)]'
                    }`}
                  >
                    {tabNames[tabKey]}
                  </span>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Builder Panel */}
        <Card className="p-0 overflow-hidden">
          <div className="p-6 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Invoice Settings
              </h2>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsPreviewOpen(true)}
              >
                Preview Invoice
              </Button>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            {activeTab === 'details' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Billed From */}
                <div className="space-y-5">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div className="space-y-5">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <div className="space-y-6">
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

                <div className="space-y-6">
                  {items.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-6 rounded-xl space-y-5 relative border"
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

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
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

            {activeTab === 'signature' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                      Digital Signature
                    </h3>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                      Add a signature block at the bottom of the invoice preview and printout.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-semibold cursor-pointer select-none" style={{ color: 'var(--text-primary)' }} htmlFor="enable-sig">
                      Enable Signature
                    </label>
                    <input
                      id="enable-sig"
                      type="checkbox"
                      checked={enableSignature}
                      onChange={(e) => setEnableSignature(e.target.checked)}
                      className="w-4 h-4 cursor-pointer accent-primary"
                    />
                  </div>
                </div>

                {enableSignature && (
                  <div className="space-y-6">
                    {/* Signature Type Buttons */}
                    <div className="flex gap-3 p-1 rounded-lg border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-default)' }}>
                      {(['draw', 'type', 'upload'] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSignatureType(type)}
                          className="flex-1 py-2 px-4 rounded-md text-xs font-bold capitalize transition-all cursor-pointer bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                          style={signatureType === type ? { backgroundColor: 'var(--primary)', color: '#ffffff' } : {}}
                        >
                          {type}
                        </button>
                      ))}
                    </div>

                    {/* Content based on Signature Type */}
                    {signatureType === 'draw' && (
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase" style={{ color: 'var(--text-tertiary)' }}>
                          Draw your signature
                        </label>
                        <div className="border rounded-xl overflow-hidden" style={{ borderColor: 'var(--border-default)' }}>
                          <SignatureCanvas
                             value={signatureDrawn}
                             onChange={setSignatureDrawn}
                          />
                        </div>
                      </div>
                    )}

                    {signatureType === 'type' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Input
                          label="Signature Name / Text"
                          value={signatureText}
                          onChange={(e) => setSignatureText(e.target.value)}
                          placeholder="Type your name"
                        />
                        <Select
                          label="Signature Font Style"
                          value={signatureFont}
                          onChange={(e) => setSignatureFont(e.target.value)}
                          options={[
                            { value: 'Great Vibes', label: 'Elegant Cursive' },
                            { value: 'Sacramento', label: 'Fine Handwriting' },
                            { value: 'Alex Brush', label: 'Calligraphy Cursive' },
                          ]}
                        />
                      </div>
                    )}

                    {signatureType === 'upload' && (
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase" style={{ color: 'var(--text-tertiary)' }}>
                          Upload Signature Image
                        </label>
                        {!signatureImage ? (
                          <Dropzone
                            onFileSelect={(file) => {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setSignatureImage(reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }}
                            accept="image/*"
                            title="Click to select or drag & drop signature image"
                            subtitle="Supports PNG, JPG, or SVG"
                          />
                        ) : (
                          <div className="p-4 rounded-xl border flex flex-col items-center gap-3" style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-elevated)' }}>
                            <img
                              src={signatureImage}
                              alt="Signature preview"
                              className="max-h-24 object-contain bg-white p-2 rounded border"
                              style={{ borderColor: 'var(--border-default)' }}
                            />
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => setSignatureImage('')}
                            >
                              Remove Image
                            </Button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Signature Label */}
                    <Input
                      label="Signature Label / Title"
                      value={signatureLabel}
                      onChange={(e) => setSignatureLabel(e.target.value)}
                      placeholder="e.g. Authorized Signatory"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Wizard Navigation Buttons */}
          <div className="p-6 md:p-8 border-t flex justify-between items-center gap-4 bg-[var(--bg-elevated)]" style={{ borderColor: 'var(--border-subtle)' }}>
            <Button
              variant="secondary"
              onClick={() => {
                const idx = TABS_ORDER.indexOf(activeTab);
                if (idx > 0) setActiveTab(TABS_ORDER[idx - 1]);
              }}
              disabled={activeTab === TABS_ORDER[0]}
            >
              Back
            </Button>
            
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => setIsPreviewOpen(true)}
              >
                Preview Invoice
              </Button>
              
              {activeTab !== TABS_ORDER[TABS_ORDER.length - 1] ? (
                <Button
                  variant="primary"
                  onClick={() => {
                    const idx = TABS_ORDER.indexOf(activeTab);
                    if (idx < TABS_ORDER.length - 1) setActiveTab(TABS_ORDER[idx + 1]);
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => setIsPreviewOpen(true)}
                >
                  Generate Invoice
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* A4 Preview Modal Popup */}
      <AnimatePresence>
        {isPreviewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsPreviewOpen(false)}
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative w-full max-w-5xl bg-slate-100 dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-slate-200 dark:border-slate-800"
            >
              {/* Sticky Header */}
              <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shrink-0">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-150">
                  Invoice Preview (A4 Size)
                </h3>
                <div className="flex gap-2">
                  <Button
                    onClick={handlePrint}
                    variant="success"
                    size="sm"
                    leftIcon={<Printer size={16} />}
                  >
                    Print / Save PDF
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsPreviewOpen(false)}
                    leftIcon={<ArrowLeft size={16} />}
                  >
                    Close Preview
                  </Button>
                </div>
              </div>

              {/* Scrollable A4 Document Wrapper */}
              <div className="flex-1 overflow-auto p-4 md:p-8 bg-slate-200 dark:bg-slate-950">
                {/* simulated A4 page */}
                <div
                  id="printable-invoice"
                  className="w-full max-w-3xl bg-white shadow-xl text-left text-slate-800 border border-slate-200/80 box-border p-8 md:p-12 mx-auto rounded-xl flex flex-col min-h-[1000px]"
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

                    {/* Signature Block */}
                    {enableSignature && (
                      <div className="flex justify-end mt-8 pt-6">
                        <div className="text-center w-64 flex flex-col items-center">
                          <div className="h-16 flex items-center justify-center mb-1 overflow-hidden w-full">
                            {signatureType === 'draw' && signatureDrawn && (
                              <img
                                src={signatureDrawn}
                                alt="Signature"
                                className="max-h-full max-w-full object-contain"
                              />
                            )}
                            {signatureType === 'type' && signatureText && (
                              <span
                                className="text-2xl select-none"
                                style={{ fontFamily: `'${signatureFont}', cursive`, color: '#0f172a' }}
                              >
                                {signatureText}
                              </span>
                            )}
                            {signatureType === 'upload' && signatureImage && (
                              <img
                                src={signatureImage}
                                alt="Signature"
                                className="max-h-full max-w-full object-contain"
                              />
                            )}
                            {((signatureType === 'draw' && !signatureDrawn) ||
                              (signatureType === 'type' && !signatureText) ||
                              (signatureType === 'upload' && !signatureImage)) && (
                              <span className="text-xs text-slate-300 italic">Signature space</span>
                            )}
                          </div>
                          <div className="w-full border-t border-slate-300 my-1"></div>
                          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            {signatureLabel}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ToolPageWrapper>
  );
}
