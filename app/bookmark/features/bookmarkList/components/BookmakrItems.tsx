"use client";

import {
  bookmarkBoxStyle,
  descBoxStyle,
  categoryBoxStyle,
  applyNumBoxStyle,
  applyBoxStyle,
  companyDescTypoStyle,
  itemNameBoxStyle,
} from "@/global/styles/bookmarkListStyles";
import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";
import { BookmarkDTO } from "@/global/types/data-contracts";
import { Box, Stack } from "@mui/material";
import Image from "next/image";
import { useCompanyDefaultImg } from "@/global/hooks/useCompanyImg";

interface BookmarkItemsProps {
  itemData: BookmarkDTO;
}

export function BookmarkItems({ itemData }: BookmarkItemsProps) {
  const { imgSrc, handleImgErr } = useCompanyDefaultImg(itemData.image);
  return (
    <Stack sx={bookmarkItemBoxStyle}>
      <Box sx={bookmarkBoxStyle}></Box>
      <Box sx={itemNameBoxStyle}>
        <Image
          src={imgSrc}
          alt="기업 대표 이미지"
          width={32}
          height={32}
          onError={handleImgErr}
          style={{ borderRadius: "50%" }}
        />
        <Typo
          className="text_M_14"
          content={itemData.name}
          color={colorChips.white}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
      <Box sx={descBoxStyle}>
        <Typo
          className="text_R_14"
          content={itemData.content}
          color={colorChips.gray_100}
          customStyle={companyDescTypoStyle}
        />
      </Box>
      <Box sx={categoryBoxStyle}>
        <Typo
          className="text_R_14"
          content={itemData.category?.[0]?.category}
          color={colorChips.gray_100}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
      <Box sx={applyNumBoxStyle}>
        <Typo
          className="text_R_14"
          content={`${itemData.applicantCnt}명`}
          color={colorChips.gray_100}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
      <Box sx={applyBoxStyle}></Box>
    </Stack>
  );
}

const bookmarkItemBoxStyle = {
  flexDirection: "row",
  height: "64px",
  borderBottom: `1px solid ${colorChips.gray_300}`,
  "&:last-child": {
    borderBottom: "none",
  },
};

const bookmarkDescTypoStyle = {
  overflow: "hidden", //넘치는 내용 숨기기
  display: "-webkit-box", //말줄임표
  WebkitLineClamp: 2, //최대 2줄까지만 표시
  WebkitBoxOrient: "vertical" as const, //세로 방향 줄바꿈 적용
  whiteSpace: "normal",
  wordBreak: "break-word" as const, //단어 단위로 줄바꿈
};
