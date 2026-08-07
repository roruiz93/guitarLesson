import { useState, useCallback } from 'react';
import { collection, doc, setDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { BADGES } from '../constants/badges.const';
import { Badge, UserStats } from '../types';

export function useBadges(userId: string) {
  const [badgesDesbloqueados, setBadgesDesbloqueados] = useState<string[]>([]);
  const [badgeReciente, setBadgeReciente] = useState<Badge | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkBadgeProgress = useCallback(async (stats: UserStats & { leccionesCompletadas: number; racha: number }) => {
    setIsLoading(true);
    try {
      const snap = await getDocs(collection(db, 'users', userId, 'badges'));
      const yaDesbloqueados = snap.docs.map(d => d.id);
      setBadgesDesbloqueados(yaDesbloqueados);
      for (const badge of BADGES) {
        if (yaDesbloqueados.includes(badge.id)) continue;
        if (badge.condition(stats)) {
          await setDoc(doc(db, 'users', userId, 'badges', badge.id), { badgeId: badge.id, nombre: badge.name, timestamp: serverTimestamp() });
          setBadgesDesbloqueados(prev => [...prev, badge.id]);
          setBadgeReciente(badge);
          break;
        }
      }
    } finally { setIsLoading(false); }
  }, [userId]);

  const dismissBadge = useCallback(() => setBadgeReciente(null), []);
  return { badgesDesbloqueados, badgeReciente, checkBadgeProgress, dismissBadge, isLoading };
}
