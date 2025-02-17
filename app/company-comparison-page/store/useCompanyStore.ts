import { create } from "zustand";
import { CompanyDTO } from "@/global/types/data-contracts";

interface CompanyStore {
  selectedCompanies: CompanyDTO[]; // 선택한 기업 목록
  selectCompany: (company: CompanyDTO) => void; // 기업 선택 함수
  deselectCompany: (company: CompanyDTO) => void; // 기업 선택 해제 함수
  resetCompanies: () => void; // 선택한 기업 초기화 함수
}

// 기본 이미지 경로
const defaultImage = "/assets/default-company-img.svg";

// Zustand 상태 관리 생성
export const useCompanyStore = create<CompanyStore>((set) => ({
  selectedCompanies: [], // 초기값: 선택된 기업 없음

  // 기업 선택 함수: 선택한 기업을 배열에 추가
  selectCompany: (company) =>
    set((state) => ({
      selectedCompanies: [
        ...state.selectedCompanies,
        {
          ...company, // 기존 기업 속성
          image: company.image || defaultImage, // 이미지가 없으면 기본 이미지 설정
        },
      ],
    })),

  // 기업 선택 해제 함수: 해당 기업을 배열에서 제거
  deselectCompany: (company) =>
    set((state) => ({
      selectedCompanies: state.selectedCompanies.filter(
        (c) => c.id !== company.id
      ),
    })),

  // 선택한 기업 초기화 함수: 모든 선택 기업 제거
  resetCompanies: () => set({ selectedCompanies: [] }),
}));
