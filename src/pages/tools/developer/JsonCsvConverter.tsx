import { useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, Select, Tabs, Textarea } from '@/components/ui';
import { CopyButton } from '@/components/ui/CopyButton';
import { Notice } from '@/components/tools/Notice';
import { csvToObjects, jsonToCsv } from '@/utils/extraToolMath';
import { downloadText } from '@/utils/download';

const SAMPLE_JSON = `[
  { "name": "Asha", "age": 29, "address": { "city": "Pune" } },
  { "name": "Ravi, Jr.", "age": 34, "address": { "city": "Delhi" } }
]`;
const SAMPLE_CSV = 'name,age,city\nAsha,29,Pune\n"Ravi, Jr.",34,Delhi';

export default function JsonCsvConverter() {
  const [mode, setMode] = useState<'json2csv' | 'csv2json'>('json2csv');
  const [delimiter, setDelimiter] = useState(',');
  const [input, setInput] = useState(SAMPLE_JSON);

  const result = useMemo(() => {
    if (!input.trim()) return { out: '', error: '' };
    try {
      if (mode === 'json2csv') return { out: jsonToCsv(JSON.parse(input), delimiter), error: '' };
      const rows = csvToObjects(input, delimiter);
      if (!rows.length) return { out: '', error: 'CSV needs a header row and at least one data row.' };
      return { out: JSON.stringify(rows, null, 2), error: '' };
    } catch (e) {
      return { out: '', error: e instanceof Error ? e.message : 'Invalid input' };
    }
  }, [input, mode, delimiter]);

  const switchMode = (m: 'json2csv' | 'csv2json') => {
    setMode(m);
    setInput(m === 'json2csv' ? SAMPLE_JSON : SAMPLE_CSV);
  };

  return (
    <ToolPageWrapper toolId="json-csv-converter">
      <div className="space-y-6">
        <div className="flex flex-wrap items-end gap-4 justify-between">
          <Tabs
            activeTab={mode}
            onTabChange={(k) => switchMode(k as 'json2csv' | 'csv2json')}
            ariaLabel="Direction"
            tabs={[
              { key: 'json2csv', name: 'JSON → CSV' },
              { key: 'csv2json', name: 'CSV → JSON' },
            ]}
          />
          <div className="w-44">
            <Select
              label="Delimiter"
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              options={[
                { value: ',', label: 'Comma ( , )' },
                { value: ';', label: 'Semicolon ( ; )' },
                { value: '\t', label: 'Tab' },
                { value: '|', label: 'Pipe ( | )' },
              ]}
            />
          </div>
        </div>
        <div className="tool-layout lg:grid-cols-2">
          <Card>
            <Textarea
              label={mode === 'json2csv' ? 'JSON input' : 'CSV input'}
              variant="code"
              rows={16}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck={false}
            />
          </Card>
          <Card className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="label mb-0">{mode === 'json2csv' ? 'CSV output' : 'JSON output'}</span>
              <div className="flex gap-2">
                <CopyButton text={result.out} />
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={!result.out}
                  leftIcon={<Download size={14} />}
                  onClick={() =>
                    downloadText(mode === 'json2csv' ? 'data.csv' : 'data.json', result.out, mode === 'json2csv' ? 'text/csv' : 'application/json')
                  }
                >
                  Download
                </Button>
              </div>
            </div>
            {result.error ? <Notice tone="danger" title="Could not convert">{result.error}</Notice> : <Textarea variant="code" rows={16} value={result.out} readOnly aria-label="Output" />}
          </Card>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
