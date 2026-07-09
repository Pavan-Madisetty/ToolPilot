import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, CopyButton } from '@/components/ui';

// Helper to decode Base64Url
function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
}

export default function JwtDecoder() {
  const [token, setToken] = useState('');
  const [currentTimestamp] = useState(() => Date.now());
  const [decoded, setDecoded] = useState<{
    header: string;
    payload: string;
    signature: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDecode = () => {
    setError(null);
    setDecoded(null);

    const cleanToken = token.trim();
    if (!cleanToken) return;

    const parts = cleanToken.split('.');
    if (parts.length !== 3) {
      setError('Invalid JWT structure. A JWT must consist of three parts separated by dots.');
      return;
    }

    try {
      const headerDecoded = base64UrlDecode(parts[0]);
      const payloadDecoded = base64UrlDecode(parts[1]);

      setDecoded({
        header: JSON.stringify(JSON.parse(headerDecoded), null, 2),
        payload: JSON.stringify(JSON.parse(payloadDecoded), null, 2),
        signature: parts[2],
      });
    } catch {
      setError('Failed to decode token claims. Ensure the token is a valid base64url string.');
    }
  };

  // Inspect claims data
  const claimsInfo = useMemo(() => {
    if (!decoded) return null;

    try {
      const payloadObj = JSON.parse(decoded.payload);
      const claims: { label: string; value: string }[] = [];

      if (payloadObj.iss) claims.push({ label: 'Issuer (iss)', value: payloadObj.iss });
      if (payloadObj.sub) claims.push({ label: 'Subject (sub)', value: payloadObj.sub });
      if (payloadObj.aud) claims.push({ label: 'Audience (aud)', value: String(payloadObj.aud) });
      
      if (payloadObj.exp) {
        const expDate = new Date(payloadObj.exp * 1000);
        const isExpired = expDate.getTime() < currentTimestamp;
        claims.push({
          label: 'Expiration Time (exp)',
          value: `${expDate.toLocaleString()} (${isExpired ? 'Expired' : 'Valid'})`,
        });
      }

      if (payloadObj.iat) {
        claims.push({
          label: 'Issued At (iat)',
          value: new Date(payloadObj.iat * 1000).toLocaleString(),
        });
      }

      return claims;
    } catch {
      return null;
    }
  }, [decoded, currentTimestamp]);

  return (
    <ToolPageWrapper toolId="jwt-decoder">
      <div className="space-y-8">
        {/* Token Input */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="label">Paste JWT Token</label>
            <Button onClick={() => setToken('')} variant="ghost" size="xs">
              Clear
            </Button>
          </div>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ..."
            className="input-base font-mono text-xs leading-relaxed h-[120px] resize-none"
            aria-label="JWT token input"
          />
          <Button onClick={handleDecode} className="w-full sm:w-auto">
            Decode Token
          </Button>

          {error && (
            <div role="alert" className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg text-xs text-red-600 dark:text-red-400">
              {error}
            </div>
          )}
        </div>

        {/* Output */}
        {decoded && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Header & Payload */}
            <div className="space-y-4">
              <div className="p-4 card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-500">Header</span>
                  <CopyButton text={decoded.header} />
                </div>
                <textarea
                  readOnly
                  rows={6}
                  value={decoded.header}
                  className="input-base font-mono text-xs leading-relaxed resize-none bg-slate-50/50 dark:bg-slate-900/30"
                  aria-label="JWT header claims"
                />
              </div>

              <div className="p-4 card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-500">Payload</span>
                  <CopyButton text={decoded.payload} />
                </div>
                <textarea
                  readOnly
                  rows={10}
                  value={decoded.payload}
                  className="input-base font-mono text-xs leading-relaxed resize-none bg-slate-50/50 dark:bg-slate-900/30"
                  aria-label="JWT payload claims"
                />
              </div>
            </div>

            {/* Claims Inspector */}
            {claimsInfo && claimsInfo.length > 0 && (
              <div className="p-6 card h-fit">
                <h3 className="text-sm font-bold mb-4">Claims Metadata</h3>
                <div className="space-y-3">
                  {claimsInfo.map((claim) => (
                    <div key={claim.label} className="border-b pb-2 last:border-0 last:pb-0" style={{ borderColor: 'var(--border-subtle)' }}>
                      <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{claim.label}</span>
                      <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{claim.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolPageWrapper>
  );
}
