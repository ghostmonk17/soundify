import { usePlayerContext } from "@/context/PlayerContext";

import { SongList } from "@/components/songs/SongList";

import { History } from "lucide-react";

export default function Library() {
  const { recentlyPlayed } = usePlayerContext();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <History className="w-6 h-6 text-white" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Your Library
          </h1>

          <p className="text-muted-foreground">
            {recentlyPlayed.length} recently played
          </p>
        </div>
      </div>

      {/* Songs */}
      <div className="glass-card rounded-xl overflow-hidden">
        <SongList
          songs={recentlyPlayed}
          emptyMessage="Play some music to see it here!"
        />
      </div>
    </div>
  );
}
