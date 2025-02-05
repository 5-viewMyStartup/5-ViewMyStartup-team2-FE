import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";
import { Box, Stack } from "@mui/material";

export default function ListLabel() {
  return (
    <Stack sx={listLabelWrapperStyle}>
      <Box sx={rankingBoxStyle}>
        <Typo
          className="text_M_14"
          content="순위"
          color={colorChips.white}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
      <Box sx={nameBoxStyle}>
        <Typo
          className="text_M_14"
          content="기업 명"
          color={colorChips.white}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
      <Box sx={descBoxStyle}>
        <Typo
          className="text_M_14"
          content="기업 소개"
          color={colorChips.white}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
      <Box sx={dataBoxStyle}>
        <Typo
          className="text_M_14"
          content="카테고리"
          color={colorChips.white}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
      <Box sx={dataBoxStyle}>
        <Typo
          className="text_M_14"
          content="매출액"
          color={colorChips.white}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
      <Box sx={dataBoxStyle}>
        <Typo
          className="text_M_14"
          content="사원 수"
          color={colorChips.white}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
      <Box sx={dataBoxStyle}>
        <Typo
          className="text_M_14"
          content="지원자 수"
          color={colorChips.white}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
    </Stack>
  );
}

const listLabelWrapperStyle = {
  width: { xs: "696px", sm: "696px", md: "1200px" },
  borderRadius: "4px",
  flexDirection: "row",
  height: "39px",
  margin: "16px 0",
  backgroundColor: colorChips.black_100,
};

const baseLabelBoxStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const rankingBoxStyle = {
  ...baseLabelBoxStyle,
  display: ["none", "none", "flex"],
  width: ["50px", "50px", "68px"],
};

const nameBoxStyle = {
  ...baseLabelBoxStyle,
  width: ["150px", "150px", "216px"],
};

export const descBoxStyle = {
  ...baseLabelBoxStyle,
  width: ["180px", "180px", "304px"],
};

export const dataBoxStyle = {
  ...baseLabelBoxStyle,
  width: ["91.5px", "91.5px", "153.75px"],
};
