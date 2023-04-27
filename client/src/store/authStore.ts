import { create } from "zustand";

interface AuthState {
  user: any;
  isLoggedIn: boolean;
  setUser: (newUser: any) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setUser: (newUser) => {
    set((state) => ({
      ...state,
      user: newUser,
    }));
  },
}));

export default useAuthStore;
