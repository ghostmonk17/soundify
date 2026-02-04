import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Song } from './PlayerContext';

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  songs: Song[];
  createdAt: Date;
}

interface PlaylistState {
  playlists: Playlist[];
  favorites: Song[];
  isLoading: boolean;
  error: string | null;
}

type PlaylistAction =
  | { type: 'SET_PLAYLISTS'; payload: Playlist[] }
  | { type: 'ADD_PLAYLIST'; payload: Playlist }
  | { type: 'UPDATE_PLAYLIST'; payload: Playlist }
  | { type: 'DELETE_PLAYLIST'; payload: string }
  | { type: 'ADD_SONG_TO_PLAYLIST'; payload: { playlistId: string; song: Song } }
  | { type: 'REMOVE_SONG_FROM_PLAYLIST'; payload: { playlistId: string; songId: string } }
  | { type: 'SET_FAVORITES'; payload: Song[] }
  | { type: 'ADD_TO_FAVORITES'; payload: Song }
  | { type: 'REMOVE_FROM_FAVORITES'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: PlaylistState = {
  playlists: [],
  favorites: [],
  isLoading: false,
  error: null,
};

function playlistReducer(state: PlaylistState, action: PlaylistAction): PlaylistState {
  switch (action.type) {
    case 'SET_PLAYLISTS':
      return { ...state, playlists: action.payload };
    case 'ADD_PLAYLIST':
      return { ...state, playlists: [...state.playlists, action.payload] };
    case 'UPDATE_PLAYLIST':
      return {
        ...state,
        playlists: state.playlists.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case 'DELETE_PLAYLIST':
      return {
        ...state,
        playlists: state.playlists.filter((p) => p.id !== action.payload),
      };
    case 'ADD_SONG_TO_PLAYLIST':
      return {
        ...state,
        playlists: state.playlists.map((p) =>
          p.id === action.payload.playlistId
            ? { ...p, songs: [...p.songs, action.payload.song] }
            : p
        ),
      };
    case 'REMOVE_SONG_FROM_PLAYLIST':
      return {
        ...state,
        playlists: state.playlists.map((p) =>
          p.id === action.payload.playlistId
            ? { ...p, songs: p.songs.filter((s) => s.id !== action.payload.songId) }
            : p
        ),
      };
    case 'SET_FAVORITES':
      return { ...state, favorites: action.payload };
    case 'ADD_TO_FAVORITES':
      if (state.favorites.some((s) => s.id === action.payload.id)) {
        return state;
      }
      return { ...state, favorites: [...state.favorites, action.payload] };
    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        favorites: state.favorites.filter((s) => s.id !== action.payload),
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

interface PlaylistContextType extends PlaylistState {
  createPlaylist: (name: string, description?: string) => void;
  updatePlaylist: (playlist: Playlist) => void;
  deletePlaylist: (playlistId: string) => void;
  addSongToPlaylist: (playlistId: string, song: Song) => void;
  removeSongFromPlaylist: (playlistId: string, songId: string) => void;
  addToFavorites: (song: Song) => void;
  removeFromFavorites: (songId: string) => void;
  isFavorite: (songId: string) => boolean;
  toggleFavorite: (song: Song) => void;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export function PlaylistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(playlistReducer, initialState);

  const createPlaylist = (name: string, description: string = '') => {
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name,
      description,
      coverUrl: '/placeholder.svg',
      songs: [],
      createdAt: new Date(),
    };
    dispatch({ type: 'ADD_PLAYLIST', payload: newPlaylist });
  };

  const updatePlaylist = (playlist: Playlist) => {
    dispatch({ type: 'UPDATE_PLAYLIST', payload: playlist });
  };

  const deletePlaylist = (playlistId: string) => {
    dispatch({ type: 'DELETE_PLAYLIST', payload: playlistId });
  };

  const addSongToPlaylist = (playlistId: string, song: Song) => {
    dispatch({ type: 'ADD_SONG_TO_PLAYLIST', payload: { playlistId, song } });
  };

  const removeSongFromPlaylist = (playlistId: string, songId: string) => {
    dispatch({ type: 'REMOVE_SONG_FROM_PLAYLIST', payload: { playlistId, songId } });
  };

  const addToFavorites = (song: Song) => {
    dispatch({ type: 'ADD_TO_FAVORITES', payload: song });
  };

  const removeFromFavorites = (songId: string) => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: songId });
  };

  const isFavorite = (songId: string) => {
    return state.favorites.some((s) => s.id === songId);
  };

  const toggleFavorite = (song: Song) => {
    if (isFavorite(song.id)) {
      removeFromFavorites(song.id);
    } else {
      addToFavorites(song);
    }
  };

  return (
    <PlaylistContext.Provider
      value={{
        ...state,
        createPlaylist,
        updatePlaylist,
        deletePlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
        addToFavorites,
        removeFromFavorites,
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
  if (context === undefined) {
    throw new Error('usePlaylistContext must be used within a PlaylistProvider');
  }
  return context;
}
