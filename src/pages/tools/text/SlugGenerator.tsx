import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, CopyButton, Input, Switch } from '@/components/ui';

export default function SlugGenerator() {
  const [inputText, setInputText] = useState('');
  const [isLowercase, setIsLowercase] = useState(true);
  const [removeSpecial, setRemoveSpecial] = useState(true);
  const [replaceSpaces, setReplaceSpaces] = useState(true);

  const slug = useMemo(() => {
    if (!inputText) return '';
    let result = inputText;

    if (isLowercase) {
      result = result.toLowerCase();
    }

    if (replaceSpaces) {
      // Replace spaces with hyphens
      result = result.replace(/\s+/g, '-');
    }

    if (removeSpecial) {
      // Keep only alphanumeric, hyphens, and underscores
      // If spaces were replaced, they are hyphens now.
      if (replaceSpaces) {
        result = result.replace(/[^a-zA-Z0-9-_]/g, '');
      } else {
        result = result.replace(/[^a-zA-Z0-9\s-_]/g, '');
      }
    }

    // Clean up multiple consecutive hyphens or underscores
    if (replaceSpaces) {
      result = result.replace(/-+/g, '-').replace(/^-+|-+$/g, '');
    }

    return result;
  }, [inputText, isLowercase, removeSpecial, replaceSpaces]);

  const handleClear = () => {
    setInputText('');
  };

  return (
    <ToolPageWrapper toolId="slug-generator">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Configuration Column */}
        <Card className="flex flex-col gap-6" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Configuration
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Input your text and select the transformation rules.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Input
              label="Source Text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g. Learn React TypeScript in 2026! @Productivity"
              requiredMark
            />

            <div className="flex flex-col gap-3 pt-2">
              <Switch
                label="Convert to Lowercase"
                description="Make all characters lowercase for URL standards"
                checked={isLowercase}
                onChange={setIsLowercase}
              />
              
              <Switch
                label="Remove Special Characters"
                description="Strip punctuation, symbols, and non-alphanumeric characters"
                checked={removeSpecial}
                onChange={setRemoveSpecial}
              />

              <Switch
                label="Replace Spaces"
                description="Convert whitespace characters to hyphens (-)"
                checked={replaceSpaces}
                onChange={setReplaceSpaces}
              />
            </div>
          </div>

          {inputText && (
            <div className="flex justify-end pt-4 border-t" style={{ borderColor: 'var(--border-default)' }}>
              <Button onClick={handleClear} variant="secondary" size="sm">
                Clear Input
              </Button>
            </div>
          )}
        </Card>

        {/* Output Column */}
        <Card className="flex flex-col gap-6 justify-between" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Generated Slug
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Your URL-friendly slug is shown below.
              </p>
            </div>

            <div 
              className="p-4 rounded-lg min-h-[80px] flex items-center justify-between font-mono text-sm break-all"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}
            >
              {slug ? (
                <span className="flex-1" style={{ color: 'var(--text-primary)' }}>
                  {slug}
                </span>
              ) : (
                <span className="italic" style={{ color: 'var(--text-tertiary)' }}>
                  Slug will appear here once you enter text.
                </span>
              )}
            </div>
          </div>

          {slug && (
            <div className="flex justify-end pt-4 border-t" style={{ borderColor: 'var(--border-default)' }}>
              <CopyButton text={slug} label="Copy Slug" size="md" />
            </div>
          )}
        </Card>
      </div>
    </ToolPageWrapper>
  );
}
