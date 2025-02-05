import { colorChips } from "@/global/styles/colorChips";
import { Box, OutlinedInput, InputProps, SxProps } from "@mui/material";
import Image from "next/image";

interface SearchProps extends Omit<InputProps, "fullWidth"> {
  width?: string;
  variation: "left" | "right";
}

export const SearchInput: React.FC<SearchProps> = (props) => {
  return (
    <OutlinedInput
      value={props.value}
      startAdornment={
        props.variation === "left" && (
          <Image
            width={24}
            height={24}
            src={"/assets/ic_search.svg"}
            alt="search Icon"
            style={{ marginRight: "8px" }}
          />
        )
      }
      endAdornment={
        props.variation === "right" && (
          <Box gap={"12px"} display="flex" alignItems={"center"}>
            <Image
              width={16}
              height={16}
              onClick={props.onClick}
              src={"/assets/ic_delete_circle_small.svg"}
              alt="search Icon"
              style={{ cursor: "pointer" }}
            />
            <Image
              width={24}
              height={24}
              src={"/assets/ic_search.svg"}
              alt="search Icon"
            />
          </Box>
        )
      }
      fullWidth
      sx={{
        ...SearchStyles,
        width: props.width,
      }}
      {...props}
    />
  );
};

const SearchStyles: SxProps = {
  width: "100%",
  height: ["40px", "48px", "48px"],
  borderRadius: "10px",
  paddingX: "12px",
  border: `1px solid ${colorChips.gray_200}`,
  backgroundColor: colorChips.black_300,
  fontFamily: "pretendard",
  color: colorChips.gray_100,
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "16.71px",
  textAlign: "center",
};
