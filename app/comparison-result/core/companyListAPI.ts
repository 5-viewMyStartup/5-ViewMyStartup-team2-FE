import { AxiosResponse } from "axios";
import { instance } from "@/global/utils/axiosInstance";
import {
  CompaniesResponse,
  ComparisonResultQuery,
} from "@/global/types/data-contracts";

/** 지원한 회사 조회
 * @param {Object} params - 쿼리 정보
 * @param {int} params.page - 페이지 번호
 */
const application = async (
  params: Partial<ComparisonResultQuery> = {}
): Promise<CompaniesResponse> => {
  //쿼리 기본값
  const { page = 1 } = params;

  try {
    const response: AxiosResponse<CompaniesResponse> = await instance.get(
      "/api/comparison/pick",
      {
        params: { page },
      }
    );
    console.log("내가 선택한 기업 : ", response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

/** 전체 기업 조회
 * @param {Object} params - 쿼리 정보
 * @param {int} params.page - 페이지 번호
 * @param {int} params.keyword - 검색 키워드
 */
const search = async (
  params: Partial<ComparisonResultQuery> = {}
): Promise<CompaniesResponse> => {
  //쿼리 기본값
  const { page = 1, keyword = "" } = params;

  try {
    const response: AxiosResponse<CompaniesResponse> = await instance.get(
      "/api/comparison/search",
      {
        params: { page, keyword },
      }
    );
    console.log("검색 결과 : ", response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const GetComparisonAPI = {
  application,
  search,
};
