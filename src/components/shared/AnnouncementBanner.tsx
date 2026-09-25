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
      icon: <Info size={16} className="text-white" />,
    },
    warning: {
      bg: 'bg-warning-subtle',
      text: 'text-warning',
      border: 'border-warning-subtle',
      icon: <AlertTriangle size={16} className="text-white" />,
    },
    error: {
      bg: 'bg-danger-subtle',
      text: 'text-danger',
      border: 'border-danger-subtle',
      icon: <AlertOctagon size={16} className="text-white" />,
    },
    success: {
      bg: 'bg-success-subtle',
      text: 'text-success',
      border: 'border-success-subtle',
      icon: <CheckCircle2 size={16} className="text-white" />,
    },
  };

  const style = typeStyles[activeBanner.type as keyof typeof typeStyles] || typeStyles.info;

  return (
    <div className={`sk-banner sk-banner--${activeBanner.type}`} role="status">
      {style.icon}
      <span>{activeBanner.text}</span>
      {activeBanner.dismissible && (
        <button type="button" onClick={handleDismiss} aria-label="Dismiss announcement">
          <X size={14} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

export default AnnouncementBanner;
