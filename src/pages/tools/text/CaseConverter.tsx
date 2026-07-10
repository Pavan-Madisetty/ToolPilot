import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, CopyButton, Textarea } from '@/components/ui';

export default function CaseConverter() {
  const [text, setText] = useState('');

  const toCamelCase = (str: string) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, '');
  };

  const toSnakeCase = (str: string) => {
    return str.replace(/\s+/g, '_').toLowerCase();
  };

  const toKebabCase = (str: string) => {
    return str.replace(/\s+/g, '-').toLowerCase();
  };

  const handleConvert = (mode: 'upper' | 'lower' | 'camel' | 'snake' | 'kebab') => {
    if (!text) return;

    if (mode === 'upper') {
      setText(text.toUpperCase());
    } else if (mode === 'lower') {
      setText(text.toLowerCase());
    } else if (mode === 'camel') {
      setText(toCamelCase(text));
    } else if (mode === 'snake') {
      setText(toSnakeCase(text));
    } else if (mode === 'kebab') {
      setText(toKebabCase(text));
    }
  };

  return (
    <ToolPageWrapper toolId="case-converter">
      <div className="space-y-6">
        <Textarea
          label={
            <div className="flex items-center justify-between w-full">
              <span>Input String</span>
              {text && (
                <Button onClick={() => setText('')} variant="ghost" size="xs">
                  Clear
                </Button>
              )}
            </div>
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste text here to convert casing formats..."
          className="font-mono text-xs leading-relaxed h-[180px] resize-none"
          aria-label="Input case converter text"
        />

        <div
          className="flex flex-wrap gap-2 pt-4 border-t"
          style={{ borderColor: 'var(--border-default)' }}
        >
          <Button onClick={() => handleConvert('upper')} size="sm">
            UPPERCASE
          </Button>
          <Button onClick={() => handleConvert('lower')} size="sm" variant="secondary">
            lowercase
          </Button>
          <Button onClick={() => handleConvert('camel')} size="sm" variant="secondary">
            camelCase
          </Button>
          <Button onClick={() => handleConvert('snake')} size="sm" variant="secondary">
            snake_case
          </Button>
          <Button onClick={() => handleConvert('kebab')} size="sm" variant="secondary">
            kebab-case
          </Button>
          {text && <CopyButton text={text} />}
        </div>
      </div>
    </ToolPageWrapper>
  );
}
