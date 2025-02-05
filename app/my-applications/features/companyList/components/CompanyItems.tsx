"use client";

import {
  dataBoxStyle,
  descBoxStyle,
  orderBoxStyle,
} from "@/app/my-applications/single/ListLabel";
import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";
import { ApplicationDTO } from "@/global/types/data-contracts";
import { Box, Stack } from "@mui/material";
import { useCompanyImg } from "@/global/hooks/useCompanyImg";
import { CompanyImg } from "@/global/components/CompanyImg";

interface CompanyItemsProps {
  order: number;
  itemData: ApplicationDTO;
}

export function CompanyItems({ order, itemData }: CompanyItemsProps) {
  const { imgSrc } = useCompanyImg(itemData.image);
  const formatDate = (date: Date): string => {
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
      <Box sx={orderBoxStyle}>
        <Typo
          className="text_R_14"
          content={`${order + 1}`}
          color={colorChips.gray_100}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
      <Box sx={imgNameBoxStyle}>
        <CompanyImg src={imgSrc} width={32} height={32} />
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
          content={itemData.category[0].category}
          color={colorChips.gray_100}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
      <Box sx={dataBoxStyle}>
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
      <Box sx={dataBoxStyle}>
        <Typo
          className="text_R_14"
          content={formatDate(itemData.createdAt)}
          color={colorChips.gray_100}
          customStyle={{ textAlign: "center" }}
        />
      </Box>
      <Box sx={dataBoxStyle}>
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
