import { User } from "../../models/user.model";

export const addFavorite = async (userId: string, songId: string) => {
  return User.findByIdAndUpdate(
    userId,
    { $addToSet: { favorites: songId } },
    { new: true }
  );
};

export const removeFavorite = async (userId: string, songId: string) => {
  return User.findByIdAndUpdate(
    userId,
    { $pull: { favorites: songId } },
    { new: true }
  );
};

export const getFavorites = async (userId: string) => {
  const user = await User.findById(userId);
  return user?.favorites || [];
};
