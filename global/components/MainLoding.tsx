import { Box, LinearProgress, Stack } from "@mui/material";
import Image from "next/image";
import { Typo } from "../styles/Typo";
import { colorChips } from "../styles/colorChips";

export const MainLoding: React.FC = () => {
  return (
    <Box
      position={"absolute"}
      top={0}
      left={0}
      width={"100vw"}
      height={"100vh"}
      bgcolor={colorChips.black_400}
      justifyItems={"center"}
    >
      <Stack
        width={"100%"}
        height={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"10px"}
      >
        <Image src="/assets/logo.svg" width={400} height={400} alt="메인로딩" />
        <Typo
          className="text_B_24"
          color={colorChips.white}
          content="서버 로딩중"
        />
        <LinearProgress sx={{ paddingTop: "5px", width: "50%" }} />
      </Stack>
    </Box>
  );
};
