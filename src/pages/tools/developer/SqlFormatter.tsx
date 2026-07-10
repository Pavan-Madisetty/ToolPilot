import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Select, CopyButton, Textarea } from '@/components/ui';

const INDENT_OPTIONS = [
  { value: '2', label: '2 Spaces' },
  { value: '4', label: '4 Spaces' },
  { value: 'tab', label: 'Tabs' },
];

function formatSql(sql: string, indentSize: string): string {
  if (!sql.trim()) return '';

  // Clean up existing whitespace first
  let cleaned = sql.replace(/\s+/g, ' ').trim();

  // List of keywords to uppercase
  const keywords = [
    'select',
    'from',
    'where',
    'and',
    'or',
    'join',
    'left join',
    'right join',
    'inner join',
    'outer join',
    'group by',
    'order by',
    'having',
    'limit',
    'insert into',
    'values',
    'update',
    'set',
    'delete from',
    'on',
    'as',
    'union',
    'create table',
    'alter table',
    'drop table',
    'index',
    'in',
    'into',
    'is',
    'null',
    'not',
    'like',
  ];

  // Capitalize SQL keywords
  keywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    cleaned = cleaned.replace(regex, keyword.toUpperCase());
  });

  // Keywords that force a line break
  const lineBreaks = [
    'SELECT',
    'FROM',
    'WHERE',
    'LEFT JOIN',
    'RIGHT JOIN',
    'INNER JOIN',
    'OUTER JOIN',
    'JOIN',
    'GROUP BY',
    'ORDER BY',
    'HAVING',
    'LIMIT',
    'INSERT INTO',
    'VALUES',
    'UPDATE',
    'SET',
    'DELETE FROM',
    'UNION',
  ];

  lineBreaks.forEach((term) => {
    const regex = new RegExp(`\\b${term}\\b`, 'g');
    cleaned = cleaned.replace(regex, `\n${term}`);
  });

  const lines = cleaned.split('\n');
  const indentStr = indentSize === 'tab' ? '\t' : ' '.repeat(Number(indentSize));
  let currentIndent = 0;

  return lines
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const firstWord = line.split(' ')[0];
      let indent = currentIndent;

      // Minor indent adjustments for clauses like AND/OR
      if (['AND', 'OR', 'ON'].includes(firstWord)) {
        indent += 1;
      }

      // Track parenthesis nesting depth
      const openCount = (line.match(/\(/g) || []).length;
      const closeCount = (line.match(/\)/g) || []).length;
      currentIndent += openCount - closeCount;
      if (currentIndent < 0) currentIndent = 0;

      return indentStr.repeat(indent) + line;
    })
    .join('\n');
}

export default function SqlFormatter() {
  const [input, setInput] = useState('');
  const [indent, setIndent] = useState('4');
  const [output, setOutput] = useState('');

  const handleFormat = () => {
    const formatted = formatSql(input, indent);
    setOutput(formatted);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
  };

  return (
    <ToolPageWrapper toolId="sql-formatter">
      <div className="tool-layout lg:grid-cols-2">
        {/* Input panel */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="label">Raw SQL query</span>
            <Button onClick={clearAll} variant="ghost" size="xs">
              Clear
            </Button>
          </div>

          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your unformatted SQL query here...\ne.g. select id, name, email from users where active = 1 order by created_at desc"
            className="font-mono text-xs leading-relaxed h-[400px] resize-none"
            aria-label="SQL input query"
          />

          <div
            className="flex flex-wrap items-center justify-between gap-3 border-t pt-4"
            style={{ borderColor: 'var(--border-default)' }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                Indent:
              </span>
              <Select
                options={INDENT_OPTIONS}
                value={indent}
                onChange={(e) => setIndent(e.target.value)}
                className="max-w-[130px] py-1 px-2 text-xs"
                aria-label="SQL Indentation selector"
              />
            </div>

            <Button onClick={handleFormat} className="mt-2 sm:mt-0">
              Format SQL Query
            </Button>
          </div>
        </div>

        {/* Output panel */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="label">Beautified Output</span>
            {output && <CopyButton text={output} variant="ghost" size="xs" />}
          </div>

          <Textarea
            readOnly
            value={output}
            placeholder="Formatted query will appear here..."
            className="font-mono text-xs leading-relaxed h-[456px] resize-none"
            aria-label="Formatted SQL output query"
          />
        </div>
      </div>
    </ToolPageWrapper>
  );
}
