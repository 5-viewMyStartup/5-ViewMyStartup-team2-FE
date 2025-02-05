export interface CompanyData {
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
  category: string[];
  /**
   * 매출액
   */
  salesRevenue: number;
  /**
   * 사원 수
   */
  employeeCnt: number;
  /**
   * 지원자 수
   */
  applicatnsCnt: number;
}
