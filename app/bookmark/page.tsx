"use client";
import { useBookmarkStore } from "./core/store";
import { Box, Stack } from "@mui/material";
import { Features } from "./features";
import { Single } from "./single";
import { SkeletonCompanyList } from "@/global/components/SkeletonCompanyItems";
import { ListPagination } from "@/global/components/ListPagination";
import { useEffect, useCallback, useState } from "react";
import { BookmarkListQuery } from "@/global/types/data-contracts";
import { useBookmarkListFetch } from "./core/useBookmarkListFetch";
import Cookies from "js-cookie";
import {
  listLayout,
  listWrapperStyle,
  scrollWrapper,
} from "@/global/styles/companyListStyles";

export default function BookmarkPage() {
  const [params, setParams] = useState<BookmarkListQuery>({
    userId: "",
    page: 1,
    limit: 10,
    sort: "1", // Default: 지원한 기업 우선
  });

  /**
   * @description Update query parameters dynamically
   */
  const updateParams = useCallback((newParams: Partial<BookmarkListQuery>) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  }, []);

  const { bookMarks, fetchBookMarks, totalPage } = useBookmarkStore();
  useEffect(() => {
    const userId = Cookies.get("id");
    updateParams({ userId });
    if (!userId) {
      console.error("userId가 없습니다. 로그인 상태를 확인하세요.");
      return;
    }
    fetchBookMarks({
      userId: userId,
      page: params.page,
      limit: params.limit,
      sort: params.sort,
    });
  }, [params.sort, params.page]);

  return (
    <Stack sx={listLayout}>
      {/* Pass sorting update function to ListTitle */}
      <Features.ListTitle onSelectSort={(sort) => updateParams({ sort })} />

      <Box sx={scrollWrapper}>
        <Box sx={listWrapperStyle}>
          <Single.ListLabel />
          {/* {isLoading || !bookmarks.length ? (
            <SkeletonCompanyList />
          ) : ( */}
          <Features.BookmarkList companies={bookMarks} page={params.page} />
          {/* )} */}
        </Box>
      </Box>

      {/* Pagination Handling */}
      <ListPagination
        page={params.page}
        count={totalPage}
        onPageChange={(page) => updateParams({ page })}
      />
    </Stack>
  );
}
