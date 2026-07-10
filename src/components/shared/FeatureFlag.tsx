import { ReactNode } from 'react';
import { FeatureFlags } from '@/types/runtimeConfig';
import { useRuntimeConfig } from '@/context/RuntimeConfigContext';

interface FeatureFlagProps {
  flag: keyof FeatureFlags;
  children: ReactNode;
  fallback?: ReactNode;
}

export function FeatureFlag({ flag, children, fallback = null }: FeatureFlagProps) {
  const { getFeatureFlag } = useRuntimeConfig();
  const isEnabled = getFeatureFlag(flag);

  if (isEnabled) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}

export default FeatureFlag;
