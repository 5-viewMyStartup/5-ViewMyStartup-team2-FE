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
  // breakpoints: {
  //   // custom breakpoints: https://mui.com/material-ui/customization/breakpoints/#custom-breakpoints
  //   // 일단 기본값으로 덮어썼는데, 추후 커스텀 필요하면 수정하기
  //   values: {
  //     xs: 0, // mobile
  //     sm: 600, // tablet
  //     md: 900,
  //     lg: 1200, // desktop
  //     xl: 1536,
  //   },
  // },
});

export default theme;
