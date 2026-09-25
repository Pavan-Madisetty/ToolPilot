import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Input, ResultBox } from '@/components/ui';
import { Notice } from '@/components/tools/Notice';
import { solveQuadratic } from '@/utils/extraToolMath';

export default function QuadraticSolver() {
  const [a, setA] = useState('1');
  const [b, setB] = useState('-3');
  const [c, setC] = useState('2');
  const r = solveQuadratic(parseFloat(a), parseFloat(b), parseFloat(c));
  const kindLabel = { 'two-real': 'Two distinct real roots', 'one-real': 'One repeated real root', complex: 'Two complex roots', linear: 'Linear equation (a = 0)', invalid: '' }[r.kind];

  return (
    <ToolPageWrapper toolId="quadratic-solver">
      <div className="tool-layout lg:grid-cols-2">
        <Card className="space-y-5">
          <p className="text-lg font-mono text-center" aria-label="Equation">{a || 'a'}x² {parseFloat(b) < 0 ? '−' : '+'} {Math.abs(parseFloat(b)) || 'b'}x {parseFloat(c) < 0 ? '−' : '+'} {Math.abs(parseFloat(c)) || 'c'} = 0</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <Input label="a" type="number" step="any" value={a} onChange={(e) => setA(e.target.value)} />
            <Input label="b" type="number" step="any" value={b} onChange={(e) => setB(e.target.value)} />
            <Input label="c" type="number" step="any" value={c} onChange={(e) => setC(e.target.value)} />
          </div>
        </Card>
        <div className="flex flex-col gap-4">
          {r.kind === 'invalid' ? (
            <Notice tone="info" title="Enter valid coefficients">a, b and c must be numbers, and a and b cannot both be zero.</Notice>
          ) : (
            <>
              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{kindLabel}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {r.roots.map((root, i) => <ResultBox key={i} label={r.roots.length === 1 ? 'x' : `x${i + 1}`} value={root} highlight={i === 0} />)}
              </div>
              {r.kind !== 'linear' && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <ResultBox label="Discriminant (b² − 4ac)" value={parseFloat(r.discriminant.toPrecision(10))} />
                  {r.vertex && <ResultBox label="Vertex" value={`(${parseFloat(r.vertex[0].toPrecision(8))}, ${parseFloat(r.vertex[1].toPrecision(8))})`} />}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </ToolPageWrapper>
  );
}
