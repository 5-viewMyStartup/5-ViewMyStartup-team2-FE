//세정님이랑 합의 후 변경 예정

export interface CompanyData {
  ranking?: number;
  /**
   * 기업 순위
   */
  name: string;
  /**
   * 기업 명
   */
  image?: string;
  /**
   * 기업 로고 이미지 url
   */
  content: string;
  /**
   * 기업 소개 내용
   */
  category: string[];
  /**
   * 카테고리
   * @example ["에듀테크", "재테크"]
   */
  salesRevenue: number;
  /**
   * 매출액
   */
  employeeCnt: number;
  /**
   * 사원 수
   */
  applicantsCnt: number;
  /**
   * 지원자 수
   */
}
