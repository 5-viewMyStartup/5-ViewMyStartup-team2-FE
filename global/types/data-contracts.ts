export interface CompanyDTO {
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
}

export type ApplicationStatus = "pending" | "accepted" | "rejected";

export interface ApplicationListQuery {
  page?: number;
  filter?: ApplicationStatus | "all";
}

export interface ApplicationDTO
  extends Omit<CompanyDTO, "salesRevenue" | "employeeCnt"> {
  /**
   * 지원서 id
   */
  id: string;
  /**
   * 지원 상태
   */
  status: ApplicationStatus | string;
  /**
   * 지원 날짜
   */
  createdAt: string;
  /**
   * 지원서 업데이트 날짜
   */
  updatedAt: string;
}

export interface ApplicationListResponse {
  applications: ApplicationDTO[];
  page: number;
  totalPages: number;
}
