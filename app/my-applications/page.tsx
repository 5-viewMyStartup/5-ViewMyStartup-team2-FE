"use client";

import { Box, Stack } from "@mui/material";
import { Features } from "./features";
import { Single } from "./single";
import { SkeletonCompanyList } from "@/global/components/SkeletonCompanyItems";
import { useCallback, useState } from "react";
import { ApplicationListQuery } from "@/global/types/data-contracts";
import { useApplicationFetch } from "./core/applicationsFetchHook";
import {
  listLayout,
  listWrapperStyle,
  scrollWrapper,
} from "@/global/styles/companyListStyles";

export default function Page() {
  const [params, setParams] = useState<ApplicationListQuery>({
    page: 1, //기본 1페이지
    filter: "all", //기본 정렬 기준: 전체
  });

  /**
   * 파라미터 업데이트
   * @description 기존의 파라미터 복사, 새로운 파라미터를 기존 상태에 추가(덮어씌우기)
   */
  const updateParams = useCallback((newParams: ApplicationListQuery): void => {
    setParams((prev) => ({ ...prev, ...newParams }));
  }, []);

  //api호출
  const { applications, totalPages, isLoading } = useApplicationFetch(params);

  const isShowSkeleton = isLoading || !applications.length;

  return (
    <Stack sx={listLayout}>
      <Features.ListTitle />

      <Box sx={scrollWrapper}>
        <Box sx={listWrapperStyle}>
          <Single.ListLabel />
          {isShowSkeleton ? (
            <SkeletonCompanyList />
          ) : (
            <Features.CompanyList
              applications={applications}
              page={params.page}
            />
          )}
        </Box>
      </Box>

      <Features.ListPagination
        page={params.page ?? 1}
        count={totalPages}
        onPageChange={(page) => updateParams({ page })}
      />
    </Stack>
  );
}
