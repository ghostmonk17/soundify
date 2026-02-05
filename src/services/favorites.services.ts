import api from "./api";

export interface FavoriteSong {
  trackId: string;
  title: string;
  artist: string;
  image?: string;
  audio?: string;
}

// Get favorites
export const getFavorites = async () => {
  const res = await api.get("/favorites");
  return res.data as FavoriteSong[];
};

// Add favorite
export const addFavorite = async (song: FavoriteSong) => {
  const res = await api.post("/favorites", song);
  return res.data as FavoriteSong[];
};

// Remove favorite
export const removeFavorite = async (trackId: string) => {
  const res = await api.delete(`/favorites/${trackId}`);
  return res.data as FavoriteSong[];
};

// Check if favorite
export const isFavorite = async (trackId: string) => {
  const res = await api.get("/favorites");

  return res.data.some(
    (s: FavoriteSong) => s.trackId === trackId
  );
};
