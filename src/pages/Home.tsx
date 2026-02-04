import { useEffect, useState } from 'react';
import { Song } from '@/context/PlayerContext';
import { Playlist } from '@/context/PlaylistContext';
import { usePlayer } from '@/hooks/usePlayer';
import { musicService } from '@/services/musicService';
import { SongList } from '@/components/songs/SongList';
import { PlaylistList } from '@/components/playlist/PlaylistList';
import { Button } from '@/components/common/Button';
import { Play, TrendingUp, Clock, Sparkles } from 'lucide-react';

export default function Home() {
  const [featuredSongs, setFeaturedSongs] = useState<Song[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Song[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setQueue, playSong } = usePlayer();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featured, recent, playlistsData] = await Promise.all([
          musicService.getFeaturedSongs(),
          musicService.getRecentlyPlayed(),
          musicService.getPlaylists(),
        ]);
        setFeaturedSongs(featured);
        setRecentlyPlayed(recent);
        setPlaylists(playlistsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePlayAll = () => {
    if (featuredSongs.length > 0) {
      setQueue(featuredSongs);
      playSong(featuredSongs[0]);
    }
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden hero-gradient p-8 md:p-12">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-primary mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">Featured Today</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Discover Your <br />
            <span className="gradient-text">Perfect Sound</span>
          </h1>
          <p className="text-muted-foreground max-w-md mb-6">
            Explore curated playlists and trending tracks tailored just for you.
          </p>
          <Button variant="gradient" size="lg" onClick={handlePlayAll}>
            <Play className="w-5 h-5" />
            Play Featured
          </Button>
        </div>
        
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
      </section>

      {/* Featured Playlists */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Trending Playlists</h2>
        </div>
        <PlaylistList playlists={playlists} isLoading={isLoading} />
      </section>

      {/* Recently Played */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Recently Played</h2>
        </div>
        <div className="glass-card rounded-xl overflow-hidden">
          <SongList songs={recentlyPlayed} isLoading={isLoading} />
        </div>
      </section>

      {/* Featured Songs */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Featured Tracks</h2>
        </div>
        <div className="glass-card rounded-xl overflow-hidden">
          <SongList songs={featuredSongs} isLoading={isLoading} />
        </div>
      </section>
    </div>
  );
}
