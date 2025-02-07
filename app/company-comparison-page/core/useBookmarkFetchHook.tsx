import { useEffect, useCallback, useState } from "react";
import { getBookmarkListAPI } from "./getBookmarkListAPI";
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

export const useBookmarkFetch = (
  params: BookmarkListQuery
): UseBookmarkFetchOutput => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<BookmarkListResponse>({
    bookmarks: [],
    page: 1,
    totalPages: 1,
  });
  // 즐겨찾기 목록을 불러오는 함수
  const fetchBookmarks = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      const startTime = Date.now();

      console.log("쿼리 파라미터: ", params);
      const response: BookmarkListResponse = await getBookmarkListAPI(params); // 북마크 API 호출
      setData({
        bookmarks: response.bookmarks, // 북마크 목록으로 업데이트
        page: response.page,
        totalPages: response.totalPages,
      });

      // 경과시간 계산
      const elTime: number = Date.now() - startTime;
      const remainingTime: number = Math.max(500 - elTime, 0);

      // 최소 시간 지연(스켈레톤 보여주는 로딩 최소 시간)
      await new Promise((resolve) => setTimeout(resolve, remainingTime));
    } catch (error) {
      console.error("북마크 목록 불러오기 오류: ", error);
    } finally {
      setIsLoading(false); // API 실행이 종료되면 섹션 로딩 상태 종료
    }
  }, [params]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  return {
    isLoading,
    bookmarks: data.bookmarks, // 북마크 데이터 반환
    totalPages: data.totalPages,
  };
};
