import { useState, useMemo } from 'react';
import { useRuntimeConfig } from '@/context/RuntimeConfigContext';
import { X, Info, AlertTriangle, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { Announcement } from '@/types/runtimeConfig';

export function AnnouncementBanner() {
  const { config } = useRuntimeConfig();
  const [dismissedBanners, setDismissedBanners] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('toolskyt_dismissed_announcements');
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
      localStorage.setItem('toolskyt_dismissed_announcements', JSON.stringify(nextDismissed));
    } catch (err) {
      console.warn('Failed saving dismissed banners:', err);
    }
  };

  if (!activeBanner) return null;

  const typeStyles = {
    info: {
      bg: 'bg-info-subtle',
      text: 'text-info',
      border: 'border-info-subtle',
      icon: <Info size={16} className="text-info mt-0.5" />,
    },
    warning: {
      bg: 'bg-warning-subtle',
      text: 'text-warning',
      border: 'border-warning-subtle',
      icon: <AlertTriangle size={16} className="text-warning mt-0.5" />,
    },
    error: {
      bg: 'bg-danger-subtle',
      text: 'text-danger',
      border: 'border-danger-subtle',
      icon: <AlertOctagon size={16} className="text-danger mt-0.5" />,
    },
    success: {
      bg: 'bg-success-subtle',
      text: 'text-success',
      border: 'border-success-subtle',
      icon: <CheckCircle2 size={16} className="text-success mt-0.5" />,
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
