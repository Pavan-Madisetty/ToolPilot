import { FullRuntimeConfig, FeatureFlags, AdSlotConfig, RuntimeConfigMetadata, AdsConfig, HomepageConfig, SeoConfig, AnnouncementsConfig, FutureConfig } from '@/types/runtimeConfig';

export const DEFAULT_CONFIG: FullRuntimeConfig = {
  metadata: {
    version: '1.0.0',
    environment: 'production',
    refreshIntervalMinutes: 10,
  },
  featureFlags: {
    darkMode: true,
    resumeBuilder: true,
    aiTools: true,
    developerTools: true,
    financeTools: true,
    experimentalFeatures: false,
    betaFeatures: false,
    maintenanceMode: false,
    futureReleases: false,
  },
  ads: {
    global: { enabled: true },
    slots: {},
  },
  homepage: {
    hero: {
      title: 'Your Complete Digital Toolkit',
      subtitle: '100+ free browser tools. No signup. No tracking. Works offline.',
    },
    visibleSections: {
      hero: true,
      categories: true,
      popularTools: true,
      recentlyUsed: true,
      favorites: true,
      highlights: true,
    },
    trendingTools: [],
    featuredTools: [],
  },
  seo: {
    homepage: {
      metaTitle: 'Toolskyt — 100+ Free Online Tools for Finance, Developer, PDF & More',
      metaDescription: 'Free online browser tools. No signup. No tracking. Works offline. Complete tools for finance, developer utilities, PDF editing, text conversion, and travel estimation.',
      keywords: ['online tools', 'emi calculator', 'sip calculator', 'json formatter', 'resume builder'],
    },
  },
  announcements: {
    banners: [],
  },
  future: {
    futureFeatures: {},
    systemSettings: {},
  },
};

const CACHE_KEY = 'toolskyt_runtime_config_cache';

class RuntimeConfigService {
  private config: FullRuntimeConfig = { ...DEFAULT_CONFIG };
  private isLoaded = false;

  /**
   * Helper to perform fetch requests with simple retry and timeout.
   */
  private async fetchWithRetry(url: string, retries = 3, delay = 500): Promise<unknown> {
    for (let i = 0; i < retries; i++) {
      try {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 3000); // 3s timeout
        
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(id);

        if (!response.ok) {
          throw new Error(`Fetch status: ${response.status}`);
        }
        return await response.json();
      } catch (err) {
        if (i === retries - 1) {
          throw err;
        }
        await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
    throw new Error('Fetch failed after maximum retries');
  }

  /**
   * Load all config JSON files in parallel, fallback to localStorage cache, then to hardcoded defaults.
   */
  public async loadAllConfigs(): Promise<FullRuntimeConfig> {
    if (this.isLoaded) return this.config;

    const base = `${window.location.origin}${
      window.location.pathname.endsWith('/')
        ? window.location.pathname.slice(0, -1)
        : window.location.pathname
    }`.replace(/\/search$|\/finance.*|\/developer.*|\/image.*|\/text.*|\/ai.*|\/pdf.*|\/productivity.*|\/education.*|\/health.*|\/utilities.*|\/conversion.*|\/travel.*|\/business.*/, '');

    const normalizedBase = base.endsWith('/') ? base : `${base}/`;
    const configPath = (file: string) => `${normalizedBase}config/${file}`;

    try {
      const results = await Promise.allSettled([
        this.fetchWithRetry(configPath('runtime-config.json')),
        this.fetchWithRetry(configPath('feature-flags.json')),
        this.fetchWithRetry(configPath('ads.json')),
        this.fetchWithRetry(configPath('homepage.json')),
        this.fetchWithRetry(configPath('seo.json')),
        this.fetchWithRetry(configPath('announcements.json')),
        this.fetchWithRetry(configPath('future.json')),
      ]);

      const [metadata, featureFlags, ads, homepage, seo, announcements, future] = results;

      const newConfig: FullRuntimeConfig = {
        metadata: metadata.status === 'fulfilled' ? (metadata.value as RuntimeConfigMetadata) : { ...DEFAULT_CONFIG.metadata },
        featureFlags: featureFlags.status === 'fulfilled' ? (featureFlags.value as FeatureFlags) : { ...DEFAULT_CONFIG.featureFlags },
        ads: ads.status === 'fulfilled' ? (ads.value as AdsConfig) : { ...DEFAULT_CONFIG.ads },
        homepage: homepage.status === 'fulfilled' ? (homepage.value as HomepageConfig) : { ...DEFAULT_CONFIG.homepage },
        seo: seo.status === 'fulfilled' ? (seo.value as SeoConfig) : { ...DEFAULT_CONFIG.seo },
        announcements: announcements.status === 'fulfilled' ? (announcements.value as AnnouncementsConfig) : { ...DEFAULT_CONFIG.announcements },
        future: future.status === 'fulfilled' ? (future.value as FutureConfig) : { ...DEFAULT_CONFIG.future },
      };

      // Check if any configurations loaded successfully
      const anyLoaded = results.some((r) => r.status === 'fulfilled');

      if (anyLoaded) {
        this.config = newConfig;
        this.isLoaded = true;
        // Save successfully loaded dynamic config payload in localStorage for offline usage
        localStorage.setItem(CACHE_KEY, JSON.stringify(this.config));
      } else {
        throw new Error('All configuration requests failed.');
      }
    } catch (e) {
      console.warn('RuntimeConfigService failed to load dynamic assets. Attempting localStorage cache.', e);
      this.loadFromCache();
    }

    return this.config;
  }

  /**
   * Load previous cache if network request fails.
   */
  private loadFromCache() {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        this.config = JSON.parse(cached);
        this.isLoaded = true;
        console.warn('Loaded RuntimeConfig from localStorage fallback cache.');
      } else {
        this.config = { ...DEFAULT_CONFIG };
        this.isLoaded = true;
        console.warn('No localStorage cache available. Fallback to default constants.');
      }
    } catch {
      this.config = { ...DEFAULT_CONFIG };
      this.isLoaded = true;
    }
  }

  public getConfig(): FullRuntimeConfig {
    return this.config;
  }

  public getFeatureFlag(key: keyof FeatureFlags): boolean {
    return this.config.featureFlags[key] ?? DEFAULT_CONFIG.featureFlags[key];
  }

  public getAdSlot(id: string): AdSlotConfig | undefined {
    if (!this.config.ads.global.enabled) return undefined;
    return this.config.ads.slots[id];
  }
}

export const runtimeConfigService = new RuntimeConfigService();
export default runtimeConfigService;
