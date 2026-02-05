import api from "./api";

export const getFavorites = async () => {
  const res = await api.get("/favorites");
  return res.data as string[];
};

export const addFavorite = async (songId: string) => {
  const res = await api.post(`/favorites/${songId}`);
  return res.data as string[];
};

export const removeFavorite = async (songId: string) => {
  const res = await api.delete(`/favorites/${songId}`);
  return res.data as string[];
};
