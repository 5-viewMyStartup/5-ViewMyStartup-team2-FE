"use client";

import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";
import { ComparisonCompanyDTO } from "@/global/types/data-contracts";
import { Box, Stack } from "@mui/material";
import { useCompanyDefaultImg } from "@/global/hooks/useCompanyImg";
import Image from "next/image";

interface ApplicationItemsProps {
  order: number;
  itemData: ComparisonCompanyDTO | null;
}

export function ApplicationItems({ itemData }: ApplicationItemsProps) {
  const { imgSrc, handleImgErr } = useCompanyDefaultImg(itemData?.image); // 기업 이미지 처리 훅+nullish 체크 추가
  // itemData가 없다면 "지원한 기업 없음"을 출력
  if (!itemData || !itemData.name) {
    return (
      <Stack>
        <Typo
          className="text_M_14"
          content="지원한 기업이 없습니다."
          color={colorChips.gray_200}
          customStyle={{
            textAlign: "center",
          }}
        />
      </Stack>
    );
  }

  return (
    <Box sx={boxStyle}>
      <Image
        src={imgSrc}
        alt="기업 대표 이미지"
        width={80}
        height={80}
        onError={handleImgErr}
        style={{ borderRadius: "50%", marginBottom: "10px" }}
      />
      <Typo
        className="text_SB_16"
        content={itemData.name}
        color={colorChips.white}
        customStyle={{
          textAlign: "center",
          marginBottom: "4px",
        }}
      />
      <Typo
        className="text_M_14"
        content={
          itemData.category && itemData.category.length > 0
            ? itemData.category.join(", ")
            : "카테고리 없음"
        }
        color={colorChips.gray_200}
        customStyle={{
          textAlign: "center",
        }}
      />
    </Box>
  );
}

const boxStyle = {
  maxWidth: "126px",
  minWidth: "126px", // ✅ 최소 크기 제한
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
