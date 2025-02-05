"use client";
import { colorChips, PATH } from "@/global/styles/colorChips";
import {
  BottomNavigation,
  BottomNavigationAction,
  BottomNavigationActionProps,
  Button,
  Stack,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Header = () => {
  const route = useRouter();
  const [value, setValue] = useState("");

  const handleChange = (e: React.SyntheticEvent, value: string) => {
    setValue(value);
  };

  const handleLogoClick = () => {
    route.push(PATH.HOME);
  };

  return (
    <Stack
      width={"100%"}
      sx={{ borderBottom: `1px solid ${colorChips.black_100}` }}
      alignItems={"center"}
    >
      <Stack
        maxWidth={"1200px"}
        width={"100%"}
        spacing={["40px", "24px", "16px"]}
        direction={"row"}
        pl={["16px", "24px", "16px"]}
      >
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
      </Stack>
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
