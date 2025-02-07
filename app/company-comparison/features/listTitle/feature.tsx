import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";
import { Box, Stack } from "@mui/material";
import Link from "next/link";
import React from "react";

export const ListTitle = {
  Bookmark: function (): React.ReactElement {
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
  Result: function (): React.ReactElement {
    return (
      <Stack sx={listHeaderContainerStyle}>
        <Typo
          className="text_B_20"
          content="비교 결과 확인하기"
          color={colorChips.white}
        />
        <Box>
          <Box sx={sortBoxStyle}>
            <Typo
              className="text_SB_20"
              content="매출액 고용인원 지원인원 드롭박스"
              color={colorChips.white}
            />
          </Box>
        </Box>
      </Stack>
    );
  },

  Ranking: function (): React.ReactElement {
    return (
      <Stack sx={listHeaderContainerStyle}>
        <Typo
          className="text_B_20"
          content="기업 순위 확인하기"
          color={colorChips.white}
        />
        <Box>
          <Box sx={sortBoxStyle}>
            <Typo
              className="text_SB_20"
              content="매출액 고용인원 지원인원 드롭박스"
              color={colorChips.white}
            />
          </Box>
        </Box>
      </Stack>
    );
  },
};

const listHeaderContainerStyle = {
  flexDirection: ["column", "row"] as const, // as const 고정 값
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
  border: `1px solid ${colorChips.white}`, //border는 컴포넌트 넣고 삭제
};
