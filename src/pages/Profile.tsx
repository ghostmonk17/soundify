import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { User, Settings, LogOut, Moon, Sun, Bell } from 'lucide-react';
import { useState } from 'react';

export default function Profile() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
          <User className="w-12 h-12 text-muted-foreground" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Not signed in</h2>
          <p className="text-muted-foreground mb-6">Sign in to access your profile and settings</p>
          <Button variant="gradient" onClick={() => navigate('/login')}>
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      {/* Profile Header */}
      <div className="flex items-center gap-6 p-6 glass-card rounded-2xl">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold text-white">
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{user?.name || 'User'}</h1>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      {/* Settings */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Settings</h2>
          </div>
        </div>

        <div className="divide-y divide-border">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              {isDarkMode ? (
                <Moon className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Sun className="w-5 h-5 text-muted-foreground" />
              )}
              <div>
                <p className="font-medium text-foreground">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Toggle dark/light theme</p>
              </div>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                isDarkMode ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  isDarkMode ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Notifications</p>
                <p className="text-sm text-muted-foreground">Receive push notifications</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                notifications ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  notifications ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Logout */}
      <Button
        variant="outline"
        className="w-full"
        onClick={handleLogout}
      >
        <LogOut className="w-5 h-5" />
        Sign Out
      </Button>
    </div>
  );
}
