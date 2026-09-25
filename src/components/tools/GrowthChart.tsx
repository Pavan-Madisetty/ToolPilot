import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useChartTheme } from '@/hooks/useChartTheme';
import { compactINR } from '@/utils/extraToolMath';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export interface GrowthSeries {
  label: string;
  data: number[];
  color: 'success' | 'info' | 'primary' | 'warning' | 'danger';
}

interface Props {
  labels: string[];
  series: GrowthSeries[];
  prefix?: string;
}

export function GrowthChart({ labels, series, prefix = '₹' }: Props) {
  const t = useChartTheme();
  return (
    <div className="relative h-[300px] w-full" role="img" aria-label="Growth chart">
      <Line
        data={{
          labels,
          datasets: series.map((s) => ({
            label: s.label,
            data: s.data,
            borderColor: t[s.color],
            backgroundColor: `${t[s.color]}22`,
            fill: true,
            tension: 0.25,
            pointRadius: labels.length > 30 ? 0 : 3,
          })),
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'top', labels: { color: t.textSecondary } } },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: t.borderSubtle },
              ticks: { color: t.textTertiary, callback: (v) => prefix + compactINR(Number(v)) },
            },
            x: { grid: { display: false }, ticks: { color: t.textTertiary, maxTicksLimit: 10 } },
          },
        }}
      />
    </div>
  );
}
