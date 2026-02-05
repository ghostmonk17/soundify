import * as musicService from "./music.service";

export const getSongs = async (req: any, res: any) => {
  const songs = await musicService.getPopularTracks();
  res.json(songs);
};

export const searchSongs = async (req: any, res: any) => {
  const query = req.query.q as string;
  const songs = await musicService.searchTracks(query);
  res.json(songs);
};
