import { useState, useEffect } from 'react';
import { Lock, ShieldAlert } from 'lucide-react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, CopyButton, Textarea } from '@/components/ui';

const base64Decode = (str: string) => {
  try {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const jsonStr = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.stringify(JSON.parse(jsonStr), null, 2);
  } catch {
    return null;
  }
};

export default function JwtDecoder() {
  const defaultToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20ifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  const [tokenInput, setTokenInput] = useState(defaultToken);
  const [headerJson, setHeaderJson] = useState('{}');
  const [payloadJson, setPayloadJson] = useState('{}');
  const [signatureHex, setSignatureHex] = useState('');
  const [isTokenValid, setIsTokenValid] = useState(true);

  const decodeJwt = (jwt: string) => {
    const parts = jwt.trim().split('.');
    if (parts.length !== 3) {
      setIsTokenValid(false);
      return;
    }

    const decodedHeader = base64Decode(parts[0]);
    const decodedPayload = base64Decode(parts[1]);

    if (decodedHeader && decodedPayload) {
      setHeaderJson(decodedHeader);
      setPayloadJson(decodedPayload);
      setSignatureHex(parts[2]);
      setIsTokenValid(true);
    } else {
      setIsTokenValid(false);
    }
  };

  const handleTokenChange = (val: string) => {
    setTokenInput(val);
    decodeJwt(val);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    decodeJwt(defaultToken);
  }, []);

  return (
    <ToolPageWrapper toolId="jwt-decoder">
      <div className="tool-layout lg:grid-cols-12 gap-6">
        {/* Token Input Block (Left Side - 5 columns) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="flex justify-between items-center min-h-[36px]">
            <span className="label">Encoded Token</span>
            <Button
              id="jwt-clear-btn"
              variant="ghost"
              size="xs"
              onClick={() => handleTokenChange('')}
            >
              Clear Token
            </Button>
          </div>

          <Textarea
            id="jwt-token-textarea"
            rows={16}
            variant="code"
            value={tokenInput}
            onChange={(e) => handleTokenChange(e.target.value)}
            placeholder="Paste your encoded JWT token here..."
            className="select-all break-all h-full"
          />

          {isTokenValid ? (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center gap-2 text-xs font-semibold">
              <Lock size={16} className="text-emerald-500 shrink-0" />
              <span>Decoded JWT successfully</span>
            </div>
          ) : (
            <div className="p-3 bg-danger-subtle border border-danger/20 text-danger rounded-lg flex items-center gap-2 text-xs font-semibold">
              <ShieldAlert size={16} className="text-danger animate-pulse shrink-0" />
              <span>Invalid JWT structure (Must have 3 dot-separated parts)</span>
            </div>
          )}
        </div>

        {/* Token Output Blocks (Right Side - 7 columns) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Decoded Header Block */}
          <div className="border border-red-200 dark:border-red-900/40 bg-red-500/5 rounded-xl p-4 space-y-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500" />
            <div className="flex justify-between items-center pl-3">
              <span className="font-sans text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                Header (Algorithm & Type)
              </span>
              {isTokenValid && <CopyButton text={headerJson} size="xs" variant="ghost" />}
            </div>
            <pre className="font-mono text-xs text-red-600 dark:text-red-400 overflow-x-auto select-all pl-3 max-h-36">
              {isTokenValid ? headerJson : '{}'}
            </pre>
          </div>

          {/* Decoded Payload Block */}
          <div className="border border-purple-200 dark:border-purple-900/40 bg-purple-500/5 rounded-xl p-4 space-y-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-500" />
            <div className="flex justify-between items-center pl-3">
              <span className="font-sans text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                Payload (Data & Claims)
              </span>
              {isTokenValid && <CopyButton text={payloadJson} size="xs" variant="ghost" />}
            </div>
            <pre className="font-mono text-xs text-purple-600 dark:text-purple-400 overflow-x-auto select-all pl-3 max-h-56">
              {isTokenValid ? payloadJson : '{}'}
            </pre>
          </div>

          {/* Decoded Signature Block */}
          <div className="border border-blue-200 dark:border-blue-900/40 bg-blue-500/5 rounded-xl p-4 space-y-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500" />
            <div className="flex justify-between items-center pl-3">
              <span className="font-sans text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Signature Verification
              </span>
              {isTokenValid && signatureHex && (
                <CopyButton text={signatureHex} size="xs" variant="ghost" />
              )}
            </div>
            <p className="text-xs text-text-secondary pl-3 font-medium leading-relaxed">
              HMACSHA256( <br />
              <span className="text-text-tertiary">
                base64UrlEncode(header) + "." + base64UrlEncode(payload), <br />
                your-256-bit-secret{' '}
              </span>
              <br />)
            </p>
            <div className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-500/10 p-3 rounded-lg border border-blue-500/20 break-all select-all ml-3">
              {isTokenValid ? signatureHex : 'No signature data'}
            </div>
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
