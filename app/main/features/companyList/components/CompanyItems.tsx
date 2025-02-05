"use client";

import {
  dataBoxStyle,
  descBoxStyle,
  rankingBoxStyle,
} from "@/app/main/single/ListLabel";
import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";
import { CompanyData } from "@/global/types/data-contracts";
import { Box, Stack } from "@mui/material";
import Image from "next/image";
import { useCompanyImg } from "../core/useCompanyImg";

interface CompanyItemsProps {
  ranking: number;
  itemData: CompanyData;
}

export function CompanyItems({ ranking, itemData }: CompanyItemsProps) {
  const { handleImgErr, imgSrc } = useCompanyImg(itemData.image);

  return (
    <Stack sx={companyItemBoxStyle}>
      <Box sx={rankingBoxStyle}>
        <Typo
          className="text_R_14"
          content={`${ranking + 1}위`}
          color={colorChips.gray_100}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
      <Box sx={imgNameBoxStyle}>
        <Image
          src={imgSrc}
          width={32}
          height={32}
          alt="기업 대표 이미지"
          style={{ borderRadius: "360px", alignContent: "center" }}
          onError={handleImgErr}
        />
        <Typo
          className="text_M_14"
          content={itemData.name}
          color={colorChips.white}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
      <Box
        sx={{
          ...descBoxStyle,
          padding: "15px 16px",
        }}
      >
        <Typo
          className="text_R_14"
          content={itemData.content}
          color={colorChips.gray_100}
          customStyle={companyDescTypoStyle}
        />
      </Box>
      <Box sx={dataBoxStyle}>
        <Typo
          className="text_R_14"
          content={itemData.category[0]}
          color={colorChips.gray_100}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
      <Box sx={dataBoxStyle}>
        <Typo
          className="text_R_14"
          content={itemData.salesRevenue.toString()}
          color={colorChips.gray_100}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
      <Box sx={dataBoxStyle}>
        <Typo
          className="text_R_14"
          content={itemData.employeeCnt.toString()}
          color={colorChips.gray_100}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
      <Box sx={dataBoxStyle}>
        <Typo
          className="text_R_14"
          content={itemData.applicatnsCnt.toString()}
          color={colorChips.gray_100}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
    </Stack>
  );
}

const companyItemBoxStyle = {
  flexDirection: "row",
  height: "64px",
  borderBottom: `1px solid ${colorChips.gray_300}`,
  "&:last-child": {
    borderBottom: "none",
  },
};

const imgNameBoxStyle = {
  display: "flex",
  alignItems: "center",
  gap: ["8px", "8px", "12px"],
  pl: ["16px", "16px", "24px"],
  width: ["150px", "150px", "216px"],
};

const companyDescTypoStyle = {
  overflow: "hidden", //넘치는 내용 숨기기
  display: "-webkit-box", //말줄임표
  WebkitLineClamp: 2, //최대 2줄까지만 표시
  WebkitBoxOrient: "vertical" as const, //세로 방향 줄바꿈 적용
  whiteSpace: "normal",
  wordBreak: "break-word" as const, //단어 단위로 줄바꿈
};
