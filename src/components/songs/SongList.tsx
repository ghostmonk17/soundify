import { Song } from '@/context/PlayerContext';
import { SongItem } from './SongItem';
import { Loader } from '@/components/common/Loader';

interface SongListProps {
  songs: Song[];
  isLoading?: boolean;
  showIndex?: boolean;
  emptyMessage?: string;
}

export function SongList({ songs, isLoading, showIndex = true, emptyMessage = 'No songs found' }: SongListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader size="lg" />
      </div>
    );
  }

  if (songs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <span className="text-2xl">🎵</span>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">{emptyMessage}</h3>
        <p className="text-muted-foreground text-sm">Start exploring music to add songs here</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {/* Header */}
      <div className="flex items-center gap-4 px-3 py-2 text-xs text-muted-foreground uppercase tracking-wider border-b border-border">
        <div className="w-8 text-center">#</div>
        <div className="w-12" /> {/* Cover placeholder */}
        <div className="flex-1">Title</div>
        <div className="hidden md:block max-w-[200px]">Album</div>
        <div className="w-20" /> {/* Actions placeholder */}
        <div className="w-12 text-right">Duration</div>
      </div>

      {/* Songs */}
      {songs.map((song, index) => (
        <SongItem
          key={song.id}
          song={song}
          index={index + 1}
          showIndex={showIndex}
        />
      ))}
    </div>
  );
}
