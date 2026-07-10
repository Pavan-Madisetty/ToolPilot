import { ResultBox } from './ResultBox';

interface StatCardProps {
  label: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
  highlight?: boolean;
  className?: string;
}

export function StatCard({
  label,
  value,
  prefix,
  suffix,
  highlight = false,
  className,
}: StatCardProps) {
  return (
    <ResultBox
      label={label}
      value={value}
      prefix={prefix}
      suffix={suffix}
      highlight={highlight}
      align="left"
      className={className}
    />
  );
}

export default StatCard;
