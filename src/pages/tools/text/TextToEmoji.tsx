import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, CopyButton, Textarea } from '@/components/ui';

const EMOJI_DICTIONARY: Record<string, string> = {
  love: '❤️',
  like: '👍',
  heart: '💖',
  cat: '🐱',
  dog: '🐶',
  pizza: '🍕',
  burger: '🍔',
  fire: '🔥',
  hot: '🔥',
  sparkles: '✨',
  star: '⭐',
  beer: '🍺',
  coffee: '☕',
  tea: '🍵',
  water: '💧',
  sun: '☀️',
  moon: '🌙',
  car: '🚗',
  home: '🏠',
  house: '🏠',
  computer: '💻',
  laptop: '💻',
  phone: '📱',
  mobile: '📱',
  key: '🔑',
  lock: '🔒',
  happy: '😊',
  sad: '😢',
  laugh: '😂',
  cool: '😎',
  cry: '😭',
  party: '🎉',
  gift: '🎁',
  present: '🎁',
  music: '🎵',
  song: '🎶',
  book: '📖',
  money: '💵',
  cash: '💰',
  run: '🏃',
  running: '🏃',
  sleep: '😴',
  sleeping: '😴',
  work: '💼',
  alert: '🚨',
  check: '✅',
  ok: '👌',
  rocket: '🚀',
  target: '🎯',
  warning: '⚠️',
  lightning: '⚡',
  idea: '💡',
  eyes: '👀',
  crown: '👑',
  flex: '💪',
  clap: '👏',
  thumbsup: '👍',
  smile: '🙂',
  angry: '😠',
  ghost: '👻',
  skull: '💀',
  game: '🎮',
  movie: '🎬',
  musicnote: '🎵',
  tree: '🌳',
  flower: '🌸',
  earth: '🌍',
  cloud: '☁️',
  rain: '🌧️',
};

const BLOCK_LETTER_MAP: Record<string, string> = {
  a: '🅰️', b: '🅱️', c: '🅲', d: '🅳', e: '🅴', f: '🅵', g: '🅶', h: '🅷', i: '🅸', j: '🅹', k: '🅺', l: '🅻', m: '🅼', n: '🅽', o: '🅾️', p: '🅿️', q: '🆀', r: '🆁', s: '🆂', t: '🆃', u: '🆄', v: '🆅', w: '🆆', x: '🆇', y: '🆈', z: '🆏',
  '0': '0️⃣', '1': '1️⃣', '2': '2️⃣', '3': '3️⃣', '4': '4️⃣', '5': '5️⃣', '6': '6️⃣', '7': '7️⃣', '8': '8️⃣', '9': '9️⃣',
  '?': '❓', '!': '❗️', ' ': '   ',
};

export default function TextToEmoji() {
  const [inputText, setInputText] = useState('');
  const [mode, setMode] = useState<'translate' | 'speller'>('translate');

  let outputText = '';
  if (inputText.trim()) {
    if (mode === 'translate') {
      // Word translation
      const words = inputText.split(/(\s+)/);
      const translated = words.map((part) => {
        // Strip punctuation for matching
        const cleanWord = part.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, '');
        if (EMOJI_DICTIONARY[cleanWord]) {
          // Replace matching word while keeping punctuation
          const punctuation = part.substring(cleanWord.length);
          return EMOJI_DICTIONARY[cleanWord] + punctuation;
        }
        return part;
      });
      outputText = translated.join('');
    } else {
      // Block speller
      const chars = inputText.toLowerCase().split('');
      const blockChars = chars.map((char) => BLOCK_LETTER_MAP[char] || char);
      outputText = blockChars.join(' ');
    }
  }

  return (
    <ToolPageWrapper toolId="text-to-emoji">
      <div className="space-y-6">
        {/* Mode Selector Segmented Pills */}
        <div className="flex gap-2">
          <Button
            onClick={() => setMode('translate')}
            variant={mode === 'translate' ? 'primary' : 'secondary'}
            size="sm"
          >
            Word Translation
          </Button>
          <Button
            onClick={() => setMode('speller')}
            variant={mode === 'speller' ? 'primary' : 'secondary'}
            size="sm"
          >
            Block Letter Speller
          </Button>
        </div>

        {/* Input area */}
        <Textarea
          label={
            <div className="flex items-center justify-between w-full">
              <span>Input String</span>
              {inputText && (
                <Button onClick={() => setInputText('')} variant="ghost" size="xs">
                  Clear
                </Button>
              )}
            </div>
          }
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={
            mode === 'translate'
              ? 'Type e.g., "I love pizza and coding on my laptop at home"'
              : 'Type e.g., "ALERT 101"'
          }
          className="h-[120px] resize-none"
        />

        {/* Output Area */}
        {outputText && (
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[var(--text-secondary)]">Translated Output</span>
            <div className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] min-h-[100px] flex flex-col justify-between">
              <p className="text-base leading-relaxed break-words whitespace-pre-wrap select-all font-medium">
                {outputText}
              </p>
              <div className="flex justify-end mt-4">
                <CopyButton text={outputText} />
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolPageWrapper>
  );
}
