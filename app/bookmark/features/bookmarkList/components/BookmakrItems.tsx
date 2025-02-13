"use client";

import {
  dataBoxStyle,
  categoryBoxStyle,
  descBoxStyle,
} from "@/app/bookmark/single/ListLabel";
import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";
import { BookmarkDTO } from "@/global/types/data-contracts";
import { Box, Stack } from "@mui/material";

interface BookmarkItemsProps {
  itemData: BookmarkDTO;
}

export function BookmarkItems({ itemData }: BookmarkItemsProps) {
  return (
    <Stack sx={bookmarkItemBoxStyle}>
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
