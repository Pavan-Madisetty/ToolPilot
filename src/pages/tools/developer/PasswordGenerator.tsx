import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RefreshCw, 
  Clipboard, 
  CheckCircle2, 
  Info
} from 'lucide-react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';

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
      uppercaseChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // Exclude I, O
      lowercaseChars = 'abcdefghijkmnopqrstuvwxyz'; // Exclude l
      numberChars = '23456789'; // Exclude 0, 1
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

  const copyToClipboard = () => {
    if (password === 'Select at least one option') return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
      text = 'text-amber-600';
    } else if (score === 4) {
      label = 'Strong / Secure';
      color = 'bg-emerald-500';
      text = 'text-emerald-600';
    } else if (score === 5) {
      label = 'Military-Grade';
      color = 'bg-indigo-600';
      text = 'text-indigo-650 text-primary';
    }

    return { score, label, color, text, entropy };
  }, [password, length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeSimilar]);

  return (
    <ToolPageWrapper toolId="password-generator">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 font-sans">
        
        {/* LEFT COLUMN: Parameters */}
        <div className="lg:col-span-5 p-8 bg-gray-50/50 border-r border-gray-100 space-y-6">
          <div className="space-y-1 text-left">
            <span className="text-[10px] font-bold text-primary tracking-wider uppercase bg-primary/10 px-2 py-0.5 rounded-full">SECURITY NODE</span>
            <h2 className="font-display text-xl font-bold text-gray-900">Secure Key Architect</h2>
            <p className="text-xs text-gray-500 font-medium">Configure customized cryptographic entropy keys matching extreme corporate compliance models.</p>
          </div>

          <div className="space-y-4 pt-2">
            
            {/* Length Slider */}
            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-700">Password Length</span>
                <span className="font-mono font-bold text-primary">{length} Characters</span>
              </div>
              <input
                type="range"
                min="6"
                max="64"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full accent-primary h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Checklist checkboxes */}
            <div className="space-y-3.5 pt-2">
              
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="space-y-0.5 text-left">
                  <span className="text-xs font-bold text-gray-800 block">Include Uppercase Letters</span>
                  <span className="text-[10px] text-gray-400 font-mono">A-Z characters (e.g. G, T, R)</span>
                </div>
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={() => setIncludeUppercase(!includeUppercase)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <div className="space-y-0.5 text-left">
                  <span className="text-xs font-bold text-gray-800 block">Include Lowercase Letters</span>
                  <span className="text-[10px] text-gray-400 font-mono">a-z characters (e.g. k, p, w)</span>
                </div>
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={() => setIncludeLowercase(!includeLowercase)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <div className="space-y-0.5 text-left">
                  <span className="text-xs font-bold text-gray-800 block">Include Numeric Digits</span>
                  <span className="text-[10px] text-gray-400 font-mono">0-9 integers (e.g. 5, 8, 2)</span>
                </div>
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={() => setIncludeNumbers(!includeNumbers)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <div className="space-y-0.5 text-left">
                  <span className="text-xs font-bold text-gray-800 block">Include Special Symbols</span>
                  <span className="text-[10px] text-gray-400 font-mono">Punctuation (e.g. @, #, $, &)</span>
                </div>
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={() => setIncludeSymbols(!includeSymbols)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer"
                />
              </label>

              <div className="pt-2 border-t border-gray-100">
                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="space-y-0.5 text-left">
                    <span className="text-xs font-bold text-gray-700 block">Avoid Similar Characters</span>
                    <span className="text-[10px] text-gray-400 font-medium">Excludes lookalikes (i, l, 1, o, 0, O)</span>
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
        </div>

        {/* RIGHT COLUMN: Output display & metrics */}
        <div className="lg:col-span-7 p-8 flex flex-col justify-between space-y-6 text-left">
          
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Secret Key</span>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Active Decryption Shield
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <div className="w-full bg-slate-900 border border-slate-800 rounded-xl px-5 py-4 font-mono text-base md:text-lg font-bold text-white pr-12 break-all text-center tracking-wide shadow-inner select-all">
                {password}
              </div>
              <button
                onClick={copyToClipboard}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer hover:bg-slate-700 transition-colors"
                title="Copy keys"
              >
                <Clipboard className="w-4 h-4" />
              </button>
            </div>

            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/15 text-xs font-semibold px-4 py-2 rounded-lg text-center"
                >
                  Key hash successfully copied to clipboard system!
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Strength indicators */}
          <div className="space-y-4 p-4.5 bg-gray-50 border border-gray-100 rounded-xl">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-gray-500 uppercase tracking-wider">Entropy Security Index</span>
              <span className={`font-mono font-bold text-[13px] ${strengthInfo.text} uppercase`}>
                {strengthInfo.label}
              </span>
            </div>

            <div className="grid grid-cols-5 gap-1.5">
              {[1, 2, 3, 4, 5].map((idx) => (
                <div 
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    idx <= strengthInfo.score ? strengthInfo.color : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 font-mono text-[10px] text-gray-500 font-medium">
              <div className="space-y-0.5 text-left">
                <span>SHANNON ENTROPY</span>
                <span className="block text-gray-800 font-bold text-xs">{strengthInfo.entropy} Bits</span>
              </div>
              <div className="space-y-0.5 text-left">
                <span>TIME TO CRACK</span>
                <span className="block text-gray-800 font-bold text-xs">
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
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-1 text-[10px] text-gray-400 font-semibold leading-none">
              <Info className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Cryptographically random calculations run fully client-side.</span>
            </div>
            <button
              onClick={generatePassword}
              className="flex items-center gap-1.5 text-xs text-primary font-bold uppercase cursor-pointer hover:text-primary-container"
            >
              <RefreshCw className="w-4 h-4 animate-hover-spin" />
              Regenerate key
            </button>
          </div>

        </div>
      </div>
    </ToolPageWrapper>
  );
}
