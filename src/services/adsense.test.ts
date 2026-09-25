import { describe, it, expect } from 'vitest';
import { isValidPublisherId, shouldServeAds } from './adsense';

describe('adsense helpers', () => {
  it('validates publisher ids', () => {
    expect(isValidPublisherId('ca-pub-1234567890123456')).toBe(true);
    expect(isValidPublisherId('ca-pub-123')).toBe(false);
    expect(isValidPublisherId('pub-1234567890123456')).toBe(false);
    expect(isValidPublisherId('')).toBe(false);
    expect(isValidPublisherId(undefined)).toBe(false);
  });

  it('never serves ads while disabled or misconfigured', () => {
    expect(shouldServeAds(undefined)).toBe(false);
    expect(shouldServeAds({ enabled: false, client: 'ca-pub-1234567890123456' })).toBe(false);
    expect(shouldServeAds({ enabled: true, client: 'nope' })).toBe(false);
    expect(shouldServeAds({ enabled: true, client: 'ca-pub-1234567890123456' })).toBe(true);
  });
});
