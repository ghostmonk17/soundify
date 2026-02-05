import { jamendoApi } from "../../config/jamendo";

class MusicError extends Error {
  status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
  }
}

export const getPopularTracks = async () => {
  try {
    const res = await jamendoApi.get("/tracks", {
      params: {
        limit: 20,
        audioformat: "mp32",
        include: "musicinfo",
        order: "popularity_total"
      }
    });

    return res.data.results;
  } catch (err) {
    throw new MusicError("Failed to fetch popular tracks", 502);
  }
};

export const searchTracks = async (query: string) => {
  try {
    const res = await jamendoApi.get("/tracks", {
      params: {
        search: query,
        limit: 20,
        audioformat: "mp32"
      }
    });

    return res.data.results;
  } catch (err) {
    throw new MusicError("Failed to search tracks", 502);
  }
};
