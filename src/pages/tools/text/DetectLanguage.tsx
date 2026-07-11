import { useState, useEffect } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Textarea } from '@/components/ui';

interface LanguageDetectorRule {
  lang: string;
  code: string;
  stopWords: string[];
  unicodeRange?: RegExp;
}

const LANGUAGES: LanguageDetectorRule[] = [
  {
    lang: 'English',
    code: 'en',
    stopWords: ['the', 'and', 'you', 'that', 'was', 'for', 'with', 'have', 'this', 'are', 'with', 'about', 'from'],
  },
  {
    lang: 'Spanish',
    code: 'es',
    stopWords: ['el', 'la', 'los', 'las', 'un', 'una', 'del', 'por', 'para', 'con', 'este', 'como', 'pero'],
  },
  {
    lang: 'French',
    code: 'fr',
    stopWords: ['le', 'la', 'les', 'des', 'une', 'pour', 'dans', 'avec', 'nous', 'vous', 'sont', 'comme'],
  },
  {
    lang: 'German',
    code: 'de',
    stopWords: ['der', 'die', 'das', 'und', 'ist', 'mit', 'von', 'auf', 'nicht', 'für', 'eine', 'oder'],
  },
  {
    lang: 'Italian',
    code: 'it',
    stopWords: ['il', 'la', 'i', 'gli', 'del', 'con', 'per', 'questo', 'non', 'sono', 'come', 'anche'],
  },
  {
    lang: 'Portuguese',
    code: 'pt',
    stopWords: ['o', 'a', 'os', 'as', 'um', 'uma', 'com', 'para', 'por', 'este', 'como', 'mais'],
  },
  {
    lang: 'Dutch',
    code: 'nl',
    stopWords: ['de', 'het', 'en', 'een', 'met', 'van', 'voor', 'niet', 'zijn', 'door', 'over'],
  },
  {
    lang: 'Russian',
    code: 'ru',
    stopWords: ['и', 'в', 'не', 'на', 'что', 'он', 'как', 'это', 'по', 'но'],
    unicodeRange: /[\u0400-\u04FF]/,
  },
  {
    lang: 'Arabic',
    code: 'ar',
    stopWords: ['من', 'في', 'على', 'هذا', 'كان', 'أن', 'إلى', 'مع', 'عن'],
    unicodeRange: /[\u0600-\u06FF]/,
  },
  {
    lang: 'Chinese',
    code: 'zh',
    stopWords: ['的', '一', '是', '在', '有', '个', '我', '他', '们', '这'],
    unicodeRange: /[\u4E00-\u9FFF]/,
  },
  {
    lang: 'Japanese',
    code: 'ja',
    stopWords: ['の', 'です', 'ます', 'これ', 'それ', '私', 'あなた', 'する'],
    unicodeRange: /[\u3040-\u309F\u30A0-\u30FF]/,
  },
  {
    lang: 'Korean',
    code: 'ko',
    stopWords: ['은', '는', '이', '가', '을', '를', '에', '에서', '하다'],
    unicodeRange: /[\uAC00-\uD7AF]/,
  },
  {
    lang: 'Hindi',
    code: 'hi',
    stopWords: ['और', 'है', 'को', 'की', 'का', 'में', 'से', 'एक', 'यह'],
    unicodeRange: /[\u0900-\u097F]/,
  },
];

export default function DetectLanguage() {
  const [text, setText] = useState('');
  const [detectedLang, setDetectedLang] = useState('');
  const [detectedCode, setDetectedCode] = useState('');
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    if (!text.trim()) {
      setDetectedLang('');
      setDetectedCode('');
      setConfidence(0);
      return;
    }

    const cleanText = text.toLowerCase().trim();
    const words = cleanText.split(/\s+/);
    const scores: Record<string, number> = {};

    // Initialize scores
    LANGUAGES.forEach((l) => {
      scores[l.code] = 0;
    });

    // Score based on Unicode script block presence
    LANGUAGES.forEach((l) => {
      if (l.unicodeRange && l.unicodeRange.test(text)) {
        // Boost score significantly if range matches (e.g. Arabic characters -> Arabic score boost)
        scores[l.code] += 15;
      }
    });

    // Score based on stop words match count
    words.forEach((word) => {
      const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, '');
      LANGUAGES.forEach((l) => {
        if (l.stopWords.includes(cleanWord)) {
          scores[l.code] += 5;
        }
      });
    });

    // Find the highest score
    let bestCode = 'en';
    let bestScore = 0;
    Object.entries(scores).forEach(([code, score]) => {
      if (score > bestScore) {
        bestScore = score;
        bestCode = code;
      }
    });

    const match = LANGUAGES.find((l) => l.code === bestCode);
    if (match && bestScore > 0) {
      setDetectedLang(match.lang);
      setDetectedCode(match.code);
      // Map score to a confidence percentage from 40% to 100%
      const confPct = Math.min(100, Math.max(40, 40 + bestScore * 4));
      setConfidence(confPct);
    } else {
      // Default fallback
      setDetectedLang('Unknown (likely English)');
      setDetectedCode('en');
      setConfidence(30);
    }
  }, [text]);

  return (
    <ToolPageWrapper toolId="detect-language">
      <div className="space-y-6">
        <Textarea
          label={
            <div className="flex items-center justify-between w-full">
              <span>Input String to Detect</span>
              {text && (
                <Button onClick={() => setText('')} variant="ghost" size="xs">
                  Clear
                </Button>
              )}
            </div>
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste foreign text or sentences here e.g. 'Bonjour, comment ça va?' or '你好，今天天气不错'..."
          className="h-[150px] resize-none"
        />

        {detectedLang && (
          <div className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] space-y-4 shadow-sm">
            <div>
              <span className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider block mb-1">
                Detected Language
              </span>
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">{detectedLang}</h3>
                <span className="text-sm font-mono text-[var(--text-tertiary)] uppercase">({detectedCode})</span>
              </div>
            </div>

            {/* Confidence progress bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-[var(--text-secondary)]">
                <span>Confidence Level</span>
                <span>{confidence}%</span>
              </div>
              <div className="w-full bg-[var(--border-subtle)] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[var(--primary)] h-full rounded-full transition-all duration-500"
                  style={{ width: `${confidence}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolPageWrapper>
  );
}
