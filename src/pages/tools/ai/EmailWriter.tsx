import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, CopyButton, Input, Select, Textarea } from '@/components/ui';

const PURPOSES = [
  { value: 'follow-up', label: 'Follow-up' },
  { value: 'meeting', label: 'Request a Meeting' },
  { value: 'update', label: 'Status Update' },
  { value: 'apology', label: 'Apology / Delay Notification' },
  { value: 'custom', label: 'Custom Purpose...' },
];

const TONES = [
  { value: 'Professional', label: 'Professional / Formal' },
  { value: 'Casual', label: 'Casual' },
  { value: 'Urgent', label: 'Urgent' },
  { value: 'Friendly', label: 'Friendly / Warm' },
];

export default function EmailWriter() {
  const [recipient, setRecipient] = useState('');
  const [purpose, setPurpose] = useState('follow-up');
  const [customPurpose, setCustomPurpose] = useState('');
  const [keyPoints, setKeyPoints] = useState('');
  const [tone, setTone] = useState('Professional');

  const finalPurpose = purpose === 'custom' ? customPurpose : purpose;

  const emailDraft = useMemo(() => {
    if (!recipient || !finalPurpose) return { subject: '', body: '' };

    const pointsList = keyPoints
      ? keyPoints
          .split('\n')
          .filter((p) => p.trim() !== '')
          .map((p) => `- ${p.trim()}`)
          .join('\n')
      : '- [Insert point 1 here]\n- [Insert point 2 here]';

    const recName = recipient.trim();
    let subject: string;
    let body: string;

    // Purpose-based templates
    switch (purpose) {
      case 'meeting':
        subject = tone === 'Casual' ? 'Quick chat / meeting?' : 'Request for Meeting: Discussion on Next Steps';
        body = `Hi ${recName},

I hope you're doing well.

I would like to request a brief meeting to discuss some important items. Specifically, I'd like to cover the following:

${pointsList}

Could you let me know your availability over the coming days?

Best regards,
[Your Name]`;
        break;

      case 'follow-up':
        subject = tone === 'Casual' ? 'Following up on our last discussion' : 'Follow-up: Discussion regarding updates';
        body = `Hi ${recName},

I hope this email finds you well.

I am writing to follow up on our previous conversation and see if there are any updates regarding our discussion. Specifically:

${pointsList}

Please let me know if you need any additional information from my end.

Best regards,
[Your Name]`;
        break;

      case 'update':
        subject = tone === 'Casual' ? 'Quick update' : 'Status Update: Project Progress & Next Steps';
        body = `Hi ${recName},

Here is a quick status update regarding our current progress.

Key items to note:
${pointsList}

Please feel free to reach out if you have any questions or require further clarification.

Best regards,
[Your Name]`;
        break;

      case 'apology':
        subject = tone === 'Casual' ? 'Sorry for the delay' : 'Apology: Update on delay and next steps';
        body = `Hi ${recName},

I want to sincerely apologize for the delay regarding our delivery. 

Here are the details and how we are addressing it:
${pointsList}

Thank you for your patience and understanding. I will keep you updated as things progress.

Sincerely,
[Your Name]`;
        break;

      default:
        // Custom purpose
        subject = `Regarding: ${finalPurpose}`;
        body = `Hi ${recName},

I am writing to you regarding ${finalPurpose.toLowerCase()}.

Please see the key points below:
${pointsList}

I would appreciate it if we could discuss this further or if you could share your feedback.

Best regards,
[Your Name]`;
    }

    // Adjust body text style based on tone
    if (tone === 'Casual') {
      body = body
        .replace(/I hope this email finds you well\./gi, "Hope you're having a great week!")
        .replace(/I hope you're doing well\./gi, "Hope all is well!")
        .replace(/Best regards,/gi, 'Cheers,')
        .replace(/Sincerely,/gi, 'Thanks,')
        .replace(/I would like to request/gi, 'I wanted to see if we could grab')
        .replace(/Please feel free to reach out/gi, 'Let me know');
    } else if (tone === 'Urgent') {
      subject = `[URGENT] ${subject}`;
      body = `Hi ${recName},

Please review this as soon as possible. We need to address the following items immediately:

${pointsList}

Thank you for your prompt attention to this matter.

Regards,
[Your Name]`;
    } else if (tone === 'Friendly') {
      body = `Hi ${recName},

Hope you're having a wonderful day! 😊

Just wanted to check in regarding our progress and share some quick updates with you:

${pointsList}

Let me know what you think when you get a chance. No rush at all!

Warmly,
[Your Name]`;
    }

    return { subject, body };
  }, [recipient, purpose, finalPurpose, keyPoints, tone]);

  const handleClear = () => {
    setRecipient('');
    setPurpose('follow-up');
    setCustomPurpose('');
    setKeyPoints('');
    setTone('Professional');
  };

  const copyFullEmail = `${emailDraft.subject ? `Subject: ${emailDraft.subject}\n\n` : ''}${emailDraft.body}`;

  return (
    <ToolPageWrapper toolId="email-writer">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Form Inputs */}
        <Card className="flex flex-col gap-6" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Email Details
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Provide the recipient and purpose to draft a structured email template.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Input
              label="Recipient Name / Title"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. Jane (Manager), Client, Support Team"
              requiredMark
            />

            <Select
              label="Purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              options={PURPOSES}
            />

            {purpose === 'custom' && (
              <Input
                label="Custom Purpose"
                value={customPurpose}
                onChange={(e) => setCustomPurpose(e.target.value)}
                placeholder="e.g. Requesting a raise, Informing about vacation"
                requiredMark
              />
            )}

            <Select
              label="Tone"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              options={TONES}
            />

            <Textarea
              label="Key Points (One per line)"
              value={keyPoints}
              onChange={(e) => setKeyPoints(e.target.value)}
              placeholder="e.g. Need feedback on project plan&#10;Need it by Friday at 5 PM&#10;Happy to jump on a call"
              rows={4}
            />
          </div>

          {(recipient || keyPoints || purpose !== 'follow-up' || customPurpose || tone !== 'Professional') && (
            <div className="flex justify-end pt-4 border-t" style={{ borderColor: 'var(--border-default)' }}>
              <Button onClick={handleClear} variant="secondary" size="sm">
                Reset Form
              </Button>
            </div>
          )}
        </Card>

        {/* Right Column: Output Draft */}
        <Card className="flex flex-col gap-6 justify-between" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
          <div className="flex flex-col gap-4 flex-1">
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Drafted Email
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Your customized subject and body are generated below.
              </p>
            </div>

            {emailDraft.subject ? (
              <div className="flex flex-col gap-4 flex-1">
                {/* Subject Block */}
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                    Subject Line
                  </span>
                  <div
                    className="p-3 rounded-lg font-medium text-sm break-words"
                    style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'var(--text-primary)' }}
                  >
                    {emailDraft.subject}
                  </div>
                </div>

                {/* Body Block */}
                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                    Email Body
                  </span>
                  <div
                    className="p-4 rounded-lg flex-1 min-h-[220px] whitespace-pre-wrap text-sm leading-relaxed overflow-y-auto"
                    style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'var(--text-primary)' }}
                  >
                    {emailDraft.body}
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="p-6 rounded-lg flex-1 min-h-[300px] flex items-center justify-center text-center border border-dashed"
                style={{ borderColor: 'var(--border-default)' }}
              >
                <p className="text-sm italic" style={{ color: 'var(--text-tertiary)' }}>
                  Please fill in the Recipient Name to generate your email draft.
                </p>
              </div>
            )}
          </div>

          {emailDraft.subject && (
            <div className="flex justify-end gap-2 pt-4 border-t" style={{ borderColor: 'var(--border-default)' }}>
              <CopyButton text={copyFullEmail} label="Copy Full Email" size="md" />
            </div>
          )}
        </Card>
      </div>
    </ToolPageWrapper>
  );
}
