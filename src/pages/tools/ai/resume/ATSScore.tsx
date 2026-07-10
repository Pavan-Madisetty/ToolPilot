import { useResumeStore } from '@/stores/resumeStore';
import { Card } from '@/components/ui';
import { Star, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';
import { TEMPLATE_MAP } from './templates/registry';

export default function ATSScore() {
  const { resumeData, customization } = useResumeStore();

  // Metrics calculation
  const personal = resumeData.personal;
  const eduCount = resumeData.education.length;
  const expCount = resumeData.experience.length;
  const skillCount = resumeData.skills.length;

  const currentTemplate = TEMPLATE_MAP[customization.templateId];
  const templateAtsRating = currentTemplate?.atsRating || 4;

  const suggestions: { text: string; met: boolean; impact: 'high' | 'medium' | 'low'; category: string }[] = [];

  // Summary check
  const hasSummary = personal.summary && personal.summary.trim().length > 30;
  suggestions.push({
    text: 'Add a professional summary statement summarizing your career experience and core value.',
    met: !!hasSummary,
    impact: 'medium',
    category: 'Summary',
  });

  // Experience check
  const hasExp = expCount > 0;
  suggestions.push({
    text: 'List at least one work experience entry detailing your professional role.',
    met: hasExp,
    impact: 'high',
    category: 'Experience',
  });

  // Highlights check
  let hasHighlights = false;
  let hasNumbers = false;
  if (hasExp) {
    resumeData.experience.forEach((exp) => {
      if (exp.highlights && exp.highlights.length > 0) {
        hasHighlights = true;
        // Check for numbers or %
        exp.highlights.forEach((h) => {
          if (/\d+|%/.test(h)) {
            hasNumbers = true;
          }
        });
      }
    });
  }

  suggestions.push({
    text: 'Detail your experiences using bulleted lists of achievements rather than long text paragraphs.',
    met: hasHighlights,
    impact: 'high',
    category: 'Formatting',
  });

  suggestions.push({
    text: 'Quantify achievements with metrics, percentages, or dollar amounts (e.g. "increased sales by 15%").',
    met: hasNumbers,
    impact: 'high',
    category: 'Impact',
  });

  // Education check
  const hasEdu = eduCount > 0;
  suggestions.push({
    text: 'Include your educational history detailing your degree and major study focus.',
    met: hasEdu,
    impact: 'medium',
    category: 'Education',
  });

  // Skills check
  const hasSkills = skillCount >= 3;
  suggestions.push({
    text: 'List at least 3 relevant skills to optimize your resume for recruiter keyword scans.',
    met: hasSkills,
    impact: 'high',
    category: 'Keywords',
  });

  // Contact Info check
  const hasContact = personal.fullName && personal.email && personal.phone;
  suggestions.push({
    text: 'Provide complete contact details including full name, active email, and phone number.',
    met: !!hasContact,
    impact: 'high',
    category: 'Contact',
  });

  // Template compliance
  const isAtsTemplate = templateAtsRating >= 4;
  suggestions.push({
    text: 'Select a clean layout template with high structural compatibility for ATS parsers (e.g. Modern ATS).',
    met: isAtsTemplate,
    impact: 'medium',
    category: 'Layout',
  });

  // Word count check
  const fullText = [
    personal.fullName,
    personal.jobTitle,
    personal.summary,
    ...resumeData.education.map((e) => `${e.degree} ${e.institution} ${e.description || ''}`),
    ...resumeData.experience.map((e) => `${e.position} ${e.company} ${e.description} ${e.highlights.join(' ')}`),
    ...resumeData.skills.map((s) => s.name),
  ].join(' ');
  const wordCount = fullText.split(/\s+/).filter(Boolean).length;
  const isWordCountGood = wordCount >= 80;
  suggestions.push({
    text: 'Aim for at least 80–100 total words to ensure adequate depth and coverage.',
    met: isWordCountGood,
    impact: 'low',
    category: 'Length',
  });

  // Score computation
  let score = 0;
  if (hasSummary) score += 10;
  if (hasExp) score += 15;
  if (hasHighlights) score += 15;
  if (hasNumbers) score += 15;
  if (hasEdu) score += 10;
  if (hasSkills) score += 15;
  if (hasContact) score += 10;
  if (isAtsTemplate) score += 5;
  if (isWordCountGood) score += 5;

  const getScoreColor = (val: number) => {
    if (val >= 80) return 'text-emerald-500';
    if (val >= 50) return 'text-amber-500';
    return 'text-red-500';
  };

  const getScoreBg = (val: number) => {
    if (val >= 80) return 'border-emerald-500';
    if (val >= 50) return 'border-amber-500';
    return 'border-red-500';
  };

  const metSuggestions = suggestions.filter((s) => s.met);
  const unmetSuggestions = suggestions.filter((s) => !s.met);

  return (
    <div className="flex flex-col gap-6 p-4 max-h-[70vh] overflow-y-auto pr-2">
      <div className="flex flex-col items-center text-center gap-2 py-4">
        {/* Progress Circle representation */}
        <div className={`relative flex items-center justify-center w-28 h-28 rounded-full border-8 ${getScoreBg(score)} bg-[var(--bg-elevated)]`}>
          <span className={`text-3xl font-extrabold ${getScoreColor(score)}`}>
            {score}%
          </span>
        </div>

        <h3 className="text-base font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
          ATS Optimization Grade
        </h3>

        {/* Star rating representation */}
        <div className="flex gap-1 justify-center">
          {Array.from({ length: 5 }).map((_, i) => {
            const active = i < Math.round(score / 20);
            return (
              <Star
                key={i}
                size={18}
                className={active ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-700'}
              />
            );
          })}
        </div>

        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          {score >= 80
            ? 'Excellent! Your resume layout and content structure are highly optimized for automated scanning systems.'
            : score >= 50
            ? 'Good progress. Implementing the recommendations below will significantly improve your recruiter screening rates.'
            : 'Critical improvements needed. Add key sections and optimize bullet layout formatting to avoid automatic sorting rejections.'}
        </p>
      </div>

      {/* Unmet Recommendations */}
      {unmetSuggestions.length > 0 && (
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
            <AlertTriangle size={14} className="text-amber-500" />
            Areas of Improvement ({unmetSuggestions.length})
          </h4>
          <div className="flex flex-col gap-2.5">
            {unmetSuggestions.map((s, index) => (
              <Card
                key={index}
                className="flex items-start gap-3 p-3"
                style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-default)' }}
              >
                <div className="mt-0.5 p-1 rounded-md bg-amber-50 dark:bg-amber-950/20 text-amber-500">
                  <Lightbulb size={14} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold uppercase tracking-wide text-amber-600">
                      {s.category}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[var(--text-secondary)] capitalize">
                      {s.impact} Impact
                    </span>
                  </div>
                  <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                    {s.text}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Completed Checkpoints */}
      {metSuggestions.length > 0 && (
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
            <CheckCircle size={14} className="text-emerald-500" />
            Optimized Elements ({metSuggestions.length})
          </h4>
          <div className="flex flex-col gap-2 text-xs font-medium pl-6 list-disc" style={{ color: 'var(--text-secondary)' }}>
            {metSuggestions.map((s, index) => (
              <div key={index} className="flex items-center gap-2 py-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{s.category}: Completed</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
