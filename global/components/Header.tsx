import { colorChips } from "@/global/styles/colorChips";
import {
  BottomNavigation,
  BottomNavigationAction,
  BottomNavigationActionProps,
  Box,
  Stack,
} from "@mui/material";
import Image from "next/image";

export const Header = () => {
  return (
    <Stack
      width={"100%"}
      sx={{ borderBottom: `1px solid ${colorChips.black_100}` }}
      alignItems={"center"}
    >
      <Box maxWidth={"1200px"} width={"100%"}>
        <BottomNavigation
          showLabels
          sx={{ height: "60px", bgcolor: colorChips.black_400, padding: 0 }}
        >
          <BottomNavigationAction
            sx={{ padding: 0 }}
            icon={
              <Image
                width={112}
                height={40}
                src="/assets/logo.svg"
                alt="Logo"
              />
            }
          />
          <BottomNavigationAction
            label="나의 기업 비교"
            {...BottomNavigationActionStyle}
          />
          <BottomNavigationAction
            label="비교 현황"
            {...BottomNavigationActionStyle}
          />
          <BottomNavigationAction
            label="투자 현황"
            {...BottomNavigationActionStyle}
          />
        </BottomNavigation>
      </Box>
    </Stack>
  );
};
const BottomNavigationActionStyle: BottomNavigationActionProps = {
  sx: {
    width: "auto",
    paddingX: "17px",
    fontSize: "15px",
    fontWeight: 600,
    color: colorChips.gray_100,
  },
};
