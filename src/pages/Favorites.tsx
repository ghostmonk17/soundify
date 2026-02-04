import { usePlaylistContext } from '@/context/PlaylistContext';
import { usePlayer } from '@/hooks/usePlayer';
import { SongList } from '@/components/songs/SongList';
import { Button } from '@/components/common/Button';
import { Heart, Play, Shuffle } from 'lucide-react';

export default function Favorites() {
  const { favorites } = usePlaylistContext();
  const { setQueue, playSong, toggleShuffle } = usePlayer();

  const handlePlayAll = () => {
    if (favorites.length > 0) {
      setQueue(favorites);
      playSong(favorites[0]);
    }
  };

  const handleShufflePlay = () => {
    if (favorites.length > 0) {
      const shuffled = [...favorites].sort(() => Math.random() - 0.5);
      setQueue(shuffled);
      playSong(shuffled[0]);
      toggleShuffle();
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/30 to-accent/20 p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
          <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl shadow-primary/30">
            <Heart className="w-24 h-24 text-white fill-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-primary font-medium mb-2">Playlist</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Liked Songs</h1>
            <p className="text-muted-foreground mb-6">{favorites.length} songs you've loved</p>
            <div className="flex gap-3">
              <Button 
                variant="gradient" 
                size="lg" 
                onClick={handlePlayAll}
                disabled={favorites.length === 0}
              >
                <Play className="w-5 h-5" />
                Play All
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={handleShufflePlay}
                disabled={favorites.length === 0}
              >
                <Shuffle className="w-5 h-5" />
                Shuffle
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      {/* Songs */}
      <div className="glass-card rounded-xl overflow-hidden">
        <SongList 
          songs={favorites} 
          emptyMessage="No liked songs yet. Heart some songs to see them here!"
        />
      </div>
    </div>
  );
}
