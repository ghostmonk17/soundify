import { usePlayerContext } from '@/context/PlayerContext';

export function usePlayer() {
  const context = usePlayerContext();
  
  return {
    // State
    currentSong: context.currentSong,
    isPlaying: context.isPlaying,
    volume: context.volume,
    progress: context.progress,
    duration: context.duration,
    queue: context.queue,
    shuffle: context.shuffle,
    repeat: context.repeat,
    
    // Actions
    playSong: context.playSong,
    play: context.play,
    pause: context.pause,
    togglePlay: context.togglePlay,
    setVolume: context.setVolume,
    seek: context.seek,
    setQueue: context.setQueue,
    addToQueue: context.addToQueue,
    removeFromQueue: context.removeFromQueue,
    nextSong: context.nextSong,
    prevSong: context.prevSong,
    toggleShuffle: context.toggleShuffle,
    toggleRepeat: context.toggleRepeat,
  };
}
