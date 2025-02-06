import { SearchInput } from "@/global/components/input/SearchInput";
import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";
import { Box, Stack } from "@mui/material";
import React from "react";

export default function ListTitle(): React.ReactElement {
  return (
    <Stack sx={listHeaderContainerStyle}>
      <Typo
        className="text_B_20"
        content="전체 스타트업 목록"
        color={colorChips.white}
      />
      <Stack sx={utilsContainerSytle}>
        <Box sx={searchBoxStyle}>
          <SearchInput
            width="100%"
            variation="left"
            placeholder="검색어를 입력해주세요"
          />
        </Box>
        <Box sx={sortBoxStyle}>
          <Typo
            className="text_SB_20"
            content="정렬"
            color={colorChips.white}
          />
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
  maxWidth: { sm: "696px", md: "1200px" },
  pl: { xs: "16px", sm: "0" },
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
};

const sortBoxStyle = {
  display: "flex",
  alignItems: "center",
  width: ["146px", "168px"],
  height: ["40px", "48px"],
  border: `1px solid ${colorChips.white}`, //border는 컴포넌트 넣고 삭제
};
