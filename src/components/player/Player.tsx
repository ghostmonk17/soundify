import { usePlayer } from "@/hooks/usePlayer";
import { formatTime } from "@/utils/formatTime";
import { Controls } from "./Controls";
import { ProgressBar } from "./ProgressBar";
import { Volume2, ListMusic, Heart } from "lucide-react";
import { Button } from "@/components/common/Button";
import { usePlaylistContext } from "@/context/PlaylistContext";
import { cn } from "@/utils/utils";

export function Player() {
  const { currentSong, volume, setVolume, progress, duration } = usePlayer();
  const { isFavorite, toggleFavorite } = usePlaylistContext();

  if (!currentSong) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-player border-t border-border player-shadow">
        <div className="container mx-auto h-full flex items-center justify-center">
          <p className="text-muted-foreground text-sm">
            Select a song to start playing
          </p>
        </div>
      </div>
    );
  }

  const isLiked = isFavorite(currentSong.id);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-player border-t border-border player-shadow z-50">
      {/* Progress bar at top of player */}
      <ProgressBar className="absolute top-0 left-0 right-0" />

      <div className="container mx-auto h-20 px-4 flex items-center justify-between gap-4">
        {/* Song Info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <img
            src={currentSong.coverUrl}
            alt={currentSong.title}
            className="w-14 h-14 rounded-lg object-cover shadow-lg"
          />
          <div className="min-w-0">
            <h4 className="font-medium text-foreground truncate">
              {currentSong.title}
            </h4>
            <p className="text-sm text-muted-foreground truncate">
              {currentSong.artist}
            </p>
          </div>
          <Button
            variant="player"
            size="icon-sm"
            onClick={() => toggleFavorite(currentSong)}
            className="ml-2 flex-shrink-0"
          >
            <Heart
              className={cn(
                "w-5 h-5 transition-colors",
                isLiked && "fill-primary text-primary",
              )}
            />
          </Button>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-1 flex-1 max-w-md">
          <Controls />
          <div className="flex items-center gap-2 text-xs text-muted-foreground w-full">
            <span className="w-10 text-right">{formatTime(progress)}</span>
            <div className="flex-1 hidden sm:block">
              <ProgressBar showThumb />
            </div>
            <span className="w-10">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume & Queue */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <Button variant="player" size="icon-sm" className="hidden sm:flex">
            <ListMusic className="w-5 h-5" />
          </Button>

          <div className="hidden md:flex items-center gap-2">
            <Button variant="player" size="icon-sm">
              <Volume2 className="w-5 h-5" />
            </Button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-20 h-1 bg-muted rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-3
                [&::-webkit-slider-thumb]:h-3
                [&::-webkit-slider-thumb]:bg-foreground
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
