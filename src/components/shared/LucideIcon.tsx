import * as Icons from 'lucide-react';
import { CSSProperties } from 'react';

interface LucideIconProps {
  name: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
  style?: CSSProperties;
  'aria-hidden'?: boolean | 'true' | 'false';
}

const ICON_MAPPING: Record<string, string> = {
  CurrencyRupeeIcon: 'IndianRupee',
  HomeIcon: 'Home',
  TruckIcon: 'Car',
  UserIcon: 'User',
  AcademicCapIcon: 'GraduationCap',
  CheckBadgeIcon: 'CheckSquare',
  ChartBarIcon: 'BarChart2',
  BanknotesIcon: 'Banknote',
  ArrowTrendingUpIcon: 'TrendingUp',
  ShieldCheckIcon: 'ShieldCheck',
  BuildingOfficeIcon: 'Building2',
  SunIcon: 'Sun',
  ReceiptPercentIcon: 'Percent',
  DocumentChartBarIcon: 'FileSpreadsheet',
  CreditCardIcon: 'CreditCard',
  HomeModernIcon: 'Home',
  CalculatorIcon: 'Calculator',
  GlobeAltIcon: 'Globe',
  GiftIcon: 'Gift',
  ChartBarSquareIcon: 'BarChart3',
  ArrowsRightLeftIcon: 'ArrowLeftRight',
  UsersIcon: 'Users',
  ClipboardDocumentListIcon: 'ClipboardList',
  PresentationChartBarIcon: 'Presentation',
  ScaleIcon: 'Scale',
  StarIcon: 'Star',
  CurrencyBitcoinIcon: 'Bitcoin',
  ArrowPathIcon: 'RefreshCw',
  ChartPieIcon: 'PieChart',
  CodeBracketIcon: 'Code',
  LinkIcon: 'Link',
  ShieldCheck: 'Shield',
  FingerPrintIcon: 'Fingerprint',
  LockClosedIcon: 'Lock',
  MagnifyingGlassIcon: 'Search',
  ClockIcon: 'Clock',
  SwatchIcon: 'Palette',
  CircleStackIcon: 'Database',
  DocumentDuplicateIcon: 'Copy',
  KeyIcon: 'Key',
  DocumentTextIcon: 'FileText',
  PaintBrushIcon: 'Paintbrush',
  ArrowsPointingOutIcon: 'Expand',
  ArchiveBoxIcon: 'Archive',
  ScissorsIcon: 'Scissors',
  QrCodeIcon: 'QrCode',
  PhotoIcon: 'Image',
  WindowIcon: 'Layout',
  SparklesIcon: 'Sparkles',
  HeartIcon: 'Heart',
  WrenchScrewdriverIcon: 'Wrench',
  MapIcon: 'Map',
  BriefcaseIcon: 'Briefcase',
  DocumentIcon: 'File',
  PresentationChartLineIcon: 'LineChart',
};

export function LucideIcon({
  name,
  size = 20,
  className,
  strokeWidth = 2,
  style,
  'aria-hidden': ariaHidden = true,
}: LucideIconProps) {
  // Resolve mapping
  const resolvedName = ICON_MAPPING[name] || name;
  
  // Find component in Icons bundle
  const IconComponent = (Icons as unknown as Record<
    string,
    React.ComponentType<{
      size?: number;
      className?: string;
      strokeWidth?: number;
      style?: CSSProperties;
      'aria-hidden'?: boolean | 'true' | 'false';
    }>
  >)[resolvedName];

  if (!IconComponent) {
    // Fallback icon
    return (
      <Icons.HelpCircle
        size={size}
        className={className}
        strokeWidth={strokeWidth}
        style={style}
        aria-hidden={ariaHidden}
      />
    );
  }

  return (
    <IconComponent
      size={size}
      className={className}
      strokeWidth={strokeWidth}
      style={style}
      aria-hidden={ariaHidden}
    />
  );
}

export default LucideIcon;
