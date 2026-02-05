import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import * as favoritesService from "./favorites.service";

export const addFavorite = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const song = req.body;

    if (!song?.trackId) {
      return res.status(400).json({
        message: "Invalid song data",
      });
    }

    const favorites = await favoritesService.addFavorite(req.userId, song);

    res.json(favorites);
  } catch (err) {
    next(err);
  }
};

export const removeFavorite = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const trackId = String(req.params.id);

    const favorites = await favoritesService.removeFavorite(
      req.userId,
      trackId,
    );

    res.json(favorites);
  } catch (err) {
    next(err);
  }
};

export const getFavorites = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const favorites = await favoritesService.getFavorites(req.userId);

    res.json(favorites);
  } catch (err) {
    next(err);
  }
};
