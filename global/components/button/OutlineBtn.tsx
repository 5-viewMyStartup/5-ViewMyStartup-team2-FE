import { Typo } from "@/global/styles/Typo";
import { Button } from "@mui/material";
import Image from "next/image";

interface OutlinedBtnProps {
  checked: boolean;
  selected: boolean;
  width?: string;
  height?: string;
}

export const OutlinedBtn: React.FC<OutlinedBtnProps> = ({
  checked,
  selected,
  ...props
}) => {
  return (
    <>
      {selected ? (
        <Button
          variant="outlined"
          startIcon={
            <Image
              width={24}
              height={24}
              src="/assets/ic_check.svg"
              alt="check Icon"
            />
          }
          {...props}
          color="buttons"
          sx={{
            width: props.width ? props.width : "104px",
            height: props.height ? props.height : "48px",
            borderRadius: "10px",
          }}
        >
          <Typo className="text_M_16">선택완료</Typo>
        </Button>
      ) : (
        <Button
          variant="outlined"
          {...props}
          sx={{
            width: props.width ? props.width : "104px",
            height: props.height ? props.height : "48px",
            borderRadius: "10px",
          }}
          color={checked ? "buttons_select" : "primary"}
        >
          <Typo className="text_M_16">
            {checked ? "선택 해제" : "선택하기"}
          </Typo>
        </Button>
      )}
    </>
  );
};
