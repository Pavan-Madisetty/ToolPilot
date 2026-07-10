import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Input, Select } from '@/components/ui';

// Hardcoded exchange rates relative to USD (1 USD = X Currency)
const EXCHANGE_RATES: Record<string, number> = {
  USD: 1.0,
  INR: 83.5,
  EUR: 0.92,
  GBP: 0.78,
  JPY: 161.2,
  AUD: 1.49,
  CAD: 1.36,
  SGD: 1.35,
};

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  INR: '₹',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  AUD: 'A$',
  CAD: 'C$',
  SGD: 'S$',
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>('100');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('INR');

  const currencyOptions = [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'INR', label: 'INR - Indian Rupee' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'JPY', label: 'JPY - Japanese Yen' },
    { value: 'AUD', label: 'AUD - Australian Dollar' },
    { value: 'CAD', label: 'CAD - Canadian Dollar' },
    { value: 'SGD', label: 'SGD - Singapore Dollar' },
  ];

  const conversion = useMemo(() => {
    const numAmount = parseFloat(amount) || 0;
    const fromRate = EXCHANGE_RATES[fromCurrency] ?? 1;
    const toRate = EXCHANGE_RATES[toCurrency] ?? 1;

    // Convert fromSource to USD, then USD to target
    const amountInUSD = numAmount / fromRate;
    const convertedAmount = amountInUSD * toRate;
    const singleRate = (1 / fromRate) * toRate;

    return {
      convertedAmount,
      singleRate,
      symbol: CURRENCY_SYMBOLS[toCurrency] ?? '',
    };
  }, [amount, fromCurrency, toCurrency]);

  const popularConversions = useMemo(() => {
    const numAmount = parseFloat(amount) || 0;
    const fromRate = EXCHANGE_RATES[fromCurrency] ?? 1;
    const amountInUSD = numAmount / fromRate;

    return Object.keys(EXCHANGE_RATES)
      .filter((cur) => cur !== fromCurrency)
      .map((cur) => {
        const toRate = EXCHANGE_RATES[cur] ?? 1;
        const val = amountInUSD * toRate;
        return {
          code: cur,
          symbol: CURRENCY_SYMBOLS[cur] ?? '',
          value: val.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
        };
      });
  }, [amount, fromCurrency]);

  return (
    <ToolPageWrapper toolId="currency-converter">
      <div className="tool-layout">
        {/* Inputs Sidebar */}
        <div className="space-y-6 p-6 card">
          <Input
            label="Amount to Convert"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 100"
            min="0"
          />
          <Select
            label="From Currency"
            options={currencyOptions}
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          />
          <Select
            label="To Currency"
            options={currencyOptions}
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          />
        </div>

        {/* Results layout */}
        <div className="flex flex-col gap-6">
          <div
            className="p-8 border rounded-2xl bg-white dark:bg-slate-900/40 shadow-sm flex flex-col justify-center gap-2"
            style={{ borderColor: 'var(--border-default)' }}
          >
            <span className="text-sm font-semibold tracking-wide text-slate-400 dark:text-slate-500 uppercase">
              Converted Amount
            </span>
            <div className="text-4xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
              {CURRENCY_SYMBOLS[fromCurrency] ?? ''}
              {parseFloat(amount || '0').toLocaleString()} = {conversion.symbol}
              {conversion.convertedAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-2">
              Exchange Rate: 1 {fromCurrency} = {conversion.singleRate.toFixed(4)} {toCurrency}
            </div>
          </div>

          {/* Popular conversions list */}
          <div className="p-6 card">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
              Alternative Currency Rates
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {popularConversions.map((conv) => (
                <div
                  key={conv.code}
                  className="flex items-center justify-between p-3 rounded-lg border bg-slate-50 dark:bg-slate-800/40"
                  style={{ borderColor: 'var(--border-default)' }}
                >
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                    {conv.code}
                  </span>
                  <span className="text-sm font-extrabold" style={{ color: 'var(--text-primary)' }}>
                    {conv.symbol} {conv.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
