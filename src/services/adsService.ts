import { MobileAds, BannerAd, BannerAdSize, InterstitialAd, AdEventType, RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

const IS_DEV = process.env.EXPO_PUBLIC_ENV === 'development';
export const AD_UNIT_IDS = {
  banner: IS_DEV ? TestIds.BANNER : process.env.EXPO_PUBLIC_ADMOB_BANNER_ID!,
  interstitial: IS_DEV ? TestIds.INTERSTITIAL : process.env.EXPO_PUBLIC_ADMOB_INTERSTITIAL_ID!,
  rewarded: IS_DEV ? TestIds.REWARDED : process.env.EXPO_PUBLIC_ADMOB_REWARDED_ID!,
};

export async function initAdMob(): Promise<void> { await MobileAds().initialize(); }

let interstitialAd: InterstitialAd | null = null;
let interstitialLoaded = false;

export function preloadInterstitial(): void {
  interstitialAd = InterstitialAd.createForAdRequest(AD_UNIT_IDS.interstitial);
  interstitialAd.addAdEventListener(AdEventType.LOADED, () => { interstitialLoaded = true; });
  interstitialAd.addAdEventListener(AdEventType.CLOSED, () => { interstitialLoaded = false; preloadInterstitial(); });
  interstitialAd.load();
}

export async function showInterstitial(): Promise<void> { if (!interstitialLoaded || !interstitialAd) return; await interstitialAd.show(); }

export function showRewardedAd(): Promise<boolean> {
  return new Promise((resolve) => {
    const rewarded = RewardedAd.createForAdRequest(AD_UNIT_IDS.rewarded);
    rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => { rewarded.show(); });
    rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => { resolve(true); });
    rewarded.addAdEventListener(AdEventType.CLOSED, () => { resolve(false); });
    rewarded.addAdEventListener(AdEventType.ERROR, () => { resolve(false); });
    rewarded.load();
  });
}

export { BannerAd, BannerAdSize };
