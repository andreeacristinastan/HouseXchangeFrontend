import { create } from "zustand";
import { ResponseGetAllProfileImageType } from "./types/ProfileImageTypes";
import { userInfo } from "./types/UserTypes";

interface UserStore {
  user: userInfo | null;
  setUser: (user: userInfo) => void;
  removeUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: userInfo) => set({ user }),
  removeUser: () => set({ user: null }),
}));

export { useUserStore };
