import { create } from "zustand";

interface UserState {
  user: any | null;
  isLoggedIn: boolean;
  setUser: (user: any) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null,
  isLoggedIn: typeof window !== "undefined" ? !!localStorage.getItem("user") : false,
  setUser: (user) => {
    set({ user, isLoggedIn: !!user });
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }
  },
  clearUser: () => {
    set({ user: null, isLoggedIn: false });
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
  },
}));