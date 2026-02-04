import { Playlist } from '@/context/PlaylistContext';
import { PlaylistCard } from './PlaylistCard';
import { SkeletonCard } from '@/components/common/Loader';

interface PlaylistListProps {
  playlists: Playlist[];
  isLoading?: boolean;
  onPlaylistClick?: (playlist: Playlist) => void;
}

export function PlaylistList({ playlists, isLoading, onPlaylistClick }: PlaylistListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (playlists.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <span className="text-2xl">🎵</span>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No playlists yet</h3>
        <p className="text-muted-foreground text-sm">Create your first playlist to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {playlists.map((playlist) => (
        <PlaylistCard
          key={playlist.id}
          playlist={playlist}
          onClick={() => onPlaylistClick?.(playlist)}
        />
      ))}
    </div>
  );
}
