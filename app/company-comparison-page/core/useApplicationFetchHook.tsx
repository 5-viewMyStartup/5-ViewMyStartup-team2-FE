import { useEffect, useCallback, useState } from "react";
import { getApplicationListAPI } from "./getApplicationListAPI";
import {
  CompanyDTO,
  ComparisonPickResponse,
  ComparisonPickQuery,
} from "@/global/types/data-contracts";

/** 상품 목록 조회
 * @param {ComparisonPickQuery} params - 쿼리 정보
 */

interface UseApplicationFetchOutput {
  isLoading: boolean;
  companies: CompanyDTO[];
  totalPages: number;
  totalAppliedCompaniesCount: number;
}

export const useApplicationFetch = (
  params: ComparisonPickQuery
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

      const response = await getApplicationListAPI(params); // API 호출
      setData(response);

      const elTime: number = Date.now() - startTime;
      const remainingTime: number = Math.max(500 - elTime, 0);
      await new Promise((resolve) => setTimeout(resolve, remainingTime));
    } catch (error) {
      console.error("지원 기업 목록 불러오기 오류: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchApplications();
  }, [JSON.stringify(params)]); // ✅ fetchApplications가 변경될 때만 실행

  return {
    isLoading,
    companies: data.companies,
    totalPages: data.pagination.totalPages,
    totalAppliedCompaniesCount: data.pagination.totalItems,
  };
};
