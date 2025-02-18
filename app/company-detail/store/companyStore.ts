import { create } from "zustand";

interface CompanyDetail {
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
  apllycant: number;
  category: {
    id: string;
    category: string;
  };
}

interface CompanyState {
  company: CompanyDetail;
  setCompany: (data: CompanyDetail) => void;
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
    apllycant: 0,
    category: {
      id: "",
      category: "",
    },
  },
  setCompany: (data) => set({ company: data }), // 배열을 set
}));
