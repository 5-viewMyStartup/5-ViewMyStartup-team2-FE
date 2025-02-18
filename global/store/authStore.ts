import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setToken: (accessToken: string, refreshToken: string) => void;
  removeToken: () => void;
}

interface UserState {
  id: string | null;
  name: string | null;
  setUserInfo: (id: string, name: string) => void;
  clearUserInfo: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: Cookies.get("accessToken") || null,
  refreshToken: Cookies.get("refreshToken") || null,
  setToken: (accessToken: string, refreshToken: string) => {
    Cookies.set("accessToken", accessToken, { expires: 1, secure: true }); // 7일 동안 유지
    Cookies.set("refreshToken", refreshToken, { expires: 1, secure: true }); // 7일 동안 유지
    set({ accessToken, refreshToken });
  },
  removeToken: () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    set({ accessToken: null, refreshToken: null });
  },
}));

export const useUserStore = create<UserState>((set) => ({
  id: Cookies.get("userId") || null,
  name: Cookies.get("userId") || null,

  setUserInfo: (id: string, name: string) => {
    Cookies.set("id", id, { expires: 1, secure: true });
    Cookies.set("name", name, { expires: 1, secure: true });
    set({ id, name });
  },

  clearUserInfo: () => {
    Cookies.remove("id");
    Cookies.remove("name");
    set({ id: null, name: null });
  },
}));
