import { create } from "zustand";
import axios from "axios";

interface CompanyData {
  id: string;
  name: string;
  image: string | null;
  content: string;
  employeeCnt: number;
  salesRevenue: bigint;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  comments: CompanyComment[];
  category: Category[];
  applicantCount: number;
  idx: number;
}

interface CompanyComment {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Category {
  id: string;
  name: string;
}

interface CompanyStore {
  company: CompanyData | null;
  loading: boolean;
  error: string | null;
  fetchCompany: (id: string) => Promise<void>;
  setCompany: (company: CompanyData) => void;
}

const useCompanyStore = create<CompanyStore>((set) => ({
  company: null,
  loading: false,
  error: null,
  fetchCompany: async (id: string) => {
    try {
      set({ loading: true });
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/company-detail/${id}`
      );
      if (!response.data) {
        throw new Error("데이터가 없습니다.");
      }
      set({ company: response.data, error: null });
    } catch (err) {
      set({ error: "기업 정보를 불러오는데 실패했습니다." });
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },
  setCompany: (company: CompanyData) => set({ company }),
}));

export default useCompanyStore;
