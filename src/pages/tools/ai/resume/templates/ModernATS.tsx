// ─────────────────────────────────────────────────────────────
// Template: Modern ATS — Clean, recruiter-friendly, minimal
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

const ModernATS: React.FC<TemplateRenderProps> = ({ data, customization }) => {
  const {
    primaryColor,
    accentColor,
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
  const textColor = '#1f2937';
  const subtleGray = '#6b7280';

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
      alignItems: 'baseline',
      flexWrap: 'wrap' as const,
      marginBottom: '6px',
    } as React.CSSProperties,

    headerName: {
      fontSize: `${baseFontPt * 2.2}pt`,
      fontWeight: 700,
      color: textColor,
      letterSpacing: '0.3px',
    } as React.CSSProperties,

    headerTitle: {
      fontSize: `${baseFontPt * 1.15}pt`,
      fontWeight: 400,
      color: primaryColor,
    } as React.CSSProperties,

    contactRow: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '4px',
      fontSize: `${baseFontPt * 0.88}pt`,
      color: subtleGray,
      marginBottom: '8px',
    } as React.CSSProperties,

    contactSeparator: {
      color: '#d1d5db',
      margin: '0 4px',
    } as React.CSSProperties,

    accentLine: {
      height: '2px',
      backgroundColor: primaryColor,
      marginBottom: '18px',
      border: 'none',
    } as React.CSSProperties,

    sectionWrapper: {
      marginBottom: '16px',
      pageBreakInside: 'avoid' as const,
    } as React.CSSProperties,

    sectionHeading: {
      fontSize: `${baseFontPt * 1.1}pt`,
      fontWeight: 600,
      color: primaryColor,
      textTransform: headingTransform(headingStyle) as React.CSSProperties['textTransform'],
      letterSpacing: '0.8px',
      borderBottom: `1px solid ${accentColor}40`,
      paddingBottom: '4px',
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
      fontWeight: 600,
      fontSize: `${baseFontPt * 1.05}pt`,
      color: textColor,
    } as React.CSSProperties,

    entryDate: {
      fontSize: `${baseFontPt * 0.85}pt`,
      color: subtleGray,
    } as React.CSSProperties,

    entrySubtitle: {
      fontSize: `${baseFontPt * 0.95}pt`,
      color: subtleGray,
      marginBottom: '3px',
    } as React.CSSProperties,

    bodyText: {
      fontSize: `${baseFontPt}pt`,
      color: textColor,
    } as React.CSSProperties,

    bulletList: {
      margin: '4px 0 0 0',
      paddingLeft: '18px',
    } as React.CSSProperties,

    bulletItem: {
      fontSize: `${baseFontPt * 0.95}pt`,
      color: textColor,
      marginBottom: '2px',
    } as React.CSSProperties,

    skillGrid: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '4px 8px',
    } as React.CSSProperties,

    skillChip: {
      display: 'inline-block',
      fontSize: `${baseFontPt * 0.88}pt`,
      color: textColor,
      backgroundColor: `${primaryColor}0c`,
      border: `1px solid ${primaryColor}28`,
      borderRadius: '4px',
      padding: '2px 8px',
    } as React.CSSProperties,
  };

  // ── Contact parts ──────────────────────────────────────────

  const contactParts: string[] = [];
  if (data.personal.email) contactParts.push(data.personal.email);
  if (data.personal.phone) contactParts.push(data.personal.phone);
  if (data.personal.location) contactParts.push(data.personal.location);
  if (data.personal.website) contactParts.push(data.personal.website);
  if (data.personal.linkedin) contactParts.push(data.personal.linkedin);

  // ── Section renderers ──────────────────────────────────────

  const renderSummary = () => {
    if (!data.personal.summary) return null;
    return (
      <div style={s.sectionWrapper}>
        <div style={s.sectionHeading}>Summary</div>
        <p style={{ ...s.bodyText, margin: 0 }}>{data.personal.summary}</p>
      </div>
    );
  };

  const renderExperience = () => {
    if (data.experience.length === 0) return null;
    return (
      <div style={s.sectionWrapper}>
        <div style={s.sectionHeading}>Experience</div>
        {data.experience.map((exp: Experience) => (
          <div key={exp.id} style={s.entryBlock}>
            <div style={s.entryRow}>
              <span style={s.entryTitle}>{exp.position}</span>
              <span style={s.entryDate}>
                {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
              </span>
            </div>
            <div style={s.entrySubtitle}>
              {exp.company}{exp.location ? ` · ${exp.location}` : ''}
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
              {edu.institution}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}
            </div>
            {edu.description && <div style={s.bodyText}>{edu.description}</div>}
          </div>
        ))}
      </div>
    );
  };

  const renderSkills = () => {
    if (data.skills.length === 0) return null;
    return (
      <div style={s.sectionWrapper}>
        <div style={s.sectionHeading}>Skills</div>
        <div style={s.skillGrid}>
          {data.skills.map((sk: Skill) => (
            <span key={sk.id} style={s.skillChip}>{sk.name}</span>
          ))}
        </div>
      </div>
    );
  };

  const renderProjects = () => {
    if (data.projects.length === 0) return null;
    return (
      <div style={s.sectionWrapper}>
        <div style={s.sectionHeading}>Projects</div>
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
              <div style={{ fontSize: `${baseFontPt * 0.85}pt`, color: primaryColor, marginBottom: '2px' }}>{proj.url}</div>
            )}
            {proj.description && <div style={s.bodyText}>{proj.description}</div>}
            {proj.technologies.length > 0 && (
              <div style={{ marginTop: '4px', display: 'flex', flexWrap: 'wrap' as const, gap: '4px' }}>
                {proj.technologies.map((tech, i) => (
                  <span key={i} style={s.skillChip}>{tech}</span>
                ))}
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
        <div style={s.sectionHeading}>Certifications</div>
        {data.certificates.map((cert: Certificate) => (
          <div key={cert.id} style={s.entryBlock}>
            <div style={s.entryRow}>
              <span style={s.entryTitle}>{cert.name}</span>
              {cert.date && <span style={s.entryDate}>{formatDate(cert.date)}</span>}
            </div>
            <div style={s.entrySubtitle}>
              {cert.issuer}{cert.credentialId ? ` · ID: ${cert.credentialId}` : ''}
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
        <div style={s.sectionHeading}>Achievements</div>
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
    <div className="tpl-modern-ats" style={s.page}>
      {/* ─── Header ─── */}
      <div style={s.headerRow}>
        <div style={s.headerName}>{data.personal.fullName}</div>
        {data.personal.jobTitle && <div style={s.headerTitle}>{data.personal.jobTitle}</div>}
      </div>

      {contactParts.length > 0 && (
        <div style={s.contactRow}>
          {contactParts.map((part, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span style={s.contactSeparator}>|</span>}
              <span>{part}</span>
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Accent line */}
      <div style={s.accentLine} />

      {/* ─── Content ─── */}
      {renderOrderedSections()}
    </div>
  );
};

export default ModernATS;
