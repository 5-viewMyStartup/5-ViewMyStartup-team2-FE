"use client";
import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";
import { Box, Stack } from "@mui/material";
import Link from "next/link";
import React from "react";
import { CustomSelect } from "@/global/components/CustomSelect";

// 드롭다운 관련 props 타입 정의
export interface ListTitleDropdownProps {
  dropdownValue: string;
  onDropdownChange: (value: string) => void;
  dropdownOptions: { value: string; name: string }[]; // 반드시 배열이어야 함
}

export const ListTitle = {
  Pick: function (): React.ReactElement {
    return (
      <Stack sx={listHeaderContainerStyle}>
        <Typo
          className="text_B_20"
          content="내가 선택한 기업"
          color={colorChips.white}
        />
        <Box>
          {/* 빈 문자열은 현재 페이지 */}
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
  Result: function (props: ListTitleDropdownProps): React.ReactElement {
    // dropdownOptions가 undefined일 경우 빈 배열([])로 처리
    const dropdownOptions = props.dropdownOptions || [];
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
              value={props.dropdownValue}
              handleChange={props.onDropdownChange}
              options={dropdownOptions}
              defaultValue={
                dropdownOptions.length > 0 ? dropdownOptions[0].value : ""
              }
            />
          </Box>
        </Box>
      </Stack>
    );
  },
  Ranking: function (props: ListTitleDropdownProps): React.ReactElement {
    const dropdownOptions = props.dropdownOptions || [];
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
              value={props.dropdownValue}
              handleChange={props.onDropdownChange}
              options={dropdownOptions}
              defaultValue={
                dropdownOptions.length > 0 ? dropdownOptions[0].value : ""
              }
            />
          </Box>
        </Box>
      </Stack>
    );
  },
};

const listHeaderContainerStyle = {
  flexDirection: ["column", "row"] as const,
  justifyContent: "space-between",
  alignItems: ["flex-start", "center"],
  height: ["100%", "48px"],
  width: "100%",
  maxWidth: { sm: "696px", md: "1200px" },
  mb: "16px",
};

const btnBoxStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "167px",
  height: "40px",
  borderRadius: "50px",
  backgroundColor: "#EB5230",
};

const sortBoxStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: ["146px", "168px"],
  height: ["40px", "48px"],
  border: `1px solid ${colorChips.white}`,
};
