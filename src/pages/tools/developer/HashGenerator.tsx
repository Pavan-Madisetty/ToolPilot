import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, CopyButton } from '@/components/ui';

// ── Pure JS MD5 Implementation (Required for client-side MD5 without imports) ──
function md5(string: string) {
  function k(n: number) {
    return Math.abs(Math.sin(n)) * 4294967296 | 0;
  }
  const s = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21];
  const a = [1732584193, 4023233417, 2562383102, 271733878], x = [a[0], a[1], a[2], a[3]];
  const blocks = [];
  let i;
  const l = string.length, n = (l + 8 >> 6) + 1;
  for (i = 0; i < n * 16; blocks[i++] = 0);
  for (i = 0; i < l; blocks[i >> 2] |= string.charCodeAt(i) << (i % 4 << 3), i++);
  blocks[i >> 2] |= 0x80 << (i % 4 << 3);
  blocks[n * 16 - 2] = l * 8;
  for (i = 0; i < blocks.length; i += 16) {
    const old = [x[0], x[1], x[2], x[3]]; let r = [0, 0, 0, 0];
    for (let j = 0; j < 64; j++) {
      const div = j >> 4;
      if (div === 0) {
        r = [x[1] & x[2] | ~x[1] & x[3], 0, 1, 7];
      } else if (div === 1) {
        r = [x[3] & x[1] | ~x[3] & x[2], 1, 5, 5];
      } else if (div === 2) {
        r = [x[1] ^ x[2] ^ x[3], 2, 3, 9];
      } else if (div === 3) {
        r = [x[2] ^ (x[1] | ~x[3]), 3, 7, 14];
      }
      const index = (r[1] * j + r[2]) % 16;
      const temp = x[3];
      x[3] = x[2];
      x[2] = x[1];
      const add = x[0] + r[0] + k(j + 1) + blocks[i + index];
      const shift = s[r[3] + (j % 4)];
      x[1] = x[1] + (add << shift | add >>> 32 - shift);
      x[0] = temp;
    }
    for (let j = 0; j < 4; x[j] = x[j] + old[j++] | 0);
  }
  let out = '';
  for (i = 0; i < 32; out += (x[i >> 3] >> (i % 8 << 3) & 0xf).toString(16), i++);
  return out;
}

// ── SubtleCrypto helper for SHA hashes ──
async function computeSha(text: string, algorithm: 'SHA-1' | 'SHA-256' | 'SHA-512'): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState({
    md5: '',
    sha1: '',
    sha256: '',
    sha512: '',
  });

  const handleCompute = async () => {
    if (!input) {
      setHashes({ md5: '', sha1: '', sha256: '', sha512: '' });
      return;
    }

    try {
      const computedMd5 = md5(input);
      const computedSha1 = await computeSha(input, 'SHA-1');
      const computedSha256 = await computeSha(input, 'SHA-256');
      const computedSha512 = await computeSha(input, 'SHA-512');

      setHashes({
        md5: computedMd5,
        sha1: computedSha1,
        sha256: computedSha256,
        sha512: computedSha512,
      });
    } catch {
      // Graceful error ignore
    }
  };

  return (
    <ToolPageWrapper toolId="hash-generator">
      <div className="space-y-8">
        {/* Input */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="label">Input String</label>
            <Button onClick={() => setInput('')} variant="ghost" size="xs">
              Clear
            </Button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste text here to compute hashes..."
            className="input-base font-mono text-xs leading-relaxed h-[120px] resize-none"
            aria-label="Input hashing string"
          />
          <Button onClick={handleCompute} className="w-full sm:w-auto">
            Compute Checksums
          </Button>
        </div>

        {/* Results list */}
        <div className="space-y-4">
          <h3 className="text-base font-bold">Computed Hash Checksums</h3>

          <div className="grid grid-cols-1 gap-4">
            {/* MD5 */}
            <div className="p-4 card">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-500">MD5 Checksum</span>
                {hashes.md5 && <CopyButton text={hashes.md5} />}
              </div>
              <input
                readOnly
                value={hashes.md5}
                placeholder="Hash will be shown here..."
                className="input-base font-mono text-xs select-all bg-slate-50/50 dark:bg-slate-900/30"
                aria-label="MD5 hash checksum"
              />
            </div>

            {/* SHA-1 */}
            <div className="p-4 card">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-500">SHA-1 Checksum</span>
                {hashes.sha1 && <CopyButton text={hashes.sha1} />}
              </div>
              <input
                readOnly
                value={hashes.sha1}
                placeholder="Hash will be shown here..."
                className="input-base font-mono text-xs select-all bg-slate-50/50 dark:bg-slate-900/30"
                aria-label="SHA-1 hash checksum"
              />
            </div>

            {/* SHA-256 */}
            <div className="p-4 card">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">SHA-256 Checksum</span>
                {hashes.sha256 && <CopyButton text={hashes.sha256} />}
              </div>
              <input
                readOnly
                value={hashes.sha256}
                placeholder="Hash will be shown here..."
                className="input-base font-mono text-xs select-all bg-slate-50/50 dark:bg-slate-900/30"
                aria-label="SHA-256 hash checksum"
              />
            </div>

            {/* SHA-512 */}
            <div className="p-4 card">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-500">SHA-512 Checksum</span>
                {hashes.sha512 && <CopyButton text={hashes.sha512} />}
              </div>
              <textarea
                readOnly
                rows={2}
                value={hashes.sha512}
                placeholder="Hash will be shown here..."
                className="input-base font-mono text-xs select-all resize-none bg-slate-50/50 dark:bg-slate-900/30"
                aria-label="SHA-512 hash checksum"
              />
            </div>
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
