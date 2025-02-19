"use client";
import { Typo } from "@/global/styles/Typo";
import { Box, Link, Modal, Stack, SxProps } from "@mui/material";
import CustomInput from "../input";
import { Dispatch, SetStateAction, useState } from "react";
import { colorChips } from "@/global/styles/colorChips";
import { LargeBtn } from "../button/LargeBtn";

interface LoginModalProps {
  title: string;
  open: boolean;
  id: { id: string; setId: Dispatch<SetStateAction<string>> };
  pw: { pw: string; setPw: Dispatch<SetStateAction<string>> };
  handleClose: () => void;
  hadleLogin: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  title,
  open,
  id,
  pw,
  handleClose,
  hadleLogin,
}) => {
  return (
    <Modal open={open}>
      <Stack sx={{ ...modalStyle }}>
        {title}
        <Box gap={"8px"} sx={{ ...boxStyle }}>
          <Typo p={1} className="text_B_16" content="Email" />
          <CustomInput.CommonInput
            value={id.id}
            type="email"
            onChange={(e) => id.setId(e.target.value)}
          />
        </Box>
        <Box sx={{ ...boxStyle }}>
          <Typo p={1} className="text_B_16" content="PW" />
          <CustomInput.PasswordInput
            onChange={(e) => pw.setPw(e.target.value)}
          />
        </Box>
        <Box display={"flex"} justifyContent={"space-around"}>
          <LargeBtn
            onClickBtn={handleClose}
            isDisabled={false}
            content="취소"
            style="outlined"
          />
          <LargeBtn
            isDisabled={false}
            content="로그인"
            onClickBtn={hadleLogin}
          />
        </Box>
      </Stack>
    </Modal>
  );
};
const modalStyle: SxProps = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "24px",
  bgcolor: colorChips.black_300,
  maxWidth: 496,
  width: "100%",
  gap: "12px",
  borderRadius: "10px",
  color: colorChips.white,
  textAlign: "center",
};
const boxStyle: SxProps = {
  height: "100%",
  textAlign: "start",
  gap: "5px",
};
