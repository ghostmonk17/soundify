import { useEffect, useState } from "react";

import { Song } from "@/context/PlayerContext";
import { usePlayer } from "@/hooks/usePlayer";

import { musicService } from "@/services/musicService";

import { SongList } from "@/components/songs/SongList";
import { Button } from "@/components/common/Button";

import { Play, Sparkles } from "lucide-react";

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { setQueue, playSong } = usePlayer();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await musicService.getSongs();
        setSongs(data);
      } catch (err) {
        console.error("Failed to load songs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const handlePlayAll = () => {
    if (songs.length > 0) {
      setQueue(songs);
      playSong(songs[0]);
    }
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden hero-gradient p-8 md:p-12">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-primary mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">
              Featured Today
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Discover Your <br />
            <span className="gradient-text">
              Perfect Sound
            </span>
          </h1>

          <p className="text-muted-foreground max-w-md mb-6">
            Explore trending tracks from Jamendo.
          </p>

          <Button
            variant="gradient"
            size="lg"
            onClick={handlePlayAll}
            disabled={songs.length === 0}
          >
            <Play className="w-5 h-5" />
            Play All
          </Button>
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
      </section>

      {/* Songs */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-6 h-6 text-primary" />

          <h2 className="text-2xl font-bold text-foreground">
            Trending Tracks
          </h2>
        </div>

        <div className="glass-card rounded-xl overflow-hidden">
          <SongList
            songs={songs}
            isLoading={isLoading}
            emptyMessage="No songs found"
          />
        </div>
      </section>
    </div>
  );
}
