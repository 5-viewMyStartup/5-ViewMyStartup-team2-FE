"use client";

import { Box, Stack } from "@mui/material";
import { Features } from "./features";
import { Single } from "./single";
import { SkeletonCompanyList } from "@/global/components/SkeletonCompanyItems";
import { ListPagination } from "@/global/components/ListPagination";
import { useCallback, useState } from "react";
import { BookmarkListQuery } from "@/global/types/data-contracts";
import { useBookmarkListFetch } from "./core/useBookmarkListFetch"; // 커스텀 훅 사용
import {
  listLayout,
  listWrapperStyle,
  scrollWrapper,
} from "@/global/styles/companyListStyles";

export default function BookmarkPage() {
  // 사용자 ID를 실제 로그인된 사용자 정보에서 가져와야 함 (예시: "12345")
  const userId = "202a24bd-708a-4e75-b806-0d903e40c176"; // TODO: 동적으로 설정 필요

  const [params, setParams] = useState<BookmarkListQuery>({
    userId,
    page: 1, // 기본 1페이지
    limit: 10, // 기본 페이지 크기
    sort: 0, // 기본 정렬 기준
  });

  /**
   * @description 파라미터 업데이트 함수
   * 기존의 파라미터를 유지하면서 새로운 파라미터를 덮어씌움
   */
  const updateParams = useCallback(
    (newParams: Partial<BookmarkListQuery>): void => {
      setParams((prev) => ({ ...prev, ...newParams }));
    },
    []
  );

  // 북마크 API 호출 (데이터 가져오기)
  const { bookmarks, totalPages, isLoading } = useBookmarkListFetch(params);

  // 로딩 상태일 때 스켈레톤 UI 표시
  const isShowSkeleton = isLoading || !bookmarks.length;

  return (
    <Stack sx={listLayout}>
      <Features.ListTitle />

      <Box sx={scrollWrapper}>
        <Box sx={listWrapperStyle}>
          <Single.ListLabel />
          {isShowSkeleton ? (
            <SkeletonCompanyList />
          ) : (
            <Features.BookmarkList companies={bookmarks} page={params.page} />
          )}
        </Box>
      </Box>

      <ListPagination
        page={params.page ?? 1}
        count={totalPages}
        onPageChange={(page) => updateParams({ page })}
      />
    </Stack>
  );
}
