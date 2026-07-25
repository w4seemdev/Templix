import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Purchase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export function usePurchases() {
  const { user } = useAuth();
  // Depend on the id, not the user object: its identity changes on every
  // TOKEN_REFRESHED event (~hourly) and would re-trigger the query for nothing.
  const userId = user?.id;
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional reset when the user signs out
    if (!userId) { setPurchasedIds([]); setError(false); setLoading(false); return; }

    let cancelled = false;
    // Reset before refetching: the previous user's library must not render as this one's.
    setPurchasedIds([]); setError(false); setLoading(true);

    void supabase
      .from('purchases')
      .select('template_id')
      .eq('user_id', userId)
      .returns<Pick<Purchase, 'template_id'>[]>()
      .then(({ data, error: queryError }) => {
        if (cancelled) return;
        // A failed query is NOT an empty library - callers must be able to tell
        // "you own nothing" from "we couldn't check".
        if (queryError) setError(true);
        else setPurchasedIds(data?.map(p => p.template_id) ?? []);
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [userId]);

  const hasPurchased = (templateId: string) => purchasedIds.includes(templateId);

  return { purchasedIds, hasPurchased, loading, error };
}
