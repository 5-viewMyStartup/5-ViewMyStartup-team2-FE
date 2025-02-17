import { useEffect, useCallback, useState } from "react";
import { getCompanyListAPI } from "./getCompanyListAPI";
import {
  ComparisonSearchQuery,
  ComparisonSearchResponse,
  CompanyDTO,
} from "@/global/types/data-contracts";

interface UseCompanyFetchOutput {
  isLoading: boolean;
  companies: CompanyDTO[];
  totalPages: number;
  totalCount: number; // 전체 기업 수 추가
}

export const useCompanyFetch = (
  params: ComparisonSearchQuery
): UseCompanyFetchOutput => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<ComparisonSearchResponse["data"]>({
    companies: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: 10,
    },
  });

  const { page, keyword } = params;

  // 기업 목록을 불러오는 함수
  const fetchCompanies = useCallback(async (): Promise<void> => {
    console.log("fetchCompanies 호출됨");
    try {
      setIsLoading(true);
      const startTime = Date.now();

      console.log("쿼리 파라미터: ", { page, keyword });
      const response: ComparisonSearchResponse = await getCompanyListAPI({
        page,
        keyword,
      });
      setData({
        companies: response.data.companies, // response.data에 companies를 맞추어 설정
        pagination: response.data.pagination, // pagination을 맞추어 설정
      });

      // 경과시간 계산
      const elTime: number = Date.now() - startTime;
      const remainingTime: number = Math.max(500 - elTime, 0);

      // 최소 시간 지연(스켈레톤 보여주는 로딩 최소 시간)
      await new Promise((resolve) => setTimeout(resolve, remainingTime));
    } catch (error) {
      console.error("기업 목록 불러오기 오류: ", error);
    } finally {
      setIsLoading(false); // API 실행이 종료되면 섹션 로딩 상태 종료
    }
  }, [page, keyword]);

  useEffect(() => {
    console.log("useEffect 실행됨, 현재 page:", params.page);
    console.log(
      "data.pagination.currentPage 값 확인용:",
      data.pagination.currentPage
    ); // 현재 페이지 값 확인

    if (page !== data.pagination.currentPage || keyword !== undefined) {
      console.log("페이지 변경 또는 검색어 변경으로 fetchCompanies 실행");
      fetchCompanies();
    }
  }, [fetchCompanies, page, keyword, data.pagination.currentPage]); // page와 keyword가 변경될 때만 호출

  return {
    isLoading,
    companies: data.companies,
    totalPages: data.pagination.totalPages,
    totalCount: data.pagination.totalItems, // totalCount 추가
  };
};
