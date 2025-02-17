"use client";

import { useEffect, useCallback, useState } from "react";
import { getBookmarksAPI } from "./bookmarkAPI";
import {
  BookmarkListQuery,
  BookmarkListResponse,
  BookmarkDTO,
} from "@/global/types/data-contracts";

interface UseBookmarkFetchOutput {
  isLoading: boolean;
  bookmarks: BookmarkDTO[];
  totalPages: number;
}

/**
 * @description 사용자의 북마크 리스트를 가져오는 커스텀 훅 (API 직접 호출)
 * @param {BookmarkListQuery} params - 북마크 목록 조회 쿼리
 * @returns {UseBookmarkFetchOutput} 북마크 데이터, 로딩 상태, 페이지네이션 정보
 */
export const useBookmarkListFetch = (
  params: BookmarkListQuery
): UseBookmarkFetchOutput => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<BookmarkListResponse>({
    companies: [],
    currentPage: 1,
    totalPages: 1,
  });

  /**
   * @description 북마크 목록을 불러오는 함수 (API 서비스 사용)
   */
  const fetchItems = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);

      if (!params.userId) {
        console.error("❌ userId가 없습니다.");
        return;
      }

      const response = await getBookmarksAPI(params);

      setData({
        companies: response.companies,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
      });
    } catch (error) {
      console.error("❌ 북마크 데이터를 불러오는 중 오류 발생: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return {
    isLoading,
    bookmarks: data.companies,
    totalPages: data.totalPages,
  };
};
