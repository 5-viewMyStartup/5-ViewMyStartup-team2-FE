"use client";
import { COLORS } from "@/global/styles/colors";
import { Typo } from "@/global/styles/Typo";
import { Box, InputProps, OutlinedInput, SxProps } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

interface PasswordInputProps extends Omit<InputProps, "fullWidth"> {
  width?: string;
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
          ...passwordInputStyles,
          width: props.width,
          borderColor: error ? COLORS.red_error : COLORS.gray_200,
        }}
        {...props}
      />
      {error && (
        <Typo
          className="text_R_14"
          color={COLORS.red_error}
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
  border: `1px solid ${COLORS.gray_200}`,
  fontFamily: "pretendard",
  color: COLORS.white,
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "16.71px",
  textAlign: "center",
};
