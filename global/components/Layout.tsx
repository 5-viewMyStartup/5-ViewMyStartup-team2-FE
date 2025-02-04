"use client";

import { COLORS } from "@/global/styles/colors";
import { Box, Stack } from "@mui/material";
import { ReactNode } from "react";
import { Header } from "./Header";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: COLORS.black_400,
      }}
    >
      <Header />
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {children}
      </Box>
    </Stack>
  );
};
