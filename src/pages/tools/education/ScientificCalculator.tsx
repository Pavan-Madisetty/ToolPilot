import { useState, useEffect } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Button } from '@/components/ui';
import { RefreshCw, Delete, Copy, Check } from 'lucide-react';
import { clsx } from 'clsx';

interface HistoryItem {
  expression: string;
  result: string;
  isDegree: boolean;
  timestamp: string;
}

export default function ScientificCalculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [isDegree, setIsDegree] = useState(true);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [copied, setCopied] = useState(false);

  // Load history from local storage
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('scientific_calc_history');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.error('Failed to load calculator history', e);
    }
  }, []);

  const saveHistory = (newHistory: HistoryItem[]) => {
    setHistory(newHistory);
    localStorage.setItem('scientific_calc_history', JSON.stringify(newHistory));
  };

  const evaluateExpression = (expr: string, degMode: boolean): string => {
    if (!expr.trim()) return '';

    // Replace visual representations with javascript-executable representations
    let parsed = expr
      .replace(/sin/g, degMode ? 'degSin' : 'Math.sin')
      .replace(/cos/g, degMode ? 'degCos' : 'Math.cos')
      .replace(/tan/g, degMode ? 'degTan' : 'Math.tan')
      .replace(/log/g, 'Math.log10')
      .replace(/ln/g, 'Math.log')
      .replace(/sqrt/g, 'Math.sqrt')
      .replace(/π/g, 'Math.PI')
      .replace(/e/g, 'Math.E')
      .replace(/\^/g, '**')
      .replace(/fact/g, 'factorial')
      .replace(/×/g, '*')
      .replace(/÷/g, '/');

    // Balance parentheses
    let openBrackets = (parsed.match(/\(/g) || []).length;
    let closeBrackets = (parsed.match(/\)/g) || []).length;
    while (openBrackets > closeBrackets) {
      parsed += ')';
      closeBrackets++;
    }

    try {
      // Validate safe characters only to prevent security issues
      // Allowed: numbers, operators, Math.xxx, degSin, degCos, degTan, factorial
      const safeCheck = parsed
        .replace(/Math\.(sin|cos|tan|log10|log|sqrt|PI|E)/g, '')
        .replace(/degSin|degCos|degTan|factorial/g, '')
        .replace(/[0-9+\-*/().\s]/g, '')
        .replace(/\*\*/g, '');

      if (safeCheck.length > 0) {
        return 'Error';
      }

      const degSin = (x: number) => {
        // Handle values like sin(180) which should be exactly 0, sin(90) = 1
        const rad = (x * Math.PI) / 180;
        const val = Math.sin(rad);
        return Math.abs(val) < 1e-15 ? 0 : val;
      };
      const degCos = (x: number) => {
        const rad = (x * Math.PI) / 180;
        const val = Math.cos(rad);
        return Math.abs(val) < 1e-15 ? 0 : val;
      };
      const degTan = (x: number) => {
        const rad = (x * Math.PI) / 180;
        // Tan 90 is undefined/infinity
        if (Math.abs((x % 180) - 90) < 1e-9) return NaN;
        const val = Math.tan(rad);
        return Math.abs(val) < 1e-15 ? 0 : val;
      };
      const factorial = (n: number): number => {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        if (!Number.isInteger(n)) return NaN;
        if (n > 170) return Infinity; // JS Max Float limit
        let res = 1;
        for (let i = 2; i <= n; i++) res *= i;
        return res;
      };

      const fn = new Function(
        'degSin', 'degCos', 'degTan', 'factorial',
        `return (${parsed});`
      );
      const val = fn(degSin, degCos, degTan, factorial);

      if (typeof val !== 'number' || Number.isNaN(val)) {
        return 'Error';
      }
      
      // Limit decimals for clean output
      if (!Number.isInteger(val)) {
        return Number(val.toFixed(10)).toString();
      }
      return val.toString();
    } catch (e) {
      return '';
    }
  };

  // Real-time calculation helper
  useEffect(() => {
    const activeEval = evaluateExpression(expression, isDegree);
    if (activeEval && activeEval !== 'Error') {
      setResult(activeEval);
    } else {
      setResult('');
    }
  }, [expression, isDegree]);

  const handleKeyPress = (value: string) => {
    setExpression((prev) => {
      // Logic for different keys
      if (['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'fact'].includes(value)) {
        return prev + value + '(';
      }
      if (value === 'π') return prev + 'π';
      if (value === 'e') return prev + 'e';
      if (value === 'x^y') return prev + '^';
      return prev + value;
    });
  };

  const handleClear = () => {
    setExpression('');
    setResult('');
  };

  const handleBackspace = () => {
    setExpression((prev) => {
      if (prev.length === 0) return prev;

      // UX Polish: if backspacing a scientific function, remove the whole name
      const functionPatterns = ['sin(', 'cos(', 'tan(', 'log(', 'ln(', 'sqrt(', 'fact('];
      for (const pattern of functionPatterns) {
        if (prev.endsWith(pattern)) {
          return prev.slice(0, -pattern.length);
        }
      }

      return prev.slice(0, -1);
    });
  };

  const handleCalculate = () => {
    const finalVal = evaluateExpression(expression, isDegree);
    if (finalVal && finalVal !== 'Error') {
      setResult(finalVal);
      
      // Save to history
      const newItem: HistoryItem = {
        expression,
        result: finalVal,
        isDegree,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      saveHistory([newItem, ...history.slice(0, 19)]); // limit to last 20
    } else {
      setResult('Error');
    }
  };

  const copyToClipboard = () => {
    const valToCopy = result || expression;
    if (!valToCopy) return;
    navigator.clipboard.writeText(valToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearHistory = () => {
    saveHistory([]);
  };

  // Keyboard support listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      // Do not trigger if typing in form inputs (if any)
      if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
        return;
      }

      const key = e.key;
      if (/[0-9]/.test(key)) {
        handleKeyPress(key);
      } else if (['+', '-', '*', '/', '(', ')', '.'].includes(key)) {
        const displayChar = key === '*' ? '×' : key === '/' ? '÷' : key;
        handleKeyPress(displayChar);
      } else if (key === '^') {
        handleKeyPress('x^y');
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        handleCalculate();
      } else if (key === 'Backspace') {
        handleBackspace();
      } else if (key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expression, isDegree, history]);

  // Keys list grouped for the grid layout
  const scientificKeys = [
    { label: 'sin', value: 'sin' },
    { label: 'cos', value: 'cos' },
    { label: 'tan', value: 'tan' },
    { label: 'log', value: 'log' },
    { label: 'ln', value: 'ln' },
    { label: '√', value: 'sqrt' },
    { label: 'xʸ', value: 'x^y' },
    { label: 'x!', value: 'fact' },
    { label: 'π', value: 'π' },
    { label: 'e', value: 'e' },
  ];

  const basicKeys = [
    { label: '(', value: '(' },
    { label: ')', value: ')' },
    { label: 'C', value: 'clear', variant: 'danger' },
    { label: '⌫', value: 'backspace', variant: 'secondary' },

    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '÷', value: '÷', variant: 'primary' },

    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '×', value: '×', variant: 'primary' },

    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '-', value: '-', variant: 'primary' },

    { label: '0', value: '0' },
    { label: '.', value: '.' },
    { label: '=', value: 'equals', variant: 'success' },
    { label: '+', value: '+', variant: 'primary' },
  ];

  return (
    <ToolPageWrapper toolId="scientific-calculator">
      <div className="tool-layout lg:grid-cols-12 gap-6">
        
        {/* Calculator Body - 7 Columns */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="p-4 md:p-6 space-y-4">
            
            {/* Display screen */}
            <div className="rounded-xl p-4 flex flex-col justify-between items-end min-h-[100px] border shadow-inner relative"
                 style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-default)' }}>
              
              {/* Copy button */}
              <button
                onClick={copyToClipboard}
                className="absolute top-2 left-2 p-1.5 rounded-lg border transition-colors bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                style={{ borderColor: 'var(--border-default)' }}
                title="Copy result"
              >
                {copied ? <Check size={14} className="text-[var(--success)]" /> : <Copy size={14} />}
              </button>

              {/* Mode indicator */}
              <div className="absolute top-2 right-2 text-[10px] font-bold tracking-wider px-2 py-0.5 rounded bg-[var(--border-subtle)] text-[var(--text-tertiary)] uppercase">
                {isDegree ? 'DEG' : 'RAD'}
              </div>

              {/* Expression line */}
              <div className="w-full text-right text-base md:text-lg font-medium tracking-wide break-all mt-4" 
                   style={{ color: 'var(--text-secondary)' }}>
                {expression || '0'}
              </div>

              {/* Result line */}
              <div className="w-full text-right text-2xl md:text-3xl font-extrabold tracking-normal break-all pt-2 select-all"
                   style={{ color: result === 'Error' ? 'var(--danger)' : 'var(--text-primary)' }}>
                {result || (expression ? '' : '0')}
              </div>
            </div>

            {/* Deg/Rad Toggle and Quick Actions */}
            <div className="flex justify-between items-center gap-2">
              <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: 'var(--border-strong)' }}>
                <button
                  onClick={() => setIsDegree(true)}
                  className={clsx(
                    'px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer',
                    isDegree ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  )}
                >
                  DEG
                </button>
                <button
                  onClick={() => setIsDegree(false)}
                  className={clsx(
                    'px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer',
                    !isDegree ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  )}
                >
                  RAD
                </button>
              </div>

              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleClear} className="text-xs">
                  Clear
                </Button>
                <Button variant="ghost" size="sm" onClick={handleBackspace} className="text-xs flex items-center gap-1">
                  <Delete size={14} />
                  <span>Backspace</span>
                </Button>
              </div>
            </div>

            {/* Keys Pad */}
            <div className="space-y-3">
              {/* Scientific row keys */}
              <div className="grid grid-cols-5 gap-2">
                {scientificKeys.map((key) => (
                  <button
                    key={key.value}
                    onClick={() => handleKeyPress(key.value)}
                    className="py-2.5 px-1 rounded-lg border text-xs font-semibold hover:bg-[var(--border-subtle)] transition-all cursor-pointer"
                    style={{
                      backgroundColor: 'var(--bg-elevated)',
                      borderColor: 'var(--border-default)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {key.label}
                  </button>
                ))}
              </div>

              {/* Basic keys keypad */}
              <div className="grid grid-cols-4 gap-2">
                {basicKeys.map((key) => {
                  const isNum = !isNaN(Number(key.label)) || key.label === '.';
                  
                  return (
                    <button
                      key={key.value}
                      onClick={() => {
                        if (key.value === 'clear') handleClear();
                        else if (key.value === 'backspace') handleBackspace();
                        else if (key.value === 'equals') handleCalculate();
                        else handleKeyPress(key.value);
                      }}
                      className={clsx(
                        'py-3.5 px-2 rounded-xl border text-sm font-bold shadow-sm transition-all active:scale-95 cursor-pointer',
                        key.variant === 'primary' && 'bg-[var(--primary)] text-white border-transparent hover:brightness-110',
                        key.variant === 'danger' && 'bg-[var(--danger)] text-white border-transparent hover:brightness-110',
                        key.variant === 'success' && 'bg-[var(--success)] text-white border-transparent hover:brightness-110',
                        key.variant === 'secondary' && 'bg-[var(--border-strong)] text-[var(--text-primary)] border-transparent hover:brightness-95',
                        !key.variant && isNum && 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-default)] hover:bg-[var(--border-subtle)]',
                        !key.variant && !isNum && 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-default)] hover:bg-[var(--border-subtle)]'
                      )}
                    >
                      {key.label}
                    </button>
                  );
                })}
              </div>
            </div>

          </Card>
        </div>

        {/* History & Help Sidebar - 5 Columns */}
        <div className="lg:col-span-5 space-y-6">
          {/* History list */}
          <Card className="space-y-4">
            <div className="flex justify-between items-center border-b pb-3" style={{ borderColor: 'var(--border-subtle)' }}>
              <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                Calculation History
              </h2>
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="text-xs hover:underline flex items-center gap-1 cursor-pointer"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  <RefreshCw size={12} />
                  <span>Clear</span>
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="text-center py-12 text-[var(--text-tertiary)] text-sm">
                No calculation history yet.
              </div>
            ) : (
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {history.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setExpression(item.expression);
                      setIsDegree(item.isDegree);
                    }}
                    className="p-2.5 rounded-lg border text-right cursor-pointer hover:bg-[var(--border-subtle)] transition-colors space-y-1"
                    style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-default)' }}
                    title="Click to load into calculator"
                  >
                    <div className="flex justify-between items-center text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                      <span>{item.timestamp} ({item.isDegree ? 'DEG' : 'RAD'})</span>
                      <span className="font-semibold">{item.expression}</span>
                    </div>
                    <div className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                      = {item.result}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Guide Card */}
          <Card className="space-y-3">
            <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
              Mathematical Functions Guide
            </h3>
            <ul className="text-xs space-y-2" style={{ color: 'var(--text-secondary)' }}>
              <li>
                <span className="font-bold text-[var(--primary)]">Trigonometry:</span> Use <code className="bg-[var(--bg-elevated)] px-1 py-0.5 rounded">sin(x)</code>, <code className="bg-[var(--bg-elevated)] px-1 py-0.5 rounded">cos(x)</code>, <code className="bg-[var(--bg-elevated)] px-1 py-0.5 rounded">tan(x)</code>. Output respects active DEG/RAD mode.
              </li>
              <li>
                <span className="font-bold text-[var(--primary)]">Logarithms:</span> <code className="bg-[var(--bg-elevated)] px-1 py-0.5 rounded">log(x)</code> evaluates log base 10, while <code className="bg-[var(--bg-elevated)] px-1 py-0.5 rounded">ln(x)</code> evaluates log base e (natural log).
              </li>
              <li>
                <span className="font-bold text-[var(--primary)]">Factorial:</span> Use <code className="bg-[var(--bg-elevated)] px-1 py-0.5 rounded">fact(x)</code> or press <code className="bg-[var(--bg-elevated)] px-1 py-0.5 rounded">x!</code> for integer factorials.
              </li>
              <li>
                <span className="font-bold text-[var(--primary)]">Exponentiation:</span> Enter <code className="bg-[var(--bg-elevated)] px-1 py-0.5 rounded">^</code> or press <code className="bg-[var(--bg-elevated)] px-1 py-0.5 rounded">xʸ</code> to raise base to a power.
              </li>
              <li>
                <span className="font-bold text-[var(--primary)]">Keyboard Support:</span> Use numeric keys, standard operators, backspace, and Enter/Esc to operate calculator quickly.
              </li>
            </ul>
          </Card>
        </div>

      </div>
    </ToolPageWrapper>
  );
}
