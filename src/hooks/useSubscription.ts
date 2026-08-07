import { useState, useEffect, useCallback } from 'react';
import { getEntitlements } from '../services/subscriptionService';
import { Entitlements, PlanSuscripcion } from '../types';
import { useAuth } from './useAuth';

const DEFAULT_ENTITLEMENTS: Entitlements = { hasPrincipiante: true, hasIntermedio: false, hasAvanzado: false, noAds: false };

export function useSubscription() {
  const { user, userData } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [entitlements, setEntitlements] = useState<Entitlements>(DEFAULT_ENTITLEMENTS);
  const [daysUntilCancel, setDaysUntilCancel] = useState<number | null>(null);
  const currentPlan: PlanSuscripcion = (userData as any)?.subscriptionStatus?.plan ?? 'lite';

  const refresh = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const ent = await getEntitlements();
      setEntitlements(ent);
      const expira = (userData as any)?.subscriptionStatus?.expira;
      if (expira) { const diff = new Date(expira).getTime() - Date.now(); setDaysUntilCancel(Math.max(0, Math.ceil(diff / 86400000))); }
    } catch { setEntitlements(DEFAULT_ENTITLEMENTS); }
    finally { setIsLoading(false); }
  }, [user, userData]);

  useEffect(() => { refresh(); }, [refresh]);
  return { isLoading, currentPlan, entitlements, daysUntilCancel, refresh };
}
