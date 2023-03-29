import { create } from "zustand";

interface AuthState {
  isAuthorized: boolean | null;
  setIsAuthorized: (authorized: boolean) => void;
}

export const useAuthState = create<AuthState>((set) => ({
  isAuthorized: null,

  setIsAuthorized: (authorized: boolean) => {
    set((state) => ({
      isAuthorized: authorized,
    }));
  },
}));
