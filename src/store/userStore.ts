import { create } from "zustand";

interface UserState {
  user: any | null;
  isLoggedIn: boolean;
  token: string | null;
  setUser: (user: any) => void;
  clearUser: () => void;
  setIsLoggedIn: (token: string | null) => void;
  removeIsLoggedIn: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  token: localStorage.getItem("token") || null,
  user: {},
  isLoggedIn: typeof window !== "undefined" ? !!localStorage.getItem("token") : false,
  setUser: (user) => {
    set({ user });
  },
  clearUser: () => {
    set({ user: null });
  },
  setIsLoggedIn: (token) => {
    set({ isLoggedIn: !!token, token });
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
  },
  removeIsLoggedIn: () => {
    set({ isLoggedIn: false, token: null });
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  },
}));