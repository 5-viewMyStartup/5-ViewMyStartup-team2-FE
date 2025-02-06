"use client";

import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";
import { CompanyDTO } from "@/global/types/data-contracts";
import { Box, Stack } from "@mui/material";
import { formatRevenue } from "@/global/utils/formatRevenue";
import { useCompanyDefaultImg } from "@/global/hooks/useCompanyImg";
import Image from "next/image";
import {
  companyDescTypoStyle,
  companyItemBoxStyle,
  itemNameBoxStyle,
  labelDataBoxStyle,
  labelDescBoxStyle,
  labelOrderBoxStyle,
} from "@/global/styles/companyListStyles";

interface CompanyItemsProps {
  ranking: number;
  itemData: CompanyDTO;
}

export function CompanyItems({ ranking, itemData }: CompanyItemsProps) {
  const { imgSrc, handleImgErr } = useCompanyDefaultImg(itemData.image);

  return (
    <Stack sx={companyItemBoxStyle}>
      <Box sx={labelOrderBoxStyle}>
        <Typo
          className="text_R_14"
          content={`${ranking}위`}
          color={colorChips.gray_100}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
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
      <Box
        sx={{
          ...labelDescBoxStyle,
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
      <Box sx={labelDataBoxStyle}>
        <Typo
          className="text_R_14"
          content={itemData.category[0].category}
          color={colorChips.gray_100}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
      <Box sx={labelDataBoxStyle}>
        <Typo
          className="text_R_14"
          content={formatRevenue(itemData.salesRevenue)}
          color={colorChips.gray_100}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
      <Box sx={labelDataBoxStyle}>
        <Typo
          className="text_R_14"
          content={`${itemData.employeeCnt}명`}
          color={colorChips.gray_100}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
      <Box sx={labelDataBoxStyle}>
        <Typo
          className="text_R_14"
          content={`${itemData.applicantCnt}명`}
          color={colorChips.gray_100}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
    </Stack>
  );
}
