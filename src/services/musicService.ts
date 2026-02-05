import api from "./api";
import { Song } from "@/context/PlayerContext";

export const musicService = {
  // Get popular songs
  async getSongs(): Promise<Song[]> {
    const res = await api.get("/music");
    return res.data.map(mapJamendoToSong);
  },

  // Search songs
  async searchSongs(query: string): Promise<Song[]> {
    const res = await api.get(`/music/search?q=${query}`);
    return res.data.map(mapJamendoToSong);
  }
};

// Convert Jamendo → App format
const mapJamendoToSong = (track: any): Song => {
  return {
    id: track.id,

    title: track.name,

    artist: track.artist_name,

    album: track.album_name || "Unknown",

    duration: track.duration,

    coverUrl: track.image,

    audioUrl: track.audio
  };
};
