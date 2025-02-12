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

  const fetchApplications = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      const startTime = Date.now();

      // console.log("쿼리 파라미터: ", params);

      // API 호출하고 응답에서 'data'의 내용을 받아옴
      const response = await getApplicationListAPI(params); // API 호출

      // 응답에서 실제 데이터 값으로 상태 업데이트
      setData(response);

      // 경과시간 계산
      const elTime: number = Date.now() - startTime;
      const remainingTime: number = Math.max(500 - elTime, 0);

      // 최소 시간 지연(스켈레톤 보여주는 로딩 최소 시간)
      await new Promise((resolve) => setTimeout(resolve, remainingTime));
    } catch (error) {
      console.error("지원 기업 목록 불러오기 오류: ", error);
    } finally {
      setIsLoading(false); // API 실행이 종료되면 섹션 로딩 상태 종료
    }
  }, [params]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return {
    isLoading,
    companies: data.companies,
    totalPages: data.pagination.totalPages,
  };
};
