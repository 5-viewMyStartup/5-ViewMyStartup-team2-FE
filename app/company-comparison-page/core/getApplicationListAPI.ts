import { AxiosResponse } from "axios";
import { instance } from "@/global/utils/axiosInstance";
import {
  ComparisonPickResponse,
  ComparisonPickQuery,
} from "@/global/types/data-contracts";

/** 상품 목록 조회
 * @param {Object} params - 쿼리 정보
 * @param {int} params.page - 페이지 번호
 */
export const getApplicationListAPI = async (
  params: Partial<ComparisonPickQuery> = {}
): Promise<ComparisonPickResponse["data"]> => {
  //쿼리 기본값
  const { page = 1 } = params;
  // 임의로 userId 지정 (테스트용)
  const userId = "96f9b956-80e5-495f-965e-63cbd364e8e8";

  try {
    const response: AxiosResponse<ComparisonPickResponse> = await instance.get(
      "/api/comparison/pick",
      {
        params: { page },
        headers: {
          Authorization: `Bearer ${userId}`, // userId를 Authorization 헤더에 포함
        },
      }
    );
    console.log("getApplicationList: ", response.data);
    return response.data.data;
  } catch (err) {
    throw err;
  }
};
