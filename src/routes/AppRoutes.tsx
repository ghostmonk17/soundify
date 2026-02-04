import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Playlists from '@/pages/Playlists';
import Favorites from '@/pages/Favorites';
import Profile from '@/pages/Profile';
import NotFound from '@/pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/playlists" element={<Playlists />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
