import React, { createContext, useContext, useReducer, ReactNode, useRef, useEffect } from 'react';

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl: string;
  audioUrl: string;
}

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  queue: Song[];
  queueIndex: number;
  shuffle: boolean;
  repeat: 'none' | 'one' | 'all';
}

type PlayerAction =
  | { type: 'SET_SONG'; payload: Song }
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'TOGGLE_PLAY' }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'SET_PROGRESS'; payload: number }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'SET_QUEUE'; payload: Song[] }
  | { type: 'ADD_TO_QUEUE'; payload: Song }
  | { type: 'REMOVE_FROM_QUEUE'; payload: string }
  | { type: 'NEXT_SONG' }
  | { type: 'PREV_SONG' }
  | { type: 'TOGGLE_SHUFFLE' }
  | { type: 'TOGGLE_REPEAT' };

const initialState: PlayerState = {
  currentSong: null,
  isPlaying: false,
  volume: 0.7,
  progress: 0,
  duration: 0,
  queue: [],
  queueIndex: 0,
  shuffle: false,
  repeat: 'none',
};

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case 'SET_SONG':
      const songIndex = state.queue.findIndex(s => s.id === action.payload.id);
      return {
        ...state,
        currentSong: action.payload,
        queueIndex: songIndex >= 0 ? songIndex : state.queueIndex,
        progress: 0,
      };
    case 'PLAY':
      return { ...state, isPlaying: true };
    case 'PAUSE':
      return { ...state, isPlaying: false };
    case 'TOGGLE_PLAY':
      return { ...state, isPlaying: !state.isPlaying };
    case 'SET_VOLUME':
      return { ...state, volume: action.payload };
    case 'SET_PROGRESS':
      return { ...state, progress: action.payload };
    case 'SET_DURATION':
      return { ...state, duration: action.payload };
    case 'SET_QUEUE':
      return { ...state, queue: action.payload, queueIndex: 0 };
    case 'ADD_TO_QUEUE':
      return { ...state, queue: [...state.queue, action.payload] };
    case 'REMOVE_FROM_QUEUE':
      return {
        ...state,
        queue: state.queue.filter((s) => s.id !== action.payload),
      };
    case 'NEXT_SONG': {
      if (state.queue.length === 0) return state;
      let nextIndex: number;
      if (state.shuffle) {
        nextIndex = Math.floor(Math.random() * state.queue.length);
      } else {
        nextIndex = (state.queueIndex + 1) % state.queue.length;
      }
      return {
        ...state,
        queueIndex: nextIndex,
        currentSong: state.queue[nextIndex],
        progress: 0,
      };
    }
    case 'PREV_SONG': {
      if (state.queue.length === 0) return state;
      const prevIndex =
        state.queueIndex === 0 ? state.queue.length - 1 : state.queueIndex - 1;
      return {
        ...state,
        queueIndex: prevIndex,
        currentSong: state.queue[prevIndex],
        progress: 0,
      };
    }
    case 'TOGGLE_SHUFFLE':
      return { ...state, shuffle: !state.shuffle };
    case 'TOGGLE_REPEAT':
      const repeatModes: Array<'none' | 'one' | 'all'> = ['none', 'one', 'all'];
      const currentIndex = repeatModes.indexOf(state.repeat);
      return { ...state, repeat: repeatModes[(currentIndex + 1) % 3] };
    default:
      return state;
  }
}

interface PlayerContextType extends PlayerState {
  audioRef: React.RefObject<HTMLAudioElement>;
  playSong: (song: Song) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  seek: (time: number) => void;
  setQueue: (songs: Song[]) => void;
  addToQueue: (song: Song) => void;
  removeFromQueue: (songId: string) => void;
  nextSong: () => void;
  prevSong: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(playerReducer, initialState);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      dispatch({ type: 'SET_PROGRESS', payload: audio.currentTime });
    };

    const handleLoadedMetadata = () => {
      dispatch({ type: 'SET_DURATION', payload: audio.duration });
    };

    const handleEnded = () => {
      if (state.repeat === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else if (state.repeat === 'all' || state.queueIndex < state.queue.length - 1) {
        dispatch({ type: 'NEXT_SONG' });
      } else {
        dispatch({ type: 'PAUSE' });
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [state.repeat, state.queueIndex, state.queue.length]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = state.volume;
    }
  }, [state.volume]);

  useEffect(() => {
    if (audioRef.current && state.currentSong) {
      if (state.isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [state.isPlaying, state.currentSong]);

  const playSong = (song: Song) => {
    dispatch({ type: 'SET_SONG', payload: song });
    dispatch({ type: 'PLAY' });
  };

  const play = () => dispatch({ type: 'PLAY' });
  const pause = () => dispatch({ type: 'PAUSE' });
  const togglePlay = () => dispatch({ type: 'TOGGLE_PLAY' });
  
  const setVolume = (volume: number) => {
    dispatch({ type: 'SET_VOLUME', payload: volume });
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      dispatch({ type: 'SET_PROGRESS', payload: time });
    }
  };

  const setQueue = (songs: Song[]) => {
    dispatch({ type: 'SET_QUEUE', payload: songs });
  };

  const addToQueue = (song: Song) => {
    dispatch({ type: 'ADD_TO_QUEUE', payload: song });
  };

  const removeFromQueue = (songId: string) => {
    dispatch({ type: 'REMOVE_FROM_QUEUE', payload: songId });
  };

  const nextSong = () => dispatch({ type: 'NEXT_SONG' });
  const prevSong = () => dispatch({ type: 'PREV_SONG' });
  const toggleShuffle = () => dispatch({ type: 'TOGGLE_SHUFFLE' });
  const toggleRepeat = () => dispatch({ type: 'TOGGLE_REPEAT' });

  return (
    <PlayerContext.Provider
      value={{
        ...state,
        audioRef,
        playSong,
        play,
        pause,
        togglePlay,
        setVolume,
        seek,
        setQueue,
        addToQueue,
        removeFromQueue,
        nextSong,
        prevSong,
        toggleShuffle,
        toggleRepeat,
      }}
    >
      {children}
      <audio ref={audioRef} src={state.currentSong?.audioUrl} preload="metadata" />
    </PlayerContext.Provider>
  );
}

export function usePlayerContext() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayerContext must be used within a PlayerProvider');
  }
  return context;
}
