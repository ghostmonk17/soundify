import { useState, useCallback, useMemo } from "react";
import { Song } from "@/context/PlayerContext";
import { Playlist } from "@/context/PlaylistContext";
import { musicService } from "@/services/musicService";
import { debounce } from "@/utils/utils";

interface SearchResults {
  songs: Song[];
  playlists: Playlist[];
}

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults>({
    songs: [],
    playlists: [],
  });
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults({ songs: [], playlists: [] });
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const [songs, playlists] = await Promise.all([
        musicService.searchSongs(searchQuery),
        musicService.getPlaylists(),
      ]);

      const lowerQuery = searchQuery.toLowerCase();
      const filteredPlaylists = playlists.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.description.toLowerCase().includes(lowerQuery),
      );

      setResults({ songs, playlists: filteredPlaylists });
    } catch (error) {
      console.error("Search error:", error);
      setResults({ songs: [], playlists: [] });
    } finally {
      setIsSearching(false);
    }
  }, []);

  const debouncedSearch = useMemo(
    () => debounce(performSearch, 300),
    [performSearch],
  );

  const search = useCallback(
    (searchQuery: string) => {
      setQuery(searchQuery);
      debouncedSearch(searchQuery);
    },
    [debouncedSearch],
  );

  const clearSearch = useCallback(() => {
    setQuery("");
    setResults({ songs: [], playlists: [] });
  }, []);

  return {
    query,
    results,
    isSearching,
    search,
    clearSearch,
    hasResults: results.songs.length > 0 || results.playlists.length > 0,
  };
}
