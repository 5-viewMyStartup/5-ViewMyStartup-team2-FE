import { create } from "zustand";
import { GetComparisonAPI } from "./companyListAPI"; // API 함수 가져오기
import {
  CompaniesResponse,
  ComparisonResultQuery,
} from "@/global/types/data-contracts";

// Zustand 상태 타입 정의
interface CompanyStore {
  companies: CompaniesResponse | undefined; // 전체 기업 목록
  loading: boolean; // 로딩 상태
  error: string | null; // 에러 메시지
  fetchCompanies: (params?: Partial<ComparisonResultQuery>) => Promise<void>; // API 호출 함수
}

// Zustand 스토어 생성
export const useCompanyStore = create<CompanyStore>((set) => ({
  companies: undefined,
  loading: false,
  error: null,

  fetchCompanies: async (params = {}) => {
    set({ loading: true, error: null }); // 로딩 시작

    try {
      const data = await GetComparisonAPI.application(params); // API 호출
      set({ companies: data, loading: false }); // 데이터 업데이트
    } catch (err) {
      set({
        error: "데이터를 불러오는 중 오류가 발생했습니다.",
        loading: false,
      });
      console.error("오류 발생 빨리 해결하셈:", err);
    }
  },
}));
