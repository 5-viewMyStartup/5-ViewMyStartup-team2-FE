import { colorChips } from "@/global/styles/colorChips";
import {
  listLabelWrapperStyle,
  labelOrderBoxStyle,
  labelNameBoxStyle,
  labelDescBoxStyle,
  labelDataBoxStyle,
} from "@/global/styles/companyListStyles";
import { Typo } from "@/global/styles/Typo";
import { Box, Stack } from "@mui/material";

export default function ListLabel() {
  return (
    <Stack sx={listLabelWrapperStyle}>
      <Box sx={labelOrderBoxStyle} />
      <Box sx={labelNameBoxStyle}>
        <Typo
          className="text_M_14"
          content="기업 명"
          color={colorChips.white}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
      <Box sx={labelDescBoxStyle}>
        <Typo
          className="text_M_14"
          content="기업 소개"
          color={colorChips.white}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
      <Box sx={labelDataBoxStyle}>
        <Typo
          className="text_M_14"
          content="카테고리"
          color={colorChips.white}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
      <Box sx={labelDataBoxStyle}>
        <Typo
          className="text_M_14"
          content="지원 상태"
          color={colorChips.white}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
      <Box sx={labelDataBoxStyle}>
        <Typo
          className="text_M_14"
          content="지원 일자"
          color={colorChips.white}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
      <Box sx={labelDataBoxStyle}>
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
