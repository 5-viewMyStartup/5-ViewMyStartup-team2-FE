import { AxiosResponse } from "axios";
import { instance } from "@/global/utils/axiosInstance";
import {
  BookmarkListResponse,
  BookmarkListQuery,
  CreateBookmarkRequest,
  DeleteBookmarkRequest,
} from "@/global/types/data-contracts";

/**
 * 북마크 목록 조회 API
 * @param {BookmarkListQuery} params - 쿼리 정보
 * @returns {Promise<BookmarkListResponse>} 북마크 목록
 */
export const getBookmarksAPI = async (
  params: BookmarkListQuery
): Promise<BookmarkListResponse> => {
  const { userId, page = 1, limit = 10, sort = 0 } = params;
  try {
    const response: AxiosResponse<BookmarkListResponse> = await instance.get(
      `/api/bookmarks/${userId}`,
      { params: { page, limit, sort } }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

/**
 * 북마크 추가 API
 * @param {CreateBookmarkRequest} data - 북마크 추가 요청 데이터 (userId, companyId)
 * @returns {Promise<{ id: string; companyId: string; userId: string; createdAt: string }>}
 */
export const createBookmarkAPI = async (
  data: CreateBookmarkRequest
): Promise<{
  id: string;
  companyId: string;
  userId: string;
  createdAt: string;
}> => {
  try {
    const response = await instance.post(`/api/bookmarks/${data.userId}`, {
      companyId: data.companyId,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

/**
 * 북마크 삭제 API
 * @param {DeleteBookmarkRequest} data - 북마크 삭제 요청 데이터 (userId, companyId)
 * @returns {Promise<{ id: string; companyId: string; userId: string; deletedAt: string }>}
 */
export const deleteBookmarkAPI = async (
  data: DeleteBookmarkRequest
): Promise<{
  id: string;
  companyId: string;
  userId: string;
  deletedAt: string;
}> => {
  try {
    const response = await instance.delete(`/api/bookmarks/${data.userId}`, {
      data: { companyId: data.companyId },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};
