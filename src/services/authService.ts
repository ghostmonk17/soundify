import api from "./api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData extends LoginCredentials {
  name: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  };
  token: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const res = await api.post("/auth/login", credentials);
    return res.data;
  },

  async signup(data: SignupData): Promise<AuthResponse> {
    const res = await api.post("/auth/register", data);
    return res.data;
  },

  async logout(): Promise<void> {
    localStorage.removeItem("authToken");
  },

  async getCurrentUser(): Promise<AuthResponse["user"]> {
    const res = await api.get("/auth/me");
    return res.data;
  },

  setToken(token: string): void {
    localStorage.setItem("authToken", token);
  },

  getToken(): string | null {
    return localStorage.getItem("authToken");
  },
};
