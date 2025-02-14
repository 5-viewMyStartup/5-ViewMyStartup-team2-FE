export interface CompanyDTO {
  /**
   * 기업 id
   */
  id: string;
  /**
   * 기업 idx
   */
  idx: string;
  /**
   * 기업 명
   */
  name: string;
  /**
   * 기업 로고 이미지 url
   */
  image?: string;
  /**
   * 기업 소개 내용
   */
  content: string;
  /**
   * 카테고리
   * @example ["에듀테크", "재테크"]
   */
  category: { id: string; category: string }[];
  /**
   * 매출액
   */
  salesRevenue: string;
  /**
   * 사원 수
   */
  employeeCnt: number;
  /**
   * 지원자 수
   */
  applicantCnt: number;
  createdAt: string;
  updatedAt: string;
}

export type mainCompanyFilter =
  | "revenueDesc"
  | "revenueAsc"
  | "employeeDesc"
  | "employeeAsc";

export type applicationFilter = "all" | "pending" | "accepted" | "rejected";

export interface CompanyListQuery {
  page?: number;
  search?: string;
  filter?: mainCompanyFilter;
}

export interface CompanyListResponse {
  companies: CompanyDTO[];
  page: number;
  totalPages: number;
}

export interface ApplicationDTO
  extends Omit<CompanyDTO, "salesRevenue" | "employeeCnt"> {
  /**
   * 지원 상태
   */
  status: ApplicationStatus | string;
}

export type ApplicationStatus = "pending" | "accepted" | "rejected";

export interface ApplicationListQuery {
  page?: number;
  filter?: ApplicationStatus | "all";
}

export interface ApplicationListResponse {
  applications: ApplicationDTO[];
  page: number;
  totalPages: number;
}

//backend 완성되면 맞추어 수정하기
export interface BookmarkDTO {
  id: string; //기업 id
  idx: number; //기업 idx
  name: string; //기업명
  image?: string; //기업 로고 이미지 url
  content: string; // 기업 소개 내용
  category: { id: string; category: string }[]; //카테고리
  applicantCnt: number; //지원자 수
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type AppliedCompanyFilter = {
  applicationStatus: boolean;
};
export interface AppliedCompanyListQuery {
  page?: number;
  keyword?: string;
  filter?: AppliedCompanyFilter;
}
export type FilterOption = { value: string; name: string };

// 비교 결과
export interface ComparisonResultQuery {
  page?: number;
  keyword?: string;
}

export interface Company {
  id: string;
  /**
   * 기업 이름
   */
  name: string;
  /**
   * 기업 로고 이미지 url
   */
  image?: string;
  /**
   * 기업 소개 내용
   */
  content: string;
  /**
   * 카테고리
   * @example ["에듀테크", "재테크"]
   */
  category: string[];
  /**
   * 매출액
   */
  salesRevenue: number;
  /**
   * 재직자 수
   */
  employeeCnt: number;
  /**
   * 지원자 수
   */
  applicantCount: number;
  /**
   * 지원자 랭킹
   */
  applicantRank: number;
  /**
   * 매출액 랭킹
   */
  salesRevenueRank: number;
  /**
   * 재직자 랭킹
   */
  employeeRank: number;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface CompaniesResponse {
  success: boolean;
  message: string;
  data: {
    companies: Company[];
    pagination: Pagination;
  };
}
