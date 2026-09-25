/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { FullRuntimeConfig, FeatureFlags, AdSlotConfig } from '@/types/runtimeConfig';
import { runtimeConfigService, DEFAULT_CONFIG } from '@/services/runtimeConfigService';

interface RuntimeConfigContextType {
  config: FullRuntimeConfig;
  getFeatureFlag: (key: keyof FeatureFlags) => boolean;
  getAdSlot: (id: string) => AdSlotConfig | undefined;
  isLoading: boolean;
}

const RuntimeConfigContext = createContext<RuntimeConfigContextType | undefined>(undefined);

export function RuntimeConfigProvider({ children }: { children: ReactNode }) {
  // Render immediately with defaults; live config is applied when it arrives (never block the UI).
  const [config, setConfig] = useState<FullRuntimeConfig>(DEFAULT_CONFIG);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function initConfig() {
      try {
        const loaded = await runtimeConfigService.loadAllConfigs();
        if (mounted) {
          setConfig(loaded);
        }
      } catch (err) {
        console.error('Failed initializing runtime configurations:', err);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }
    initConfig();
    return () => {
      mounted = false;
    };
  }, []);

  const getFeatureFlag = (key: keyof FeatureFlags): boolean => {
    return config.featureFlags[key] ?? DEFAULT_CONFIG.featureFlags[key];
  };

  const getAdSlot = (id: string): AdSlotConfig | undefined => {
    if (!config.ads.global.enabled) return undefined;
    return config.ads.slots[id];
  };

  return (
    <RuntimeConfigContext.Provider value={{ config, getFeatureFlag, getAdSlot, isLoading }}>
      {children}
    </RuntimeConfigContext.Provider>
  );
}

export function useRuntimeConfig() {
  const context = useContext(RuntimeConfigContext);
  if (context === undefined) {
    throw new Error('useRuntimeConfig must be used within a RuntimeConfigProvider');
  }
  return context;
}
