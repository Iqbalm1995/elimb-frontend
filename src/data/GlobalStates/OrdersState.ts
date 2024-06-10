import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface ContractCompanies {
  company_id: string;
  company_name: string | null;
  company_role: string;
}

export interface ContractOrder {
  contract_number: string;
  contract_expired: string;
  companies_contracts: ContractCompanies[];
}

export interface OrdersState {
  OrderSelectedContract: ContractOrder | null;
  setOrderSelectedContract: (val: ContractOrder) => void;
}

export const useOrdersState = create<OrdersState>()(
  devtools(
    persist(
      (set) => ({
        OrderSelectedContract: null,
        setOrderSelectedContract: (val) => set({ OrderSelectedContract: val }),
      }),
      {
        name: "orders-storage",
      }
    )
  )
);
