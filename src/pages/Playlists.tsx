import { useEffect, useState } from 'react';
import { Playlist, usePlaylistContext } from '@/context/PlaylistContext';
import { musicService } from '@/services/musicService';
import { PlaylistList } from '@/components/playlist/PlaylistList';
import { Button } from '@/components/common/Button';
import { Plus, Library } from 'lucide-react';

export default function Playlists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { createPlaylist, playlists: userPlaylists } = usePlaylistContext();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await musicService.getPlaylists();
        setPlaylists(data);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName.trim());
      setNewPlaylistName('');
      setShowCreateDialog(false);
    }
  };

  const allPlaylists = [...userPlaylists, ...playlists];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Library className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Your Library</h1>
            <p className="text-muted-foreground">{allPlaylists.length} playlists</p>
          </div>
        </div>
        <Button variant="gradient" onClick={() => setShowCreateDialog(true)}>
          <Plus className="w-5 h-5" />
          New Playlist
        </Button>
      </div>

      {/* Create Playlist Dialog */}
      {showCreateDialog && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in">
          <div className="glass-card rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold text-foreground mb-4">Create New Playlist</h3>
            <input
              type="text"
              placeholder="Playlist name"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              className="w-full h-12 px-4 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 mb-4"
              autoFocus
            />
            <div className="flex gap-3 justify-end">
              <Button variant="ghost" onClick={() => setShowCreateDialog(false)}>
                Cancel
              </Button>
              <Button variant="gradient" onClick={handleCreatePlaylist}>
                Create
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* User Playlists */}
      {userPlaylists.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Created by You</h2>
          <PlaylistList playlists={userPlaylists} />
        </section>
      )}

      {/* Browse Playlists */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Browse Playlists</h2>
        <PlaylistList playlists={playlists} isLoading={isLoading} />
      </section>
    </div>
  );
}
