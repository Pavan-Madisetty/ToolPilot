import { useMemo, useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, Input, Textarea } from '@/components/ui';
import { CopyButton } from '@/components/ui/CopyButton';
import { Notice } from '@/components/tools/Notice';

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);

/** Only allow safe URL schemes in generated links. */
function safeUrl(u: string): string {
  const t = u.trim();
  if (!t) return '';
  const withScheme = /^[a-z][a-z0-9+.-]*:/i.test(t) ? t : `https://${t}`;
  return /^(https?:|mailto:|tel:)/i.test(withScheme) ? withScheme : '';
}

export default function EmailSignature() {
  const [f, setF] = useState({ name: 'Asha Verma', title: 'Product Manager', company: 'Acme Inc.', phone: '+91 98765 43210', email: 'asha@acme.com', website: 'acme.com', address: '', accent: '#4648d4' });
  const [copied, setCopied] = useState('');
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF((p) => ({ ...p, [k]: e.target.value }));

  const html = useMemo(() => {
    const accent = /^#[0-9a-f]{6}$/i.test(f.accent) ? f.accent : '#4648d4';
    const rows: string[] = [];
    if (f.phone) rows.push(`<a href="${esc(safeUrl(`tel:${f.phone.replace(/[^\d+]/g, '')}`))}" style="color:#444;text-decoration:none;">${esc(f.phone)}</a>`);
    if (f.email) rows.push(`<a href="${esc(safeUrl(`mailto:${f.email}`))}" style="color:#444;text-decoration:none;">${esc(f.email)}</a>`);
    if (f.website) rows.push(`<a href="${esc(safeUrl(f.website))}" style="color:${accent};text-decoration:none;">${esc(f.website)}</a>`);
    if (f.address) rows.push(esc(f.address).replace(/\n/g, '<br>'));
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#444;">
  <tr>
    <td style="padding-right:14px;border-right:3px solid ${accent};">
      <div style="font-size:17px;font-weight:bold;color:#111;">${esc(f.name)}</div>
      <div style="color:${accent};">${esc(f.title)}${f.title && f.company ? ' · ' : ''}${esc(f.company)}</div>
    </td>
    <td style="padding-left:14px;font-size:13px;">${rows.join('<br>')}</td>
  </tr>
</table>`;
  }, [f]);

  const copyRich = async () => {
    try {
      if (!navigator.clipboard || typeof ClipboardItem === 'undefined') throw new Error('unsupported');
      await navigator.clipboard.write([new ClipboardItem({ 'text/html': new Blob([html], { type: 'text/html' }), 'text/plain': new Blob([html], { type: 'text/plain' }) })]);
      setCopied('Signature copied — paste it into your email settings.');
    } catch {
      setCopied('Your browser blocked rich copy. Use “Copy HTML” instead.');
    }
    setTimeout(() => setCopied(''), 4000);
  };

  return (
    <ToolPageWrapper toolId="email-signature">
      <div className="tool-layout lg:grid-cols-2">
        <Card className="space-y-4">
          <Input label="Full name" value={f.name} onChange={set('name')} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Job title" value={f.title} onChange={set('title')} />
            <Input label="Company" value={f.company} onChange={set('company')} />
            <Input label="Phone" value={f.phone} onChange={set('phone')} />
            <Input label="Email" type="email" value={f.email} onChange={set('email')} />
            <Input label="Website" value={f.website} onChange={set('website')} />
            <Input label="Accent colour" type="color" value={f.accent} onChange={set('accent')} />
          </div>
          <Textarea label="Address (optional)" rows={2} value={f.address} onChange={set('address')} />
        </Card>
        <div className="flex flex-col gap-4">
          <Card className="space-y-3">
            <p className="label">Preview</p>
            <div className="overflow-x-auto rounded-xl p-4" style={{ background: '#fff', color: '#444' }} dangerouslySetInnerHTML={{ __html: html }} />
          </Card>
          <div className="flex flex-wrap gap-2">
            <Button onClick={copyRich}>Copy signature</Button>
            <CopyButton text={html} label="Copy HTML" />
          </div>
          {copied && <Notice tone="info">{copied}</Notice>}
        </div>
      </div>
    </ToolPageWrapper>
  );
}
