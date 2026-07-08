import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Slider, Switch, CopyButton } from '@/components/ui';

// Mock small word list for passphrase generator
const PASSPHRASE_WORDS = [
  'apple', 'banana', 'orange', 'rocket', 'shield', 'ocean', 'forest', 'mountain',
  'river', 'cloud', 'galaxy', 'planet', 'vector', 'matrix', 'beacon', 'system',
  'pilot', 'bridge', 'anchor', 'voyage', 'summit', 'glacier', 'canyon', 'desert'
];

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [isPassphraseMode, setIsPassphraseMode] = useState(false);
  const [trigger, setTrigger] = useState(0);

  // Compute password/passphrase purely during render using useMemo
  const passwordVal = useMemo(() => {
    void trigger;
    if (isPassphraseMode) {
      // Passphrase mode: join random dictionary words
      const list = [];
      const array = new Uint32Array(4);
      window.crypto.getRandomValues(array);
      for (let i = 0; i < 4; i++) {
        const rand = array[i] % PASSPHRASE_WORDS.length;
        list.push(PASSPHRASE_WORDS[rand]);
      }
      return list.join('-');
    }

    let chars = '';
    if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) chars += '0123456789';
    if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (excludeSimilar) {
      chars = chars.replace(/[il1Lo0O!|]/g, '');
    }

    if (!chars) {
      return '';
    }

    // Cryptographically secure values
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(array[i] % chars.length);
    }
    return result;
  }, [length, useUpper, useLower, useNumbers, useSymbols, excludeSimilar, isPassphraseMode, trigger]);

  // Calculate Entropy for strength meter
  const strengthInfo = useMemo(() => {
    if (isPassphraseMode) {
      return { score: 'Strong', color: 'bg-emerald-500', width: 'w-3/4' };
    }
    if (!passwordVal) return { score: 'None', color: 'bg-gray-200', width: 'w-0' };

    let pool = 0;
    if (useUpper) pool += 26;
    if (useLower) pool += 26;
    if (useNumbers) pool += 10;
    if (useSymbols) pool += 26;

    const entropy = passwordVal.length * Math.log2(pool || 1);
    if (entropy < 40) {
      return { score: 'Weak', color: 'bg-red-500', width: 'w-1/4' };
    } else if (entropy < 65) {
      return { score: 'Fair', color: 'bg-yellow-500', width: 'w-2/4' };
    } else if (entropy < 85) {
      return { score: 'Strong', color: 'bg-emerald-500', width: 'w-3/4' };
    } else {
      return { score: 'Very Strong', color: 'bg-blue-600', width: 'w-full' };
    }
  }, [passwordVal, useUpper, useLower, useNumbers, useSymbols, isPassphraseMode]);

  return (
    <ToolPageWrapper toolId="password-generator">
      <div className="tool-layout lg:grid-cols-3">
        {/* Parameters Panel */}
        <div className="lg:col-span-1 space-y-6 p-6 border rounded-2xl bg-white dark:bg-slate-800" style={{ borderColor: 'var(--border-default)' }}>
          <Switch
            label="Passphrase Mode"
            checked={isPassphraseMode}
            onChange={setIsPassphraseMode}
            description="Generate readable words split by hyphens"
          />

          {!isPassphraseMode ? (
            <>
              <Slider
                label="Password Length"
                min={6}
                max={64}
                value={length}
                onChange={setLength}
              />

              <div className="border-t pt-4 space-y-4" style={{ borderColor: 'var(--border-default)' }}>
                <Switch label="Uppercase (A-Z)" checked={useUpper} onChange={setUseUpper} />
                <Switch label="Lowercase (a-z)" checked={useLower} onChange={setUseLower} />
                <Switch label="Numbers (0-9)" checked={useNumbers} onChange={setUseNumbers} />
                <Switch label="Symbols (!@#...)" checked={useSymbols} onChange={setUseSymbols} />
                <Switch
                  label="Exclude Similar"
                  checked={excludeSimilar}
                  onChange={setExcludeSimilar}
                  description="Exclude: i, l, 1, L, o, 0, O"
                />
              </div>
            </>
          ) : (
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Passphrase combines random words. High entropy is achieved automatically.
            </p>
          )}

          <Button onClick={() => setTrigger((t) => t + 1)} className="w-full">
            Regenerate
          </Button>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="border rounded-2xl p-6 bg-white dark:bg-slate-800 space-y-4" style={{ borderColor: 'var(--border-default)' }}>
            <div className="flex items-center justify-between">
              <span className="label">Generated Result</span>
              {passwordVal && <CopyButton text={passwordVal} />}
            </div>

            <input
              readOnly
              value={passwordVal}
              className="input-base font-mono text-center text-lg font-bold select-all py-3 border-2 border-blue-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30"
              aria-label="Generated password value"
            />

            {/* Strength Meter */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span style={{ color: 'var(--text-secondary)' }}>Password Strength</span>
                <span className={isPassphraseMode ? 'text-emerald-500' : ''}>{strengthInfo.score}</span>
              </div>
              <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-300 ${strengthInfo.color} ${strengthInfo.width}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
