import { AxiosResponse } from "axios";
import { instance } from "@/global/utils/axiosInstance";
import {
  BookmarkListQuery,
  BookmarkListResponse,
} from "@/global/types/data-contracts";

/** 북마크 목록 조회
 * @param {Object} params - 쿼리 정보
 * @param {int} params.page - 페이지 번호
 * @param {string} params.userId - 사용자 ID
 */

export const getBookmarkListAPI = async (
  params: BookmarkListQuery // 타입을 명시적으로 설정
): Promise<BookmarkListResponse> => {
  const { page = 1, userId } = params; // 기본값 설정

  try {
    //GET 요청을 보내서 북마크 데이터 가져오기
    const response: AxiosResponse<BookmarkListResponse> = await instance.get(
      "/api/bookmarks", //북마크 목록을 가져오는 엔드포인트 (가정)
      {
        params: { page, userId },
      }
    );
    console.log("getBookmarkListAPI 확인용: response.data");
    return response.data;
  } catch (err) {
    throw err;
  }
};
