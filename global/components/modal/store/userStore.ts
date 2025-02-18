import { create } from "zustand";
interface User {
  id: string | null;
  email: string | null;
  name: string | null;
  nickname: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}
interface UserState {
  user: User | null;
  setUserName: (user: User) => void;
  clearUserName: () => void;
}

export const useUserNameStore = create<UserState>((set) => ({
  user: null,
  setUserName: (user) => set({ user }),

  clearUserName: () =>
    set({
      user: {
        id: null,
        name: null,
        email: null,
        nickname: null,
        createdAt: null,
        updatedAt: null,
      },
    }),
}));
