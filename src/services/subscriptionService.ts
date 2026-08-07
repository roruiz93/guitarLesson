import Purchases, { PurchasesPackage, CustomerInfo } from 'react-native-purchases';
import { Platform } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Entitlements, PlanSuscripcion } from '../types';

export async function initRevenueCat(userId: string): Promise<void> {
  const apiKey = Platform.OS === 'ios' ? process.env.EXPO_PUBLIC_REVENUECAT_API_KEY_IOS! : process.env.EXPO_PUBLIC_REVENUECAT_API_KEY_ANDROID!;
  await Purchases.configure({ apiKey, appUserID: userId });
}

export async function getEntitlements(): Promise<Entitlements> {
  const info: CustomerInfo = await Purchases.getCustomerInfo();
  const active = info.entitlements.active;
  return { hasPrincipiante: true, hasIntermedio: !!active['intermedio'] || !!active['pro'] || !!active['maestro'], hasAvanzado: !!active['avanzado'] || !!active['maestro'], noAds: !!active['no_ads'] || !!active['pro'] || !!active['maestro'] };
}

export async function purchaseSubscription(plan: 'pro' | 'maestro'): Promise<CustomerInfo> {
  const offerings = await Purchases.getOfferings();
  const current = offerings.current;
  if (!current) throw new Error('No hay ofertas disponibles.');
  const productId = plan === 'pro' ? 'guitar_plus_pro_monthly' : 'guitar_plus_maestro_monthly';
  const pkg: PurchasesPackage | undefined = current.availablePackages.find(p => p.product.identifier === productId);
  if (!pkg) throw new Error(`Producto ${productId} no encontrado.`);
  const { customerInfo } = await Purchases.purchasePackage(pkg);
  return customerInfo;
}

export async function cancelSubscription(): Promise<void> { await Purchases.showManagePurchases(); }

export async function syncSubscriptionToFirestore(userId: string, customerInfo: CustomerInfo): Promise<void> {
  const active = customerInfo.entitlements.active;
  let plan: PlanSuscripcion = 'lite';
  if (active['maestro']) plan = 'maestro'; else if (active['pro']) plan = 'pro';
  const expira = customerInfo.latestExpirationDate ? new Date(customerInfo.latestExpirationDate) : null;
  await updateDoc(doc(db, 'users', userId), { 'subscriptionStatus.plan': plan, 'subscriptionStatus.expira': expira, 'subscriptionStatus.trialActivo': customerInfo.isInIntroOfferPeriod ?? false });
}
