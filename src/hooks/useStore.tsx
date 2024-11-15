import { create } from "zustand";
import { TypeWallet } from "@/types/types";

interface StoreState {
  wallet: TypeWallet | null;
  auth: {
    token: string | null;
    lastAddressLoggedIn: string | null;
  };
  token: string | null;
  setWallet: (wallet: TypeWallet | null) => void;
  setAuth: (auth: { token: string | null; lastAddressLoggedIn: string | null }) => void;
  setToken: (token: string | null) => void;
}

export const useStore = create<StoreState>((set) => ({
  wallet: null,
  auth: {
    token: null,
    lastAddressLoggedIn: null
  },
  token: null,
  setWallet: (wallet) => set({ wallet }),
  setAuth: (auth) => set({ auth }),
  setToken: (token) => set({ token }),
}));