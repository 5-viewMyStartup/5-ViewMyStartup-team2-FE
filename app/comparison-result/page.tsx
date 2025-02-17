"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Box, Stack } from "@mui/material";
import { useCompanyStore } from "@/app/company-comparison-page/store/useCompanyStore";
import { Features } from "./features";
import { Single } from "./single";
import { ResultSkeletonList, RankSkeletonList } from "./core/customSkeleton";
import { ResultCompany } from "@/global/types/data-contracts";

export default function CompanyComparison() {
  const { selectedAppliedCompanies, selectedSearchCompanies } =
    useCompanyStore();

  const dropdownOptions: { name: string; value: keyof ResultCompany }[] = [
    { name: "매출액", value: "salesRevenueRank" },
    { name: "사원 수", value: "employeeRank" },
    { name: "지원자 수", value: "applicantRank" },
  ];

  const [resultDropdown, setResultDropdown] = useState<keyof ResultCompany>(
    dropdownOptions[0].value
  );
  const [rankingDropdown, setRankingDropdown] = useState<keyof ResultCompany>(
    dropdownOptions[0].value
  );
  const [resultPage, setResultPage] = useState(1);
  const [rankingPage, setRankingPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setResultPage(1);
  }, [resultDropdown]);

  useEffect(() => {
    setRankingPage(1);
  }, [rankingDropdown]);

  const companiesArray = useMemo(
    () => selectedAppliedCompanies || [],
    [selectedAppliedCompanies]
  );

  const combinedCompaniesArray = useMemo(
    () => [...selectedAppliedCompanies, ...selectedSearchCompanies],
    [selectedAppliedCompanies, selectedSearchCompanies]
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
      result: sortCompanies(combinedCompaniesArray, resultDropdown),
      ranking: sortCompanies(combinedCompaniesArray, rankingDropdown),
    };
  }, [combinedCompaniesArray, resultDropdown, rankingDropdown, sortCompanies]);

  const paginate = useCallback(
    (data: ResultCompany[], page: number) =>
      data.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [itemsPerPage]
  );

  const paginatedCompanies = useMemo(() => {
    return {
      pick: companiesArray, // pick은 페이지네이션을 적용하지 않음
      result: paginate(sortedCompanies.result, resultPage),
      ranking: paginate(sortedCompanies.ranking, rankingPage),
    };
  }, [companiesArray, sortedCompanies, resultPage, rankingPage, paginate]);

  if (!selectedAppliedCompanies.length && !selectedSearchCompanies.length) {
    return (
      <Stack sx={companyComparisonLayout}>
        <Features.ListTitle.Pick />
        <ResultSkeletonList />

        <Features.ListTitle.Result
          value={resultDropdown}
          onChange={(value) => setResultDropdown(value as keyof ResultCompany)}
          options={dropdownOptions}
        />
        <Single.ListLabel.Result />
        <ResultSkeletonList />

        <Features.ListTitle.Ranking
          value={rankingDropdown}
          onChange={(value) => setRankingDropdown(value as keyof ResultCompany)}
          options={dropdownOptions}
        />
        <Single.ListLabel.Ranking />
        <RankSkeletonList />

        <Features.ListPagination
          page={resultPage}
          count={0}
          onPageChange={setResultPage}
        />
        <Features.ListPagination
          page={rankingPage}
          count={0}
          onPageChange={setRankingPage}
        />
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
        onChange={(value) => setResultDropdown(value as keyof ResultCompany)}
        options={dropdownOptions}
      />
      <Box sx={scrollWrapper}>
        <Box sx={listWrapper}>
          <Single.ListLabel.Result />
          <Features.CompanyList.Result companies={paginatedCompanies.result} />
        </Box>
      </Box>
      <Features.ListPagination
        page={resultPage}
        count={Math.ceil(sortedCompanies.result.length / itemsPerPage)}
        onPageChange={setResultPage}
      />

      {/* 기업 순위 확인 섹션 */}
      <Features.ListTitle.Ranking
        value={rankingDropdown}
        onChange={(value) => setRankingDropdown(value as keyof ResultCompany)}
        options={dropdownOptions}
      />
      <Box sx={scrollWrapper}>
        <Box sx={listWrapper}>
          <Single.ListLabel.Ranking />
          <Features.CompanyList.Ranking
            companies={paginatedCompanies.ranking}
            dropdownValue={rankingDropdown}
          />
        </Box>
      </Box>
      <Features.ListPagination
        page={rankingPage}
        count={Math.ceil(sortedCompanies.ranking.length / itemsPerPage)}
        onPageChange={setRankingPage}
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
