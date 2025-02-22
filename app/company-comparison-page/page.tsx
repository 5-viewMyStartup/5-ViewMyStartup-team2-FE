"use client";

import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo"; // 텍스트 스타일을 위한 컴포넌트 임포트
import { Box, Stack } from "@mui/material";
import { Features } from "./features";
import { SkeletonApplicationList } from "@/global/components/SkeletonComparisonApplicationItems";
import { useApplicationFetch } from "./core/useApplicationFetchHook";
import { ApplicationItems } from "./features/comparisonList/components/ApplicationItems";
import { companyListWrapperStyle } from "@/global/styles/companyListStyles";

export default function Page() {
  const { companies, isLoading } = useApplicationFetch();

  // 데이터가 없을 때 "지원한 기업 없음" 메시지를 띄우기 위한 체크
  const isShowSkeleton = isLoading; // 로딩 중일 때 스켈레톤 화면 보여주기
  const isAllDataEmpty = !companies.length; // 배열이 비어있을 때 "현재 지원한 기업이 없습니다." 메시지 띄우기

  return (
    <Stack sx={pageContainerStyle}>
      <Features.applicationListTitle />
      {/* 첫 번째 박스: 지원한 기업 목록 */}
      <Box
        sx={{
          backgroundColor: colorChips.black_300,
          padding: "85px 8px",
          borderRadius: "8px",
          display: "flex",
          flexWrap: "wrap", // 자동 줄바꿈
          justifyContent: "center", // 항목들을 가운데 정렬
          gap: "16px", // 항목 간 간격
          "@media (max-width: 743px)": {
            // 743px 이하에서 3개-2개 배치 되도록 설정
            width: "100%",
            "& > :nth-of-type(3n+1)": {
              marginLeft: "0", // 첫 번째 줄과 두 번째 줄 간의 간격을 맞추기 위해
            },
            "& > :nth-of-type(n+4)": {
              marginLeft: "calc(16px / 2)", // 두 번째 줄이 가운데로 오도록 margin을 추가
            },
            // 각 항목 너비를 지정해서 3개씩 2개 줄로 배치되도록 조정
            "& > :nth-of-type(1), & > :nth-of-type(2), & > :nth-of-type(3)": {
              width: "calc(33.33% - 10px)", // 첫 번째 줄 3개: 33.33% 너비로 설정
            },
            "& > :nth-of-type(4), & > :nth-of-type(5)": {
              width: "calc(50% - 10px)", // 두 번째 줄 2개: 50% 너비로 설정
            },
          },
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
      <Features.CompanyListTitle />
    </Stack>
  );
}

const pageContainerStyle = {
  width: "100%",
  marginTop: { md: "40px" },
  marginRight: { md: "360px" },
  marginBottom: { md: "156px" },
  // marginLeft: { xs: "16px", sm: "24px", md: "360px" },
  paddingTop: { xs: "24px", sm: "40px" },
  paddingRight: { xs: "16px", sm: "24px" },
  paddingBottom: { xs: "512px", sm: "330px" },
  paddingLeft: { xs: "16px", sm: "24px" },
};
