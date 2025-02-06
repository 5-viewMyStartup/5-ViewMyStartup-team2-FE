import { AxiosResponse } from "axios";
import { instance } from "@/global/utils/axiosInstance";
import {
  CompanyListQuery,
  CompanyListResponse,
} from "@/global/types/data-contracts";
import { ActionFlightResponse } from "next/dist/server/app-render/types";

/** 기업 목록 조회
 * @param {Object} params - 쿼리 정보
 * @param {int} params.page - 페이지 번호
 * @param {string} params.filter - 필터 (예: 카테고리, 기업 상태 등)
 */

export const getCompanyListAPI = async (
  params: Partial<CompanyListQuery> = {}
): Promise<CompanyListResponse> => {
  const { page = 1, filter = "all" } = params;

  try {
    //GET 요청을 보내서 기업 데이터 가져오기
    const response: AxiosResponse<CompanyListResponse> = await instance.get(
      "/api/companies",
      {
        params: { page, filter },
      }
    );
    console.log("getCompanyListAPI 확인용: response.data");
    return response.data;
  } catch (err) {
    throw err;
  }
};
