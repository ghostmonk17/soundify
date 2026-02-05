<<<<<<< HEAD
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
=======
import React, { createContext, useContext, useReducer, ReactNode } from "react";
>>>>>>> aac6e09 (fix: reinitialize repo and push clean project)

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
<<<<<<< HEAD
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };
=======
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "CLEAR_ERROR" };
>>>>>>> aac6e09 (fix: reinitialize repo and push clean project)

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
<<<<<<< HEAD
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
=======
    case "LOGIN_START":
      return { ...state, isLoading: true, error: null };

    case "LOGIN_SUCCESS":
>>>>>>> aac6e09 (fix: reinitialize repo and push clean project)
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
<<<<<<< HEAD
    case 'LOGIN_FAILURE':
=======

    case "LOGIN_FAILURE":
>>>>>>> aac6e09 (fix: reinitialize repo and push clean project)
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
<<<<<<< HEAD
    case 'LOGOUT':
      return initialState;
    case 'CLEAR_ERROR':
      return { ...state, error: null };
=======

    case "LOGOUT":
      return initialState;

    case "CLEAR_ERROR":
      return { ...state, error: null };

>>>>>>> aac6e09 (fix: reinitialize repo and push clean project)
    default:
      return state;
  }
}

interface AuthContextType extends AuthState {
<<<<<<< HEAD
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
=======
  dispatch: React.Dispatch<AuthAction>;
>>>>>>> aac6e09 (fix: reinitialize repo and push clean project)
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

<<<<<<< HEAD
  const login = async (email: string, _password: string) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      // Simulated login - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const user: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        avatar: undefined,
      };
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid credentials' });
    }
  };

  const signup = async (email: string, _password: string, name: string) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const user: User = {
        id: '1',
        email,
        name,
        avatar: undefined,
      };
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Signup failed' });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider
      value={{ ...state, login, signup, logout, clearError }}
    >
=======
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
>>>>>>> aac6e09 (fix: reinitialize repo and push clean project)
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
<<<<<<< HEAD
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
=======
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
>>>>>>> aac6e09 (fix: reinitialize repo and push clean project)
  }
  return context;
}
