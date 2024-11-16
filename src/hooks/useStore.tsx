import { create } from "zustand";
import { TypeWallet } from "@/types/types";

interface StoreState {
  wallet: TypeWallet | null;
  auth: {
    token: string | null;
    lastAddressLoggedIn: string | null;
  };
  token: string | null;
  yield: {
    aaveYield: number | null;
    ionicYield: number | null;
  };
  setWallet: (wallet: TypeWallet | null) => void;
  setAuth: (auth: { token: string | null; lastAddressLoggedIn: string | null }) => void;
  setToken: (token: string | null) => void;
  setYield: (yieldData: { aaveYield: number | null; ionicYield: number | null }) => void;
}

export const useStore = create<StoreState>((set) => ({
  wallet: null,
  auth: {
    token: null,
    lastAddressLoggedIn: null,
  },
  token: null,
  yield: {
    aaveYield: null,
    ionicYield: null,
  },
  setWallet: (wallet) => set({ wallet }),
  setAuth: (auth) => set({ auth }),
  setToken: (token) => set({ token }),
  setYield: (yieldData) => set((state) => ({ yield: { ...state.yield, ...yieldData } })),
}));