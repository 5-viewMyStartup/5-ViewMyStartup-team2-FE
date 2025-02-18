import { Box, styled } from "@mui/material";
import { colorChips } from "@/global/styles/colorChips";
import { CommonInput } from "./CommonInput";
import { LargeBtn } from "../button/LargeBtn";

interface CommentInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  placeholder?: string;
}

export const CommentInput = ({
  value,
  onChange,
  onSubmit,
  placeholder = "댓글을 입력해 주세요.",
}: CommentInputProps) => {
  return (
    <Container>
      <StyledCommonInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        multiline
        minRows={2}
        maxRows={2}
        height="70px"
      />
      <StyledLargeBtn
        content="등록"
        isDisabled={false}
        onClickBtn={onSubmit}
        width="120px"
        height="48px"
      />
    </Container>
  );
};

const Container = styled(Box)({
  display: "flex",
  gap: "12px",
  padding: "24px",
  backgroundColor: colorChips.black_400,
  borderRadius: "12px",
  alignItems: "center",
});

const StyledCommonInput = styled(CommonInput)({
  flex: 1,
  "& .MuiOutlinedInput-root": {
    height: "auto",
    textAlign: "left",
    backgroundColor: "transparent",
    "& fieldset": {
      borderColor: colorChips.gray_400,
    },
    "&:hover fieldset": {
      borderColor: colorChips.gray_300,
    },
    "&.Mui-focused fieldset": {
      borderColor: colorChips.brand_orange,
    },
  },
  "& .MuiOutlinedInput-input": {
    textAlign: "left",
    padding: "12px 16px",
  },
});

const StyledLargeBtn = styled(LargeBtn)({
  "& .MuiButton-root": {
    borderRadius: "8px",
    backgroundColor: colorChips.brand_orange,
    "&:hover": {
      backgroundColor: "#FF3D00",
    },
  },
});
