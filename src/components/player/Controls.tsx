import { usePlayer } from "@/hooks/usePlayer";
import { Button } from "@/components/common/Button";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
} from "lucide-react";
import { cn } from "@/utils/utils";

export function Controls() {
  const {
    isPlaying,
    togglePlay,
    nextSong,
    prevSong,
    shuffle,
    repeat,
    toggleShuffle,
    toggleRepeat,
    currentSong,
  } = usePlayer();

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <Button
        variant="player"
        size="icon-sm"
        onClick={toggleShuffle}
        className={cn(shuffle && "text-primary")}
      >
        <Shuffle className="w-4 h-4" />
      </Button>

      <Button
        variant="player"
        size="icon"
        onClick={prevSong}
        disabled={!currentSong}
      >
        <SkipBack className="w-5 h-5" />
      </Button>

      <Button
        variant="gradient"
        size="icon-lg"
        onClick={togglePlay}
        disabled={!currentSong}
        className="rounded-full"
      >
        {isPlaying ? (
          <Pause className="w-6 h-6" />
        ) : (
          <Play className="w-6 h-6 ml-0.5" />
        )}
      </Button>

      <Button
        variant="player"
        size="icon"
        onClick={nextSong}
        disabled={!currentSong}
      >
        <SkipForward className="w-5 h-5" />
      </Button>

      <Button
        variant="player"
        size="icon-sm"
        onClick={toggleRepeat}
        className={cn(repeat !== "none" && "text-primary")}
      >
        {repeat === "one" ? (
          <Repeat1 className="w-4 h-4" />
        ) : (
          <Repeat className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
}
