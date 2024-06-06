import { create } from "zustand";
import { LinkItemProps } from "../../components/appsAdmin/Sidebar";
import { devtools, persist } from "zustand/middleware";

interface NavigationState {
  NavigationActive: LinkItemProps | null;
  NavigationActiveParent: LinkItemProps | null;
  setNavigationActive: (val: LinkItemProps) => void;
  setNavigationActiveParent: (val: LinkItemProps) => void;
}

const useNavigationState = create<NavigationState>()(
  devtools(
    persist(
      (set) => ({
        NavigationActive: null,
        NavigationActiveParent: null,
        setNavigationActive: (val) => set({ NavigationActive: val }),
        setNavigationActiveParent: (val) =>
          set({ NavigationActiveParent: val }),
      }),
      {
        name: "navigation-storage",
      }
    )
  )
);

export default useNavigationState;
