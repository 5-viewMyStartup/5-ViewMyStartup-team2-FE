import { Typo } from "@/global/styles/Typo";
import { Button } from "@mui/material";
import Image from "next/image";

interface OutlinedBtnProps {
  width?: string;
  height?: string;
  checked?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

export const OutlinedBtn: React.FC<OutlinedBtnProps> = ({
  width = "104px",
  height = "48px",
  checked = false,
  selected = false,
  onClick,
  ...props
}) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      startIcon={
        selected ? (
          <Image
            width={24}
            height={24}
            src="/assets/ic_check.svg"
            alt="체크 아이콘"
          />
        ) : undefined
      }
      color={selected ? "button" : checked ? "button_select" : "primary"}
      sx={{
        width,
        height,
        borderRadius: "10px",
        px: "11px",
      }}
      {...props}
    >
      <Typo className="text_M_16" whiteSpace={"nowrap"}>
        {selected ? "선택완료" : checked ? "선택해제" : "선택하기"}
      </Typo>
    </Button>
  );
};
