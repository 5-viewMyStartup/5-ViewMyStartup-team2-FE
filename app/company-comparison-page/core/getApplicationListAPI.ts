import { AxiosResponse } from "axios";
import { instance } from "@/global/utils/axiosInstance";
import {
  ComparisonPickQuery,
  ComparisonPickResponse,
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

  try {
    const response: AxiosResponse<ComparisonPickResponse> = await instance.get(
      "/api/comparison/pick",
      {
        params: { page },
        // headers: {
        //   Authorization: `Bearer ${userId}`, // userId를 Authorization 헤더에 포함 X → 세정FIX: 유저 로그인 구현되면 추가하기
        // },
      }
    );
    console.log("확인용 getApplicationList ", response.data);
    return response.data.data;
  } catch (err) {
    throw err;
  }
};
