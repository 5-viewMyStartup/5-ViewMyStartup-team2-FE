"use client"; // Next.js 13+의 App Router를 사용할 경우: 객체 형태의 컴포넌트를 사용하면
import { Box, Stack } from "@mui/material";
import { Features } from "./features";
import { Single } from "./single";

export default function CompanyComparison() {
  return (
    <Stack sx={CompanyComparisonResultLayout}>
      {/* 내가 선택한 기업 (지원한 기업 중에 선택한 기업) */}
      <Features.ListTitle.Bookmark />
      <Box sx={bookmarkScrollWrapper}>
        <Box sx={bookmarkListWrapperStyle}>
          <Features.CompanyList.Bookmark />
        </Box>
      </Box>
      {/* 비교 결과 확인하기 (내가 선택한 기업이랑 전체 기업 중에 선택한 기업 비교) */}
      <Features.ListTitle.Result />
      <Box sx={scrollWrapper}>
        <Box sx={listWrapperStyle}>
          <Single.ListLabel.Result />
          <Features.CompanyList.Result />
        </Box>
      </Box>
      {/* 기업 순위 확인하기 ( 전체 기업 중에서 순위를 드롭 박스로 정렬 ) */}
      <Features.ListTitle.Ranking />
      <Box sx={scrollWrapper}>
        <Box sx={listWrapperStyle}>
          <Single.ListLabel.Ranking />
          <Features.CompanyList.Ranking />
        </Box>
      </Box>

      <Features.ListPagination />
    </Stack>
  );
}

const CompanyComparisonResultLayout = {
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

// 실제 스크롤되는 컨텐츠
const listWrapperStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: { xs: "flex-start", sm: "center" },
  overflowX: "auto",
  whiteSpace: "nowrap",
  WebkitOverflowScrolling: "touch",
  // 스크롤바 스타일링
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
};

const bookmarkScrollWrapper = {
  width: "100vw",
  overflow: "hidden",
  position: "relative",
  height: { md: "300px", sm: "240px", xs: "180px" },
  mb: "40px",
};

const bookmarkListWrapperStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: { xs: "flex-start", sm: "center" },
  overflowX: "auto",
  whiteSpace: "nowrap",
  WebkitOverflowScrolling: "touch",
  // 스크롤바 스타일링
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
  height: { md: "300px", sm: "240px", xs: "180px" },
};
