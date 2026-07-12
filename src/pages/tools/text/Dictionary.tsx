import { useState, useRef } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button } from '@/components/ui';
import { Search, Volume2, HelpCircle } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';

interface Phonetic {
  text?: string;
  audio?: string;
}

interface Definition {
  definition: string;
  example?: string;
  synonyms: string[];
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
}

interface DictionaryResult {
  word: string;
  phonetic?: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
}

export default function Dictionary() {
  const { addToast } = useUIStore();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DictionaryResult | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(query.trim().toLowerCase())}`);
      if (!response.ok) {
        throw new Error('Word not found in dictionary database.');
      }
      const data = await response.json();
      if (Array.isArray(data) && data[0]) {
        setResult(data[0]);
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Could not lookup the specified word.';
      addToast({
        type: 'error',
        title: 'Search Failed',
        message: errMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAudio = () => {
    if (!result) return;
    // Find phonetic audio source
    const audioObj = result.phonetics.find((p) => p.audio);
    if (audioObj?.audio) {
      if (audioRef.current) {
        audioRef.current.src = audioObj.audio;
        audioRef.current.play();
      } else {
        const audio = new Audio(audioObj.audio);
        audioRef.current = audio;
        audio.play();
      }
    } else {
      // Fallback: speech synthesis
      const utterance = new SpeechSynthesisUtterance(result.word);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  const hasAudio = result?.phonetics.some((p) => p.audio);

  return (
    <ToolPageWrapper toolId="dictionary">
      <div className="space-y-6">
        {/* Search Input Box */}
        <form onSubmit={handleSearch} className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[var(--text-tertiary)] group-focus-within:text-[var(--primary)] transition-colors">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Type any English word to define (e.g., serendipity, coding)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-24 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--primary)]/10 focus:border-[var(--primary)] font-medium h-12 text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 h-8 px-4 bg-[var(--primary)] text-white text-xs font-semibold rounded-lg hover:shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {/* Results Container */}
        {result && (
          <div className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] space-y-6 shadow-sm">
            {/* Header Panel */}
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
              <div>
                <h3 className="text-3xl font-bold text-[var(--text-primary)] capitalize">{result.word}</h3>
                {result.phonetic && (
                  <p className="text-sm font-mono text-[var(--text-tertiary)] mt-1">{result.phonetic}</p>
                )}
              </div>
              <Button
                onClick={handlePlayAudio}
                size="sm"
                variant="secondary"
                className="flex items-center gap-2"
                title={hasAudio ? 'Listen pronunciation' : 'Listen text-to-speech'}
              >
                <Volume2 size={16} /> Pronounce
              </Button>
            </div>

            {/* Meanings */}
            <div className="space-y-6">
              {result.meanings.map((meaning, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded">
                      {meaning.partOfSpeech}
                    </span>
                    <span className="flex-1 h-px bg-[var(--border-subtle)]" />
                  </div>

                  <ul className="space-y-4 list-decimal list-inside pl-1 text-[var(--text-secondary)]">
                    {meaning.definitions.map((def, defIdx) => (
                      <li key={defIdx} className="text-sm leading-relaxed marker:font-bold">
                        <span className="font-medium text-[var(--text-primary)]">{def.definition}</span>
                        {def.example && (
                          <p className="text-xs text-[var(--text-tertiary)] italic mt-1 pl-4">
                            &ldquo;{def.example}&rdquo;
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty Placeholder */}
        {!result && !loading && (
          <div className="text-center py-16 border border-dashed border-[var(--border-default)] bg-[var(--bg-elevated)] rounded-2xl flex flex-col items-center justify-center gap-2">
            <HelpCircle size={32} className="text-[var(--text-tertiary)]" />
            <div>
              <p className="text-sm font-semibold text-[var(--text-secondary)]">Enter a word to see its definitions</p>
              <p className="text-xs text-[var(--text-tertiary)] mt-0.5">Real-time phonetic definitions will load below.</p>
            </div>
          </div>
        )}
      </div>
    </ToolPageWrapper>
  );
}
