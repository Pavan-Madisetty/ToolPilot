import { useId } from 'react';

/**
 * Toolskyt brand mark ("Sky T"): a rounded T with a sun on the brand gradient.
 * Single source for the header, footer and any in-app use; the favicon and PWA
 * icons are rendered from the same geometry (public/favicon.svg).
 */
export function LogoMark({ size = 34, className }: { size?: number; className?: string }) {
  const gid = useId();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4f46e5" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="22" fill={`url(#${gid})`} />
      <rect x="22" y="36" width="56" height="15" rx="7.5" fill="#fff" />
      <rect x="42.5" y="38" width="15" height="40" rx="7.5" fill="#fff" />
      <circle cx="72" cy="24" r="7" fill="#fbbf24" />
    </svg>
  );
}
