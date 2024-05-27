import { create } from "zustand";

type PropertyInfo = {
  id: number;
  name: string;
};

type TripInfo = {
  id: number;
  numberOfPersons: number;
  destination: string;
  minRange: number;
  maxRange: number;
  checkInDate: Date;
  checkOutDate: Date;
  userId: number;
  propertyId: number;
};

type userInfo = {
  id: number;
  role: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  language: string;
  phoneNumber: string;
  properties: PropertyInfo[];
  tripInfoDto: TripInfo[];
};

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
