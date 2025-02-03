import { COLORS } from "@/global/styles/colors";
import { Typo } from "@/global/styles/Typo";
import { Box, Stack } from "@mui/material";
import React from "react";

export default function ListTitle(): React.ReactElement {
  return (
    <Stack sx={listHeaderContainerStyle}>
      <Typo
        className="text_B_20"
        content="전체 스타트업 목록"
        color={COLORS.white}
      />
      <Stack sx={utilsContainerSytle}>
        <Box sx={searchBoxStyle}>
          <Typo className="text_SB_20" content="검색" color={COLORS.white} />
        </Box>
        <Box sx={sortBoxStyle}>
          <Typo className="text_SB_20" content="정렬" color={COLORS.white} />
        </Box>
      </Stack>
    </Stack>
  );
}

const listHeaderContainerStyle = {
  flexDirection: ["column", "row"] as const,
  justifyContent: "space-between",
  alignItems: ["flex-start", "center"],
  height: ["100%", "48px"],
  width: "100%",
  maxWidth: ["696px", "696px", "1200px"],
};

const utilsContainerSytle = {
  flexDirection: "row" as const,
  gap: ["8px", "12px", "16px"],
  width: ["343px", "450px", "632px"],
  paddingTop: ["16px", "0"],
};

const searchBoxStyle = {
  display: "flex",
  alignItems: "center",
  width: ["189px", "269px", "448px"],
  height: ["40px", "48px"],
  border: `1px solid ${COLORS.white}`, //border는 컴포넌트 넣고 삭제
};

const sortBoxStyle = {
  display: "flex",
  alignItems: "center",
  width: ["146px", "168px"],
  height: ["40px", "48px"],
  border: `1px solid ${COLORS.white}`, //border는 컴포넌트 넣고 삭제
};
