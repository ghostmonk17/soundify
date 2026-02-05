import { useAuthContext } from "@/context/AuthContext";
import * as authService from "@/services/authService";
import { setTokens, clearTokens } from "@/utils/storage";

export function useAuth() {
  const { dispatch, user, isAuthenticated, isLoading, error } =
    useAuthContext();

  const login = async (email: string, password: string) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const { accessToken, refreshToken } = await authService.login(
        email,
        password,
      );

      setTokens(accessToken, refreshToken);

      // Backend currently doesn’t return user details,
      // so we derive minimal user info
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          id: "temp-id",
          email,
          name: email.split("@")[0],
        },
      });
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: "Invalid credentials",
      });
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const { accessToken, refreshToken } = await authService.signup(
        email,
        password,
      );

      setTokens(accessToken, refreshToken);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          id: "temp-id",
          email,
          name,
        },
      });
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: "Signup failed",
      });
    }
  };

  const logout = () => {
    clearTokens();
    dispatch({ type: "LOGOUT" });
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  return {
    // state
    user,
    isAuthenticated,
    isLoading,
    error,

    // actions
    login,
    signup,
    logout,
    clearError,
  };
}
