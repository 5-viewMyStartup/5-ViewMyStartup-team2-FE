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

export type ApplicationStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export interface ApplicationsDTO
  extends Omit<CompanyDTO, "salesRevenue" | "employeeCnt"> {
  id: string;
  status: ApplicationStatus | string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvestmentDTO {
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
     * View My Startup 투자 금액
     */
    viewMyStartupInvestment: string;
    /**
     * 실제 누적 투자 금액
     */
    actualInvestment: string;
}