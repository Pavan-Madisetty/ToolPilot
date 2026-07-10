import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, CopyButton, Input, Textarea } from '@/components/ui';
import { Printer } from 'lucide-react';

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

  // Active template state
  const [activeTemplate, setActiveTemplate] = useState('classic');

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
${
  skills
    ? skills
        .split(',')
        .map((s) => s.trim())
        .join(', ')
    : 'List your skills...'
}
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

  const handlePrint = () => {
    const previewEl = document.querySelector('.resume-preview-container');
    if (!previewEl) return;

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.opacity = '0';
    iframe.style.pointerEvents = 'none';
    document.body.appendChild(iframe);

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      // Read style elements from primary document
      const styleTags = Array.from(document.querySelectorAll('style'))
        .map((s) => s.outerHTML)
        .join('\n');
      const linkTags = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
        .map((l) => l.outerHTML)
        .join('\n');
      const innerHtml = previewEl.innerHTML;

      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Resume Export</title>
            ${linkTags}
            ${styleTags}
            <style>
              body {
                margin: 20mm;
                padding: 0;
                background: white;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              @page {
                size: a4;
                margin: 0;
              }
            </style>
          </head>
          <body>
            <div style="font-family: system-ui, -apple-system, sans-serif;">
              ${innerHtml}
            </div>
          </body>
        </html>
      `);
      doc.close();

      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
      }, 500);
    }
  };

  // 1. Classic Minimalist Layout
  const renderClassic = () => (
    <div className="flex flex-col gap-4 font-sans text-xs text-left text-[var(--text-primary)]">
      <div className="text-center flex flex-col gap-1 border-b pb-4 border-[var(--border-default)]">
        <h1 className="text-2xl font-bold tracking-tight">{name || 'Your Name'}</h1>
        <h2 className="text-sm font-medium tracking-wide text-[var(--text-secondary)]">{title || 'Professional Title'}</h2>
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-[10px] mt-1 text-[var(--text-tertiary)]">
          {email && <span>{email}</span>}
          {email && (phone || location || website) && <span>•</span>}
          {phone && <span>{phone}</span>}
          {phone && (location || website) && <span>•</span>}
          {location && <span>{location}</span>}
          {location && website && <span>•</span>}
          {website && <span>{website}</span>}
        </div>
      </div>
      {summary && (
        <div className="flex flex-col gap-1">
          <h3 className="text-xs font-bold uppercase tracking-wider border-b pb-1 text-[var(--text-secondary)] border-[var(--border-default)]">
            Professional Summary
          </h3>
          <p className="leading-relaxed">{summary}</p>
        </div>
      )}
      {experience && (
        <div className="flex flex-col gap-1">
          <h3 className="text-xs font-bold uppercase tracking-wider border-b pb-1 text-[var(--text-secondary)] border-[var(--border-default)]">
            Experience
          </h3>
          <div className="whitespace-pre-wrap leading-relaxed">{experience}</div>
        </div>
      )}
      {education && (
        <div className="flex flex-col gap-1">
          <h3 className="text-xs font-bold uppercase tracking-wider border-b pb-1 text-[var(--text-secondary)] border-[var(--border-default)]">
            Education
          </h3>
          <div className="whitespace-pre-wrap leading-relaxed">{education}</div>
        </div>
      )}
      {skills && (
        <div className="flex flex-col gap-1">
          <h3 className="text-xs font-bold uppercase tracking-wider border-b pb-1 text-[var(--text-secondary)] border-[var(--border-default)]">
            Skills
          </h3>
          <p className="leading-relaxed">{skills.split(',').map(s => s.trim()).join(' • ')}</p>
        </div>
      )}
    </div>
  );

  // 2. Modern Executive Layout (Blue accent header, two columns)
  const renderExecutive = () => (
    <div className="flex flex-col gap-5 font-sans text-xs text-left text-slate-800 dark:text-slate-200">
      <div className="flex flex-col md:flex-row justify-between items-start border-b pb-4 gap-4 border-[var(--border-default)]">
        <div>
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">{name || 'Your Name'}</h1>
          <h2 className="text-sm font-semibold tracking-wide text-slate-600 dark:text-slate-400">{title || 'Professional Title'}</h2>
        </div>
        <div className="flex flex-col text-right text-[10px] text-slate-500 gap-0.5">
          {email && <span>Email: {email}</span>}
          {phone && <span>Phone: {phone}</span>}
          {location && <span>Location: {location}</span>}
          {website && <span>Web: {website}</span>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 flex flex-col gap-4">
          {summary && (
            <div className="flex flex-col gap-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 border-b pb-1 border-[var(--border-default)]">Profile Summary</h3>
              <p className="leading-relaxed">{summary}</p>
            </div>
          )}
          {experience && (
            <div className="flex flex-col gap-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 border-b pb-1 border-[var(--border-default)]">Work Experience</h3>
              <div className="whitespace-pre-wrap leading-relaxed">{experience}</div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          {education && (
            <div className="flex flex-col gap-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 border-b pb-1 border-[var(--border-default)]">Education</h3>
              <div className="whitespace-pre-wrap leading-relaxed">{education}</div>
            </div>
          )}
          {skills && (
            <div className="flex flex-col gap-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 border-b pb-1 border-[var(--border-default)]">Expertise</h3>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {skills.split(',').map((s, idx) => (
                  <span key={idx} className="bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 text-[10px] px-2 py-0.5 rounded font-semibold">
                    {s.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // 3. Elegant Serif Layout (Georgia, centered)
  const renderSerif = () => (
    <div className="flex flex-col gap-4 text-xs text-left text-slate-900 dark:text-slate-100" style={{ fontFamily: 'Georgia, serif' }}>
      <div className="text-center flex flex-col gap-1 border-b pb-3 border-[var(--border-default)]">
        <h1 className="text-2xl font-normal italic tracking-tight">{name || 'Your Name'}</h1>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{title || 'Professional Title'}</h2>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10px] mt-1 text-slate-500 italic">
          {email && <span>{email}</span>}
          {phone && <span>{phone}</span>}
          {location && <span>{location}</span>}
          {website && <span>{website}</span>}
        </div>
      </div>
      {summary && (
        <div className="flex flex-col gap-1">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 text-center">Summary</h3>
          <p className="leading-relaxed text-justify">{summary}</p>
        </div>
      )}
      {experience && (
        <div className="flex flex-col gap-1">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 text-center">Experience</h3>
          <div className="whitespace-pre-wrap leading-relaxed">{experience}</div>
        </div>
      )}
      {education && (
        <div className="flex flex-col gap-1">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 text-center">Education</h3>
          <div className="whitespace-pre-wrap leading-relaxed">{education}</div>
        </div>
      )}
      {skills && (
        <div className="flex flex-col gap-1">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 text-center">Core Skills</h3>
          <p className="leading-relaxed text-center italic">{skills.split(',').map(s => s.trim()).join(' • ')}</p>
        </div>
      )}
    </div>
  );

  // 4. Creative Designer (Gradient Header, Left Border Accents)
  const renderCreative = () => (
    <div className="flex flex-col gap-4 font-sans text-xs text-left text-slate-800 dark:text-slate-200">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-lg flex flex-col gap-1.5">
        <h1 className="text-2xl font-extrabold">{name || 'Your Name'}</h1>
        <h2 className="text-sm font-semibold text-indigo-100">{title || 'Professional Title'}</h2>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-indigo-200 mt-1">
          {email && <span>📧 {email}</span>}
          {phone && <span>📞 {phone}</span>}
          {location && <span>📍 {location}</span>}
          {website && <span>🌐 {website}</span>}
        </div>
      </div>
      {summary && (
        <div className="flex flex-col gap-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 border-l-4 pl-2" style={{ borderColor: '#7c3aed' }}>Summary</h3>
          <p className="leading-relaxed">{summary}</p>
        </div>
      )}
      {experience && (
        <div className="flex flex-col gap-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 border-l-4 pl-2" style={{ borderColor: '#7c3aed' }}>Experience</h3>
          <div className="whitespace-pre-wrap leading-relaxed">{experience}</div>
        </div>
      )}
      {education && (
        <div className="flex flex-col gap-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 border-l-4 pl-2" style={{ borderColor: '#7c3aed' }}>Education</h3>
          <div className="whitespace-pre-wrap leading-relaxed">{education}</div>
        </div>
      )}
      {skills && (
        <div className="flex flex-col gap-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 border-l-4 pl-2" style={{ borderColor: '#7c3aed' }}>Skills</h3>
          <div className="flex flex-wrap gap-1 pt-1">
            {skills.split(',').map((s, idx) => (
              <span key={idx} className="bg-purple-100 dark:bg-purple-950/20 text-purple-700 dark:text-purple-400 text-[10px] px-2 py-0.5 rounded font-medium">
                {s.trim()}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // 5. Corporate Traditional (Navy accents, double line borders)
  const renderCorporate = () => (
    <div className="flex flex-col gap-4 font-serif text-xs text-left text-slate-900 dark:text-slate-100">
      <div className="flex justify-between items-end border-b-4 border-double pb-2" style={{ borderColor: '#1e3a8a' }}>
        <div>
          <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-400" style={{ fontFamily: 'Georgia, serif' }}>{name || 'Your Name'}</h1>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">{title || 'Professional Title'}</h2>
        </div>
        <div className="flex flex-col text-right text-[10px] text-slate-600 dark:text-slate-400">
          <span>{email} | {phone}</span>
          <span>{location} | {website}</span>
        </div>
      </div>
      {summary && (
        <div className="flex flex-col gap-1">
          <h3 className="text-xs font-bold uppercase tracking-widest text-blue-900 dark:text-blue-400 border-b pb-0.5" style={{ borderColor: '#1e3a8a' }}>Professional Summary</h3>
          <p className="leading-relaxed">{summary}</p>
        </div>
      )}
      {experience && (
        <div className="flex flex-col gap-1">
          <h3 className="text-xs font-bold uppercase tracking-widest text-blue-900 dark:text-blue-400 border-b pb-0.5" style={{ borderColor: '#1e3a8a' }}>Work Experience</h3>
          <div className="whitespace-pre-wrap leading-relaxed">{experience}</div>
        </div>
      )}
      {education && (
        <div className="flex flex-col gap-1">
          <h3 className="text-xs font-bold uppercase tracking-widest text-blue-900 dark:text-blue-400 border-b pb-0.5" style={{ borderColor: '#1e3a8a' }}>Education</h3>
          <div className="whitespace-pre-wrap leading-relaxed">{education}</div>
        </div>
      )}
      {skills && (
        <div className="flex flex-col gap-1">
          <h3 className="text-xs font-bold uppercase tracking-widest text-blue-900 dark:text-blue-400 border-b pb-0.5" style={{ borderColor: '#1e3a8a' }}>Technical Skills</h3>
          <p className="leading-relaxed">{skills.split(',').map(s => s.trim()).join(' • ')}</p>
        </div>
      )}
    </div>
  );

  // 6. High-Compliance ATS (Clean layouts, minimal graphics)
  const renderAts = () => (
    <div className="flex flex-col gap-4 font-sans text-xs text-left text-black bg-white p-2">
      <div>
        <h1 className="text-xl font-bold uppercase">{name || 'Your Name'}</h1>
        <p className="text-[10px] mt-1 text-slate-700">
          {email && `Email: ${email}`} {phone && `| Phone: ${phone}`} {location && `| Location: ${location}`} {website && `| Web: ${website}`}
        </p>
      </div>
      {summary && (
        <div className="flex flex-col">
          <h2 className="text-xs font-bold uppercase border-b pb-0.5 mb-1" style={{ borderColor: '#000' }}>Professional Summary</h2>
          <p className="leading-relaxed">{summary}</p>
        </div>
      )}
      {experience && (
        <div className="flex flex-col">
          <h2 className="text-xs font-bold uppercase border-b pb-0.5 mb-1" style={{ borderColor: '#000' }}>Work Experience</h2>
          <div className="whitespace-pre-wrap leading-relaxed">{experience}</div>
        </div>
      )}
      {education && (
        <div className="flex flex-col">
          <h2 className="text-xs font-bold uppercase border-b pb-0.5 mb-1" style={{ borderColor: '#000' }}>Education</h2>
          <div className="whitespace-pre-wrap leading-relaxed">{education}</div>
        </div>
      )}
      {skills && (
        <div className="flex flex-col">
          <h2 className="text-xs font-bold uppercase border-b pb-0.5 mb-1" style={{ borderColor: '#000' }}>Skills</h2>
          <p className="leading-relaxed">{skills.split(',').map(s => s.trim()).join(', ')}</p>
        </div>
      )}
    </div>
  );

  return (
    <ToolPageWrapper toolId="resume-builder">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Form Editor */}
        <Card
          className="flex flex-col gap-6"
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
        >
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Resume Details
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Fill in your contact and professional details. The ATS preview will update in real-time.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4
              className="text-sm font-bold uppercase tracking-wider mt-2"
              style={{ color: 'var(--text-tertiary)' }}
            >
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

            <h4
              className="text-sm font-bold uppercase tracking-wider mt-4"
              style={{ color: 'var(--text-tertiary)' }}
            >
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

          <div
            className="flex justify-end pt-4 border-t"
            style={{ borderColor: 'var(--border-default)' }}
          >
            <Button onClick={handleClear} variant="secondary" size="sm">
              Reset Resume
            </Button>
          </div>
        </Card>

        {/* Right Column: ATS Preview & Export */}
        <div className="flex flex-col gap-6">
          {/* Action Header */}
          <Card
            className="flex items-center justify-between py-4"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
          >
            <div className="flex flex-wrap gap-3 items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                  Template:
                </span>
                <select
                  value={activeTemplate}
                  onChange={(e) => setActiveTemplate(e.target.value)}
                  className="text-xs p-1.5 border rounded-lg bg-[var(--bg-base)] text-[var(--text-primary)] border-[var(--border-default)] outline-none cursor-pointer font-semibold"
                >
                  <option value="classic">Classic Minimalist</option>
                  <option value="executive">Modern Executive</option>
                  <option value="serif">Elegant Serif</option>
                  <option value="creative">Creative Designer</option>
                  <option value="corporate">Corporate Traditional</option>
                  <option value="ats">ATS Optimized</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={handlePrint} className="flex items-center gap-1.5">
                  <Printer size={14} />
                  Print PDF
                </Button>
                <CopyButton text={markdownText} label="Copy Markdown" size="sm" />
              </div>
            </div>
          </Card>

          {/* Real-time Document Preview */}
          <Card
            className="flex-1 overflow-auto"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
          >
            <div
              className="resume-preview-container p-6 rounded-lg font-sans text-xs flex flex-col gap-4 text-left shadow-sm min-h-[500px]"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-primary)',
              }}
            >
              {activeTemplate === 'classic' && renderClassic()}
              {activeTemplate === 'executive' && renderExecutive()}
              {activeTemplate === 'serif' && renderSerif()}
              {activeTemplate === 'creative' && renderCreative()}
              {activeTemplate === 'corporate' && renderCorporate()}
              {activeTemplate === 'ats' && renderAts()}
            </div>
          </Card>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
