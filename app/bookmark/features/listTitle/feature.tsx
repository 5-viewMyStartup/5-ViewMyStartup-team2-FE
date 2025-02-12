import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";
import { Box, Stack } from "@mui/material";
import React from "react";

export default function ListTitle(): React.ReactElement {
  return (
    <Stack sx={listHeaderContainerStyle}>
      <Typo className="text_B_20" content="즐겨찾기" color={colorChips.white} />
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

const searchBoxStyle = {
  display: "flex",
  alignItems: "center",
  width: ["189px", "269px", "448px"],
  height: ["40px", "48px"],
  border: `1px solid ${colorChips.white}`, //border는 컴포넌트 넣고 삭제
};

const sortBoxStyle = {
  display: "flex",
  alignItems: "center",
  width: ["146px", "168px"],
  height: ["40px", "48px"],
  border: `1px solid ${colorChips.white}`, //border는 컴포넌트 넣고 삭제
};
