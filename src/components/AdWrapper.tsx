import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, AD_UNIT_IDS } from '../services/adsService';
import { useSubscription } from '../hooks/useSubscription';

export function AdWrapper({ children, showBanner = true }: { children?: React.ReactNode; showBanner?: boolean }) {
  const { entitlements } = useSubscription();
  return (
    <View style={styles.container}>
      {children}
      {!entitlements.noAds && showBanner && <View style={styles.bannerContainer}><BannerAd unitId={AD_UNIT_IDS.banner} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{ requestNonPersonalizedAdsOnly: false }} /></View>}
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 }, bannerContainer: { alignItems: 'center', paddingBottom: 8 } });
