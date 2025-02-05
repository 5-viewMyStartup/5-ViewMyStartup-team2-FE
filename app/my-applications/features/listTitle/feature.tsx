import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";
import { Box, Stack } from "@mui/material";
import React from "react";

export default function ListTitle(): React.ReactElement {
  return (
    <Stack sx={listHeaderContainerStyle}>
      <Typo className="text_B_20" content="지원현황" color={colorChips.white} />
      <Box sx={sortBoxStyle}>
        <Typo className="text_SB_20" content="정렬" color={colorChips.white} />
      </Box>
    </Stack>
  );
}

const listHeaderContainerStyle = {
  flexDirection: "row" as const,
  justifyContent: "space-between",
  alignItems: "center",
  height: ["40px", "48px"],
  width: "100%",
  maxWidth: { sm: "696px", md: "1200px" },
  pl: { xs: "16px", sm: "0" },
  pr: { xs: "16px", sm: "0" },
};

const sortBoxStyle = {
  display: "flex",
  alignItems: "center",
  width: ["241px", "264px"],
  height: ["40px", "48px"],
  border: `1px solid ${colorChips.white}`, //border는 컴포넌트 넣고 삭제
};
