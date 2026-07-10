// ─────────────────────────────────────────────────────────────
// TemplateRenderer — Resolves + renders the active template
// ─────────────────────────────────────────────────────────────
import React from 'react';
import type { ResumeData, ResumeCustomization } from '@/types/resume';
import { getTemplate } from './templates/registry';
import ModernProfessional from './templates/ModernProfessional';

interface TemplateRendererProps {
  data: ResumeData;
  customization: ResumeCustomization;
}

const TemplateRenderer: React.FC<TemplateRendererProps> = ({ data, customization }) => {
  const config = getTemplate(customization.templateId);
  const TemplateComponent = config?.component ?? ModernProfessional;

  return (
    <div className="resume-template-container">
      <TemplateComponent data={data} customization={customization} />
    </div>
  );
};

export default TemplateRenderer;
