import { usePlayer } from "@/hooks/usePlayer";
import { cn } from "@/utils/utils";

interface ProgressBarProps {
  className?: string;
  showThumb?: boolean;
}

export function ProgressBar({
  className,
  showThumb = false,
}: ProgressBarProps) {
  const { progress, duration, seek } = usePlayer();

  const percentage = duration > 0 ? (progress / duration) * 100 : 0;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentage = clickPosition / rect.width;
    const newTime = percentage * duration;
    seek(newTime);
  };

  return (
    <div
      className={cn(
        "progress-track cursor-pointer group",
        showThumb ? "h-1" : "h-0.5",
        className,
      )}
      onClick={handleClick}
    >
      <div
        className="progress-fill relative"
        style={{ width: `${percentage}%` }}
      >
        {showThumb && (
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-foreground rounded-full 
              opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
          />
        )}
      </div>
    </div>
  );
}
