import { AxiosResponse } from "axios";
import { instance } from "@/global/utils/axiosInstance";
import {
  ApplicationListResponse,
  ApplicationListQuery,
} from "@/global/types/data-contracts";

/** 지원 내역 조회
 * @param {Object} params - 쿼리 정보
 * @param {int} params.page - 페이지 번호
 * @param {int} params.filter - 지원 상태 필터
 */
export const getApplicationListAPI = async (
  params: Partial<ApplicationListQuery> = {}
): Promise<ApplicationListResponse> => {
  //쿼리 기본값
  const { page = 1, filter = "all" } = params;

  try {
    const response: AxiosResponse<ApplicationListResponse> = await instance.get(
      "/api/applications",
      {
        params: { page, filter },
      }
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};
