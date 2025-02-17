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

//아래 5개는 나의 기업 비교 페이지를 위해 추가함 ✨
export interface ComparisonCompanyDTO {
  id: string;
  idx: string;
  //기업명
  name: string;
  //기업 로고 이미지
  image?: string;
  //기업 소개 내용
  content: string;
  /**
   * 카테고리
   * @example ["에듀테크", "재테크"]
   */
  category: { id: string; category: string }[];
  //매출액
  salesRevenue: string;
  //사원 수
  employeeCnt: number;
  //지원자 수
  applicantCnt: number;
  createdAt: string;
  updatedAt: string;
  //정렬순서 위해 추가
  applicantRank: number;
  salesRevenueRank: number;
  employeeRank: number;
}

export interface ComparisonPickQuery {
  page?: number; // 페이지 번호
  // 추가적으로 필터링 옵션이나 검색어 등이 필요하면 여기 추가
}

export interface ComparisonPickResponse {
  success: boolean;
  message: string;
  data: {
    companies: ComparisonCompanyDTO[]; // 기업 목록
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    }; // 페이지네이션 정보
  };
}

export interface ComparisonSearchQuery {
  page?: number; // 페이지 번호
  keyword?: string; // 검색어
  // 추가적으로 필터링 옵션이나 검색어 등이 필요하면 여기 추가
}

export interface ComparisonSearchResponse {
  success: boolean;
  message: string;
  data: {
    companies: ComparisonCompanyDTO[]; // 기업 목록
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    }; // 페이지네이션 정보
  };
}
