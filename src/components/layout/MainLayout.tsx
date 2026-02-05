import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/utils/utils";
import { useSearch } from "@/hooks/useSearch";
import { SongItem } from "@/components/songs/SongItem";
import {
  Home,
  Library,
  Heart,
  User,
  Search,
  Menu,
  X,
  Music2,
} from "lucide-react";
import { Button } from "@/components/common/Button";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/playlists", label: "Library", icon: Library },
  { path: "/favorites", label: "Favorites", icon: Heart },
  { path: "/profile", label: "Profile", icon: User },
];

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { query, results, search, clearSearch, hasResults } = useSearch();

  if (location.pathname === "/login") {
    return <>{children}</>;
  }

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-50",
          "transform transition-transform duration-300",
          "lg:translate-x-0 lg:static",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-4">
          <Link to="/" className="flex items-center gap-3 px-3 py-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Music2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">
              Soundify
            </span>
          </Link>

          <nav className="space-y-1 flex-1">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;

              return (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                    "hover:bg-sidebar-accent text-sidebar-foreground",
                    isActive &&
                      "bg-sidebar-accent text-primary font-medium nav-link-active"
                  )}
                >
                  <Icon
                    className={cn("w-5 h-5", isActive && "text-primary")}
                  />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="px-3 py-4 text-xs text-muted-foreground">
            <p>© 2026 Soundify</p>
            <p>Made with ♥</p>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="flex items-center gap-4 px-4 py-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>

            {/* Search */}
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

              <input
                type="text"
                placeholder="Search songs, artists, albums..."
                value={query}
                onChange={(e) => search(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-full bg-muted/50 border border-border text-foreground"
              />

              {query && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {hasResults && (
                <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-xl max-h-96 overflow-y-auto z-50">
                  {results.songs.length > 0 && (
                    <div className="p-2">
                      {results.songs.slice(0, 5).map((song) => (
                        <div key={song.id} onClick={clearSearch}>
                          <SongItem song={song} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* SCROLL AREA */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pb-32">
          {children}
        </div>
      </main>
    </div>
  );
}
