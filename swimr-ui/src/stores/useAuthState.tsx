import { create } from "zustand";

interface AuthState {
  isAuthorized: boolean | null;
  setIsAuthorized: (authorized: boolean) => void;
}

export const useAuthState = create<AuthState>((set) => ({
  // initial state
  isAuthorized: null,
  // methods for manipulating state
  setIsAuthorized: (authorized: boolean) => {
    set((state) => ({
      isAuthorized: authorized,
    }));
  },
}));
