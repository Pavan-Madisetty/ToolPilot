import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Square } from 'lucide-react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, Select, Slider, Textarea } from '@/components/ui';
import { Notice } from '@/components/tools/Notice';

export default function TextToSpeech() {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const [text, setText] = useState('Hello! This text is being read aloud by your browser, entirely on your device.');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voice, setVoice] = useState('');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [state, setState] = useState<'idle' | 'speaking' | 'paused'>('idle');
  const uttRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!supported) return;
    const load = () => {
      const v = window.speechSynthesis.getVoices();
      setVoices(v);
      setVoice((cur) => cur || v.find((x) => x.default)?.voiceURI || v[0]?.voiceURI || '');
    };
    load();
    window.speechSynthesis.addEventListener('voiceschanged', load);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', load);
      window.speechSynthesis.cancel();
    };
  }, [supported]);

  const speak = () => {
    if (!text.trim()) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = voices.find((x) => x.voiceURI === voice);
    if (v) { u.voice = v; u.lang = v.lang; }
    u.rate = rate; u.pitch = pitch;
    u.onend = () => setState('idle');
    u.onerror = () => setState('idle');
    uttRef.current = u;
    setState('speaking');
    window.speechSynthesis.speak(u);
  };
  const toggle = () => {
    if (state === 'speaking') { window.speechSynthesis.pause(); setState('paused'); }
    else if (state === 'paused') { window.speechSynthesis.resume(); setState('speaking'); }
  };
  const stop = () => { window.speechSynthesis.cancel(); setState('idle'); };

  if (!supported) {
    return (
      <ToolPageWrapper toolId="text-to-speech">
        <Notice tone="warning" title="Speech synthesis is not available">Your browser doesn’t support the Web Speech API. Try Chrome, Edge, Safari or Firefox.</Notice>
      </ToolPageWrapper>
    );
  }

  return (
    <ToolPageWrapper toolId="text-to-speech">
      <div className="tool-layout lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <Card className="space-y-4">
          <Textarea label={`Text · ${text.length} characters`} rows={12} value={text} onChange={(e) => setText(e.target.value)} />
          <div className="flex flex-wrap gap-2">
            <Button leftIcon={<Play size={16} />} onClick={speak} disabled={!text.trim()}>Speak</Button>
            <Button variant="secondary" leftIcon={state === 'paused' ? <Play size={16} /> : <Pause size={16} />} onClick={toggle} disabled={state === 'idle'}>{state === 'paused' ? 'Resume' : 'Pause'}</Button>
            <Button variant="secondary" leftIcon={<Square size={16} />} onClick={stop} disabled={state === 'idle'}>Stop</Button>
          </div>
        </Card>
        <Card className="space-y-5">
          <Select label="Voice" value={voice} onChange={(e) => setVoice(e.target.value)} options={voices.length ? voices.map((v) => ({ value: v.voiceURI, label: `${v.name} (${v.lang})` })) : [{ value: '', label: 'Default voice' }]} />
          <Slider label="Speed" min={0.5} max={2} step={0.1} value={rate} onChange={setRate} suffix="×" />
          <Slider label="Pitch" min={0.5} max={2} step={0.1} value={pitch} onChange={setPitch} />
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Voices come from your operating system or browser. Some voices may use your vendor’s cloud service.</p>
        </Card>
      </div>
    </ToolPageWrapper>
  );
}
