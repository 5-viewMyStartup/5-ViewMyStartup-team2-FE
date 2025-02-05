import { colorChips } from "@/global/styles/colorChips";
import { Box, Stack } from "@mui/material";
import { ReactNode } from "react";
import { Header } from "./Header";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ bgcolor: colorChips.black_400, width: "100vw", height: "100vh" }}
    >
      <Header />
      <Box maxWidth={"1200px"} height={"100%"}>
        {children}
      </Box>
    </Stack>
  );
};
