import { Box, Button, Modal, Stack } from "@mui/material";
import { colorChips } from "../styles/colorChips";
import { Typo } from "../styles/Typo";
import { LargeBtn } from "./button/LargeBtn";
import Image from "next/image";

interface CustomPopupProps {
  open: boolean;
  handleClose: () => void;
  description: string;
}

export const CustomPopup: React.FC<CustomPopupProps> = ({
  open,
  handleClose,
  description,
}) => {
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
        textAlign={"center"}
      >
        <Box display={"flex"} justifyContent={"end"}>
          <Image
            width={32}
            height={32}
            src={"/assets/ic_delete.svg"}
            alt="close"
            onClick={handleClose}
          />
        </Box>
        <Typo
          color={colorChips.white}
          className="text_R_16"
          content={description}
        />
        <Stack direction={"row"} justifyContent={"space-around"}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{ maxWidth: "194px", width: "100%", borderRadius: "50px" }}
          >
            취소
          </Button>
          <LargeBtn isDisabled={false} content="확인" />
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
