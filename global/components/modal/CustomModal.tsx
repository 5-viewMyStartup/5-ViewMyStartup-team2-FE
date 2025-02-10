"use client";
import { Typo } from "@/global/styles/Typo";
import { Box, Modal, Stack } from "@mui/material";
import Image from "next/image";
import CustomInput from "../input";
import { useState } from "react";
import { CustomListItem } from "../CustomListItem";
import { colorChips } from "@/global/styles/colorChips";

interface CustomModalProps {
  open: boolean;
  handleClose: () => void;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  open,
  handleClose,
}) => {
  const [searchText, setSearchText] = useState("");
  const [selectCompany, setSelectCompany] = useState<
    {
      image: string;
      name: string;
      category: string;
    }[]
  >([]);
  const testData = [
    { image: "/assets/logo.svg", name: "test1", category: "edu" },
    { image: "/assets/logo.svg", name: "test2", category: "edu" },
    { image: "/assets/logo.svg", name: "test3", category: "edu" },
    { image: "/assets/logo.svg", name: "test4", category: "edu" },
  ];

  const testClick = (data: {
    image: string;
    name: string;
    category: string;
  }) => {
    setSelectCompany((prev) => {
      const isExist = prev.some((company) => company.name === data.name);
      if (isExist) {
        return prev.filter((company) => company.name !== data.name); // 삭제
      } else {
        return [...prev, data]; // 추가
      }
    });
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Stack
        padding={"24px"}
        bgcolor={colorChips.black_300}
        maxWidth={496}
        width={"100%"}
        gap={"24px"}
        borderRadius={"10px"}
        sx={{ ...modalStyle }}
      >
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typo
            color="input"
            content="나의 기업 선택하기"
            className="text_B_20"
          />
          <Image
            width={32}
            height={32}
            src={"/assets/ic_delete.svg"}
            alt="close"
            onClick={handleClose}
          />
        </Box>
        <CustomInput.SearchInput
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          variation={searchText !== "" ? "right" : "left"}
          onClick={() => {
            setSearchText("");
          }}
        />
        <Stack gap={"12px"}>
          <Typo
            color="input"
            className="text_B_18"
            content={`최근 지원한 기업 (${2})`}
          />
          {testData.map((d, index) => (
            <CustomListItem
              checked={selectCompany.some((company) => company.name === d.name)}
              key={index}
              listData={d}
              handleClick={() => testClick(d)}
            />
          ))}
        </Stack>
        <Stack gap={"12px"} pt={"16px"}>
          <Typo
            color="input"
            className="text_B_18"
            content={`검색결과 (${2})`}
          />
          {testData.map((d, index) => (
            <CustomListItem
              checked={selectCompany.some((company) => company.name === d.name)}
              key={index}
              listData={d}
              handleClick={() => testClick(d)}
            />
          ))}
        </Stack>
      </Stack>
    </Modal>
  );
};
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};
