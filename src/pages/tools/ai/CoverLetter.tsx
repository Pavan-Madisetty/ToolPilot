import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, CopyButton, Input, Select, Textarea } from '@/components/ui';

const TONES = [
  { value: 'Professional', label: 'Professional / Formal' },
  { value: 'Confident', label: 'Confident / Results-driven' },
  { value: 'Casual', label: 'Casual / Friendly' },
  { value: 'Creative', label: 'Creative / Enthusiastic' },
];

export default function CoverLetter() {
  const [name, setName] = useState('Jane Doe');
  const [jobTitle, setJobTitle] = useState('Senior React Developer');
  const [company, setCompany] = useState('Innovative Solutions Ltd.');
  const [achievements, setAchievements] = useState(
    `- Optimized web vitals across core products, leading to a 20% increase in conversions.
- Authored a internal component library that speeded up development by 40%.
- Mentored 3 junior developers.`
  );
  const [tone, setTone] = useState('Confident');

  const coverLetterText = useMemo(() => {
    const pointsList = achievements
      ? achievements
          .split('\n')
          .filter((p) => p.trim() !== '')
          .map((p) => (p.trim().startsWith('-') ? p.trim() : `- ${p.trim()}`))
          .join('\n')
      : '- [Achievement 1]\n- [Achievement 2]';

    const clientName = name || '[Your Name]';
    const titleText = jobTitle || '[Job Title]';
    const compName = company || '[Company Name]';

    let greeting = `Dear Hiring Manager at ${compName},`;
    let intro: string;
    let body: string;
    let closing: string;

    switch (tone) {
      case 'Casual':
        greeting = `Hi team at ${compName},`;
        intro = `I wanted to reach out because I'm super excited about the ${titleText} role. I've been following your work at ${compName} and love the direction you guys are heading.`;
        body = `To give you a quick intro, here are a few things I've worked on recently that I think you'll find interesting:

${pointsList}

I think my background fits perfectly with what you guys are looking for, and I'd love to jump in and start collaborating.`;
        closing = `Thanks so much for reading!

Cheers,
${clientName}`;
        break;

      case 'Confident':
        intro = `I am writing to express my strong interest in the ${titleText} opportunity at ${compName}. With my track record of driving high-impact technical solutions, I am confident that I can bring significant value to your engineering team.`;
        body = `Throughout my career, I have focused on solving complex problems and delivering tangible business outcomes. Some of my notable achievements include:

${pointsList}

I thrive in fast-paced environments and look forward to bringing this same results-oriented focus to ${compName}.`;
        closing = `I welcome the opportunity to discuss how my qualifications align with your current needs. Thank you for your time and consideration.

Sincerely,
${clientName}`;
        break;

      case 'Creative':
        intro = `When looking for my next challenge, I wanted to find a place where innovation isn't just a buzzword, but a daily practice. That is why I was thrilled to discover the ${titleText} role at ${compName}.`;
        body = `I've always believed that great solutions lie at the intersection of robust engineering and user empathy. Over the years, I've had the chance to design and deploy products that push boundaries. Here is what I am proudest of:

${pointsList}

I would love to bring this same creative and technical energy to the projects at ${compName}.`;
        closing = `Let's connect and build something extraordinary together. Thank you for considering my application.

Warmly,
${clientName}`;
        break;

      default:
        // Professional / Formal
        intro = `I am writing to formally apply for the ${titleText} position at ${compName}. I am highly impressed by ${compName}'s market presence and would welcome the chance to contribute to your ongoing success.`;
        body = `In my previous roles, I have developed a solid foundation in software engineering and system design. My key achievements include:

${pointsList}

I am confident that my technical skills and professional background make me a strong candidate for this role.`;
        closing = `Please find my resume attached for your review. I look forward to the possibility of discussing this opportunity further. Thank you for your time.

Sincerely,
${clientName}`;
    }

    return `${greeting}\n\n${intro}\n\n${body}\n\n${closing}`;
  }, [name, jobTitle, company, achievements, tone]);

  const handleClear = () => {
    setName('');
    setJobTitle('');
    setCompany('');
    setAchievements('');
    setTone('Professional');
  };

  return (
    <ToolPageWrapper toolId="cover-letter">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input parameters */}
        <Card className="flex flex-col gap-6" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Cover Letter Parameters
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Provide the details to draft your customized, professional cover letter.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Input
              label="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jane Doe"
              requiredMark
            />

            <Input
              label="Target Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Senior Product Manager"
              requiredMark
            />

            <Input
              label="Company Name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Acme Corp"
              requiredMark
            />

            <Select
              label="Tone / Style"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              options={TONES}
            />

            <Textarea
              label="Key Achievements (One per line)"
              value={achievements}
              onChange={(e) => setAchievements(e.target.value)}
              placeholder="e.g. Saved 10 hours of work per week by automating reports&#10;Managed cross-functional team of 5 designers"
              rows={5}
            />
          </div>

          {(name || jobTitle || company || achievements || tone !== 'Professional') && (
            <div className="flex justify-end pt-4 border-t" style={{ borderColor: 'var(--border-default)' }}>
              <Button onClick={handleClear} variant="secondary" size="sm">
                Reset Form
              </Button>
            </div>
          )}
        </Card>

        {/* Output Letter preview */}
        <Card className="flex flex-col gap-6 justify-between" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
          <div className="flex flex-col gap-4 flex-1">
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Cover Letter Output
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Copy the generated letter below and tweak as needed for your application.
              </p>
            </div>

            <div
              className="p-4 rounded-lg flex-1 min-h-[350px] whitespace-pre-wrap text-sm leading-relaxed overflow-y-auto"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'var(--text-primary)' }}
            >
              {name && jobTitle && company ? (
                coverLetterText
              ) : (
                <span className="italic" style={{ color: 'var(--text-tertiary)' }}>
                  Provide Name, Job Title, and Company to preview your cover letter.
                </span>
              )}
            </div>
          </div>

          {name && jobTitle && company && (
            <div className="flex justify-end pt-4 border-t" style={{ borderColor: 'var(--border-default)' }}>
              <CopyButton text={coverLetterText} label="Copy Letter" size="md" />
            </div>
          )}
        </Card>
      </div>
    </ToolPageWrapper>
  );
}
