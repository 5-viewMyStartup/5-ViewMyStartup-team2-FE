import { useEffect, useCallback, useState } from "react";
import { getApplicationListAPI } from "./applicationListAPI";
import {
  ApplicationListQuery,
  ApplicationListResponse,
  ApplicationDTO,
} from "@/global/types/data-contracts";

interface UseItemsFetchOutput {
  isLoading: boolean;
  applications: (ApplicationDTO & { companyId: string })[];
  totalPages: number;
}

export const useApplicationFetch = (
  params: ApplicationListQuery
): UseItemsFetchOutput => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<ApplicationListResponse>({
    applications: [],
    page: 1,
    totalPages: 1,
  });

  const fetchItems = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      const startTime = Date.now();

      const response: ApplicationListResponse = await getApplicationListAPI(
        params
      );
      setData({
        applications: response.applications,
        page: response.page,
        totalPages: response.totalPages,
      });

      // 경과시간 계산
      const elTime: number = Date.now() - startTime;
      const remainingTime: number = Math.max(500 - elTime, 0);

      // 최소 시간 지연(스켈레톤 보여주는 로딩 최소 시간)
      await new Promise((resolve) => setTimeout(resolve, remainingTime));
    } catch (error) {
      console.error("지원 내역 불러오기 오류: ", error);
    } finally {
      setIsLoading(false); //API실행이 종료되면 섹션 로딩 상태 종료
    }
  }, [params]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return {
    isLoading,
    applications: data.applications,
    totalPages: data.totalPages,
  };
};
