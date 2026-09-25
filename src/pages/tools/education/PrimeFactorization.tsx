import { useMemo, useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Input, ResultBox } from '@/components/ui';
import { Notice } from '@/components/tools/Notice';
import { gcd, isPrime, lcm, primeFactors } from '@/utils/extraToolMath';

const sup = (n: number) => String(n).split('').map((d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(d)]).join('');

export default function PrimeFactorization() {
  const [n, setN] = useState('360');
  const [list, setList] = useState('48, 180, 36');

  const num = Number(n);
  const okNum = Number.isSafeInteger(num) && num >= 2;
  const factors = useMemo(() => (okNum ? primeFactors(num) : []), [num, okNum]);
  const divisors = factors.reduce((p, [, e]) => p * (e + 1), 1);

  const nums = list.split(/[\s,;]+/).filter(Boolean).map(Number);
  const okList = nums.length >= 2 && nums.every((x) => Number.isSafeInteger(x) && x > 0);
  const g = okList ? nums.reduce(gcd) : NaN;
  const l = okList ? nums.reduce(lcm) : NaN;

  return (
    <ToolPageWrapper toolId="prime-factorization">
      <div className="tool-layout lg:grid-cols-2">
        <Card className="space-y-5">
          <h2 className="text-lg font-bold">Prime factorisation</h2>
          <Input label="Whole number (≥ 2)" type="number" min="2" value={n} onChange={(e) => setN(e.target.value)} />
          {!okNum ? <Notice tone="info">Enter a whole number of 2 or more (up to 9,007,199,254,740,991).</Notice> : (
            <div className="space-y-3">
              <p className="text-2xl font-mono break-words">{num.toLocaleString('en-IN')} = {factors.map(([p, e]) => `${p}${e > 1 ? sup(e) : ''}`).join(' × ')}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <ResultBox label="Is it prime?" value={isPrime(num) ? 'Yes' : 'No'} highlight={isPrime(num)} />
                <ResultBox label="Number of divisors" value={divisors} />
              </div>
            </div>
          )}
        </Card>
        <Card className="space-y-5">
          <h2 className="text-lg font-bold">GCD &amp; LCM</h2>
          <Input label="Numbers (comma or space separated)" value={list} onChange={(e) => setList(e.target.value)} helperText="At least two positive whole numbers" />
          {!okList ? <Notice tone="info">Enter two or more positive whole numbers.</Notice> : (
            <div className="grid gap-3 sm:grid-cols-2">
              <ResultBox label="GCD / HCF" value={g} highlight shouldFormat={false} />
              <ResultBox label="LCM" value={Number.isSafeInteger(l) ? l : 'Too large'} shouldFormat={false} />
            </div>
          )}
        </Card>
      </div>
    </ToolPageWrapper>
  );
}
