import { useEffect, useState } from "react";

import { Song } from "@/context/PlayerContext";
import { usePlayer } from "@/hooks/usePlayer";

import {
  addFavorite,
  removeFavorite,
  isFavorite,
} from "@/services/favorites.services";

import { formatTime } from "@/utils/formatTime";

import { Play, Pause, Heart, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/common/Button";
import { cn } from "@/utils/utils";

interface SongItemProps {
  song: Song;
  index?: number;
  showIndex?: boolean;
}

export function SongItem({ song, index, showIndex = false }: SongItemProps) {
  const {
    currentSong,
    isPlaying,
    playSong,
    togglePlay,
    setQueue,
    queue,
  } = usePlayer();

  const [liked, setLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const isCurrentSong = currentSong?.id === song.id;

  // Sync from backend
  useEffect(() => {
    const load = async () => {
      try {
        const res = await isFavorite(song.id);
        setLiked(res);
      } catch {
        setLiked(false);
      }
    };

    load();
  }, [song.id]);

  const handlePlay = () => {
    if (isCurrentSong) {
      togglePlay();
    } else {
      if (!queue.find((s) => s.id === song.id)) {
        setQueue([...queue, song]);
      }

      playSong(song);
    }
  };

  const handleToggleFavorite = async () => {
    if (loading) return;

    setLoading(true);

    try {
      if (liked) {
        await removeFavorite(song.id);
        setLiked(false);
      } else {
        await addFavorite({
          trackId: song.id,
          title: song.title,
          artist: song.artist,
          image: song.coverUrl,
          audio: song.audioUrl,
        });

        setLiked(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "group flex items-center gap-4 p-3 rounded-lg transition-colors duration-200",
        "hover:bg-muted/50",
        isCurrentSong && "bg-muted/70"
      )}
    >
      {/* Index / Play */}
      <div className="w-8 flex items-center justify-center">
        {showIndex ? (
          <>
            <span
              className={cn(
                "text-sm text-muted-foreground group-hover:hidden",
                isCurrentSong && "text-primary font-medium"
              )}
            >
              {isCurrentSong && isPlaying ? "▶" : index}
            </span>

            <Button
              variant="player"
              size="icon-sm"
              onClick={handlePlay}
              className="hidden group-hover:flex"
            >
              {isCurrentSong && isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" />
              )}
            </Button>
          </>
        ) : (
          <Button variant="player" size="icon-sm" onClick={handlePlay}>
            {isCurrentSong && isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </Button>
        )}
      </div>

      {/* Cover */}
      <img
        src={song.coverUrl}
        alt={song.title}
        className="w-12 h-12 rounded-md object-cover shadow-md"
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4
          className={cn(
            "font-medium truncate",
            isCurrentSong ? "text-primary" : "text-foreground"
          )}
        >
          {song.title}
        </h4>

        <p className="text-sm text-muted-foreground truncate">
          {song.artist}
        </p>
      </div>

      {/* Album */}
      <span className="hidden md:block text-sm text-muted-foreground truncate max-w-[200px]">
        {song.album}
      </span>

      {/* Actions */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="player"
          size="icon-sm"
          onClick={handleToggleFavorite}
          disabled={loading}
        >
          <Heart
            className={cn(
              "w-4 h-4",
              liked && "fill-primary text-primary"
            )}
          />
        </Button>

        <Button variant="player" size="icon-sm">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Duration */}
      <span className="text-sm text-muted-foreground w-12 text-right">
        {formatTime(song.duration)}
      </span>
    </div>
  );
}
