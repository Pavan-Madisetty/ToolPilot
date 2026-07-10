// ─────────────────────────────────────────────────────────────
// Template: Creative Designer — Bold header + two-column body
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

const CreativeDesigner: React.FC<TemplateRenderProps> = ({ data, customization }) => {
  const {
    primaryColor,
    secondaryColor,
    accentColor,
    fontFamily,
    fontSize,
    headingStyle,
    lineSpacing,
    pageMargins,
    pageSize,
    showPhoto,
    showIcons,
    visibleSections,
    sectionOrder,
  } = customization;

  const page = getPageDimensions(pageSize);
  const baseFontPt = fontSize;
  const subtleGray = '#6b7280';

  // ── Styles ───────────────────────────────────────────────

  const s = {
    page: {
      width: page.width,
      minHeight: page.height,
      fontFamily,
      fontSize: `${baseFontPt}pt`,
      lineHeight: lineSpacing,
      color: secondaryColor,
      background: '#ffffff',
      boxSizing: 'border-box' as const,
      overflow: 'hidden',
    } as React.CSSProperties,

    // Header band
    header: {
      background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
      color: '#ffffff',
      padding: `${pageMargins * 1.2}mm ${pageMargins}mm`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '20px',
    } as React.CSSProperties,

    headerContent: {
      flex: 1,
    } as React.CSSProperties,

    headerName: {
      fontSize: `${baseFontPt * 2.2}pt`,
      fontWeight: 800,
      letterSpacing: '1px',
      marginBottom: '4px',
    } as React.CSSProperties,

    headerTitle: {
      fontSize: `${baseFontPt * 1.15}pt`,
      fontWeight: 400,
      opacity: 0.9,
      marginBottom: '10px',
    } as React.CSSProperties,

    headerContactRow: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '10px 18px',
      fontSize: `${baseFontPt * 0.85}pt`,
      opacity: 0.9,
    } as React.CSSProperties,

    photo: {
      width: '90px',
      height: '90px',
      borderRadius: '50%',
      border: '3px solid rgba(255,255,255,0.7)',
      objectFit: 'cover' as const,
      flexShrink: 0,
    } as React.CSSProperties,

    // Body
    body: {
      display: 'flex',
      padding: `${pageMargins}mm`,
      gap: `${pageMargins * 0.8}mm`,
    } as React.CSSProperties,

    leftCol: {
      width: '32%',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '16px',
    } as React.CSSProperties,

    rightCol: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '14px',
    } as React.CSSProperties,

    sectionHeading: {
      fontSize: `${baseFontPt * 1.15}pt`,
      fontWeight: 700,
      color: primaryColor,
      textTransform: headingTransform(headingStyle) as React.CSSProperties['textTransform'],
      letterSpacing: '0.8px',
      borderLeft: `3px solid ${primaryColor}`,
      paddingLeft: '8px',
      marginBottom: '10px',
    } as React.CSSProperties,

    sidebarSectionHeading: {
      fontSize: `${baseFontPt * 1.05}pt`,
      fontWeight: 700,
      color: primaryColor,
      textTransform: headingTransform(headingStyle) as React.CSSProperties['textTransform'],
      letterSpacing: '0.8px',
      borderLeft: `3px solid ${primaryColor}`,
      paddingLeft: '8px',
      marginBottom: '8px',
    } as React.CSSProperties,

    entryBlock: {
      marginBottom: '12px',
      pageBreakInside: 'avoid' as const,
    } as React.CSSProperties,

    entryTitle: {
      fontWeight: 700,
      fontSize: `${baseFontPt * 1.05}pt`,
      color: secondaryColor,
    } as React.CSSProperties,

    entrySubtitle: {
      fontSize: `${baseFontPt * 0.92}pt`,
      color: subtleGray,
      marginBottom: '3px',
    } as React.CSSProperties,

    entryDate: {
      fontSize: `${baseFontPt * 0.85}pt`,
      color: subtleGray,
    } as React.CSSProperties,

    bodyText: {
      fontSize: `${baseFontPt}pt`,
      color: '#374151',
    } as React.CSSProperties,

    bulletList: {
      margin: '4px 0 0 0',
      paddingLeft: '16px',
    } as React.CSSProperties,

    bulletItem: {
      fontSize: `${baseFontPt * 0.95}pt`,
      color: '#374151',
      marginBottom: '2px',
    } as React.CSSProperties,

    tag: {
      display: 'inline-block',
      backgroundColor: `${primaryColor}14`,
      color: primaryColor,
      fontSize: `${baseFontPt * 0.78}pt`,
      padding: '1px 6px',
      borderRadius: '3px',
      marginRight: '4px',
      marginBottom: '2px',
    } as React.CSSProperties,
  };

  // ── Contact icons ──────────────────────────────────────────

  const contactItems: { icon: string; text: string }[] = [];
  if (data.personal.email) contactItems.push({ icon: '✉', text: data.personal.email });
  if (data.personal.phone) contactItems.push({ icon: '☎', text: data.personal.phone });
  if (data.personal.location) contactItems.push({ icon: '📍', text: data.personal.location });
  if (data.personal.website) contactItems.push({ icon: '🔗', text: data.personal.website });
  if (data.personal.linkedin) contactItems.push({ icon: 'in', text: data.personal.linkedin });

  // ── Skill progress bar ─────────────────────────────────────

  const renderSkillBar = (skill: Skill) => (
    <div key={skill.id} style={{ marginBottom: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
        <span style={{ fontSize: `${baseFontPt * 0.9}pt`, color: secondaryColor }}>{skill.name}</span>
        <span style={{ fontSize: `${baseFontPt * 0.75}pt`, color: subtleGray }}>{skill.level}/5</span>
      </div>
      <div style={{ width: '100%', height: '5px', backgroundColor: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
        <div
          style={{
            width: `${(skill.level / 5) * 100}%`,
            height: '100%',
            backgroundColor: primaryColor,
            borderRadius: '3px',
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    </div>
  );

  // ── Left column sections ───────────────────────────────────

  const renderSidebarSkills = () => {
    if (!visibleSections.skills || data.skills.length === 0) return null;
    return (
      <div style={{ pageBreakInside: 'avoid' as const }}>
        <div style={s.sidebarSectionHeading}>Skills</div>
        {data.skills.map(renderSkillBar)}
      </div>
    );
  };

  const renderSidebarCertificates = () => {
    if (!visibleSections.certificates || data.certificates.length === 0) return null;
    return (
      <div style={{ pageBreakInside: 'avoid' as const }}>
        <div style={s.sidebarSectionHeading}>Certifications</div>
        {data.certificates.map((cert: Certificate) => (
          <div key={cert.id} style={{ marginBottom: '8px' }}>
            <div style={{ fontWeight: 600, fontSize: `${baseFontPt * 0.92}pt`, color: secondaryColor }}>{cert.name}</div>
            <div style={{ fontSize: `${baseFontPt * 0.82}pt`, color: subtleGray }}>
              {cert.issuer}{cert.date ? ` · ${formatDate(cert.date)}` : ''}
            </div>
            {cert.credentialId && (
              <div style={{ fontSize: `${baseFontPt * 0.78}pt`, color: subtleGray }}>ID: {cert.credentialId}</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // ── Right column section renderers ─────────────────────────

  const renderSummary = () => {
    if (!data.personal.summary) return null;
    return (
      <div style={{ pageBreakInside: 'avoid' as const }}>
        <div style={s.sectionHeading}>About Me</div>
        <p style={{ ...s.bodyText, margin: 0 }}>{data.personal.summary}</p>
      </div>
    );
  };

  const renderExperience = () => {
    if (data.experience.length === 0) return null;
    return (
      <div>
        <div style={s.sectionHeading}>Experience</div>
        {data.experience.map((exp: Experience) => (
          <div key={exp.id} style={s.entryBlock}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' as const }}>
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
      <div>
        <div style={s.sectionHeading}>Education</div>
        {data.education.map((edu: Education) => (
          <div key={edu.id} style={s.entryBlock}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' as const }}>
              <span style={s.entryTitle}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</span>
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

  const renderProjects = () => {
    if (data.projects.length === 0) return null;
    return (
      <div>
        <div style={s.sectionHeading}>Projects</div>
        {data.projects.map((proj: Project) => (
          <div key={proj.id} style={s.entryBlock}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' as const }}>
              <span style={s.entryTitle}>{proj.name}</span>
              {(proj.startDate || proj.endDate) && (
                <span style={s.entryDate}>
                  {formatDate(proj.startDate || '')} {proj.endDate ? `— ${formatDate(proj.endDate)}` : ''}
                </span>
              )}
            </div>
            {proj.url && (
              <div style={{ fontSize: `${baseFontPt * 0.85}pt`, color: accentColor, marginBottom: '2px' }}>{proj.url}</div>
            )}
            {proj.description && <div style={s.bodyText}>{proj.description}</div>}
            {proj.technologies.length > 0 && (
              <div style={{ marginTop: '4px' }}>
                {proj.technologies.map((tech, i) => (
                  <span key={i} style={s.tag}>{tech}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderAchievements = () => {
    if (data.achievements.length === 0) return null;
    return (
      <div>
        <div style={s.sectionHeading}>Achievements</div>
        {data.achievements.map((ach: Achievement) => (
          <div key={ach.id} style={s.entryBlock}>
            <div style={s.entryTitle}>{ach.title}</div>
            {ach.description && <div style={s.bodyText}>{ach.description}</div>}
            {ach.date && <div style={s.entryDate}>{formatDate(ach.date)}</div>}
          </div>
        ))}
      </div>
    );
  };

  // ── Right-column section ordering ──────────────────────────
  // Skills and certificates are in the left column sidebar

  const rightSectionMap: Record<string, () => React.ReactNode> = {
    summary: renderSummary,
    experience: renderExperience,
    education: renderEducation,
    projects: renderProjects,
    achievements: renderAchievements,
  };

  const renderOrderedRightSections = () =>
    sectionOrder
      .filter((key) => key !== 'skills' && key !== 'certificates' && visibleSections[key as keyof typeof visibleSections] && rightSectionMap[key])
      .map((key) => <React.Fragment key={key}>{rightSectionMap[key]()}</React.Fragment>);

  // ── Render ─────────────────────────────────────────────────

  return (
    <div className="tpl-creative-designer" style={s.page}>
      {/* ─── Header Band ─── */}
      <div style={s.header}>
        <div style={s.headerContent}>
          <div style={s.headerName}>{data.personal.fullName}</div>
          <div style={s.headerTitle}>{data.personal.jobTitle}</div>
          {contactItems.length > 0 && (
            <div style={s.headerContactRow}>
              {contactItems.map((item, idx) => (
                <span key={idx} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {showIcons && <span>{item.icon}</span>}
                  <span>{item.text}</span>
                </span>
              ))}
            </div>
          )}
        </div>
        {showPhoto && data.personal.photoUrl && (
          <img src={data.personal.photoUrl} alt={data.personal.fullName} style={s.photo} />
        )}
      </div>

      {/* ─── Body ─── */}
      <div style={s.body}>
        {/* Left column */}
        <div style={s.leftCol}>
          {renderSidebarSkills()}
          {renderSidebarCertificates()}
        </div>

        {/* Right column */}
        <div style={s.rightCol}>
          {renderOrderedRightSections()}
        </div>
      </div>
    </div>
  );
};

export default CreativeDesigner;
