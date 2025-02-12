"use client";

import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    button: Palette["primary"];
    button_select: Palette["primary"];
    input: Palette["primary"];
  }

  interface PaletteOptions {
    button?: PaletteOptions["primary"];
    button_select?: PaletteOptions["primary"];
    input?: PaletteOptions["primary"];
  }
}
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    button: true;
    button_select: true;
  }
}
declare module "@mui/material/InputBase" {
  interface InputBasePropsColorOverrides {
    input: true;
  }
}
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
    button: {
      main: "#D8D8D8", // 직접 정의
    },
    button_select: {
      main: "#747474",
    },
    input: {
      main: "#ffffff",
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
