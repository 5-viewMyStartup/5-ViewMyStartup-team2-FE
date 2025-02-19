"use client";

import { Box, Stack } from "@mui/material";
import { Features } from "./features";
import { Single } from "./single";
import { SkeletonCompanyList } from "@/global/components/SkeletonCompanyItems";
import { ListPagination } from "@/global/components/ListPagination";
import { useCallback, useState } from "react";
import { CompanyListQuery } from "@/global/types/data-contracts";
import { useCompanyListFetch } from "./core/companiesFetchHook";
import {
  listLayout,
  listWrapperStyle,
  scrollWrapper,
} from "@/global/styles/companyListStyles";

export default function Main() {
  const [params, setParams] = useState<CompanyListQuery>({
    page: 1, //기본 1페이지
    search: "",
    filter: "revenueDesc", //기본 정렬 기준: 매출액 높은 순
  });

  /**
   * 파라미터 업데이트
   * @description 기존의 파라미터 복사, 새로운 파라미터를 기존 상태에 추가(덮어씌우기)
   */
  const updateParams = useCallback((newParams: CompanyListQuery): void => {
    setParams((prev) => ({ ...prev, ...newParams }));
  }, []);

  //api호출
  const { companies, totalPages, isLoading } = useCompanyListFetch(params);

  const isShowSkeleton = isLoading || !companies.length;

  return (
    <Stack sx={listLayout}>
      <Features.ListTitle
        onSearch={(search) => updateParams({ search })}
        onSelect={(filter) => updateParams({ filter })}
      />

      <Box sx={scrollWrapper}>
        <Box sx={listWrapperStyle}>
          <Single.ListLabel />
          {isShowSkeleton ? (
            <SkeletonCompanyList />
          ) : (
            <Features.CompanyList companies={companies} page={params.page} />
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
