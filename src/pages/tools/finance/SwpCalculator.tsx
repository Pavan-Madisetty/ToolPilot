import { useMemo, useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Slider, ResultBox, Card } from '@/components/ui';
import { Notice } from '@/components/tools/Notice';
import { GrowthChart } from '@/components/tools/GrowthChart';
import { swpSchedule } from '@/utils/extraToolMath';

export default function SwpCalculator() {
  const [corpus, setCorpus] = useState(5000000);
  const [withdrawal, setWithdrawal] = useState(30000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(20);

  const res = useMemo(() => swpSchedule(corpus, withdrawal, rate, years * 12), [corpus, withdrawal, rate, years]);
  const depleted = res.finalValue <= 0 && res.monthsLasted < years * 12;
  const lastsYears = Math.floor(res.monthsLasted / 12);
  const lastsMonths = res.monthsLasted % 12;

  const yearly = useMemo(() => {
    const labels: string[] = [];
    const bal: number[] = [];
    res.rows.forEach((row) => {
      if (row.month % 12 === 0 || row.month === res.rows.length) {
        labels.push(`Yr ${(row.month / 12).toFixed(row.month % 12 ? 1 : 0)}`);
        bal.push(row.closing);
      }
    });
    return { labels, bal };
  }, [res]);

  return (
    <ToolPageWrapper toolId="swp-calculator">
      <div className="tool-layout lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <Card className="space-y-6">
          <Slider label="Total Investment (₹)" min={100000} max={100000000} step={50000} value={corpus} onChange={setCorpus} />
          <Slider label="Monthly Withdrawal (₹)" min={1000} max={1000000} step={1000} value={withdrawal} onChange={setWithdrawal} />
          <Slider label="Expected Return (p.a. %)" min={1} max={20} step={0.1} value={rate} onChange={setRate} suffix="%" />
          <Slider label="Withdrawal Period (Years)" min={1} max={40} step={1} value={years} onChange={setYears} suffix=" Yr" />
        </Card>
        <div className="flex flex-col gap-6">
          {depleted ? (
            <Notice tone="warning" title="Corpus runs out early">
              At this withdrawal rate your money lasts about {lastsYears} years {lastsMonths} months. Lower the withdrawal or raise the corpus.
            </Notice>
          ) : (
            <Notice tone="success" title="Corpus lasts the full period">
              You can withdraw ₹{withdrawal.toLocaleString('en-IN')} every month for {years} years and still keep a balance.
            </Notice>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultBox label="Total Withdrawn" value={Math.round(res.totalWithdrawn)} prefix="₹" />
            <ResultBox label="Final Value" value={Math.round(res.finalValue)} prefix="₹" highlight />
            <ResultBox label="Months Lasted" value={res.monthsLasted} />
          </div>
          <Card>
            <GrowthChart labels={yearly.labels} series={[{ label: 'Remaining balance', data: yearly.bal, color: 'primary' }]} />
          </Card>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
