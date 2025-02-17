"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Box, Stack } from "@mui/material";
import { useCompanyStore } from "./core/comparisonResultStore";
import { Features } from "./features";
import { Single } from "./single";
import { ResultSkeletonList, RankSkeletonList } from "./core/customSkeleton";
import { ResultCompany } from "@/global/types/data-contracts";

export default function CompanyComparison() {
  const { companies, loading, error, fetchCompanies } = useCompanyStore();

  const dropdownOptions = [
    { name: "매출액", value: "salesRevenueRank" },
    { name: "사원 수", value: "employeeRank" },
    { name: "지원자 수", value: "applicantRank" },
  ];

  const [resultDropdown, setResultDropdown] = useState(
    dropdownOptions[0].value
  );
  const [rankingDropdown, setRankingDropdown] = useState(
    dropdownOptions[0].value
  );
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setPage(1);
  }, [resultDropdown, rankingDropdown]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const companiesArray = useMemo(
    () => companies?.data?.companies || [],
    [companies]
  );

  // 정렬 함수 (메모이제이션 유지)
  const sortCompanies = useCallback(
    (data: ResultCompany[], key: keyof ResultCompany) => {
      if (key === "applicantRank") {
        return [...data].sort(
          (a, b) => Number(b[key] ?? 0) - Number(a[key] ?? 0)
        ); // 내림차순 정렬
      }
      return [...data].sort(
        (a, b) => Number(a[key] ?? 0) - Number(b[key] ?? 0)
      ); // 오름차순 정렬
    },
    []
  );

  const sortedCompanies = useMemo(() => {
    return {
      result: sortCompanies(
        companiesArray,
        resultDropdown as keyof ResultCompany
      ),
      ranking: sortCompanies(
        companiesArray,
        rankingDropdown as keyof ResultCompany
      ),
    };
  }, [companiesArray, resultDropdown, rankingDropdown, sortCompanies]);

  const paginate = useCallback(
    (data: ResultCompany[]) =>
      data.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [page, itemsPerPage]
  );

  const paginatedCompanies = useMemo(() => {
    return {
      pick: companiesArray, // pick은 페이지네이션을 적용하지 않음
      result: paginate(sortedCompanies.result),
      ranking: paginate(sortedCompanies.ranking),
    };
  }, [companiesArray, sortedCompanies, paginate]);

  if (error) return <div>{error}</div>;

  if (loading || !companies) {
    return (
      <Stack sx={companyComparisonLayout}>
        <Features.ListTitle.Pick />
        <ResultSkeletonList />

        <Features.ListTitle.Result
          value={resultDropdown}
          onChange={setResultDropdown}
          options={dropdownOptions}
        />
        <Single.ListLabel.Result />
        <ResultSkeletonList />

        <Features.ListTitle.Ranking
          value={rankingDropdown}
          onChange={setRankingDropdown}
          options={dropdownOptions}
        />
        <Single.ListLabel.Ranking />
        <RankSkeletonList />

        <Features.ListPagination page={page} count={0} onPageChange={setPage} />
      </Stack>
    );
  }

  return (
    <Stack sx={companyComparisonLayout}>
      {/* 내가 지원한 기업 섹션 */}
      <Features.ListTitle.Pick />
      <Box sx={pickScrollWrapper}>
        <Box sx={pickListWrapper}>
          <Features.CompanyList.Pick companies={paginatedCompanies.pick} />
        </Box>
      </Box>

      {/* 비교 결과 확인 섹션 */}
      <Features.ListTitle.Result
        value={resultDropdown}
        onChange={setResultDropdown}
        options={dropdownOptions}
      />
      <Box sx={scrollWrapper}>
        <Box sx={listWrapper}>
          <Single.ListLabel.Result />
          <Features.CompanyList.Result companies={paginatedCompanies.result} />
        </Box>
      </Box>

      {/* 기업 순위 확인 섹션 */}
      <Features.ListTitle.Ranking
        value={rankingDropdown}
        onChange={setRankingDropdown}
        options={dropdownOptions}
      />
      <Box sx={scrollWrapper}>
        <Box sx={listWrapper}>
          <Single.ListLabel.Ranking />
          <Features.CompanyList.Ranking
            companies={paginatedCompanies.ranking}
          />
        </Box>
      </Box>

      {/* 페이지네이션 */}
      <Features.ListPagination
        page={page}
        count={Math.ceil(sortedCompanies.result.length / itemsPerPage)}
        onPageChange={setPage}
      />
    </Stack>
  );
}

// 공통 스타일 객체
const scrollStyles = {
  width: "100vw",
  overflow: "hidden",
  position: "relative",
  "&::-webkit-scrollbar": { display: "none" },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
};

const listStyles = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: { xs: "flex-start", sm: "center" },
  overflowX: "auto",
  whiteSpace: "nowrap",
  WebkitOverflowScrolling: "touch",
};

// 스타일 상수
const companyComparisonLayout = {
  pt: "40px",
  pb: "140px",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
};

const scrollWrapper = {
  ...scrollStyles,
  mb: "40px",
};

const listWrapper = {
  ...listStyles,
};

const pickScrollWrapper = {
  ...scrollStyles,
  height: { md: "300px", sm: "240px", xs: "180px" },
  mb: "40px",
};

const pickListWrapper = {
  ...listStyles,
  height: { md: "300px", sm: "240px", xs: "180px" },
};
