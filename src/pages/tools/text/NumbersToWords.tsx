import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, CopyButton } from '@/components/ui';

// English Conversion Mappings
const EN_ONCE = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const EN_TEENS = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const EN_TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const EN_SCALES = ['', 'thousand', 'million', 'billion', 'trillion'];

// Chinese Conversion Mappings
const ZH_CHARS = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const ZH_PINYIN = ['líng', 'yī', 'èr', 'sān', 'sì', 'wǔ', 'liù', 'qī', 'bā', 'jiǔ'];

const convertEnglish = (numStr: string): string => {
  const num = parseFloat(numStr);
  if (isNaN(num)) return '';
  if (num === 0) return 'zero';

  let result = num < 0 ? 'minus ' : '';
  const absStr = Math.abs(num).toString();
  const [integerPart, decimalPart] = absStr.split('.');

  // Integer Conversion
  const intVal = parseInt(integerPart, 10);
  if (intVal === 0) {
    result += 'zero';
  } else {
    result += convertEnglishInt(intVal);
  }

  // Decimal Conversion
  if (decimalPart) {
    result += ' point';
    for (const digit of decimalPart) {
      const d = parseInt(digit, 10);
      result += ' ' + (d === 0 ? 'zero' : EN_ONCE[d]);
    }
  }

  return result.trim().replace(/\s+/g, ' ');
};

const convertEnglishInt = (num: number): string => {
  if (num === 0) return '';

  const parts: string[] = [];
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

// Simplified Chinese conversion helper
const convertChinese = (numStr: string): { hanzi: string; pinyin: string } => {
  const num = parseFloat(numStr);
  if (isNaN(num)) return { hanzi: '', pinyin: '' };
  if (num === 0) return { hanzi: '零', pinyin: 'líng' };

  const hanziParts: string[] = [];
  const pinyinParts: string[] = [];

  if (num < 0) {
    hanziParts.push('负');
    pinyinParts.push('fù');
  }

  const absStr = Math.abs(num).toString();
  const [integerPart, decimalPart] = absStr.split('.');

  // Integer Conversion
  const intVal = parseInt(integerPart, 10);
  const { hanzi: intHanzi, pinyin: intPinyin } = convertChineseInt(intVal);
  hanziParts.push(intHanzi);
  pinyinParts.push(intPinyin);

  // Decimal Conversion
  if (decimalPart) {
    hanziParts.push('点');
    pinyinParts.push('diǎn');
    for (const digit of decimalPart) {
      const d = parseInt(digit, 10);
      hanziParts.push(ZH_CHARS[d]);
      pinyinParts.push(ZH_PINYIN[d]);
    }
  }

  return {
    hanzi: hanziParts.join(''),
    pinyin: pinyinParts.join(' '),
  };
};

const convertChineseInt = (num: number): { hanzi: string; pinyin: string } => {
  if (num === 0) return { hanzi: '零', pinyin: 'líng' };

  const units = ['', '十', '百', '千'];
  const unitsPinyin = ['', 'shí', 'bǎi', 'qiān'];
  const scales = ['', '万', '亿', '万亿'];
  const scalesPinyin = ['', 'wàn', 'yì', 'wàn yì'];

  let val = num;
  let hzResult = '';
  let pyResult = '';
  let scaleCount = 0;

  while (val > 0) {
    const section = val % 10000;
    if (section > 0) {
      let secHz = '';
      const secPy: string[] = [];
      let temp = section;
      let zeroFlag = false;

      for (let i = 0; i < 4; i++) {
        const d = temp % 10;
        if (d > 0) {
          if (zeroFlag) {
            secHz = '零' + secHz;
            secPy.unshift('líng');
            zeroFlag = false;
          }
          const unitLabel = units[i];
          const unitPy = unitsPinyin[i];
          // Handle standard speech: e.g., "shí" instead of "yī shí" for 10-19 range in section start
          if (d === 1 && i === 1 && Math.floor(temp / 10) === 0) {
            secHz = unitLabel + secHz;
            secPy.unshift(unitPy);
          } else {
            secHz = ZH_CHARS[d] + unitLabel + secHz;
            secPy.unshift(ZH_PINYIN[d] + (unitPy ? ' ' + unitPy : ''));
          }
        } else {
          if (secHz !== '') {
            zeroFlag = true;
          }
        }
        temp = Math.floor(temp / 10);
      }

      hzResult = secHz + scales[scaleCount] + hzResult;
      pyResult = secPy.join(' ') + (scalesPinyin[scaleCount] ? ' ' + scalesPinyin[scaleCount] : '') + ' ' + hzResult;
      // Recompute section
    }
    val = Math.floor(val / 10000);
    scaleCount++;
  }

  // Simplified Chinese cleanup for clean result spacing
  return {
    hanzi: hzResult || '零',
    pinyin: pyResult.trim().replace(/\s+/g, ' '),
  };
};

export default function NumbersToWords() {
  const [inputVal, setInputVal] = useState('');
  const [lang, setLang] = useState<'en' | 'zh'>('en');

  let englishText = '';
  let chineseHanzi = '';
  let chinesePinyin = '';

  if (inputVal) {
    if (lang === 'en') {
      englishText = convertEnglish(inputVal);
    } else {
      const { hanzi, pinyin } = convertChinese(inputVal);
      chineseHanzi = hanzi;
      chinesePinyin = pinyin;
    }
  }

  return (
    <ToolPageWrapper toolId="numbers-to-words">
      <div className="space-y-6">
        {/* Toggle Language Segment */}
        <div className="flex gap-2">
          <Button
            onClick={() => setLang('en')}
            variant={lang === 'en' ? 'primary' : 'secondary'}
            size="sm"
          >
            English Words
          </Button>
          <Button
            onClick={() => setLang('zh')}
            variant={lang === 'zh' ? 'primary' : 'secondary'}
            size="sm"
          >
            Chinese Characters
          </Button>
        </div>

        {/* Input box */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[var(--text-secondary)]">Enter Number Value</label>
          <input
            type="number"
            placeholder="Type digits e.g. 12345.67"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-full px-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--primary)]/10 focus:border-[var(--primary)] font-medium h-12 text-sm"
          />
        </div>

        {/* Output Cards */}
        {lang === 'en' && englishText && (
          <div className="space-y-2 pt-2">
            <span className="text-xs font-semibold text-[var(--text-secondary)]">Spelled Out English Word</span>
            <div className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] min-h-[80px] flex flex-col justify-between">
              <p className="text-lg font-medium text-[var(--text-primary)] select-all break-words leading-relaxed">
                {englishText}
              </p>
              <div className="flex justify-end mt-4">
                <CopyButton text={englishText} />
              </div>
            </div>
          </div>
        )}

        {lang === 'zh' && chineseHanzi && (
          <div className="space-y-4 pt-2">
            {/* Hanzi */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[var(--text-secondary)]">Simplified Chinese (Hanzi)</span>
              <div className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] flex flex-col justify-between">
                <p className="text-2xl font-semibold text-[var(--text-primary)] select-all leading-normal">
                  {chineseHanzi}
                </p>
                <div className="flex justify-end mt-4">
                  <CopyButton text={chineseHanzi} />
                </div>
              </div>
            </div>

            {/* Pinyin */}
            {chinesePinyin && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[var(--text-secondary)]">Mandarin Pinyin Spelling</span>
                <div className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] flex flex-col justify-between">
                  <p className="text-sm font-mono text-[var(--text-secondary)] select-all break-words">
                    {chinesePinyin}
                  </p>
                  <div className="flex justify-end mt-4">
                    <CopyButton text={chinesePinyin} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolPageWrapper>
  );
}
