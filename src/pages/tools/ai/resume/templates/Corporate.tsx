// ─────────────────────────────────────────────────────────────
// Template: Corporate — Traditional conservative layout
// ─────────────────────────────────────────────────────────────
import React from 'react';
import type {
  TemplateRenderProps,
  ResumeCustomization,
  Education,
  Experience,
  Skill,
  Project,
  Certificate,
  Achievement,
} from '@/types/resume';

// ── Helpers ──────────────────────────────────────────────────

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function formatDate(date: string): string {
  if (!date) return '';
  if (date.toLowerCase() === 'present') return 'Present';
  const parts = date.split('-');
  if (parts.length === 2) {
    const monthIdx = parseInt(parts[1], 10) - 1;
    if (monthIdx >= 0 && monthIdx < 12) return `${MONTHS[monthIdx]} ${parts[0]}`;
  }
  return date;
}

function headingTransform(style: ResumeCustomization['headingStyle']): string {
  if (style === 'uppercase') return 'uppercase';
  if (style === 'capitalize') return 'capitalize';
  return 'none';
}

function getPageDimensions(size: ResumeCustomization['pageSize']) {
  return size === 'Letter'
    ? { width: '216mm', height: '279mm' }
    : { width: '210mm', height: '297mm' };
}

// ── Component ────────────────────────────────────────────────

const Corporate: React.FC<TemplateRenderProps> = ({ data, customization }) => {
  const {
    primaryColor,
    secondaryColor,
    fontFamily,
    fontSize,
    headingStyle,
    lineSpacing,
    pageMargins,
    pageSize,
    visibleSections,
    sectionOrder,
  } = customization;

  const page = getPageDimensions(pageSize);
  const baseFontPt = fontSize;
  const textColor = '#2d3748';
  const subtleGray = '#718096';
  const borderColor = primaryColor;

  // ── Styles ───────────────────────────────────────────────

  const s = {
    page: {
      width: page.width,
      minHeight: page.height,
      fontFamily,
      fontSize: `${baseFontPt}pt`,
      lineHeight: lineSpacing,
      color: textColor,
      padding: `${pageMargins}mm`,
      background: '#ffffff',
      boxSizing: 'border-box' as const,
    } as React.CSSProperties,

    headerRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: '8px',
    } as React.CSSProperties,

    headerName: {
      fontSize: `${baseFontPt * 2.2}pt`,
      fontWeight: 700,
      color: primaryColor,
      letterSpacing: '0.5px',
    } as React.CSSProperties,

    headerContact: {
      textAlign: 'right' as const,
      fontSize: `${baseFontPt * 0.88}pt`,
      color: secondaryColor,
      lineHeight: 1.6,
    } as React.CSSProperties,

    doubleRule: {
      borderTop: `2px solid ${borderColor}`,
      borderBottom: `1px solid ${borderColor}`,
      height: '4px',
      margin: '0 0 18px 0',
    } as React.CSSProperties,

    sectionWrapper: {
      marginBottom: '16px',
      pageBreakInside: 'avoid' as const,
    } as React.CSSProperties,

    sectionHeading: {
      fontSize: `${baseFontPt * 1.15}pt`,
      fontWeight: 700,
      color: primaryColor,
      textTransform: headingTransform(headingStyle) as React.CSSProperties['textTransform'],
      letterSpacing: '1.5px',
      borderBottom: `1.5px solid ${borderColor}`,
      paddingBottom: '3px',
      marginBottom: '10px',
    } as React.CSSProperties,

    entryBlock: {
      marginBottom: '12px',
      pageBreakInside: 'avoid' as const,
    } as React.CSSProperties,

    entryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      flexWrap: 'wrap' as const,
    } as React.CSSProperties,

    entryTitle: {
      fontWeight: 700,
      fontSize: `${baseFontPt * 1.05}pt`,
      color: textColor,
    } as React.CSSProperties,

    entryDate: {
      fontSize: `${baseFontPt * 0.88}pt`,
      color: subtleGray,
    } as React.CSSProperties,

    entrySubtitle: {
      fontSize: `${baseFontPt * 0.95}pt`,
      color: subtleGray,
      marginBottom: '3px',
      fontStyle: 'italic' as const,
    } as React.CSSProperties,

    bodyText: {
      fontSize: `${baseFontPt}pt`,
      color: textColor,
    } as React.CSSProperties,

    bulletList: {
      margin: '4px 0 0 0',
      paddingLeft: '20px',
      listStyleType: 'disc' as const,
    } as React.CSSProperties,

    bulletItem: {
      fontSize: `${baseFontPt * 0.95}pt`,
      color: textColor,
      marginBottom: '3px',
    } as React.CSSProperties,

    skillLine: {
      fontSize: `${baseFontPt * 0.95}pt`,
      color: textColor,
      marginBottom: '4px',
    } as React.CSSProperties,
  };

  // ── Contact items ──────────────────────────────────────────

  const contactLines: string[] = [];
  if (data.personal.email) contactLines.push(data.personal.email);
  if (data.personal.phone) contactLines.push(data.personal.phone);
  if (data.personal.location) contactLines.push(data.personal.location);
  if (data.personal.website) contactLines.push(data.personal.website);
  if (data.personal.linkedin) contactLines.push(data.personal.linkedin);

  // ── Section renderers ──────────────────────────────────────

  const renderSummary = () => {
    if (!data.personal.summary) return null;
    return (
      <div style={s.sectionWrapper}>
        <div style={s.sectionHeading}>Professional Summary</div>
        <p style={{ ...s.bodyText, margin: 0 }}>{data.personal.summary}</p>
      </div>
    );
  };

  const renderExperience = () => {
    if (data.experience.length === 0) return null;
    return (
      <div style={s.sectionWrapper}>
        <div style={s.sectionHeading}>Professional Experience</div>
        {data.experience.map((exp: Experience) => (
          <div key={exp.id} style={s.entryBlock}>
            <div style={s.entryRow}>
              <span style={s.entryTitle}>{exp.position}</span>
              <span style={s.entryDate}>
                {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
              </span>
            </div>
            <div style={s.entrySubtitle}>
              {exp.company}{exp.location ? `, ${exp.location}` : ''}
            </div>
            {exp.description && <div style={s.bodyText}>{exp.description}</div>}
            {exp.highlights.length > 0 && (
              <ul style={s.bulletList}>
                {exp.highlights.map((h, i) => (
                  <li key={i} style={s.bulletItem}>{h}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderEducation = () => {
    if (data.education.length === 0) return null;
    return (
      <div style={s.sectionWrapper}>
        <div style={s.sectionHeading}>Education</div>
        {data.education.map((edu: Education) => (
          <div key={edu.id} style={s.entryBlock}>
            <div style={s.entryRow}>
              <span style={s.entryTitle}>
                {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
              </span>
              <span style={s.entryDate}>
                {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
              </span>
            </div>
            <div style={s.entrySubtitle}>
              {edu.institution}{edu.gpa ? ` — GPA: ${edu.gpa}` : ''}
            </div>
            {edu.description && <div style={s.bodyText}>{edu.description}</div>}
          </div>
        ))}
      </div>
    );
  };

  const renderSkills = () => {
    if (data.skills.length === 0) return null;
    // Group by category
    const grouped = data.skills.reduce<Record<string, Skill[]>>((acc, sk) => {
      const cat = sk.category || 'General';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(sk);
      return acc;
    }, {});

    return (
      <div style={s.sectionWrapper}>
        <div style={s.sectionHeading}>Core Competencies</div>
        {Object.entries(grouped).map(([category, skills]) => (
          <div key={category} style={s.skillLine}>
            <span style={{ fontWeight: 600 }}>{category}: </span>
            {skills.map((sk) => sk.name).join(', ')}
          </div>
        ))}
      </div>
    );
  };

  const renderProjects = () => {
    if (data.projects.length === 0) return null;
    return (
      <div style={s.sectionWrapper}>
        <div style={s.sectionHeading}>Key Projects</div>
        {data.projects.map((proj: Project) => (
          <div key={proj.id} style={s.entryBlock}>
            <div style={s.entryRow}>
              <span style={s.entryTitle}>{proj.name}</span>
              {(proj.startDate || proj.endDate) && (
                <span style={s.entryDate}>
                  {formatDate(proj.startDate || '')} {proj.endDate ? `— ${formatDate(proj.endDate)}` : ''}
                </span>
              )}
            </div>
            {proj.url && (
              <div style={{ fontSize: `${baseFontPt * 0.85}pt`, color: subtleGray, marginBottom: '2px' }}>{proj.url}</div>
            )}
            {proj.description && <div style={s.bodyText}>{proj.description}</div>}
            {proj.technologies.length > 0 && (
              <div style={{ fontSize: `${baseFontPt * 0.85}pt`, color: subtleGray, marginTop: '3px' }}>
                Technologies: {proj.technologies.join(', ')}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderCertificates = () => {
    if (data.certificates.length === 0) return null;
    return (
      <div style={s.sectionWrapper}>
        <div style={s.sectionHeading}>Professional Certifications</div>
        {data.certificates.map((cert: Certificate) => (
          <div key={cert.id} style={s.entryBlock}>
            <div style={s.entryRow}>
              <span style={s.entryTitle}>{cert.name}</span>
              {cert.date && <span style={s.entryDate}>{formatDate(cert.date)}</span>}
            </div>
            <div style={s.entrySubtitle}>
              {cert.issuer}{cert.credentialId ? ` — Credential ID: ${cert.credentialId}` : ''}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderAchievements = () => {
    if (data.achievements.length === 0) return null;
    return (
      <div style={s.sectionWrapper}>
        <div style={s.sectionHeading}>Honors & Awards</div>
        {data.achievements.map((ach: Achievement) => (
          <div key={ach.id} style={s.entryBlock}>
            <div style={s.entryRow}>
              <span style={s.entryTitle}>{ach.title}</span>
              {ach.date && <span style={s.entryDate}>{formatDate(ach.date)}</span>}
            </div>
            {ach.description && <div style={s.bodyText}>{ach.description}</div>}
          </div>
        ))}
      </div>
    );
  };

  // ── Section ordering ───────────────────────────────────────

  const sectionMap: Record<string, () => React.ReactNode> = {
    summary: renderSummary,
    experience: renderExperience,
    education: renderEducation,
    skills: renderSkills,
    projects: renderProjects,
    certificates: renderCertificates,
    achievements: renderAchievements,
  };

  const renderOrderedSections = () =>
    sectionOrder
      .filter((key) => visibleSections[key as keyof typeof visibleSections] && sectionMap[key])
      .map((key) => <React.Fragment key={key}>{sectionMap[key]()}</React.Fragment>);

  // ── Render ─────────────────────────────────────────────────

  return (
    <div className="tpl-corporate" style={s.page}>
      {/* ─── Header ─── */}
      <div style={s.headerRow}>
        <div>
          <div style={s.headerName}>{data.personal.fullName}</div>
          {data.personal.jobTitle && (
            <div style={{ fontSize: `${baseFontPt * 1.1}pt`, color: secondaryColor, marginTop: '2px' }}>
              {data.personal.jobTitle}
            </div>
          )}
        </div>
        <div style={s.headerContact}>
          {contactLines.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </div>
      </div>

      {/* Double horizontal rule */}
      <div style={s.doubleRule} />

      {/* ─── Content ─── */}
      {renderOrderedSections()}
    </div>
  );
};

export default Corporate;
