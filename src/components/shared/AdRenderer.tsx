import { useEffect, useRef, useState } from 'react';
import { useRuntimeConfig } from '@/context/RuntimeConfigContext';
import { loadAdsense, shouldServeAds } from '@/services/adsense';

interface AdRendererProps {
  slotId: string;
  className?: string;
}

/**
 * A single ad placement, controlled from public/config/ads.json (no rebuild needed).
 *
 * UX guarantees:
 *  - space is reserved up front (min-height) so nothing shifts when the ad arrives
 *  - the ad script loads only when the slot is near the viewport
 *  - always labelled "Advertisement", never overlays content, never sticky
 *  - collapses completely if there is nothing to show (no fill, blocker, Save-Data)
 */
export function AdRenderer({ slotId, className = '' }: AdRendererProps) {
  const { config, getAdSlot } = useRuntimeConfig();
  const slot = getAdSlot(slotId);
  const adsense = config.ads.adsense;
  const testMode = !!config.ads.global.testMode;

  const boxRef = useRef<HTMLDivElement>(null);
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const [near, setNear] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const isAdsense = slot?.type === 'adsense';
  const active = !!slot?.enabled && (testMode || !isAdsense || shouldServeAds(adsense));

  // Only start work once the slot is about to scroll into view.
  useEffect(() => {
    const el = boxRef.current;
    if (!active || !el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [active]);

  // Load AdSense and request this ad (once per slot instance).
  useEffect(() => {
    if (!near || !isAdsense || testMode || !shouldServeAds(adsense) || pushed.current) return;
    let cancelled = false;
    loadAdsense(adsense).then((ok) => {
      if (cancelled) return;
      if (!ok) {
        setCollapsed(true);
        return;
      }
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushed.current = true;
      } catch {
        setCollapsed(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [near, isAdsense, testMode, adsense]);

  // Hide the box if AdSense reports no ad for this slot.
  useEffect(() => {
    const ins = insRef.current;
    if (!ins) return;
    const mo = new MutationObserver(() => {
      if (ins.getAttribute('data-ad-status') === 'unfilled') setCollapsed(true);
    });
    mo.observe(ins, { attributes: true, attributeFilter: ['data-ad-status'] });
    return () => mo.disconnect();
  }, [near]);

  if (!slot || !active || collapsed) return null;

  const minHeight = slot.minHeight ?? (slot.type === 'adsense' ? 250 : 0);

  return (
    <aside
      ref={boxRef}
      className={`sk-ad ${className}`}
      aria-label="Advertisement"
      style={{ minHeight: minHeight ? minHeight + 28 : undefined }}
    >
      <span className="sk-ad__label">Advertisement</span>

      {isAdsense && testMode && (
        <div className="sk-ad__test" style={{ minHeight }}>
          Ad preview · {slotId}
        </div>
      )}

      {isAdsense && !testMode && near && (
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: 'block', minHeight, ...(slot.style || {}) }}
          data-ad-client={adsense?.client}
          data-ad-slot={slot.slot}
          data-ad-format={slot.format ?? 'auto'}
          data-full-width-responsive="true"
        />
      )}

      {slot.type === 'custom-html' && slot.html && <div dangerouslySetInnerHTML={{ __html: slot.html }} />}

      {slot.type === 'image' && slot.imageUrl && (
        <a href={slot.linkUrl || '#'} target="_blank" rel="sponsored noopener noreferrer" className="sk-ad__img">
          <img src={slot.imageUrl} alt={slot.alt || 'Sponsored'} loading="lazy" />
        </a>
      )}
    </aside>
  );
}

export default AdRenderer;
