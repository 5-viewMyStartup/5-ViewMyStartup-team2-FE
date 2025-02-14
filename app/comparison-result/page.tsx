"use client";

import { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { useCompanyStore } from "./core/comparisonResultStore";
import { Features } from "./features";
import { Single } from "./single";
import {
  SkeletonCompanyItemsPick,
  SkeletonCompanyItemsResult,
  SkeletonCompanyItemsRanking,
} from "./core/customSkeleton";

export default function CompanyComparison() {
  const { companies, loading, error, fetchCompanies } = useCompanyStore();

  // 드롭다운 옵션
  const comparisonDropdownOptions = [
    { name: "매출액", value: "option1" },
    { name: "사원 수", value: "option2" },
    { name: "지원자 수", value: "option3" },
  ];
  const rankDropdownOptions = [
    { name: "매출액", value: "option1" },
    { name: "사원 수", value: "option2" },
    { name: "지원자 수", value: "option3" },
  ];

  const [comparisonDropdownValue, setComparisonDropdownValue] = useState(
    comparisonDropdownOptions[0].value
  );
  const [rankDropdownValue, setRankDropdownValue] = useState(
    rankDropdownOptions[0].value
  );
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  if (error) return <div>{error}</div>;

  // 로딩 시 스켈레톤 렌더링
  if (loading || !companies) {
    return (
      <Stack sx={companyComparisonLayout}>
        <Features.ListTitle.Pick />
        <SkeletonCompanyItemsPick />

        <Features.ListTitle.Result
          dropdownValue={comparisonDropdownValue}
          onDropdownChange={setComparisonDropdownValue}
          dropdownOptions={comparisonDropdownOptions}
        />
        <Single.ListLabel.Result />
        <SkeletonCompanyItemsResult />

        <Features.ListTitle.Ranking
          dropdownValue={rankDropdownValue}
          onDropdownChange={setRankDropdownValue}
          dropdownOptions={rankDropdownOptions}
        />
        <Single.ListLabel.Ranking />
        <SkeletonCompanyItemsRanking />

        <Features.ListPagination page={page} count={0} onPageChange={setPage} />
      </Stack>
    );
  }

  const companiesArray = companies.data.companies || [];
  const paginatedCompanies = companiesArray.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Stack sx={companyComparisonLayout}>
      {/* 내가 선택한 기업 */}
      <Features.ListTitle.Pick />
      <Box sx={pickScrollWrapper}>
        <Box sx={pickListWrapper}>
          <Features.CompanyList.Pick companies={paginatedCompanies} />
        </Box>
      </Box>

      {/* 비교 결과 확인하기 */}
      <Features.ListTitle.Result
        dropdownValue={comparisonDropdownValue}
        onDropdownChange={setComparisonDropdownValue}
        dropdownOptions={comparisonDropdownOptions}
      />
      <Box sx={scrollWrapper}>
        <Box sx={listWrapper}>
          <Single.ListLabel.Result />
          <Features.CompanyList.Result companies={paginatedCompanies} />
        </Box>
      </Box>

      {/* 기업 순위 확인하기 */}
      <Features.ListTitle.Ranking
        dropdownValue={rankDropdownValue}
        onDropdownChange={setRankDropdownValue}
        dropdownOptions={rankDropdownOptions}
      />
      <Box sx={scrollWrapper}>
        <Box sx={listWrapper}>
          <Single.ListLabel.Ranking />
          <Features.CompanyList.Ranking companies={paginatedCompanies} />
        </Box>
      </Box>

      {/* 페이지네이션 */}
      <Features.ListPagination
        page={page}
        count={Math.ceil(companiesArray.length / itemsPerPage)}
        onPageChange={setPage}
      />
    </Stack>
  );
}

/* CompanyComparison 레이아웃 스타일 */
const companyComparisonLayout = {
  pt: "40px",
  pb: "140px",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
};

const scrollWrapper = {
  width: "100vw",
  overflow: "hidden",
  position: "relative",
  mb: "40px",
};

const listWrapper = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: { xs: "flex-start", sm: "center" },
  overflowX: "auto",
  whiteSpace: "nowrap",
  WebkitOverflowScrolling: "touch",
  "&::-webkit-scrollbar": { display: "none" },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
};

const pickScrollWrapper = {
  width: "100vw",
  overflow: "hidden",
  position: "relative",
  height: { md: "300px", sm: "240px", xs: "180px" },
  mb: "40px",
};

const pickListWrapper = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: { xs: "flex-start", sm: "center" },
  overflowX: "auto",
  whiteSpace: "nowrap",
  WebkitOverflowScrolling: "touch",
  "&::-webkit-scrollbar": { display: "none" },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
  height: { md: "300px", sm: "240px", xs: "180px" },
};
