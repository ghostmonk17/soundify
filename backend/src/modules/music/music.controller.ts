import { Request, Response, NextFunction } from "express";
import * as musicService from "./music.service";

export const getSongs = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const songs = await musicService.getPopularTracks();

    res.json(songs);
  } catch (err) {
    next(err);
  }
};

export const searchSongs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query.q as string;

    if (!query) {
      return res.status(400).json({
        message: "Search query is required"
      });
    }

    const songs = await musicService.searchTracks(query);

    res.json(songs);
  } catch (err) {
    next(err);
  }
};
