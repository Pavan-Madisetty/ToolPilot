import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, CopyButton, Input, Select, Textarea } from '@/components/ui';

const ROLES = [
  { value: 'General Assistant', label: 'General Assistant' },
  { value: 'Software Engineer', label: 'Software Engineer' },
  { value: 'Marketing Specialist', label: 'Marketing Specialist' },
  { value: 'Copywriter', label: 'Copywriter' },
  { value: 'Data Analyst', label: 'Data Analyst' },
  { value: 'Product Manager', label: 'Product Manager' },
  { value: 'custom', label: 'Custom Role...' },
];

const TONES = [
  { value: 'Professional', label: 'Professional' },
  { value: 'Casual', label: 'Casual' },
  { value: 'Instructional / Direct', label: 'Instructional / Direct' },
  { value: 'Creative', label: 'Creative' },
  { value: 'Academic', label: 'Academic' },
  { value: 'Friendly / Empathetic', label: 'Friendly / Empathetic' },
];

export default function PromptBuilder() {
  const [role, setRole] = useState('General Assistant');
  const [customRole, setCustomRole] = useState('');
  const [task, setTask] = useState('');
  const [tone, setTone] = useState('Professional');
  const [constraints, setConstraints] = useState('');

  const finalRole = role === 'custom' ? customRole : role;

  const generatedPrompt = useMemo(() => {
    if (!task) return '';

    return `# SYSTEM ROLE
Act as a expert ${finalRole || 'AI Assistant'}. You have deep domain knowledge and follow instructions strictly.

# TASK / OBJECTIVE
${task}

# TONE & STYLE
Maintain a ${tone} tone throughout the response.

# CONSTRAINTS & FORMATTING
${constraints ? `- ${constraints}\n` : ''}- Provide a direct and clear response.
- Do not include conversational filler, introductory remarks, or concluding pleasantries unless explicitly requested.`;
  }, [finalRole, task, tone, constraints]);

  const handleClear = () => {
    setRole('General Assistant');
    setCustomRole('');
    setTask('');
    setTone('Professional');
    setConstraints('');
  };

  return (
    <ToolPageWrapper toolId="prompt-builder">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Column */}
        <Card
          className="flex flex-col gap-6"
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
        >
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Prompt Parameters
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Define the role, task, tone, and formatting constraints to build your optimized
              prompt.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Select
              label="AI Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              options={ROLES}
            />

            {role === 'custom' && (
              <Input
                label="Custom Role"
                value={customRole}
                onChange={(e) => setCustomRole(e.target.value)}
                placeholder="e.g. UX Designer, Financial Advisor"
                requiredMark
              />
            )}

            <Textarea
              label="Task / Objective"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Describe what you want the AI to do (e.g. Write a script to calculate compound interest in Python)"
              requiredMark
              rows={4}
            />

            <Select
              label="Tone / Style"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              options={TONES}
            />

            <Input
              label="Formatting Constraints"
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
              placeholder="e.g. Format as markdown list, Max 3 paragraphs, Return only JSON"
            />
          </div>

          {(role !== 'General Assistant' ||
            customRole ||
            task ||
            tone !== 'Professional' ||
            constraints) && (
            <div
              className="flex justify-end pt-4 border-t"
              style={{ borderColor: 'var(--border-default)' }}
            >
              <Button onClick={handleClear} variant="secondary" size="sm">
                Reset Form
              </Button>
            </div>
          )}
        </Card>

        {/* Output Column */}
        <Card
          className="flex flex-col gap-6 justify-between animate-fade-in"
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
        >
          <div className="flex flex-col gap-4 flex-1">
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Structured Prompt Template
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Copy the structured prompt and paste it into your favorite AI tool (ChatGPT, Claude,
                Gemini, etc.).
              </p>
            </div>

            <div
              className="p-4 rounded-lg flex-1 min-h-[250px] font-mono text-xs whitespace-pre-wrap leading-relaxed overflow-y-auto"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-default)',
              }}
            >
              {generatedPrompt ? (
                <span style={{ color: 'var(--text-primary)' }}>{generatedPrompt}</span>
              ) : (
                <span className="italic" style={{ color: 'var(--text-tertiary)' }}>
                  Complete the Task / Objective field to generate your prompt template.
                </span>
              )}
            </div>
          </div>

          {generatedPrompt && (
            <div
              className="flex justify-end pt-4 border-t"
              style={{ borderColor: 'var(--border-default)' }}
            >
              <CopyButton text={generatedPrompt} label="Copy Prompt" size="md" />
            </div>
          )}
        </Card>
      </div>
    </ToolPageWrapper>
  );
}
