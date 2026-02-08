import axios from "axios";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import "../../css/search/SearchBar.css";

const SearchBar = ({ setSearchSongs }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setSearchSongs([]);
      return;
    }

    const fetchSongs = async () => {
      try {
        setLoading(true);

        // reuse playlist endpoint (Jamendo-style search)
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/songs/playlistByTag/${encodeURIComponent(
            query
          )}`
        );

        setSearchSongs(res.data?.results || []);
      } catch (error) {
        console.error("Search failed", error);
        setSearchSongs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [query, setSearchSongs]);

  return (
    <div className="searchbar-root">
      <div className="searchbar-input-wrapper">
        <input
          type="text"
          className="searchbar-input"
          placeholder="Search songs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <CiSearch className="searchbar-icon" size={20} />
      </div>

      {!query && !loading && (
        <p className="searchbar-empty">Search songs to display</p>
      )}

      {loading && <p className="searchbar-loading">Searching...</p>}
    </div>
  );
};

export default SearchBar;
