import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface HeaderTitlePages {
  tittle: string;
  breadcrumbItems: string[];
}

export interface HeaderState {
  HeaderActive: HeaderTitlePages | null;
  setHeaderActive: (val: HeaderTitlePages) => void;
}

export const useHeaderState = create<HeaderState>()(
  devtools(
    persist(
      (set) => ({
        HeaderActive: null,
        setHeaderActive: (val) => set({ HeaderActive: val }),
      }),
      {
        name: "header-active-storage",
      }
    )
  )
);
