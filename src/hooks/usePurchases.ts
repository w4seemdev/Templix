import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export function usePurchases() {
  const { user } = useAuth();
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional reset when the user signs out
    if (!user) { setPurchasedIds([]); setLoading(false); return; }

    supabase
      .from('purchases')
      .select('template_id')
      .eq('user_id', user.id)
      .then(({ data }) => {
        setPurchasedIds(data?.map(p => p.template_id) ?? []);
        setLoading(false);
      });
  }, [user]);

  const hasPurchased = (templateId: string) => purchasedIds.includes(templateId);

  return { purchasedIds, hasPurchased, loading };
}
