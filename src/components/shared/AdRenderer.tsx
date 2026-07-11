import { useEffect } from 'react';
import { useRuntimeConfig } from '@/context/RuntimeConfigContext';

interface AdRendererProps {
  slotId: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdRenderer({ slotId, className = '' }: AdRendererProps) {
  const { getAdSlot } = useRuntimeConfig();
  const slot = getAdSlot(slotId);

  useEffect(() => {
    if (slot && slot.enabled && slot.type === 'adsense') {
      try {
        // Trigger google adsense load event
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.warn('Google Adsense push failed:', err);
      }
    }
  }, [slot]);

  if (!slot || !slot.enabled) {
    return null;
  }

  return (
    <div className={`ad-container my-4 text-center ${className}`}>
      {slot.type === 'adsense' && (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minHeight: '90px', ...(slot.style || {}) }}
          data-ad-client={slot.client || 'ca-pub-XXXXXXXXXX'}
          data-ad-slot={slot.slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}

      {slot.type === 'custom-html' && slot.html && (
        <div dangerouslySetInnerHTML={{ __html: slot.html }} />
      )}

      {slot.type === 'image' && slot.imageUrl && (
        <div className="relative inline-block rounded-xl overflow-hidden shadow-sm border border-border-default transition-transform hover:scale-[1.01]">
          <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-[8px] font-bold text-white tracking-widest uppercase px-1.5 py-0.5 rounded">
            Sponsored
          </span>
          <a
            href={slot.linkUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <img
              src={slot.imageUrl}
              alt={slot.alt || 'Sponsored Ad'}
              className="max-w-full h-auto block"
              style={{ maxHeight: '250px', objectFit: 'cover' }}
            />
          </a>
        </div>
      )}
    </div>
  );
}

export default AdRenderer;
