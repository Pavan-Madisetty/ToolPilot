import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, CopyButton, Input, Textarea } from '@/components/ui';

export default function ResumeBuilder() {
  // Contact Info states
  const [name, setName] = useState('Jane Doe');
  const [title, setTitle] = useState('Senior Software Engineer');
  const [email, setEmail] = useState('jane.doe@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [location, setLocation] = useState('Bengaluru, India');
  const [website, setWebsite] = useState('linkedin.com/in/janedoe');

  // Resume content states
  const [summary, setSummary] = useState(
    'Passionate software engineer with 5+ years of experience building scalable web applications. Expert in React, TypeScript, and cloud architecture.'
  );
  const [experience, setExperience] = useState(
    `Senior Software Engineer | Tech Solutions (2023 - Present)
- Led a team of 4 developers to build a high-performance analytics dashboard.
- Optimized app load time by 35% through code-splitting and memoization.
- Established CI/CD pipelines to streamline deployment workflows.

Software Engineer | Innovate Corp (2021 - 2023)
- Designed and built responsive web applications using React and Tailwind CSS.
- Developed backend microservices using Node.js and PostgreSQL.
- Collaborated with product managers to deliver features on tight timelines.`
  );
  const [education, setEducation] = useState(
    `Master of Science in Computer Science | Tech University (2019 - 2021)
Bachelor of Science in Information Technology | State College (2015 - 2019)`
  );
  const [skills, setSkills] = useState(
    'React, TypeScript, JavaScript, Node.js, HTML5, CSS3, Tailwind CSS, PostgreSQL, AWS, Git, CI/CD'
  );

  // Formatted Markdown Export
  const markdownText = useMemo(() => {
    return `# ${name || 'Your Name'}
**${title || 'Job Title'}**

${email ? `Email: ${email} | ` : ''}${phone ? `Phone: ${phone} | ` : ''}${location ? `Location: ${location} | ` : ''}${website ? `Web: ${website}` : ''}

---

## PROFESSIONAL SUMMARY
${summary || 'A brief professional summary...'}

---

## EXPERIENCE
${experience || 'Describe your work experience...'}

---

## EDUCATION
${education || 'Describe your education...'}

---

## SKILLS
${skills ? skills.split(',').map((s) => s.trim()).join(', ') : 'List your skills...'}
`;
  }, [name, title, email, phone, location, website, summary, experience, education, skills]);

  const handleClear = () => {
    setName('');
    setTitle('');
    setEmail('');
    setPhone('');
    setLocation('');
    setWebsite('');
    setSummary('');
    setExperience('');
    setEducation('');
    setSkills('');
  };

  return (
    <ToolPageWrapper toolId="resume-builder">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Form Editor */}
        <Card className="flex flex-col gap-6" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Resume Details
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Fill in your contact and professional details. The ATS preview will update in real-time.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wider mt-2" style={{ color: 'var(--text-tertiary)' }}>
              1. Contact Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                requiredMark
              />
              <Input
                label="Professional Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Senior Software Engineer"
                requiredMark
              />
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane.doe@example.com"
              />
              <Input
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
              />
              <Input
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, Country"
              />
              <Input
                label="Website / LinkedIn"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="linkedin.com/in/username"
              />
            </div>

            <h4 className="text-sm font-bold uppercase tracking-wider mt-4" style={{ color: 'var(--text-tertiary)' }}>
              2. Content Sections
            </h4>
            <Textarea
              label="Professional Summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Write 2-3 lines summarizing your professional background..."
              rows={3}
            />

            <Textarea
              label="Work Experience (Use markdown lists for bullet points)"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="e.g. Job Title | Company Name (Period)&#10;- Action verb achievements...&#10;- Technical contributions..."
              rows={6}
            />

            <Textarea
              label="Education"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder="Degree | Institution Name (Year)"
              rows={3}
            />

            <Input
              label="Skills (Comma-separated)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. React, Node.js, AWS, Python"
            />
          </div>

          <div className="flex justify-end pt-4 border-t" style={{ borderColor: 'var(--border-default)' }}>
            <Button onClick={handleClear} variant="secondary" size="sm">
              Reset Resume
            </Button>
          </div>
        </Card>

        {/* Right Column: ATS Preview & Export */}
        <div className="flex flex-col gap-6">
          {/* Action Header */}
          <Card className="flex items-center justify-between py-4" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Resume Actions
            </span>
            <div className="flex gap-2">
              <CopyButton text={markdownText} label="Copy Markdown" size="sm" />
            </div>
          </Card>

          {/* Real-time Document Preview */}
          <Card className="flex-1 overflow-auto" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
            <div 
              className="p-6 rounded-lg font-sans text-xs flex flex-col gap-4 text-left shadow-sm min-h-[500px]"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'var(--text-primary)' }}
            >
              {/* Header */}
              <div className="text-center flex flex-col gap-1 border-b pb-4" style={{ borderColor: 'var(--border-default)' }}>
                <h1 className="text-2xl font-bold tracking-tight">{name || 'Your Name'}</h1>
                <h2 className="text-sm font-medium tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                  {title || 'Professional Title'}
                </h2>
                <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-[10px] mt-1" style={{ color: 'var(--text-tertiary)' }}>
                  {email && <span>{email}</span>}
                  {email && (phone || location || website) && <span>•</span>}
                  {phone && <span>{phone}</span>}
                  {phone && (location || website) && <span>•</span>}
                  {location && <span>{location}</span>}
                  {location && website && <span>•</span>}
                  {website && <span>{website}</span>}
                </div>
              </div>

              {/* Summary */}
              {summary && (
                <div className="flex flex-col gap-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider border-b pb-1" style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>
                    Professional Summary
                  </h3>
                  <p className="leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                    {summary}
                  </p>
                </div>
              )}

              {/* Experience */}
              {experience && (
                <div className="flex flex-col gap-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider border-b pb-1" style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>
                    Professional Experience
                  </h3>
                  <div className="whitespace-pre-wrap leading-relaxed pr-2" style={{ color: 'var(--text-primary)' }}>
                    {experience}
                  </div>
                </div>
              )}

              {/* Education */}
              {education && (
                <div className="flex flex-col gap-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider border-b pb-1" style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>
                    Education
                  </h3>
                  <div className="whitespace-pre-wrap leading-relaxed pr-2" style={{ color: 'var(--text-primary)' }}>
                    {education}
                  </div>
                </div>
              )}

              {/* Skills */}
              {skills && (
                <div className="flex flex-col gap-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider border-b pb-1" style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>
                    Skills
                  </h3>
                  <p className="leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                    {skills.split(',').map((s) => s.trim()).join(' • ')}
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
