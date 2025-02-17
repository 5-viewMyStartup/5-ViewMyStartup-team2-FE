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

//북마크 백엔드 맞추어서 수정
/** 북마크 DTO */
export interface BookmarkDTO {
  id: string; // 기업 id
  name: string; // 기업명
  image?: string; // 기업 로고 이미지 url
  content: string; // 기업 소개 내용
  category: { id: string; category: string }[]; // 카테고리
  employeeCnt: number; // 사원 수
  applicants: number; // 지원자 수
  applied: boolean; // 해당 기업에 지원했는지 여부
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null; // 삭제 여부 (soft delete)
}

/** 북마크 목록 조회 API 요청 타입 */
export interface BookmarkListQuery {
  userId: string; // 사용자 ID
  page?: number;
  limit?: number;
  sort?: string; // 정렬 옵션 (0: 기본값, 1: 지원한 기업 우선, 2: 지원하지 않은 기업 우선, 3: 직원 수 적은 순, 4: 직원 수 많은 순)
}

/** 북마크 목록 응답 타입 */
export interface BookmarkListResponse {
  companies: BookmarkDTO[];
  currentPage: number;
  totalPages: number;
}

/** 북마크 추가 API 요청 타입 */
export interface CreateBookmarkRequest {
  userId: string;
  companyId: string;
}

/** 북마크 삭제 API 요청 타입 */
export interface DeleteBookmarkRequest {
  userId: string;
  companyId: string;
}

/** 적용된 기업 필터 */
export type AppliedCompanyFilter = {
  sort?: number; // 기존 `applicationStatus` 대신 sort 정렬 사용
};

export interface AppliedCompanyListQuery {
  page?: number;
  keyword?: string;
  filter?: AppliedCompanyFilter;
}

export type FilterOption = { value: string; name: string };

//아래 4개는 나의 기업 비교 페이지를 위해 추가함
export interface ComparisonPickQuery {
  page?: number; // 페이지 번호
  // 추가적으로 필터링 옵션이나 검색어 등이 필요하면 여기 추가
}

export interface ComparisonPickResponse {
  success: boolean;
  message: string;
  data: {
    companies: CompanyDTO[]; // 기업 목록
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
    companies: CompanyDTO[]; // 기업 목록
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    }; // 페이지네이션 정보
  };
}
