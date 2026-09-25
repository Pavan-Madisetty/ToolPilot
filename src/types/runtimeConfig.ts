export interface RuntimeConfigMetadata {
  version: string;
  environment: string;
  refreshIntervalMinutes: number;
}

export interface FeatureFlags {
  darkMode: boolean;
  resumeBuilder: boolean;
  aiTools: boolean;
  developerTools: boolean;
  financeTools: boolean;
  experimentalFeatures: boolean;
  betaFeatures: boolean;
  maintenanceMode: boolean;
  futureReleases: boolean;
}

export type AdType = 'adsense' | 'custom-html' | 'image';

export interface AdSlotConfig {
  enabled: boolean;
  type: AdType;
  slot?: string;
  client?: string;
  html?: string;
  imageUrl?: string;
  linkUrl?: string;
  alt?: string;
  style?: Record<string, string>;
  /** Space reserved for the ad so the page never jumps when it loads (px). */
  minHeight?: number;
  /** AdSense ad format, default "auto". */
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical' | 'fluid';
}

export interface AdsenseConfig {
  /** Master switch for Google AdSense. Keep false until the AdSense account is approved. */
  enabled: boolean;
  /** Publisher ID, e.g. ca-pub-1234567890123456 */
  client: string;
  /** Request non-personalised ads only. */
  nonPersonalized?: boolean;
  /** Earliest the ad script may load after the page has finished loading (ms). */
  loadDelayMs?: number;
}

export interface AdsConfig {
  global: {
    enabled: boolean;
    /** Shows labelled placeholders instead of real ads, so you can preview the layout. */
    testMode?: boolean;
  };
  adsense?: AdsenseConfig;
  slots: Record<string, AdSlotConfig>;
}

export interface HomepageConfig {
  hero: {
    title: string;
    subtitle: string;
  };
  visibleSections: {
    hero: boolean;
    categories: boolean;
    popularTools: boolean;
    recentlyUsed: boolean;
    favorites: boolean;
    highlights: boolean;
  };
  trendingTools: string[];
  featuredTools: string[];
}

export interface SeoPageConfig {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage?: string;
  twitterCard?: string;
}

export interface SeoConfig {
  homepage: SeoPageConfig;
  [key: string]: SeoPageConfig;
}

export type AnnouncementType = 'info' | 'warning' | 'error' | 'success';

export interface Announcement {
  id: string;
  enabled: boolean;
  text: string;
  type: AnnouncementType;
  dismissible: boolean;
  priority: number;
  startDate: string;
  endDate: string;
}

export interface AnnouncementsConfig {
  banners: Announcement[];
}

export interface FutureConfig {
  futureFeatures: Record<string, unknown>;
  systemSettings: Record<string, unknown>;
}

// Master state structure loaded in context
export interface FullRuntimeConfig {
  metadata: RuntimeConfigMetadata;
  featureFlags: FeatureFlags;
  ads: AdsConfig;
  homepage: HomepageConfig;
  seo: SeoConfig;
  announcements: AnnouncementsConfig;
  future: FutureConfig;
}
