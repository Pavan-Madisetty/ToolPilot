// ─────────────────────────────────────────────────────────────
// Step 1 — Personal Details Form
// ─────────────────────────────────────────────────────────────
import { useRef, useCallback } from 'react';
import { useResumeStore } from '@/stores/resumeStore';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { User, Camera, X } from 'lucide-react';

/**
 * PersonalDetails — Wizard step for entering personal information.
 * All field values are read from and written directly to the Zustand store.
 */
export default function PersonalDetails() {
  const personal = useResumeStore((s) => s.resumeData.personal);
  const updatePersonal = useResumeStore((s) => s.updatePersonal);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Photo upload handler — converts image to base64 dataURL ──
  const handlePhotoUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          updatePersonal({ photoUrl: result });
        }
      };
      reader.readAsDataURL(file);
    },
    [updatePersonal]
  );

  const handleRemovePhoto = useCallback(() => {
    updatePersonal({ photoUrl: undefined });
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [updatePersonal]);

  // ── Shorthand field updater ──
  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    updatePersonal({ [field]: e.target.value });

  return (
    <Card padding="lg">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-xl"
          style={{ backgroundColor: 'var(--primary)', color: '#fff' }}
        >
          <User size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Personal Details
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Basic information that appears at the top of your resume.
          </p>
        </div>
      </div>

      {/* ── Photo upload ──────────────────────────────────── */}
      <div className="flex items-center gap-4 mb-6">
        {/* Preview thumbnail */}
        <div
          className="relative flex items-center justify-center w-20 h-20 rounded-full overflow-hidden border-2"
          style={{
            borderColor: 'var(--border-default)',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          {personal.photoUrl ? (
            <img
              src={personal.photoUrl}
              alt="Profile photo preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <Camera size={24} style={{ color: 'var(--text-secondary)' }} />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
            id="photo-upload"
            aria-label="Upload profile photo"
          />
          <Button
            variant="secondary"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            leftIcon={<Camera size={14} />}
          >
            {personal.photoUrl ? 'Change Photo' : 'Upload Photo'}
          </Button>
          {personal.photoUrl && (
            <Button
              variant="ghost"
              size="xs"
              onClick={handleRemovePhoto}
              leftIcon={<X size={12} />}
              aria-label="Remove profile photo"
            >
              Remove Photo
            </Button>
          )}
        </div>
      </div>

      {/* ── Core fields ───────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="personal-fullName"
          label="Full Name"
          requiredMark
          placeholder="e.g. Jane Doe"
          value={personal.fullName}
          onChange={set('fullName')}
          aria-label="Full name"
        />
        <Input
          id="personal-jobTitle"
          label="Job Title"
          requiredMark
          placeholder="e.g. Senior Software Engineer"
          value={personal.jobTitle}
          onChange={set('jobTitle')}
          aria-label="Job title"
        />
        <Input
          id="personal-email"
          label="Email"
          requiredMark
          type="email"
          placeholder="e.g. jane@example.com"
          value={personal.email}
          onChange={set('email')}
          aria-label="Email address"
        />
        <Input
          id="personal-phone"
          label="Phone"
          requiredMark
          type="tel"
          placeholder="e.g. +91 98765 43210"
          value={personal.phone}
          onChange={set('phone')}
          aria-label="Phone number"
        />
        <Input
          id="personal-location"
          label="Location"
          placeholder="e.g. Bengaluru, India"
          value={personal.location}
          onChange={set('location')}
          aria-label="Location"
        />
        <Input
          id="personal-website"
          label="Website"
          type="url"
          placeholder="e.g. janedoe.dev"
          value={personal.website}
          onChange={set('website')}
          aria-label="Website URL"
        />
        <div className="md:col-span-2">
          <Input
            id="personal-linkedin"
            label="LinkedIn URL"
            type="url"
            placeholder="e.g. linkedin.com/in/janedoe"
            value={personal.linkedin}
            onChange={set('linkedin')}
            aria-label="LinkedIn URL"
          />
        </div>
      </div>

      {/* ── Professional summary ──────────────────────────── */}
      <div className="mt-4">
        <Textarea
          id="personal-summary"
          label="Professional Summary"
          rows={4}
          placeholder="Write a brief summary of your professional background, skills, and career objectives…"
          value={personal.summary}
          onChange={set('summary')}
          helperText="Aim for 2-4 sentences. Focus on your key strengths and what you bring to potential employers."
          aria-label="Professional summary"
        />
      </div>
    </Card>
  );
}
