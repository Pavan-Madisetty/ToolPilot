import { useState, useEffect } from 'react';
import { Clipboard, Check, Lock, ShieldAlert } from 'lucide-react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';

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
  const defaultToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20ifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  
  const [tokenInput, setTokenInput] = useState(defaultToken);
  const [headerJson, setHeaderJson] = useState('{}');
  const [payloadJson, setPayloadJson] = useState('{}');
  const [signatureHex, setSignatureHex] = useState('');
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

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

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedSection(id);
      setTimeout(() => setCopiedSection(null), 2000);
    });
  };

  return (
    <ToolPageWrapper toolId="jwt-decoder">
      <div className="space-y-6 font-sans">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-2">JWT Debugger</h2>
          <p className="text-sm text-gray-500 mb-6">Decode JSON Web Tokens (JWT) instantly on the client side. Rest assured, your token data never leaves your device.</p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Token Input Block (Left Side - 5 columns) */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="flex justify-between items-center">
                <label className="font-sans text-[11px] font-bold text-gray-400 uppercase tracking-wider">Encoded Token</label>
                <button
                  id="jwt-clear-btn"
                  onClick={() => handleTokenChange('')}
                  className="text-xs text-gray-400 hover:text-primary hover:underline font-semibold cursor-pointer"
                >
                  Clear Token
                </button>
              </div>
              
              <textarea
                id="jwt-token-textarea"
                rows={16}
                value={tokenInput}
                onChange={(e) => handleTokenChange(e.target.value)}
                placeholder="Paste your encoded JWT token here..."
                className="w-full bg-slate-900 border border-slate-800 text-slate-100 rounded-xl p-4 font-mono text-xs leading-relaxed outline-none resize-none break-all"
              />

              {isTokenValid ? (
                <div className="p-3.5 bg-emerald-500/5 border border-emerald-500/10 text-emerald-600 rounded-lg flex items-center gap-2 text-xs font-semibold">
                  <Lock className="w-4 h-4 text-emerald-500" />
                  Decoded JWT successfully
                </div>
              ) : (
                <div className="p-3.5 bg-red-50/55 border border-red-100 text-red-500 rounded-lg flex items-center gap-2 text-xs font-semibold">
                  <ShieldAlert className="w-4 h-4 text-red-500 animate-pulse" />
                  Invalid JWT structure (Must have 3 parts separated by dots)
                </div>
              )}
            </div>

            {/* Token Output Blocks (Right Side - 7 columns) */}
            <div className="lg:col-span-7 space-y-5 text-left">
              
              {/* Decoded Header Block */}
              <div className="border border-red-100 bg-red-50/5 rounded-xl p-5 space-y-3 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-red-400" />
                <div className="flex justify-between items-center pl-1.5">
                  <span className="font-sans text-[11px] font-bold text-red-550 uppercase tracking-wider text-red-500">
                    Header (Algorithm & Type)
                  </span>
                  <button
                    id="jwt-copy-header-btn"
                    onClick={() => handleCopy(headerJson, 'header')}
                    className="p-1 rounded text-red-400 hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer"
                  >
                    {copiedSection === 'header' ? <Check className="w-3.5 h-3.5" /> : <Clipboard className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <pre className="font-mono text-xs text-red-600 overflow-x-auto select-all pl-1.5 max-h-36">
                  {isTokenValid ? headerJson : '{}'}
                </pre>
              </div>

              {/* Decoded Payload Block */}
              <div className="border border-purple-100 bg-purple-50/5 rounded-xl p-5 space-y-3 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-400" />
                <div className="flex justify-between items-center pl-1.5">
                  <span className="font-sans text-[11px] font-bold text-purple-550 uppercase tracking-wider text-purple-600">
                    Payload (Data & Claims)
                  </span>
                  <button
                    id="jwt-copy-payload-btn"
                    onClick={() => handleCopy(payloadJson, 'payload')}
                    className="p-1 rounded text-purple-400 hover:bg-purple-50 hover:text-purple-600 transition-all cursor-pointer"
                  >
                    {copiedSection === 'payload' ? <Check className="w-3.5 h-3.5" /> : <Clipboard className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <pre className="font-mono text-xs text-purple-600 overflow-x-auto select-all pl-1.5 max-h-56">
                  {isTokenValid ? payloadJson : '{}'}
                </pre>
              </div>

              {/* Decoded Signature Block */}
              <div className="border border-blue-100 bg-blue-50/5 rounded-xl p-5 space-y-3 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-400" />
                <div className="flex justify-between items-center pl-1.5">
                  <span className="font-sans text-[11px] font-bold text-blue-550 uppercase tracking-wider text-blue-600">
                    Signature Verification
                  </span>
                  <button
                    id="jwt-copy-sig-btn"
                    onClick={() => handleCopy(signatureHex, 'signature')}
                    className="p-1 rounded text-blue-400 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer"
                  >
                    {copiedSection === 'signature' ? <Check className="w-3.5 h-3.5" /> : <Clipboard className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 pl-1.5 font-semibold leading-relaxed">
                  HMACSHA256( <br />
                  <span className="text-gray-400">base64UrlEncode(header) + "." + base64UrlEncode(payload), <br />
                  your-256-bit-secret </span><br />
                  )
                </p>
                <div className="font-mono text-xs text-blue-600 bg-blue-50/40 p-2.5 rounded border border-blue-50/50 break-all select-all ml-1.5">
                  {isTokenValid ? signatureHex : 'No signature data'}
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
