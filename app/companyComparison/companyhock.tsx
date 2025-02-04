import { create } from "zustand";
import { CompanyList } from "../api/getCompany";

type CompanyGet = {
  img: string; // 이미지
  name: string; // 이름
  content: string; // 내용?
  category: string; // 카테고리
  salesRevenue: number; // 매출액
  employeeCnt: number; // 사원 수
};

interface companyStore {
  orderBy: string;
  setOrderBy: (parameter: string) => void;
  companyApiData: CompanyGet[];
  setCompanyApiData: () => Promise<void>;
  currentPage: number;
  SetCurrentPage: (value: number) => void;
  totalPage: number;
}

// 이것도 훅이라고 하는지는 모르겠지만 주스탄드로 나의 기업 비교 결과 상태 관리 하는 놈
export const companyComparisonStore = create<companyStore>((set, get) => ({
  orderBy: "salesHigh",
  companyApiData: [],
  currentPage: 1,
  totalPage: 0,
  SetCurrentPage: (value: number) => value,
  setCompanyApiData: async () => {
    try {
      console.log("API 실행");
      const { orderBy } = get(); // 최신 orderBy 값 가져오기
      const data: CompanyGet[] = await CompanyList.getAllCompany(orderBy);
      set({ companyApiData: data });
    } catch (error) {
      console.error(" Error :", error);
    }
  },
  setOrderBy: (parameter: string) => {
    set({ orderBy: parameter }); //
    get().setCompanyApiData(); // 순서 바꾸려고 다시 api 실행
  },
}));
