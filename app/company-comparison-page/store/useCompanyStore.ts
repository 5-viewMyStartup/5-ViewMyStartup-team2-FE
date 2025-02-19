import { create } from "zustand";
import { ComparisonCompanyDTO } from "@/global/types/data-contracts";

interface CompanyStore {
  selectedAppliedCompanies: ComparisonCompanyDTO[]; // 최근 지원한 기업에서 선택한 목록
  selectedSearchCompanies: ComparisonCompanyDTO[]; // 검색 결과에서 선택한 목록

  setAppliedCompanies: (companies: ComparisonCompanyDTO[]) => void;
  selectSearchCompany: (company: ComparisonCompanyDTO) => void;
  deselectSearchCompany: (company: ComparisonCompanyDTO) => void;

  resetCompanies: () => void; // 선택한 기업 초기화 함수
}

// 기본 이미지 경로
const defaultImage = "/assets/default-company-img.svg";

// Zustand 상태 관리 생성
export const useCompanyStore = create<CompanyStore>((set) => ({
  selectedAppliedCompanies: [],
  selectedSearchCompanies: [],

  // ✅ 모달이 열릴 때 최근 지원한 기업 목록을 저장
  setAppliedCompanies: (companies) =>
    set({
      selectedAppliedCompanies: companies.map((company) => ({
        ...company,
        image: company.image || defaultImage,
      })),
    }),

  // ✅ 검색 결과에서 선택한 기업 추가
  selectSearchCompany: (company) =>
    set((state) => ({
      selectedSearchCompanies: [
        ...state.selectedSearchCompanies,
        { ...company, image: company.image || defaultImage },
      ],
    })),

  // ✅ 검색 결과에서 선택한 기업 제거
  deselectSearchCompany: (company) =>
    set((state) => ({
      selectedSearchCompanies: state.selectedSearchCompanies.filter(
        (c) => c.id !== company.id
      ),
    })),

  // ✅ 모든 선택된 기업 초기화 (최근 지원한 기업은 유지)
  resetCompanies: () =>
    set({
      selectedSearchCompanies: [],
    }),
}));
