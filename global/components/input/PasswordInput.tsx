"use client";
import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";
import { Box, InputProps, OutlinedInput, SxProps } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

interface PasswordInputProps extends Omit<InputProps, "fullWidth"> {
  width?: string;
  height?: string;
  error?: boolean;
  errorMsg?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  error,
  errorMsg,
  ...props
}) => {
  const [isVisibled, setIsVisibled] = useState(false);
  return (
    <Box width={"100%"}>
      <OutlinedInput
        color="input"
        type={isVisibled ? "text" : "password"}
        fullWidth
        endAdornment={
          <Image
            width={24}
            height={24}
            onClick={() => setIsVisibled(!isVisibled)}
            src={
              isVisibled
                ? "/assets/btn_visibility_on_24px.svg"
                : "/assets/btn_visibility_off_24px.svg"
            }
            alt="password visibility"
            style={{ cursor: "pointer" }}
          />
        }
        sx={{
          width: props.width,
          height: props.height,
          borderColor: error ? colorChips.red_error : colorChips.gray_200,
          ...passwordInputStyles,
        }}
        {...props}
      />
      {error && (
        <Typo
          className="text_R_14"
          color={colorChips.red_error}
          content={`*${errorMsg ? errorMsg : "error"}`}
        />
      )}
    </Box>
  );
};

const passwordInputStyles: SxProps = {
  width: "100%",
  height: ["40px", "48px", "48px"],
  borderRadius: "10px",
  paddingX: "20px",
  border: `1px solid ${colorChips.gray_200}`,
  fontFamily: "pretendard",
  color: colorChips.white,
  fontSize: ["14px", "14px", "13px"],
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "16.71px",
  textAlign: "center",
};
