import { Playlist } from '@/context/PlaylistContext';
import { usePlayer } from '@/hooks/usePlayer';
import { formatPlaylistDuration } from '@/utils/formatTime';
import { Play } from 'lucide-react';
import { Button } from '@/components/common/Button';

interface PlaylistCardProps {
  playlist: Playlist;
  onClick?: () => void;
}

export function PlaylistCard({ playlist, onClick }: PlaylistCardProps) {
  const { setQueue, playSong } = usePlayer();

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (playlist.songs.length > 0) {
      setQueue(playlist.songs);
      playSong(playlist.songs[0]);
    }
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-card rounded-xl p-4 hover-lift cursor-pointer card-glow transition-all duration-300"
    >
      {/* Cover Image */}
      <div className="relative aspect-square rounded-lg overflow-hidden mb-4 shadow-lg">
        <img
          src={playlist.coverUrl}
          alt={playlist.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            variant="gradient"
            size="icon-lg"
            className="rounded-full transform scale-90 group-hover:scale-100 transition-transform duration-300"
            onClick={handlePlay}
          >
            <Play className="w-6 h-6 ml-0.5" />
          </Button>
        </div>
      </div>

      {/* Info */}
      <h3 className="font-semibold text-foreground truncate mb-1">{playlist.name}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{playlist.description}</p>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>{playlist.songs.length} songs</span>
        <span>•</span>
        <span>{formatPlaylistDuration(playlist.songs)}</span>
      </div>
    </div>
  );
}
