import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'templix_wishlist';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const toggle = useCallback((templateId: string) => {
    setWishlist(prev =>
      prev.includes(templateId)
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId],
    );
  }, []);

  const isWishlisted = useCallback(
    (templateId: string) => wishlist.includes(templateId),
    [wishlist],
  );

  return { wishlist, toggle, isWishlisted };
}
