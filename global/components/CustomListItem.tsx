"use client";
import { Box, Stack } from "@mui/material";
import Image from "next/image";
import { colorChips } from "../styles/colorChips";
import { Typo } from "../styles/Typo";
import { useState } from "react";
import { OutlinedBtn } from "./button/OutlineBtn";

interface CustomListItemProps {
  listData: { image: string; name: string; cartegory: string };
}
export const CustomListItem: React.FC<CustomListItemProps> = ({ listData }) => {
  const [isSelect, setIsSelect] = useState<boolean>(false);
  return (
    <Stack display={"flex"} direction={"row"} justifyContent={"space-between"}>
      <Stack
        display={"flex"}
        direction={"row"}
        alignItems={"center"}
        gap={"16px"}
      >
        <Image
          width={48}
          height={48}
          src={listData.image}
          alt="기업로고"
          style={{
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <Box display={"flex"} alignItems={"center"} gap={"8px"}>
          <Typo
            color={colorChips.white}
            className="text_M_16"
            content={listData.name}
          />

          <Typo
            color={colorChips.gray_200}
            className="text_R_14"
            content={listData.cartegory}
          />
        </Box>
      </Stack>

      <OutlinedBtn
        variant="outlined"
        check={true}
        onClick={() => setIsSelect(!isSelect)}
      >
        선택하기
      </OutlinedBtn>
    </Stack>
  );
};
