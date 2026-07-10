import { useResumeStore } from '@/stores/resumeStore';
import { Select, Slider, Switch } from '@/components/ui';
import { FONT_OPTIONS, SECTION_LABELS, SectionKey, HeadingStyle, PageSize } from '@/types/resume';
import { ArrowUp, ArrowDown, Eye, EyeOff } from 'lucide-react';

export default function CustomizationPanel() {
  const { customization, updateCustomization, toggleSection } = useResumeStore();

  const handleColorChange = (key: 'primaryColor' | 'secondaryColor' | 'accentColor', value: string) => {
    updateCustomization({ [key]: value });
  };

  const handleFontChange = (value: string) => {
    updateCustomization({ fontFamily: value });
  };

  const handleHeadingStyleChange = (value: string) => {
    updateCustomization({ headingStyle: value as HeadingStyle });
  };

  const handlePageSizeChange = (value: string) => {
    updateCustomization({ pageSize: value as PageSize });
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const nextOrder = [...customization.sectionOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= nextOrder.length) return;

    const temp = nextOrder[index];
    nextOrder[index] = nextOrder[targetIndex];
    nextOrder[targetIndex] = temp;
    updateCustomization({ sectionOrder: nextOrder });
  };

  return (
    <div className="flex flex-col gap-6 p-4 max-h-[70vh] overflow-y-auto pr-2">
      {/* Page Size & Layout Toggles */}
      <section className="flex flex-col gap-4">
        <h3 className="text-sm font-bold border-b pb-2" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-default)' }}>
          Document Options
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Page Size"
            value={customization.pageSize}
            onChange={(e) => handlePageSizeChange(e.target.value)}
            options={[
              { value: 'A4', label: 'A4' },
              { value: 'Letter', label: 'Letter' },
            ]}
          />
          <div className="flex flex-col justify-end pb-1">
            <Switch
              label="Show Photo"
              checked={customization.showPhoto}
              onChange={(checked) => updateCustomization({ showPhoto: checked })}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Switch
            label="Show Section Icons"
            checked={customization.showIcons}
            onChange={(checked) => updateCustomization({ showIcons: checked })}
          />
        </div>
      </section>

      {/* Colors */}
      <section className="flex flex-col gap-4">
        <h3 className="text-sm font-bold border-b pb-2" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-default)' }}>
          Color Theme
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>Primary</label>
            <div className="relative flex items-center h-10 border rounded-lg overflow-hidden bg-[var(--bg-base)] border-[var(--border-default)]">
              <input
                type="color"
                value={customization.primaryColor}
                onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                className="w-full h-full border-none cursor-pointer p-0"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>Secondary</label>
            <div className="relative flex items-center h-10 border rounded-lg overflow-hidden bg-[var(--bg-base)] border-[var(--border-default)]">
              <input
                type="color"
                value={customization.secondaryColor}
                onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                className="w-full h-full border-none cursor-pointer p-0"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>Accent</label>
            <div className="relative flex items-center h-10 border rounded-lg overflow-hidden bg-[var(--bg-base)] border-[var(--border-default)]">
              <input
                type="color"
                value={customization.accentColor}
                onChange={(e) => handleColorChange('accentColor', e.target.value)}
                className="w-full h-full border-none cursor-pointer p-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="flex flex-col gap-4">
        <h3 className="text-sm font-bold border-b pb-2" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-default)' }}>
          Typography
        </h3>
        <Select
          label="Font Family"
          value={customization.fontFamily}
          onChange={(e) => handleFontChange(e.target.value)}
          options={FONT_OPTIONS.map((f) => ({ value: f.value, label: f.label }))}
        />
        <Slider
          label="Base Font Size"
          value={customization.fontSize}
          onChange={(val) => updateCustomization({ fontSize: val })}
          min={9}
          max={15}
          step={0.5}
          suffix="pt"
        />
        <Select
          label="Heading Capitalization"
          value={customization.headingStyle}
          onChange={(e) => handleHeadingStyleChange(e.target.value)}
          options={[
            { value: 'uppercase', label: 'UPPERCASE' },
            { value: 'capitalize', label: 'Title Case' },
            { value: 'normal', label: 'Sentence case' },
          ]}
        />
      </section>

      {/* Spacing & Margins */}
      <section className="flex flex-col gap-4">
        <h3 className="text-sm font-bold border-b pb-2" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-default)' }}>
          Page Formatting
        </h3>
        <Slider
          label="Page Margins"
          value={customization.pageMargins}
          onChange={(val) => updateCustomization({ pageMargins: val })}
          min={10}
          max={40}
          suffix="mm"
        />
        <Slider
          label="Line Spacing"
          value={customization.lineSpacing}
          onChange={(val) => updateCustomization({ lineSpacing: val })}
          min={1.0}
          max={2.0}
          step={0.1}
        />
      </section>

      {/* Visible Sections & Ordering */}
      <section className="flex flex-col gap-4">
        <h3 className="text-sm font-bold border-b pb-2" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-default)' }}>
          Section Settings
        </h3>
        <div className="flex flex-col gap-3">
          {customization.sectionOrder.map((sectionKey, index) => {
            const isVisible = customization.visibleSections[sectionKey as SectionKey];
            const label = SECTION_LABELS[sectionKey as SectionKey] || sectionKey;
            return (
              <div
                key={sectionKey}
                className="flex items-center justify-between p-2 border rounded-lg bg-[var(--bg-elevated)] border-[var(--border-default)]"
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSection(sectionKey as SectionKey)}
                    className="p-1 hover:bg-[var(--bg-base)] rounded text-[var(--text-secondary)]"
                    aria-label={`Toggle visibility of ${label}`}
                  >
                    {isVisible ? <Eye size={16} /> : <EyeOff size={16} className="opacity-50" />}
                  </button>
                  <span className={`text-sm ${!isVisible ? 'line-through text-slate-400' : ''}`} style={{ color: 'var(--text-primary)' }}>
                    {label}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    disabled={index === 0}
                    onClick={() => moveSection(index, 'up')}
                    className="p-1 hover:bg-[var(--bg-base)] rounded text-[var(--text-secondary)] disabled:opacity-35"
                    aria-label="Move section up"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    disabled={index === customization.sectionOrder.length - 1}
                    onClick={() => moveSection(index, 'down')}
                    className="p-1 hover:bg-[var(--bg-base)] rounded text-[var(--text-secondary)] disabled:opacity-35"
                    aria-label="Move section down"
                  >
                    <ArrowDown size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
