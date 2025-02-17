"use client";
import { colorChips } from "@/global/styles/colorChips";
import {
  BottomNavigation,
  BottomNavigationAction,
  BottomNavigationActionProps,
  Box,
  Button,
  Stack,
} from "@mui/material";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PATH } from "../types/Path";
import { LoginModal } from "./modal/LoginModal";
import { loginAPI } from "./modal/store/LoginApi";
import Cookies from "js-cookie";
import { useAuthStore, useUserStore } from "./modal/store/authStore";
import { Typo } from "../styles/Typo";

export const Header = () => {
  const route = useRouter();
  const [value, setValue] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const pathname = usePathname().replace(/^\//, "");
  const handleChange = (e: React.SyntheticEvent, value: string) => {
    setValue(value);
  };

  const handleLogoClick = () => {
    route.push(PATH.HOME);
  };
  const handleNavigation = (path: string) => {
    route.push(path);
  };

  const { removeToken } = useAuthStore();
  const { clearUserInfo } = useUserStore();

  const hadleLogin = async () => {
    try {
      await loginAPI(id, pw);
      alert("로그인 성공!");
      setLoginOpen(false);
      setIsLogin(true);
    } catch (e) {
      alert("로그인 실패: " + e);
    }
  };
  const handleLogout = async () => {
    clearUserInfo();
    removeToken();
    setIsLogin(false);
  };

  useEffect(() => {
    if (!loginOpen) {
      setId("");
      setPw("");
    }
  }, [loginOpen]);

  useEffect(() => {
    setValue(pathname);
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = Cookies.get("accessToken");
      const refreshToken = Cookies.get("refreshToken");

      // 브라우저에서만 렌더링되는 코드
      if (accessToken) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    }
  }, []); // 빈 배열을 두어 페이지 로드 시 한번만 실행

  return (
    <Stack
      width={"100%"}
      sx={{ borderBottom: `1px solid ${colorChips.black_100}` }}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Stack
        maxWidth={"1200px"}
        width={"100%"}
        spacing={["40px", "24px", "16px"]}
        direction={"row"}
        pl={["16px", "24px", "16px"]}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box display={"flex"}>
          <Button sx={{ padding: 0 }} onClick={handleLogoClick}>
            <Image
              src={"/assets/logo.svg"}
              alt={"logo"}
              width={112}
              height={40}
            />
          </Button>
          <BottomNavigation
            showLabels
            value={value}
            onChange={handleChange}
            sx={{
              justifyContent: "left",
              height: "60px",
              bgcolor: colorChips.black_400,
              padding: 0,
            }}
          >
            <BottomNavigationAction
              onClick={() => handleNavigation(PATH.COMPANY_COMPARISON)}
              value={"company-comparison"}
              label="나의 기업 비교"
              {...BottomNavigationActionStyle}
            />
            <BottomNavigationAction
              value={"compareStatus"}
              label="비교 현황"
              {...BottomNavigationActionStyle}
            />
            <BottomNavigationAction
              onClick={() => handleNavigation(PATH.BOOKMARK)}
              value={"bookmark"}
              label="즐겨 찾기"
              {...BottomNavigationActionStyle}
            />
          </BottomNavigation>
        </Box>

        <Button
          variant="contained"
          sx={{ height: "48px", borderRadius: "10px" }}
          onClick={() => {
            isLogin ? handleLogout() : setLoginOpen(true);
          }}
        >
          {isLogin ? "로그아웃" : "로그인"}
        </Button>
      </Stack>

      <LoginModal
        title="로그인"
        open={loginOpen}
        handleClose={() => setLoginOpen(false)}
        hadleLogin={hadleLogin}
        id={{ id, setId }}
        pw={{ pw, setPw }}
      />
    </Stack>
  );
};
const BottomNavigationActionStyle: BottomNavigationActionProps = {
  sx: {
    paddingX: ["8px", "17px", "17px"],
    fontSize: ["15px", "16px", "18px"],
    fontWeight: 600,
    whiteSpace: "nowrap",
    color: colorChips.gray_200,
    "&.Mui-selected": {
      color: colorChips.white,
    },
  },
};
