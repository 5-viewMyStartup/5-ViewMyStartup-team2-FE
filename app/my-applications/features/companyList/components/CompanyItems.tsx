"use client";

//TODO: 페이지 넘어갔을 때 order +10씩 추가하기
import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";
import { ApplicationDTO } from "@/global/types/data-contracts";
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

interface CompanyItemsProps {
  order: number;
  itemData: ApplicationDTO;
}

export function CompanyItems({ order, itemData }: CompanyItemsProps) {
  const { imgSrc, handleImgErr } = useCompanyDefaultImg(itemData.image);
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0].replace(/-/g, ".");
  };
  const status =
    itemData.status === "PENDING"
      ? "지원 완료"
      : itemData.status === "ACCEPTED"
      ? "합격"
      : "불합격";
  const statusColor =
    itemData.status === "ACCEPTED"
      ? colorChips.brand_orange
      : colorChips.gray_300;

  return (
    <Stack sx={companyItemBoxStyle}>
      <Box sx={labelOrderBoxStyle}>
        <Typo
          className="text_R_14"
          content={`${order}`}
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
          customStyle={{
            textAlign: "center",
            overflow: "hidden",
          }}
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
          content={status}
          color={colorChips.white}
          customStyle={{
            textAlign: "center",
            backgroundColor: statusColor,
            padding: "4px 0",
            borderRadius: "4px",
            width: "78px",
          }}
        />
      </Box>
      <Box sx={labelDataBoxStyle}>
        <Typo
          className="text_R_14"
          content={formatDate(itemData.createdAt)}
          color={colorChips.gray_100}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
      <Box sx={labelDataBoxStyle}>
        <Typo
          className="text_R_14"
          content={`${itemData.applicantCnt.toString()} 명`}
          color={colorChips.gray_100}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
    </Stack>
  );
}
