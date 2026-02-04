/**
 * Format seconds to MM:SS format
 */
export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) {
    return '0:00';
  }
  
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format seconds to HH:MM:SS format for longer durations
 */
export function formatDuration(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) {
    return '0:00';
  }

  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Calculate total duration of a song array
 */
export function getTotalDuration(songs: { duration: number }[]): number {
  return songs.reduce((total, song) => total + song.duration, 0);
}

/**
 * Format a playlist's total duration to human readable string
 */
export function formatPlaylistDuration(songs: { duration: number }[]): string {
  const totalSeconds = getTotalDuration(songs);
  const hours = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0) {
    return `${hours} hr ${mins} min`;
  }
  return `${mins} min`;
}
