// ─────────────────────────────────────────────────────────────
// Template: Modern Professional — Two-column with colored sidebar
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

// ── Icon helpers (inline SVG-like text icons) ────────────────

const Icons = {
  email: '✉',
  phone: '☎',
  location: '📍',
  website: '🔗',
  linkedin: 'in',
};

// ── Component ────────────────────────────────────────────────

const ModernProfessional: React.FC<TemplateRenderProps> = ({ data, customization }) => {
  const {
    primaryColor,
    secondaryColor,
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
  const sidebarWidth = '35%';
  const mainWidth = '65%';

  // ── Styles ───────────────────────────────────────────────

  const s = {
    page: {
      width: page.width,
      minHeight: page.height,
      fontFamily,
      fontSize: `${baseFontPt}pt`,
      lineHeight: lineSpacing,
      color: secondaryColor,
      display: 'flex',
      background: '#ffffff',
      boxSizing: 'border-box' as const,
      overflow: 'hidden',
    } as React.CSSProperties,

    sidebar: {
      width: sidebarWidth,
      backgroundColor: primaryColor,
      color: '#ffffff',
      padding: `${pageMargins}mm`,
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '16px',
    } as React.CSSProperties,

    main: {
      width: mainWidth,
      padding: `${pageMargins}mm`,
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '14px',
    } as React.CSSProperties,

    photo: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      border: '3px solid rgba(255,255,255,0.6)',
      objectFit: 'cover' as const,
      display: 'block',
      margin: '0 auto 8px',
    } as React.CSSProperties,

    sidebarName: {
      fontSize: `${baseFontPt * 1.8}pt`,
      fontWeight: 700,
      letterSpacing: '0.5px',
      textAlign: 'center' as const,
      marginBottom: '2px',
    } as React.CSSProperties,

    sidebarTitle: {
      fontSize: `${baseFontPt * 1.05}pt`,
      fontWeight: 400,
      opacity: 0.9,
      textAlign: 'center' as const,
      marginBottom: '12px',
    } as React.CSSProperties,

    sidebarSectionHeading: {
      fontSize: `${baseFontPt * 1.05}pt`,
      fontWeight: 700,
      textTransform: headingTransform(headingStyle) as React.CSSProperties['textTransform'],
      letterSpacing: '1px',
      borderBottom: '1px solid rgba(255,255,255,0.3)',
      paddingBottom: '4px',
      marginBottom: '8px',
    } as React.CSSProperties,

    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: `${baseFontPt * 0.9}pt`,
      marginBottom: '6px',
      wordBreak: 'break-word' as const,
    } as React.CSSProperties,

    sectionHeading: {
      fontSize: `${baseFontPt * 1.3}pt`,
      fontWeight: 700,
      color: primaryColor,
      textTransform: headingTransform(headingStyle) as React.CSSProperties['textTransform'],
      letterSpacing: '0.8px',
      borderBottom: `2px solid ${primaryColor}`,
      paddingBottom: '4px',
      marginBottom: '10px',
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
      fontSize: `${baseFontPt * 0.95}pt`,
      color: '#6b7280',
      marginBottom: '4px',
    } as React.CSSProperties,

    entryDescription: {
      fontSize: `${baseFontPt}pt`,
      color: '#374151',
      marginBottom: '4px',
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

    skillDots: {
      display: 'flex',
      gap: '3px',
      marginTop: '2px',
    } as React.CSSProperties,

    tag: {
      display: 'inline-block',
      backgroundColor: `${primaryColor}18`,
      color: primaryColor,
      fontSize: `${baseFontPt * 0.8}pt`,
      padding: '1px 6px',
      borderRadius: '3px',
      marginRight: '4px',
      marginBottom: '2px',
    } as React.CSSProperties,
  };

  // ── Skill level dots (sidebar) ─────────────────────────────

  const renderSkillDots = (level: number) => (
    <div style={s.skillDots}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: i <= level ? '#ffffff' : 'rgba(255,255,255,0.25)',
            display: 'inline-block',
          }}
        />
      ))}
    </div>
  );

  // ── Sidebar contact section ────────────────────────────────

  const renderContact = () => {
    const items: { icon: string; text: string }[] = [];
    if (data.personal.email) items.push({ icon: Icons.email, text: data.personal.email });
    if (data.personal.phone) items.push({ icon: Icons.phone, text: data.personal.phone });
    if (data.personal.location) items.push({ icon: Icons.location, text: data.personal.location });
    if (data.personal.website) items.push({ icon: Icons.website, text: data.personal.website });
    if (data.personal.linkedin) items.push({ icon: Icons.linkedin, text: data.personal.linkedin });
    if (items.length === 0) return null;
    return (
      <div>
        <div style={s.sidebarSectionHeading}>Contact</div>
        {items.map((item, idx) => (
          <div key={idx} style={s.contactItem}>
            {showIcons && <span style={{ flexShrink: 0, width: '16px', textAlign: 'center' as const }}>{item.icon}</span>}
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    );
  };

  // ── Sidebar skills ─────────────────────────────────────────

  const renderSidebarSkills = () => {
    if (!visibleSections.skills || data.skills.length === 0) return null;
    // Group skills by category
    const grouped = data.skills.reduce<Record<string, Skill[]>>((acc, skill) => {
      const cat = skill.category || 'Other';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    }, {});

    return (
      <div>
        <div style={s.sidebarSectionHeading}>Skills</div>
        {Object.entries(grouped).map(([category, skills]) => (
          <div key={category} style={{ marginBottom: '10px' }}>
            <div style={{ fontSize: `${baseFontPt * 0.85}pt`, opacity: 0.75, marginBottom: '4px', fontWeight: 600 }}>
              {category}
            </div>
            {skills.map((skill) => (
              <div key={skill.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                <span style={{ fontSize: `${baseFontPt * 0.9}pt` }}>{skill.name}</span>
                {renderSkillDots(skill.level)}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // ── Main content section renderers ─────────────────────────

  const renderSummary = () => {
    if (!data.personal.summary) return null;
    return (
      <div style={{ pageBreakInside: 'avoid' as const }}>
        <div style={s.sectionHeading}>Professional Summary</div>
        <p style={{ ...s.entryDescription, margin: 0 }}>{data.personal.summary}</p>
      </div>
    );
  };

  const renderExperience = () => {
    if (data.experience.length === 0) return null;
    return (
      <div>
        <div style={s.sectionHeading}>Work Experience</div>
        {data.experience.map((exp: Experience) => (
          <div key={exp.id} style={s.entryBlock}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' as const }}>
              <span style={s.entryTitle}>{exp.position}</span>
              <span style={{ fontSize: `${baseFontPt * 0.85}pt`, color: '#9ca3af' }}>
                {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
              </span>
            </div>
            <div style={s.entrySubtitle}>
              {exp.company}{exp.location ? ` · ${exp.location}` : ''}
            </div>
            {exp.description && <div style={s.entryDescription}>{exp.description}</div>}
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
              <span style={{ fontSize: `${baseFontPt * 0.85}pt`, color: '#9ca3af' }}>
                {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
              </span>
            </div>
            <div style={s.entrySubtitle}>
              {edu.institution}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}
            </div>
            {edu.description && <div style={s.entryDescription}>{edu.description}</div>}
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
                <span style={{ fontSize: `${baseFontPt * 0.85}pt`, color: '#9ca3af' }}>
                  {formatDate(proj.startDate || '')} {proj.endDate ? `— ${formatDate(proj.endDate)}` : ''}
                </span>
              )}
            </div>
            {proj.url && <div style={{ fontSize: `${baseFontPt * 0.85}pt`, color: primaryColor, marginBottom: '2px' }}>{proj.url}</div>}
            {proj.description && <div style={s.entryDescription}>{proj.description}</div>}
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

  const renderCertificates = () => {
    if (data.certificates.length === 0) return null;
    return (
      <div>
        <div style={s.sectionHeading}>Certifications</div>
        {data.certificates.map((cert: Certificate) => (
          <div key={cert.id} style={s.entryBlock}>
            <div style={s.entryTitle}>{cert.name}</div>
            <div style={s.entrySubtitle}>
              {cert.issuer}{cert.date ? ` · ${formatDate(cert.date)}` : ''}
              {cert.credentialId ? ` · ID: ${cert.credentialId}` : ''}
            </div>
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
            {ach.description && <div style={s.entryDescription}>{ach.description}</div>}
            {ach.date && <div style={{ fontSize: `${baseFontPt * 0.8}pt`, color: '#9ca3af' }}>{formatDate(ach.date)}</div>}
          </div>
        ))}
      </div>
    );
  };

  // ── Section ordering helper ────────────────────────────────

  // Skills are rendered in sidebar, not in the main column
  const mainSectionMap: Record<string, () => React.ReactNode> = {
    summary: renderSummary,
    experience: renderExperience,
    education: renderEducation,
    projects: renderProjects,
    certificates: renderCertificates,
    achievements: renderAchievements,
  };

  const renderOrderedSections = () =>
    sectionOrder
      .filter((key) => key !== 'skills' && visibleSections[key as keyof typeof visibleSections] && mainSectionMap[key])
      .map((key) => <React.Fragment key={key}>{mainSectionMap[key]()}</React.Fragment>);

  // ── Render ─────────────────────────────────────────────────

  return (
    <div className="tpl-modern-professional" style={s.page}>
      {/* ─── Left Sidebar ─── */}
      <div style={s.sidebar}>
        {showPhoto && data.personal.photoUrl && (
          <img src={data.personal.photoUrl} alt={data.personal.fullName} style={s.photo} />
        )}
        <div>
          <div style={s.sidebarName}>{data.personal.fullName}</div>
          <div style={s.sidebarTitle}>{data.personal.jobTitle}</div>
        </div>
        {renderContact()}
        {renderSidebarSkills()}
      </div>

      {/* ─── Right Main ─── */}
      <div style={s.main}>
        {renderOrderedSections()}
      </div>
    </div>
  );
};

export default ModernProfessional;
