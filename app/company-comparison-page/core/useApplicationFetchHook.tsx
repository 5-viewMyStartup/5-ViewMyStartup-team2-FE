import { useEffect, useCallback, useState } from "react";
import { getApplicationListAPI } from "./getApplicationListAPI";
import {
  ComparisonCompanyDTO,
  ComparisonPickResponse,
  ComparisonPickQuery,
} from "@/global/types/data-contracts";

/** 상품 목록 조회
 * @param {ComparisonPickQuery} params - 쿼리 정보
 */

interface UseApplicationFetchOutput {
  isLoading: boolean;
  companies: ComparisonCompanyDTO[];
  totalPages: number;
  totalAppliedCompaniesCount: number;
}

export const useApplicationFetch = (
  params: ComparisonPickQuery = { page: 1 }
): UseApplicationFetchOutput => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<ComparisonPickResponse["data"]>({
    companies: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: 5,
    },
  });

  const fetchApplications = useCallback(async () => {
    try {
      setIsLoading(true);
      const startTime = Date.now();

      const response = await getApplicationListAPI(); // params없이 API 호출
      setData(response);

      const elTime: number = Date.now() - startTime;
      const remainingTime: number = Math.max(500 - elTime, 0);
      await new Promise((resolve) => setTimeout(resolve, remainingTime));
    } catch (error) {
      console.error("지원 기업 목록 불러오기 오류: ", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, []); // 처음 한번만 실행

  return {
    isLoading,
    companies: data.companies,
    totalPages: 1, // 항상 1페이지
    totalAppliedCompaniesCount: data.pagination.totalItems,
  };
};
