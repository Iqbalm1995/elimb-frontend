import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { AuthResponse } from "../../typesModel/AuthTypes";

interface AuthenticationState {
  isLogin: boolean;
  AuthData: AuthResponse | null;
  setLogin: (val: boolean) => void;
  setAuthData: (val: AuthResponse) => void;
}

const useAuthenticationState = create<AuthenticationState>()(
  devtools(
    persist(
      (set) => ({
        isLogin: false,
        AuthData: null,
        setLogin: (val) => set((state) => ({ isLogin: (state.isLogin = val) })),
        setAuthData: (val) => set({ AuthData: val }),
      }),
      {
        name: "authentication-storage",
      }
    )
  )
);

export default useAuthenticationState;
