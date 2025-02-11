import { AxiosResponse } from "axios";
import { instance } from "@/global/utils/axiosInstance";
import {
  CompanyListResponse,
  CompanyListQuery,
} from "@/global/types/data-contracts";

/** 전체 기업 조회
 * @param {Object} params - 쿼리 정보
 * @param {int} params.page - 페이지 번호
 * @param {int} params.search - 검색 키워드
 * @param {int} params.filter - 필터
 */
export const getCompanyListAPI = async (
  params: Partial<CompanyListQuery> = {}
): Promise<CompanyListResponse> => {
  //쿼리 기본값
  const { page = 1, search = "", filter = "revenueDesc" } = params;

  try {
    const response: AxiosResponse<CompanyListResponse> = await instance.get(
      "/api/main/companies",
      {
        params: { page, search, filter },
      }
    );
    console.log("getCompanyListAPI: ", response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};
