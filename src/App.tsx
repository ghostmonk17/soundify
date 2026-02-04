import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { PlayerProvider } from "@/context/PlayerContext";
import { PlaylistProvider } from "@/context/PlaylistContext";
import { MainLayout } from "@/components/layout/MainLayout";
import { Player } from "@/components/player/Player";
import AppRoutes from "@/routes/AppRoutes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <PlayerProvider>
          <PlaylistProvider>
            <BrowserRouter>
              <MainLayout>
                <AppRoutes />
              </MainLayout>
              <Player />
            </BrowserRouter>
            <Toaster />
            <Sonner />
          </PlaylistProvider>
        </PlayerProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
