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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PATH } from "../types/Path";
import { LoginModal } from "./modal/LoginModal";

export const Header = () => {
  const route = useRouter();
  const [value, setValue] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleChange = (e: React.SyntheticEvent, value: string) => {
    setValue(value);
  };

  const handleLogoClick = () => {
    route.push(PATH.HOME);
  };
  useEffect(() => {
    if (!loginOpen) {
      setId("");
      setPw("");
    }
  }, [loginOpen]);
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
              value={"compareMyCompany"}
              label="나의 기업 비교"
              {...BottomNavigationActionStyle}
            />
            <BottomNavigationAction
              value={"compareStatus"}
              label="비교 현황"
              {...BottomNavigationActionStyle}
            />
            <BottomNavigationAction
              value={"investmentStatus"}
              label="투자 현황"
              {...BottomNavigationActionStyle}
            />
          </BottomNavigation>
        </Box>
        <Button
          variant="contained"
          sx={{ height: "48px", borderRadius: "10px" }}
          onClick={() => {
            setLoginOpen(true);
          }}
        >
          로그인
        </Button>
      </Stack>
      <LoginModal
        title="로그인"
        open={loginOpen}
        handleClose={() => setLoginOpen(false)}
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
