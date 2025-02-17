import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";
import { Box, Stack } from "@mui/material";
import React from "react";

export default function applicationListTitle(): React.ReactElement {
  return (
    <Stack sx={listHeaderContainerStyle}>
      <Typo
        className="text_B_20"
        content="내가 지원한 기업"
        color={colorChips.white}
      />
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
  marginTop: "40px",
  marginBottom: "16px",
};
