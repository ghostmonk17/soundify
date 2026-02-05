import { User } from "../../models/user.model";

type Song = {
  trackId: string;
  title: string;
  artist: string;
  image?: string;
  audio?: string;
};

class FavoritesError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const addFavorite = async (
  userId: string,
  song: Song
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new FavoritesError("User not found", 404);
  }

  const exists = user.favorites.find(
    (s: any) => s.trackId === song.trackId
  );

  if (exists) return user.favorites;

  user.favorites.push(song as any);

  await user.save();

  return user.favorites;
};

export const removeFavorite = async (
  userId: string,
  trackId: string
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new FavoritesError("User not found", 404);
  }

  user.favorites = user.favorites.filter(
    (s: any) => s.trackId !== trackId
  ) as any;

  await user.save();

  return user.favorites;
};

export const getFavorites = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new FavoritesError("User not found", 404);
  }

  return user.favorites;
};
