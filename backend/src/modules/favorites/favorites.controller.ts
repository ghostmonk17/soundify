import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import * as favoritesService from "./favorites.service";

export const addFavorite = async (req: AuthRequest, res: Response) => {
  const songId = req.params.songId as string;
  const user = await favoritesService.addFavorite(req.userId!, songId);
  res.json(user?.favorites);
};

export const removeFavorite = async (req: AuthRequest, res: Response) => {
  const songId = req.params.songId as string;
  const user = await favoritesService.removeFavorite(req.userId!, songId);
  res.json(user?.favorites);
};

export const getFavorites = async (req: AuthRequest, res: Response) => {
  const favorites = await favoritesService.getFavorites(req.userId!);
  res.json(favorites);
};
