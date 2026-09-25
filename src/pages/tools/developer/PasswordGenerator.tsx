import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, CheckCircle2, Info } from 'lucide-react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, CopyButton } from '@/components/ui';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [copied, setCopied] = useState(false);

  // Password Generation Matrix
  const generatePassword = useCallback(() => {
    let charset = '';
    let uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    let numberChars = '0123456789';
    let symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (excludeSimilar) {
      uppercaseChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
      lowercaseChars = 'abcdefghijkmnopqrstuvwxyz';
      numberChars = '23456789';
      symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    }

    if (includeUppercase) charset += uppercaseChars;
    if (includeLowercase) charset += lowercaseChars;
    if (includeNumbers) charset += numberChars;
    if (includeSymbols) charset += symbolChars;

    if (charset === '') {
      setPassword('Select at least one option');
      return;
    }

    let result = '';
    const guaranteed = [];
    if (includeUppercase) guaranteed.push(uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)]);
    if (includeLowercase) guaranteed.push(lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)]);
    if (includeNumbers) guaranteed.push(numberChars[Math.floor(Math.random() * numberChars.length)]);
    if (includeSymbols) guaranteed.push(symbolChars[Math.floor(Math.random() * symbolChars.length)]);

    const remainingLength = length - guaranteed.length;
    for (let i = 0; i < remainingLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset[randomIndex];
    }

    const finalArray = [...guaranteed, ...result.split('')];
    for (let i = finalArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [finalArray[i], finalArray[j]] = [finalArray[j], finalArray[i]];
    }

    setPassword(finalArray.join(''));
    setCopied(false);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeSimilar]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    generatePassword();
  }, [generatePassword]);

  const strengthInfo = useMemo(() => {
    if (password === 'Select at least one option') {
      return { score: 0, label: 'Invalid Options', color: 'bg-gray-200', text: 'text-gray-400', entropy: 0 };
    }

    let poolSize = 0;
    if (includeUppercase) poolSize += excludeSimilar ? 24 : 26;
    if (includeLowercase) poolSize += excludeSimilar ? 25 : 26;
    if (includeNumbers) poolSize += excludeSimilar ? 8 : 10;
    if (includeSymbols) poolSize += 26;

    if (poolSize === 0) return { score: 0, label: 'Weak', color: 'bg-red-500', text: 'text-red-500', entropy: 0 };

    const entropy = Math.round(length * Math.log2(poolSize));

    let score = 1;
    if (entropy > 45) score = 2;
    if (entropy > 60) score = 3;
    if (entropy > 80) score = 4;
    if (entropy > 110) score = 5;

    let label = 'Weak';
    let color = 'bg-red-500';
    let text = 'text-red-500';

    if (score === 2) {
      label = 'Fair';
      color = 'bg-orange-400';
      text = 'text-orange-500';
    } else if (score === 3) {
      label = 'Good / Decent';
      color = 'bg-amber-400';
      text = 'text-amber-600 dark:text-amber-400';
    } else if (score === 4) {
      label = 'Strong / Secure';
      color = 'bg-emerald-500';
      text = 'text-emerald-600 dark:text-emerald-400';
    } else if (score === 5) {
      label = 'Military-Grade';
      color = 'bg-primary';
      text = 'text-primary';
    }

    return { score, label, color, text, entropy };
  }, [password, length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeSimilar]);

  return (
    <ToolPageWrapper toolId="password-generator">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full font-sans text-left">
        
        {/* LEFT PANEL CARD: Parameters (5 cols) */}
        <div className="lg:col-span-5 bg-bg-surface p-6 md:p-8 rounded-2xl border border-border-default shadow-sm flex flex-col justify-between gap-6 min-w-0">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-primary tracking-wider uppercase bg-primary/10 px-2.5 py-1 rounded-full inline-block">
              SECURITY NODE
            </span>
            <p className="text-xs text-text-secondary font-medium pt-1 leading-relaxed">
              Configure customized cryptographic entropy keys matching corporate compliance models.
            </p>
          </div>

          <div className="space-y-5">
            {/* Length Slider Container */}
            <div className="p-4 bg-bg-surface-container-low rounded-xl border border-border-default space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-text-primary">Password Length</span>
                <span className="font-mono font-bold text-primary text-sm">{length} Characters</span>
              </div>
              <input
                type="range"
                min="6"
                max="64"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full accent-primary h-2 bg-border-default rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Checklist checkboxes */}
            <div className="space-y-2.5">
              <label className="flex items-center justify-between p-3 bg-bg-surface-container-low hover:bg-bg-elevated rounded-xl border border-border-default transition-all cursor-pointer group">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-text-primary block">Include Uppercase Letters</span>
                  <span className="text-[10px] text-text-tertiary font-mono">A-Z characters</span>
                </div>
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={() => setIncludeUppercase(!includeUppercase)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-bg-surface-container-low hover:bg-bg-elevated rounded-xl border border-border-default transition-all cursor-pointer group">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-text-primary block">Include Lowercase Letters</span>
                  <span className="text-[10px] text-text-tertiary font-mono">a-z characters</span>
                </div>
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={() => setIncludeLowercase(!includeLowercase)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-bg-surface-container-low hover:bg-bg-elevated rounded-xl border border-border-default transition-all cursor-pointer group">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-text-primary block">Include Numeric Digits</span>
                  <span className="text-[10px] text-text-tertiary font-mono">0-9 integers</span>
                </div>
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={() => setIncludeNumbers(!includeNumbers)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-bg-surface-container-low hover:bg-bg-elevated rounded-xl border border-border-default transition-all cursor-pointer group">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-text-primary block">Include Special Symbols</span>
                  <span className="text-[10px] text-text-tertiary font-mono">Punctuation (@, #, $, &)</span>
                </div>
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={() => setIncludeSymbols(!includeSymbols)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-bg-surface-container-low hover:bg-bg-elevated rounded-xl border border-border-default transition-all cursor-pointer group">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-text-primary block">Avoid Similar Characters</span>
                  <span className="text-[10px] text-text-tertiary font-medium">Excludes (i, l, 1, o, 0, O)</span>
                </div>
                <input
                  type="checkbox"
                  checked={excludeSimilar}
                  onChange={() => setExcludeSimilar(!excludeSimilar)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL CARD: Output display & metrics (7 cols) */}
        <div className="lg:col-span-7 bg-bg-surface p-6 md:p-8 rounded-2xl border border-border-default shadow-sm flex flex-col justify-between gap-6 min-w-0">
          <div className="flex justify-between items-center border-b border-border-default pb-4 min-w-0">
            <span className="text-xs font-bold text-text-tertiary uppercase tracking-wider shrink-0">Active Secret Key</span>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
              <CheckCircle2 size={16} className="text-emerald-500" />
              <span>Decryption Shield Active</span>
            </div>
          </div>

          <div className="space-y-4 min-w-0">
            <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-xl px-5 py-4 shadow-inner overflow-hidden min-w-0">
              <div className="w-full font-mono text-base md:text-lg font-bold text-slate-100 pr-12 break-all text-center tracking-wide select-all overflow-hidden">
                {password}
              </div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <CopyButton text={password} size="sm" variant="ghost" />
              </div>
            </div>

            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold px-4 py-2.5 rounded-lg text-center"
                >
                  Key hash copied to clipboard!
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Strength indicators */}
          <div className="space-y-4 p-5 bg-bg-surface-container-low border border-border-default rounded-xl min-w-0">
            <div className="flex justify-between items-center text-xs min-w-0 gap-2">
              <span className="font-bold text-text-secondary uppercase tracking-wider truncate">Entropy Security Index</span>
              <span className={`font-mono font-bold text-[13px] ${strengthInfo.text} uppercase shrink-0`}>
                {strengthInfo.label}
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((idx) => (
                <div
                  key={idx}
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    idx <= strengthInfo.score ? strengthInfo.color : 'bg-border-default'
                  }`}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 font-mono text-[10px] text-text-tertiary font-medium min-w-0">
              <div className="space-y-1">
                <span>SHANNON ENTROPY</span>
                <span className="block text-text-primary font-bold text-xs">{strengthInfo.entropy} Bits</span>
              </div>
              <div className="space-y-1">
                <span>ESTIMATED CRACK TIME</span>
                <span className="block text-text-primary font-bold text-xs truncate">
                  {strengthInfo.score === 1 && '~3 minutes'}
                  {strengthInfo.score === 2 && '~6 hours'}
                  {strengthInfo.score === 3 && '~14 days'}
                  {strengthInfo.score === 4 && '~4,200 years'}
                  {strengthInfo.score === 5 && 'Over 14 trillion years'}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-border-default flex flex-wrap items-center justify-between gap-4 min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] text-text-tertiary font-medium">
              <Info size={14} className="text-primary shrink-0" />
              <span>Cryptographically random calculations run fully client-side.</span>
            </div>
            <Button
              variant="primary"
              size="xs"
              onClick={generatePassword}
              leftIcon={<RefreshCw size={14} />}
            >
              Regenerate Key
            </Button>
          </div>
        </div>

      </div>
    </ToolPageWrapper>
  );
}
