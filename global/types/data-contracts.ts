// Users 모델 추가
export interface UsersDTO {
  /**
   * 사용자 ID
   */
  id: string;
  /**
   * 사용자 인덱스 (자동 증가 값)
   */
  idx: number;
  /**
   * 사용자 이메일
   */
  email: string;
  /**
   * 사용자 비밀번호
   */
  password: string;
  /**
   * 사용자 이름
   */
  name: string;
  /**
   * 사용자 닉네임
   */
  nickname: string;
  /**
   * 사용자 생성 일시
   */
  createdAt: string;
  /**
   * 사용자 업데이트 일시
   */
  updatedAt: string;
  /**
   * 삭제된 일시 (삭제된 데이터에 대해서만 존재)
   */
  deletedAt?: string | null;
  /**
   * 사용자의 북마크 정보
   */
  Bookmark: BookmarkDTO[];
  /**
   * 사용자가 작성한 기업 댓글 정보
   */
  comments: CompaniesCommentsDTO[];
  /**
   * 사용자의 지원 내역
   */
  UserApplications: ApplicationDTO[];
}

// Companies 모델
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

// CompaniesComments 모델 추가
export interface CompaniesCommentsDTO {
  /**
   * 댓글 ID
   */
  id: string;
  /**
   * 댓글 인덱스 (자동 증가 값)
   */
  idx: number;
  /**
   * 사용자 ID
   */
  userId: string;
  /**
   * 기업 ID
   */
  companyId: string;
  /**
   * 댓글 내용
   */
  content: string;
  /**
   * 댓글 생성 일시
   */
  createdAt: string;
  /**
   * 댓글 업데이트 일시
   */
  updatedAt: string;
  /**
   * 삭제된 일시 (삭제된 데이터에 대해서만 존재)
   */
  deletedAt?: string | null;
  /**
   * 관련된 기업 정보
   */
  company: CompanyDTO;
  /**
   * 관련된 사용자 정보
   */
  user: UsersDTO;
}

// Category 모델 추가
export interface CategoryDTO {
  /**
   * 카테고리 ID
   */
  id: string;
  /**
   * 카테고리명
   */
  category: string;
  /**
   * 카테고리에 속한 기업 목록
   */
  company: CompanyDTO[];
}

// Bookmark 모델 추가
export interface BookmarkDTO {
  /**
   * 북마크 ID
   */
  id: string;
  /**
   * 북마크 인덱스 (자동 증가 값)
   */
  idx: number;
  /**
   * 사용자 ID
   */
  userId: string;
  /**
   * 기업 ID
   */
  companyId: string;
  /**
   * 북마크 생성 일시
   */
  createdAt: string;
  /**
   * 북마크 업데이트 일시
   */
  updatedAt: string;
  /**
   * 삭제된 일시 (삭제된 데이터에 대해서만 존재)
   */
  deletedAt?: string | null;
  /**
   * 관련된 사용자 정보
   */
  user: UsersDTO;
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

//서버에서 반환하는 기업목록 데이터의 구조
export interface CompanyListQuery {
  page?: number; // 페이지 번호 (기본값 1)
  filter?: string | "all"; // 필터 (기본값 "all")
}

export interface CompanyListResponse {
  companies: CompanyDTO[]; // 기업 목록
  page: number; // 현재 페이지 번호
  totalPages: number; // 전체 페이지 수
}

// Bookmark Request 인터페이스 추가
export interface BookmarkListQuery {
  page?: number;
  // 사용자 ID (사용자가 북마크할 때)
  userId: string;
  // 기업 ID (사용자가 북마크할 기업)
  companyId?: string;
}

// Bookmark Response 인터페이스 추가
export interface BookmarkListResponse {
  bookmarks: BookmarkDTO[]; // 북마크 데이터 배열
  page: number; //현재 페이지 번호
  totalPages: number; //
}
