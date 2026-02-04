import { useAuthContext } from '@/context/AuthContext';

export function useAuth() {
  const context = useAuthContext();
  
  return {
    // State
    user: context.user,
    isAuthenticated: context.isAuthenticated,
    isLoading: context.isLoading,
    error: context.error,
    
    // Actions
    login: context.login,
    signup: context.signup,
    logout: context.logout,
    clearError: context.clearError,
  };
}
