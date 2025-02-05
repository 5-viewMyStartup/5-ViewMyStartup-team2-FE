"use client";

import { colorChips } from "@/global/styles/colorChips";
import { Box, Stack } from "@mui/material";
import { ReactNode } from "react";
import { Header } from "./Header";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      sx={{
        bgcolor: colorChips.black_400,
        minHeight: "100vh",
        alignItems: "center",
      }}
    >
      <Header />
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          flex: 1,
        }}
      >
        {children}
      </Box>
    </Stack>
  );
};
