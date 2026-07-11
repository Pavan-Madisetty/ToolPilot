import { useState, useEffect } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, CopyButton, Textarea } from '@/components/ui';

export default function RemoveSpaces() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [rule, setRule] = useState<'collapse' | 'strip-all' | 'trim-lines' | 'remove-newlines'>('collapse');

  useEffect(() => {
    if (!inputText) {
      setOutputText('');
      return;
    }

    let result = inputText;

    if (rule === 'collapse') {
      // Replaces multiple consecutive spaces with a single space
      result = inputText.replace(/[ \t]+/g, ' ');
    } else if (rule === 'strip-all') {
      // Removes all spaces and tab spaces completely
      result = inputText.replace(/\s+/g, '');
    } else if (rule === 'trim-lines') {
      // Trims leading/trailing whitespace on each line
      result = inputText
        .split('\n')
        .map((line) => line.trim())
        .join('\n');
    } else if (rule === 'remove-newlines') {
      // Replaces line breaks with a single space
      result = inputText.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ');
    }

    setOutputText(result);
  }, [inputText, rule]);

  return (
    <ToolPageWrapper toolId="remove-spaces">
      <div className="space-y-6">
        {/* Cleaning Spacing Rule Selector */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              { id: 'collapse', label: 'Collapse Double Spaces' },
              { id: 'strip-all', label: 'Strip All Spaces' },
              { id: 'trim-lines', label: 'Trim Lines' },
              { id: 'remove-newlines', label: 'Remove Line Breaks' },
            ] as const
          ).map((item) => (
            <Button
              key={item.id}
              onClick={() => setRule(item.id)}
              variant={rule === item.id ? 'primary' : 'secondary'}
              size="sm"
            >
              {item.label}
            </Button>
          ))}
        </div>

        {/* Input box */}
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
          placeholder="Paste text with messy spacing or multiple empty line segments..."
          className="h-[150px] resize-none"
        />

        {/* Output Area */}
        {outputText && (
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[var(--text-secondary)]">Cleaned Output</span>
            <div className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] min-h-[120px] flex flex-col justify-between">
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
