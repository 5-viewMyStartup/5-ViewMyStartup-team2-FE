import { colorChips } from "../styles/colorChips";
import { Box, Stack } from "@mui/material";
import { ReactNode } from "react";
import { Header } from "./Header";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        bgcolor: colorChips.black_400,
        width: "100vw",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Header />
      <Box
        maxWidth={"1200px"}
        width={"100%"}
        height={"100%"}
        justifyItems={"center"}
      >
        {children}
      </Box>
    </Stack>
  );
};
