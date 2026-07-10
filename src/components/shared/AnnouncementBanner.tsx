import { useState, useMemo } from 'react';
import { useRuntimeConfig } from '@/context/RuntimeConfigContext';
import { X, Info, AlertTriangle, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { Announcement } from '@/types/runtimeConfig';

export function AnnouncementBanner() {
  const { config } = useRuntimeConfig();
  const [dismissedBanners, setDismissedBanners] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('toolpilot_dismissed_announcements');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const activeBanner = useMemo<Announcement | null>(() => {
    const banners = config.announcements?.banners || [];
    const now = new Date().getTime();

    // Filter banners
    const active = banners
      .filter((b) => {
        if (!b.enabled) return false;
        if (dismissedBanners.includes(b.id)) return false;

        const start = b.startDate ? new Date(b.startDate).getTime() : 0;
        const end = b.endDate ? new Date(b.endDate).getTime() : Infinity;

        return now >= start && now <= end;
      })
      .sort((a, b) => b.priority - a.priority); // High priority first

    return active.length > 0 ? active[0] : null;
  }, [config.announcements, dismissedBanners]);

  const handleDismiss = () => {
    if (!activeBanner) return;
    const nextDismissed = [...dismissedBanners, activeBanner.id];
    setDismissedBanners(nextDismissed);
    try {
      localStorage.setItem('toolpilot_dismissed_announcements', JSON.stringify(nextDismissed));
    } catch (err) {
      console.warn('Failed saving dismissed banners:', err);
    }
  };

  if (!activeBanner) return null;

  const typeStyles = {
    info: {
      bg: 'bg-blue-50 dark:bg-blue-950/20',
      text: 'text-blue-800 dark:text-blue-200',
      border: 'border-blue-200 dark:border-blue-900',
      icon: <Info size={16} className="text-blue-600 dark:text-blue-400 mt-0.5" />,
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-950/20',
      text: 'text-amber-800 dark:text-amber-200',
      border: 'border-amber-200 dark:border-amber-900',
      icon: <AlertTriangle size={16} className="text-amber-600 dark:text-amber-400 mt-0.5" />,
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-950/20',
      text: 'text-red-800 dark:text-red-200',
      border: 'border-red-200 dark:border-red-900',
      icon: <AlertOctagon size={16} className="text-red-600 dark:text-red-400 mt-0.5" />,
    },
    success: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/20',
      text: 'text-emerald-800 dark:text-emerald-200',
      border: 'border-emerald-200 dark:border-emerald-900',
      icon: <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 mt-0.5" />,
    },
  };

  const style = typeStyles[activeBanner.type as keyof typeof typeStyles] || typeStyles.info;

  return (
    <div
      className={`border-b px-4 py-2 text-center text-xs font-medium flex items-center justify-center gap-2 transition-all ${style.bg} ${style.text} ${style.border}`}
      role="alert"
    >
      <div className="flex items-center gap-2 max-w-4xl mx-auto flex-1 justify-center leading-relaxed">
        {style.icon}
        <span>{activeBanner.text}</span>
      </div>
      {activeBanner.dismissible && (
        <button
          onClick={handleDismiss}
          className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors shrink-0 text-current"
          aria-label="Dismiss announcement"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}

export default AnnouncementBanner;
