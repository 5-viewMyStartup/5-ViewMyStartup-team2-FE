import { AxiosResponse } from "axios";
import { instance } from "@/global/utils/axiosInstance";
import {
  ComparisonSearchQuery,
  ComparisonSearchResponse,
} from "@/global/types/data-contracts";

/** 기업 목록 조회
 * @param {Object} params - 쿼리 정보
 * @param {int} params.page - 페이지 번호
 * @param {string} params.filter - 필터 (예: 카테고리, 기업 상태 등)
 */

export const getCompanyListAPI = async (
  params: Partial<ComparisonSearchQuery> = {}
): Promise<ComparisonSearchResponse> => {
  const { page = 1 } = params;

  try {
    //GET 요청을 보내서 기업 데이터 가져오기
    const response: AxiosResponse<ComparisonSearchResponse> =
      await instance.get(
        "/api/comparison/search", //엔드포인트
        {
          params: { page },
        }
      );

    console.log("getCompanyListAPI response.data 확인용:", response.data);
    return {
      success: response.data.success, // success
      message: response.data.message, // message
      data: response.data.data, // data
    };
  } catch (err) {
    throw err;
  }
};
