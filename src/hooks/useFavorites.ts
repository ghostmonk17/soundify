import { useEffect, useState } from "react";
import * as favoritesService from "@/services/favorites.services";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const data = await favoritesService.getFavorites();
      setFavorites(data);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (songId: string) => {
    if (favorites.includes(songId)) {
      const updated = await favoritesService.removeFavorite(songId);
      setFavorites(updated);
    } else {
      const updated = await favoritesService.addFavorite(songId);
      setFavorites(updated);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return {
    favorites,
    loading,
    toggleFavorite,
  };
};
