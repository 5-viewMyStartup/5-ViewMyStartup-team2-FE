"use client";

import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";
import { Box, Stack } from "@mui/material";
import Link from "next/link";
import React from "react";
import { CustomSelect } from "@/global/components/CustomSelect";

export interface ListTitleDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; name: string }[];
}

export const ListTitle = {
  // "내가 지원한 기업" 제목 및 링크 버튼 렌더링
  Pick: function (): React.ReactElement {
    return (
      <Stack sx={listHeaderContainerStyle}>
        <Typo
          className="text_B_20"
          content="내가 지원한 기업"
          color={colorChips.white}
        />
        <Box>
          {/* 링크 클릭 시 "다른 기업 비교하기" 페이지로 이동 (필요에 따라 href 수정) */}
          <Link href="">
            <Box sx={btnBoxStyle}>
              <Typo
                className="text_SB_16"
                content="다른 기업 비교하기"
                color={colorChips.white}
              />
            </Box>
          </Link>
        </Box>
      </Stack>
    );
  },
  // "비교 결과 확인하기" 제목 및 드롭다운 렌더링
  Result: function (props: ListTitleDropdownProps): React.ReactElement {
    // options가 undefined일 경우 빈 배열([])로 처리
    const options = props.options || [];
    return (
      <Stack sx={listHeaderContainerStyle}>
        <Typo
          className="text_B_20"
          content="비교 결과 확인하기"
          color={colorChips.white}
        />
        <Box>
          <Box sx={sortBoxStyle}>
            <CustomSelect
              options={options}
              value={props.value}
              handleChange={props.onChange}
              defaultValue="salesRevenueRank"
            />
          </Box>
        </Box>
      </Stack>
    );
  },
  // "기업 순위 확인하기" 제목 및 드롭다운 렌더링
  Ranking: function (props: ListTitleDropdownProps): React.ReactElement {
    const options = props.options || [];
    return (
      <Stack sx={listHeaderContainerStyle}>
        <Typo
          className="text_B_20"
          content="기업 순위 확인하기"
          color={colorChips.white}
        />
        <Box>
          <Box sx={sortBoxStyle}>
            <CustomSelect
              options={options}
              value={props.value}
              handleChange={props.onChange}
              defaultValue="salesRevenueRank"
            />
          </Box>
        </Box>
      </Stack>
    );
  },
};

/* 스타일 정의 */
// ListTitle 공통 컨테이너 스타일
const listHeaderContainerStyle = {
  flexDirection: ["column", "row"] as const,
  justifyContent: "space-between",
  alignItems: ["flex-start", "center"],
  height: ["100%", "48px"],
  width: "100%",
  maxWidth: { sm: "696px", md: "1200px" },
  mb: "16px",
};

// 링크 버튼 스타일
const btnBoxStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "167px",
  height: "40px",
  borderRadius: "50px",
  backgroundColor: "#EB5230",
};

// 드롭다운을 감싸는 박스 스타일
const sortBoxStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: ["146px", "168px"],
  height: ["40px", "48px"],
  border: `1px solid ${colorChips.white}`,
};
