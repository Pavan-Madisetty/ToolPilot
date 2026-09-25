import type { CSSProperties } from 'react';
import { CircleHelp } from 'lucide-react';
import { ICON_MAPPING } from './iconMapping';
import { ICON_REGISTRY } from './iconRegistry';

interface LucideIconProps {
  name: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
  style?: CSSProperties;
  'aria-hidden'?: boolean | 'true' | 'false';
  /** Icon name to use when `name` does not resolve (defaults to a help icon). */
  fallback?: string;
}

/**
 * Renders a Lucide icon by name. Icons come from an explicit registry (see
 * iconRegistry.ts) so the bundle only contains icons that are actually used.
 */
export function LucideIcon({
  name,
  size = 20,
  className,
  strokeWidth = 2,
  style,
  'aria-hidden': ariaHidden = true,
  fallback,
}: LucideIconProps) {
  const IconComponent =
    ICON_REGISTRY[ICON_MAPPING[name] || name] ??
    (fallback ? ICON_REGISTRY[ICON_MAPPING[fallback] || fallback] : undefined) ??
    CircleHelp;
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
