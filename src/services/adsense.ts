/**
 * Google AdSense loader. Designed to cost nothing until an ad is actually about to be seen:
 * the script is never in the initial HTML, it loads only after the page has finished loading
 * AND a slot is close to the viewport, and it is skipped entirely for Save-Data users.
 */
import type { AdsenseConfig } from '@/types/runtimeConfig';

declare global {
  interface Window {
    adsbygoogle?: unknown[] & { requestNonPersonalizedAds?: number };
  }
}

export const PUBLISHER_ID_RE = /^ca-pub-\d{16}$/;

export function isValidPublisherId(id: string | undefined): id is string {
  return !!id && PUBLISHER_ID_RE.test(id);
}

export function shouldServeAds(cfg: AdsenseConfig | undefined): cfg is AdsenseConfig {
  if (!cfg?.enabled || !isValidPublisherId(cfg.client)) return false;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return !conn?.saveData;
}

let loading: Promise<boolean> | null = null;

function afterPageLoad(delayMs: number): Promise<void> {
  return new Promise((resolve) => {
    const go = () => {
      const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void })
        .requestIdleCallback;
      const run = () => setTimeout(resolve, delayMs);
      if (idle) idle(run, { timeout: 4000 });
      else run();
    };
    if (document.readyState === 'complete') go();
    else window.addEventListener('load', go, { once: true });
  });
}

/** Loads adsbygoogle.js once; resolves true when ready, false when blocked or failed. */
export function loadAdsense(cfg: AdsenseConfig): Promise<boolean> {
  if (loading) return loading;
  loading = afterPageLoad(cfg.loadDelayMs ?? 1500).then(
    () =>
      new Promise<boolean>((resolve) => {
        window.adsbygoogle = window.adsbygoogle || [];
        if (cfg.nonPersonalized) window.adsbygoogle.requestNonPersonalizedAds = 1;
        const s = document.createElement('script');
        s.async = true;
        s.crossOrigin = 'anonymous';
        s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(cfg.client)}`;
        s.onload = () => resolve(true);
        s.onerror = () => resolve(false); // ad blocker etc. — fail silently, page is unaffected
        document.head.appendChild(s);
      })
  );
  return loading;
}
