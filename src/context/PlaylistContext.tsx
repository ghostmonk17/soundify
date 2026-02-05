import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { Song } from "./PlayerContext";

import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "@/services/favorites.services";

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  songs: Song[];
  createdAt: Date;
}

interface PlaylistContextType {
  playlists: Playlist[];

  /* Favorites (from backend) */
  favorites: Song[];
  isLoading: boolean;

  createPlaylist: (name: string) => void;

  isFavorite: (songId: string) => boolean;
  toggleFavorite: (song: Song) => Promise<void>;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(
  undefined,
);

export function PlaylistProvider({ children }: { children: ReactNode }) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [favorites, setFavorites] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadFavorites = async () => {
    try {
      const data = await getFavorites();

      const mapped: Song[] = data.map((s: any) => ({
        id: s.trackId,
        title: s.title,
        artist: s.artist,
        album: "",
        duration: 0,
        coverUrl: s.image || "",
        audioUrl: s.audio || "",
      }));

      setFavorites(mapped);
    } catch (err) {
      console.error("Load favorites failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  /* PLAYLIST (LOCAL ONLY) */

  const createPlaylist = (name: string) => {
    const playlist: Playlist = {
      id: Date.now().toString(),
      name,
      description: "",
      coverUrl: "/placeholder.svg",
      songs: [],
      createdAt: new Date(),
    };

    setPlaylists((p) => [...p, playlist]);
  };

  /*FAVORITES  */

  const isFavorite = (songId: string) => {
    return favorites.some((s) => s.id === songId);
  };

  const toggleFavorite = async (song: Song) => {
    try {
      if (isFavorite(song.id)) {
        /* REMOVE */
        await removeFavorite(song.id);

        setFavorites((prev) => prev.filter((s) => s.id !== song.id));
      } else {
        /* ADD */
        await addFavorite({
          trackId: song.id,
          title: song.title,
          artist: song.artist,
          image: song.coverUrl,
          audio: song.audioUrl,
        });

        setFavorites((prev) => [...prev, song]);
      }
    } catch (err) {
      console.error("Toggle favorite failed:", err);
    }
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        favorites,
        isLoading,

        createPlaylist,

        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylistContext() {
  const context = useContext(PlaylistContext);

  if (!context) {
    throw new Error("usePlaylistContext must be used inside PlaylistProvider");
  }

  return context;
}
