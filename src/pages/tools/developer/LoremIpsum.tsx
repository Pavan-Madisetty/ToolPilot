import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Select, Switch, CopyButton, Textarea } from '@/components/ui';

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'proin', 'in', 
  'lorem', 'hendrerit', 'placerat', 'nunc', 'at', 'elementum', 'nisl', 'integer', 'sodales', 'magna', 
  'egestas', 'laoreet', 'consectetur', 'tellus', 'mi', 'tristique', 'urna', 'id', 'convallis', 'sem', 
  'metus', 'nec', 'sem', 'etiam', 'ut', 'tincidunt', 'turpis', 'ac', 'lacinia', 'est', 'proin', 
  'sit', 'amet', 'facilisis', 'massa', 'proin', 'quis', 'varius', 'tellus', 'sed', 'interdum', 
  'sapien', 'ac', 'libero', 'pellentesque', 'finibus', 'maecenas', 'tristique', 'mi', 'ut', 'porta', 
  'fermentum', 'ipsum', 'sapien', 'bibendum', 'magna', 'ac', 'convallis', 'velit', 'augue', 'ac', 
  'nisl', 'vivamus', 'congue', 'eget', 'arcu', 'id', 'varius', 'praesent', 'aliquet', 'risus', 
  'et', 'ex', 'viverra', 'aliquet', 'mauris', 'efficitur', 'tristique', 'diam', 'vitae', 'convallis'
];

const LOREM_SENTENCES = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Proin in lorem hendrerit, placerat nunc at, elementum nisl.',
  'Integer sodales, magna egestas laoreet consectetur, tellus mi tristique urna, id convallis sem metus nec sem.',
  'Etiam ut tincidunt turpis, ac lacinia est.',
  'Proin sit amet facilisis massa.',
  'Proin quis varius tellus.',
  'Sed interdum sapien ac libero pellentesque finibus.',
  'Maecenas tristique, mi ut porta fermentum, ipsum sapien bibendum magna, ac convallis velit augue ac nisl.',
  'Vivamus congue eget arcu id varius.',
  'Praesent aliquet risus et ex viverra aliquet.',
  'Mauris efficitur tristique diam vitae convallis.',
  'Cras facilisis arcu et arcu vulputate feugiat.',
  'Donec quis lorem sed nisl tristique accumsan eget sed ex.',
  'Vestibulum egestas dolor vel nibh faucibus convallis.',
  'Sed at sapien quis massa sodales elementum.',
  'Nulla sit amet est tempor, elementum velit vitae, consequat sem.',
  'Duis lobortis sodales magna vel luctus.',
  'Curabitur a odio molestie, efficitur sapien sed, auctor ligula.'
];

const UNIT_OPTIONS = [
  { value: 'paragraphs', label: 'Paragraphs' },
  { value: 'sentences', label: 'Sentences' },
  { value: 'words', label: 'Words' },
];

function generateWords(count: number, startWithLorem: boolean): string {
  const result: string[] = [];
  if (startWithLorem && count > 0) {
    result.push('Lorem', 'ipsum', 'dolor', 'sit', 'amet');
  }
  
  while (result.length < count) {
    const idx = Math.floor(Math.random() * LOREM_WORDS.length);
    result.push(LOREM_WORDS[idx]);
  }
  
  // Make sure output count is exact and format nicely
  const joined = result.slice(0, count).join(' ');
  return joined.charAt(0).toUpperCase() + joined.slice(1) + '.';
}

function generateSentences(count: number, startWithLorem: boolean): string {
  const result: string[] = [];
  if (startWithLorem && count > 0) {
    result.push(LOREM_SENTENCES[0]);
  }
  
  while (result.length < count) {
    const idx = Math.floor(Math.random() * LOREM_SENTENCES.length);
    if (!result.includes(LOREM_SENTENCES[idx]) || result.length > 10) {
      result.push(LOREM_SENTENCES[idx]);
    }
  }
  
  return result.slice(0, count).join(' ');
}

function generateParagraphs(count: number, startWithLorem: boolean): string {
  const paragraphs: string[] = [];
  for (let i = 0; i < count; i++) {
    // Generate a paragraph with 4 to 6 random sentences
    const sentenceCount = 4 + Math.floor(Math.random() * 3);
    const startThis = startWithLorem && i === 0;
    paragraphs.push(generateSentences(sentenceCount, startThis));
  }
  return paragraphs.join('\n\n');
}

export default function LoremIpsum() {
  const [count, setCount] = useState(3);
  const [unit, setUnit] = useState('paragraphs');
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [output, setOutput] = useState('');

  const handleGenerate = () => {
    let result: string;
    if (unit === 'paragraphs') {
      result = generateParagraphs(count, startWithLorem);
    } else if (unit === 'sentences') {
      result = generateSentences(count, startWithLorem);
    } else {
      result = generateWords(count, startWithLorem);
    }
    setOutput(result);
  };

  const clearAll = () => {
    setOutput('');
  };

  return (
    <ToolPageWrapper toolId="lorem-ipsum">
      <div className="tool-layout lg:grid-cols-[300px_1fr] gap-8">
        {/* Controls Side Panel */}
        <div className="flex flex-col gap-6 p-6 card h-fit">
          <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>Generator Settings</h3>

          {/* Number Count Input */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="count-input" className="label">Amount</label>
            <input
              id="count-input"
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Math.max(1, Number(e.target.value)))}
              className="input-base"
              aria-label="Placeholder amount"
            />
          </div>

          {/* Unit selection drop down */}
          <div className="flex flex-col gap-1.5">
            <span className="label">Unit Type</span>
            <Select
              options={UNIT_OPTIONS}
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              aria-label="Placeholder unit type"
            />
          </div>

          {/* Lorem start toggle switch */}
          <div className="border-t pt-4" style={{ borderColor: 'var(--border-default)' }}>
            <Switch
              label="Standard Header"
              checked={startWithLorem}
              onChange={setStartWithLorem}
              description="Start with 'Lorem ipsum dolor sit amet...'"
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <Button onClick={handleGenerate} className="w-full">
              Generate Text
            </Button>
            {output && (
              <Button onClick={clearAll} variant="secondary" className="w-full">
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Text output panel */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="label">Generated Text</span>
            {output && <CopyButton text={output} variant="ghost" size="xs" />}
          </div>

          <Textarea
            readOnly
            value={output}
            placeholder="Generated placeholder text will appear here..."
            className="font-sans text-sm leading-relaxed h-[420px] resize-none p-4"
            aria-label="Generated Lorem Ipsum text"
          />
        </div>
      </div>
    </ToolPageWrapper>
  );
}
