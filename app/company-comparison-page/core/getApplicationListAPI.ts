import { AxiosResponse } from "axios";
import { instance } from "@/global/utils/axiosInstance";
import { ComparisonPickResponse } from "@/global/types/data-contracts";

/** 상품 목록 조회
 * @param {Object} params - 쿼리 정보
 * @param {int} params.page - 페이지 번호
 */

export const getApplicationListAPI = async (): Promise<
  ComparisonPickResponse["data"]
> => {
  //쿼리 기본값

  try {
    const response: AxiosResponse<ComparisonPickResponse> = await instance.get(
      "/api/comparison/pick",
      {
        params: { page: 1 }, // 항상 1페이지 요청
      }
    );
    return response.data.data;
  } catch (err) {
    throw err;
  }
};
