"use client";

import { colorChips } from "@/global/styles/colorChips";
import { Box, Stack } from "@mui/material";
import { ReactNode } from "react";
import { Header } from "./Header";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      position={"relative"}
      justifyContent={"flex-start"} // 전체 높이가 콘텐츠보다 낮아지면 위에 header부분이 짤림 때문에 수정함
      alignItems={"center"}
      sx={{
        bgcolor: colorChips.black_400,
        minWidth: "100vw",
        width: "100%",
        minHeight: "100vh",
        height: "100%",
      }}
    >
      <Header />
      <Box maxWidth={"1200px"} width={"100%"} height={"100%"}>
        {children}
      </Box>
    </Stack>
  );
};
