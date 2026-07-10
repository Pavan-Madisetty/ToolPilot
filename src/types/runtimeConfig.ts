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
}

export interface AdsConfig {
  global: {
    enabled: boolean;
    testMode?: boolean;
  };
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
