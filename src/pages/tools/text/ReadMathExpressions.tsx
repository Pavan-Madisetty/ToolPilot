import { useState, useEffect } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, CopyButton } from '@/components/ui';
import { Volume2 } from 'lucide-react';

const EN_ONCE = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const EN_TEENS = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const EN_TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const EN_SCALES = ['', 'thousand', 'million', 'billion'];

const convertEnglishInt = (num: number): string => {
  if (num === 0) return '';
  let parts: string[] = [];
  let scaleIdx = 0;
  let val = num;

  while (val > 0) {
    const chunk = val % 1000;
    if (chunk > 0) {
      const chunkStr = convertEnglishHundreds(chunk);
      const scaleLabel = EN_SCALES[scaleIdx];
      parts.unshift(chunkStr + (scaleLabel ? ' ' + scaleLabel : ''));
    }
    val = Math.floor(val / 1000);
    scaleIdx++;
  }
  return parts.join(' ');
};

const convertEnglishHundreds = (num: number): string => {
  let str = '';
  const hundreds = Math.floor(num / 100);
  const remainder = num % 100;

  if (hundreds > 0) {
    str += EN_ONCE[hundreds] + ' hundred';
    if (remainder > 0) str += ' ';
  }

  if (remainder > 0) {
    if (remainder < 10) {
      str += EN_ONCE[remainder];
    } else if (remainder < 20) {
      str += EN_TEENS[remainder - 10];
    } else {
      const tens = Math.floor(remainder / 10);
      const units = remainder % 10;
      str += EN_TENS[tens] + (units > 0 ? '-' + EN_ONCE[units] : '');
    }
  }
  return str;
};

const convertNumber = (numStr: string): string => {
  const num = parseFloat(numStr);
  if (isNaN(num)) return numStr;
  if (num === 0) return 'zero';

  let result = num < 0 ? 'minus ' : '';
  const absStr = Math.abs(num).toString();
  const [integerPart, decimalPart] = absStr.split('.');

  const intVal = parseInt(integerPart, 10);
  if (intVal === 0) {
    result += 'zero';
  } else {
    result += convertEnglishInt(intVal);
  }

  if (decimalPart) {
    result += ' point';
    for (const digit of decimalPart) {
      const d = parseInt(digit, 10);
      result += ' ' + (d === 0 ? 'zero' : EN_ONCE[d]);
    }
  }
  return result.trim();
};

const MATH_OPERATORS: Record<string, string> = {
  '+': 'plus',
  '-': 'minus',
  '*': 'multiplied by',
  'x': 'multiplied by',
  '/': 'divided by',
  '=': 'equals',
  '^': 'to the power of',
  '(': 'open parenthesis',
  ')': 'close parenthesis',
};

const parseExpression = (expr: string): string => {
  // Matches floats, single operators, letters/symbols
  const tokens = expr.match(/\d+(\.\d+)?|[\+\-\*\/\=\(\)\^x]|[A-Za-z]+/g);
  if (!tokens) return '';

  const parsedTokens = tokens.map((token) => {
    // If operator
    if (MATH_OPERATORS[token.toLowerCase()]) {
      return MATH_OPERATORS[token.toLowerCase()];
    }
    // If number
    if (/^\d+(\.\d+)?$/.test(token)) {
      return convertNumber(token);
    }
    // Else return clean text word
    return token;
  });

  return parsedTokens.join(' ').replace(/\s+/g, ' ').trim();
};

export default function ReadMathExpressions() {
  const [expression, setExpression] = useState('');
  const [spokenText, setSpokenText] = useState('');

  useEffect(() => {
    if (!expression.trim()) {
      setSpokenText('');
      return;
    }
    setSpokenText(parseExpression(expression));
  }, [expression]);

  const handleSpeak = () => {
    if (!spokenText) return;
    const utterance = new SpeechSynthesisUtterance(spokenText);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <ToolPageWrapper toolId="read-math-expressions">
      <div className="space-y-6">
        {/* Input box */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[var(--text-secondary)]">Enter Math Expression</label>
          <input
            type="text"
            placeholder="Type e.g., 25 * (3 + 7) = 250"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className="w-full px-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--primary)]/10 focus:border-[var(--primary)] font-medium h-12 text-sm"
          />
        </div>

        {/* Output Area */}
        {spokenText && (
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[var(--text-secondary)]">English Pronunciation Spelling</span>
            <div className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] min-h-[120px] flex flex-col justify-between">
              <p className="text-lg font-medium text-[var(--text-primary)] select-all break-words leading-relaxed">
                {spokenText}
              </p>
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-[var(--border-subtle)]">
                <Button onClick={handleSpeak} size="sm" variant="secondary" className="flex items-center gap-2">
                  <Volume2 size={16} /> Listen Pronunciation
                </Button>
                <CopyButton text={spokenText} />
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolPageWrapper>
  );
}
