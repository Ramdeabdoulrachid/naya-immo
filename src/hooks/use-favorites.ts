"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "naya_immo_favorites_v1";
const SYNC_EVENT = "naya-favorites-updated";

function readFavoritesFromStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setFavoriteIds(readFavoritesFromStorage());
    setIsHydrated(true);

    const handleSync = () => {
      setFavoriteIds(readFavoritesFromStorage());
    };

    window.addEventListener(SYNC_EVENT, handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener(SYNC_EVENT, handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  const toggleFavorite = useCallback((propertyId: string) => {
    const current = readFavoritesFromStorage();
    const exists = current.includes(propertyId);
    const updated = exists
      ? current.filter((id) => id !== propertyId)
      : [...current, propertyId];

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore quota errors
    }
    setFavoriteIds(updated);
    window.dispatchEvent(new CustomEvent(SYNC_EVENT));
  }, []);

  const isFavorite = useCallback(
    (propertyId: string) => {
      if (!isHydrated) return false;
      return favoriteIds.includes(propertyId);
    },
    [favoriteIds, isHydrated]
  );

  const clearFavorites = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
    setFavoriteIds([]);
    window.dispatchEvent(new CustomEvent(SYNC_EVENT));
  }, []);

  return {
    favoriteIds,
    favoritesCount: isHydrated ? favoriteIds.length : 0,
    isHydrated,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  };
}

