import { useEffect, useCallback, useState } from "react";
import { getCompanyListAPI } from "./getCompanyListAPI";
import {
  CompanyListQuery,
  CompanyListResponse,
  CompanyDTO,
} from "@/global/types/data-contracts";

interface UseCompanyFetchOutput {
  isLoading: boolean;
  companies: CompanyDTO[];
  totalPages: number;
}

export const useCompanyFetch = (
  params: CompanyListQuery
): UseCompanyFetchOutput => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<CompanyListResponse>({
    companies: [],
    page: 1,
    totalPages: 1,
  });

  // 기업 목록을 불러오는 함수
  const fetchCompanies = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      const startTime = Date.now();

      console.log("쿼리 파라미터: ", params);
      const response: CompanyListResponse = await getCompanyListAPI(params);
      setData({
        companies: response.companies,
        page: response.page,
        totalPages: response.totalPages,
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
  }, [params]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  return {
    isLoading,
    companies: data.companies,
    totalPages: data.totalPages,
  };
};
