import api from "./api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

// Signup
export const signup = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const res = await api.post("/auth/signup", {
    email,
    password
  });

  return res.data;
};

// Login
export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const res = await api.post("/auth/login", {
    email,
    password
  });

  return res.data;
};

// helpers
export const authService = {
  setToken(token: string) {
    localStorage.setItem("accessToken", token);
  },

  getToken(): string | null {
    return localStorage.getItem("accessToken");
  },

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
};
