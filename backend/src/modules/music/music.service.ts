import axios from "axios";

const JAMENDO_BASE_URL = "https://api.jamendo.com/v3.0";
const CLIENT_ID = process.env.JAMENDO_CLIENT_ID!;

export const getPopularTracks = async () => {
  const response = await axios.get(`${JAMENDO_BASE_URL}/tracks`, {
    params: {
      client_id: CLIENT_ID,
      format: "json",
      limit: 20,
      audioformat: "mp32",
      include: "musicinfo"
    }
  });

  return response.data.results;
};

export const searchTracks = async (query: string) => {
  const response = await axios.get(`${JAMENDO_BASE_URL}/tracks`, {
    params: {
      client_id: CLIENT_ID,
      format: "json",
      search: query,
      limit: 20,
      audioformat: "mp32"
    }
  });

  return response.data.results;
};
