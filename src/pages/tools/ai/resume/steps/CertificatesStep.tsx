// ─────────────────────────────────────────────────────────────
// Step 6 — Certificates (repeatable entries)
// ─────────────────────────────────────────────────────────────
import { useResumeStore } from '@/stores/resumeStore';
import { createCertificate } from '@/types/resume';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ScrollText, Plus, Trash2 } from 'lucide-react';

export default function CertificatesStep() {
  const certificates = useResumeStore((s) => s.resumeData.certificates);
  const addCertificate = useResumeStore((s) => s.addCertificate);
  const updateCertificate = useResumeStore((s) => s.updateCertificate);
  const removeCertificate = useResumeStore((s) => s.removeCertificate);

  return (
    <div className="space-y-4">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-2">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-xl"
          style={{ backgroundColor: 'var(--primary)', color: '#fff' }}
        >
          <ScrollText size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Certifications
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Professional certifications and licenses you've earned.
          </p>
        </div>
      </div>

      {/* ── Empty state ──────────────────────────────────── */}
      {certificates.length === 0 && (
        <Card padding="md">
          <p className="text-center py-8" style={{ color: 'var(--text-secondary)' }}>
            No certifications yet. Click the button below to add one.
          </p>
        </Card>
      )}

      {/* ── Entry cards ──────────────────────────────────── */}
      {certificates.map((entry, index) => (
        <Card key={entry.id} padding="md" className="relative">
          {/* Delete button */}
          <div className="absolute top-3 right-3">
            <Button
              variant="danger"
              size="xs"
              onClick={() => removeCertificate(entry.id)}
              aria-label={`Remove certificate ${index + 1}`}
              leftIcon={<Trash2 size={12} />}
            >
              Remove
            </Button>
          </div>

          <p
            className="text-sm font-semibold mb-3"
            style={{ color: 'var(--text-secondary)' }}
          >
            Certificate #{index + 1}
          </p>

          {/* Row 1: Name + Issuer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id={`cert-name-${entry.id}`}
              label="Certificate Name"
              requiredMark
              placeholder="e.g. AWS Solutions Architect"
              value={entry.name}
              onChange={(e) => updateCertificate(entry.id, { name: e.target.value })}
              aria-label={`Name for certificate ${index + 1}`}
            />
            <Input
              id={`cert-issuer-${entry.id}`}
              label="Issuing Organization"
              requiredMark
              placeholder="e.g. Amazon Web Services"
              value={entry.issuer}
              onChange={(e) => updateCertificate(entry.id, { issuer: e.target.value })}
              aria-label={`Issuer for certificate ${index + 1}`}
            />
          </div>

          {/* Row 2: Date, URL, Credential ID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Input
              id={`cert-date-${entry.id}`}
              label="Date"
              type="month"
              value={entry.date}
              onChange={(e) => updateCertificate(entry.id, { date: e.target.value })}
              aria-label={`Date for certificate ${index + 1}`}
            />
            <Input
              id={`cert-url-${entry.id}`}
              label="URL"
              type="url"
              placeholder="Verification link"
              value={entry.url ?? ''}
              onChange={(e) => updateCertificate(entry.id, { url: e.target.value })}
              aria-label={`URL for certificate ${index + 1}`}
            />
            <Input
              id={`cert-credential-${entry.id}`}
              label="Credential ID"
              placeholder="e.g. AWS-SAA-12345"
              value={entry.credentialId ?? ''}
              onChange={(e) => updateCertificate(entry.id, { credentialId: e.target.value })}
              aria-label={`Credential ID for certificate ${index + 1}`}
            />
          </div>
        </Card>
      ))}

      {/* ── Add button ───────────────────────────────────── */}
      <Button
        variant="secondary"
        onClick={() => addCertificate(createCertificate())}
        leftIcon={<Plus size={16} />}
        aria-label="Add certificate entry"
      >
        Add Certificate
      </Button>
    </div>
  );
}
