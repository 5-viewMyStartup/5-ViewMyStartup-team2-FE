"use client";

import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";
import { CompanyDTO } from "@/global/types/data-contracts";
import { Box, Stack } from "@mui/material";
import { useCompanyDefaultImg } from "@/global/hooks/useCompanyImg";
import Image from "next/image";
import {
  companyItemBoxStyle,
  labelOrderBoxStyle,
  itemNameBoxStyle,
  labelDescBoxStyle,
  companyDescTypoStyle,
  labelDataBoxStyle,
} from "@/global/styles/companyListStyles";

interface ApplicationItemsProps {
  order: number;
  itemData: CompanyDTO | null;
}

export function ApplicationItems({ order, itemData }: ApplicationItemsProps) {
  // console.log("itemData 확인용: ", itemData); // itemData 확인
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

  const { imgSrc, handleImgErr } = useCompanyDefaultImg(itemData.image); // 기업 이미지 처리 훅+nullish 체크 추가

  return (
    <Stack>
      {/* 세정TODO 스타일 어떻게 넣을지 고민 sx={companyItemBoxStyle}*/}
      <Box>
        {/* 세정TODO 스타일 어떻게 넣을지 고민 sx={itemNameBoxStyle}*/}
        {/* 기업 이미지와 이름을 표시하는 Box */}
        <img
          src={imgSrc}
          alt="기업 대표 이미지"
          width={80}
          height={80}
          onError={handleImgErr}
          style={{ borderRadius: "50%" }}
        />
        <Typo
          className="text_M_16"
          content={itemData.name}
          color={colorChips.white}
          customStyle={{
            textAlign: "center",
          }}
        />
        <Typo
          className="text_M_14"
          content={
            itemData.category && itemData.category.length > 0
              ? itemData.category.join(", ") // categories 배열이 있다면 카테고리들 이어서 출력
              : "카테고리 없음"
          } // 없으면 기본 메시지 출력
          color={colorChips.gray_200}
          customStyle={{
            textAlign: "center",
          }}
        />
      </Box>
    </Stack>
  );
}
