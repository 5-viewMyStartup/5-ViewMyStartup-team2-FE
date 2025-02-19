"use client";

import {
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
import { LargeBtn } from "@/global/components/button/LargeBtn";

interface BookmarkItemsProps {
  itemData: BookmarkDTO;
  onApply?: (companyData: BookmarkDTO) => void;
}

export function BookmarkItems({ itemData, onApply }: BookmarkItemsProps) {
  const { imgSrc, handleImgErr } = useCompanyDefaultImg(itemData.image);
  return (
    <Stack sx={bookmarkItemBoxStyle}>
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
          content={`${itemData.applicants}명`}
          color={colorChips.gray_100}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
      <Box sx={applyBoxStyle}>
        {!itemData.applied && (
          <LargeBtn
            width="80px"
            isDisabled={false}
            content="지원하기"
            onClickBtn={() => onApply && onApply(itemData)}
          />
        )}
      </Box>
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
