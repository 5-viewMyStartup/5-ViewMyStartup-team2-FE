"use client";

import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo"; // 텍스트 스타일을 위한 컴포넌트 임포트
import { Box, Skeleton, Stack } from "@mui/material";
import { Features } from "./features";
import { SkeletonApplicationList } from "@/global/components/SkeletonComparisonApplicationItems";
import { useCallback, useState } from "react";
import { ComparisonPickQuery } from "@/global/types/data-contracts";
import { useApplicationFetch } from "./core/useApplicationFetchHook";
// import {
//   listLayout,
//   listWrapperStyle,
//   scrollWrapper,
// } from "@/global/styles/companyListStyles";
import { ApplicationItems } from "./features/comparisonList/components/ApplicationItems";
import { companyListWrapperStyle } from "@/global/styles/companyListStyles";
import { CustomPagination } from "@/global/components/CustomPagination";

export default function Page() {
  // ✅ params 상태 선언
  const [params, setParams] = useState<ComparisonPickQuery>({
    page: 1, // 기본값 1페이지 설정
  });

  // ✅ 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setParams((prevParams) => {
      if (prevParams.page === page) return prevParams; // 같은 값이면 변경 X
      return { ...prevParams, page };
    });
  };

  // 선택된 기업 목록 상태 추가
  const [selectedCompanies, setSelectedCompanies] = useState<any[]>([]);

  const { companies, totalPages, isLoading } = useApplicationFetch(params);

  // 데이터가 없을 때 "지원한 기업 없음" 메시지를 띄우기 위한 체크
  const isShowSkeleton = isLoading; // 로딩 중일 때 스켈레톤 화면 보여주기
  const isAllDataEmpty = !companies.length; // 배열이 비어있을 때 "현재 지원한 기업이 없습니다." 메시지 띄우기

  // "현재 지원한 기업이 없습니다."일 때 페이지네이션은 1페이지만
  const pageCount = isShowSkeleton || isAllDataEmpty ? 1 : totalPages;

  // 기업을 선택하는 함수
  const handleSelectCompany = (company: any) => {
    setSelectedCompanies((prevSelected) => {
      // 이미 선택된 기업이 있다면 선택 취소, 없다면 추가
      if (prevSelected.some((item) => item.id === company.id)) {
        return prevSelected.filter((item) => item.id !== company.id);
      }
      return [...prevSelected, company];
    });
  };

  return (
    <Stack sx={{ width: "100%" }}>
      <Features.applicationListTitle />
      {/* 첫 번째 박스: 지원한 기업 목록 */}
      <Box
        sx={{
          backgroundColor: colorChips.black_300, // 배경색 지정
          padding: "85px 8px", // 여백 추가
          borderRadius: "8px", // 모서리 둥글게
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {/* 데이터가 없으면 "지원한 기업 없음"을 한 번만 출력 */}
        {isShowSkeleton ? (
          <SkeletonApplicationList />
        ) : isAllDataEmpty ? (
          <Box sx={companyListWrapperStyle}>
            <Typo
              className="text_R_14"
              content="현재 지원한 기업이 없습니다."
              color={colorChips.gray_200}
              customStyle={{
                textAlign: "center",
                whiteSpace: "nowrap", // 텍스트 줄바꿈 방지
                overflow: "hidden", // 텍스트가 영역을 넘지 않도록 처리
              }}
            />
          </Box>
        ) : (
          companies.length > 0 &&
          companies.map((item, index) => (
            <ApplicationItems key={index} order={index + 1} itemData={item} />
          ))
        )}
      </Box>
      {/* 페이지네이션 추가  */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <CustomPagination
          page={params.page ?? 1}
          count={pageCount}
          handleChange={(event, value) => handlePageChange(value)}
        />
      </Box>
      <Features.CompanyListTitle />
    </Stack>
  );
}
