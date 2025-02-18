import { create } from "zustand";

interface Company {
  id: string;
  idx: number;
  name: string;
  image: string;
  content: string;
  salesRevenue: string;
  employeeCnt: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  isBookmarked: boolean;
}

interface CompanyState {
  company: Company;
  setCompany: (data: Company) => void;
}

export const useCompanyStore = create<CompanyState>((set) => ({
  company: {
    id: "",
    idx: 0,
    name: "",
    image: "",
    content: "",
    salesRevenue: "",
    employeeCnt: 0,
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
    isBookmarked: false,
  },
  setCompany: (data) => set({ company: data }), // 배열을 set
}));
