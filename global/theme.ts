"use client";

// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-pretendard)",
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: "#EB5230", // 원하는 색상 코드로 변경하세요.
    },
    secondary: {
      main: "#558FFF",
    },
  },
  // // 추가로 커스터마이징이 필요하면 여기에 작성하세요.
  breakpoints: {
    values: {
      xs: 0, // mobile
      sm: 744, // tablet
      md: 1200, // desktop
      lg: 1500,
      xl: 1536,
    },
  },
});

export default theme;
