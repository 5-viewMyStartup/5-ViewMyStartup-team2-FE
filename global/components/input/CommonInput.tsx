import { InputProps, OutlinedInput, SxProps } from "@mui/material";
import { COLORS } from "../../styles/colors";

interface CommonInputProps extends Omit<InputProps, "fullWidth"> {
  width?: string;
}

export const CommonInput: React.FC<CommonInputProps> = (props) => {
  return (
    <OutlinedInput
      fullWidth
      sx={{
        ...CommonInputStyles,
        width: props.width,
      }}
      {...props}
    />
  );
};

const CommonInputStyles: SxProps = {
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
