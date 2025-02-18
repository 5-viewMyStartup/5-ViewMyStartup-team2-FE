import { Box, Button, Modal, Stack } from "@mui/material";
import { LargeBtn } from "../button/LargeBtn";
import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";
import Image from "next/image";
import { CommonInput } from "../input/CommonInput";

interface ApplyModalProps {
  open: boolean;
  handleClose: () => void;
  companyData: { image: string; name: string };
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  open,
  handleClose,
  companyData,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Stack
        color={colorChips.white}
        padding={"24px"}
        bgcolor={colorChips.black_300}
        maxWidth={496}
        width={"100%"}
        borderRadius={"10px"}
        sx={{ ...modalStyle }}
        gap={"24px"}
      >
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typo
            color="input"
            content={"기업에 지원하기"}
            className="text_B_20"
          />
          <Box
            sx={{
              cursor: "pointer",
              "&:hover": {
                opacity: 0.8,
              },
            }}
          >
            <Image
              width={32}
              height={32}
              src={"/assets/ic_delete.svg"}
              alt="close"
              onClick={handleClose}
            />
          </Box>
        </Box>
        <Box gap={"16px"} display={"flex"} flexDirection={"column"}>
          <Typo className="text_B_18" content="지원 기업 정보" />
          <Box gap={"12px"} display={"flex"}>
            <Box
              width="40px"
              height="40px"
              borderRadius="4px"
              overflow="hidden"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bgcolor={colorChips.black_400}
            >
              <Image
                width={40}
                height={40}
                src={
                  companyData
                    ? companyData.image
                    : "/assets/default-company-img.svg"
                }
                alt="logo"
                style={{ objectFit: "cover" }}
              />
            </Box>
            <Box display={"flex"} gap={"8px"}>
              <Typo className="text_M_16" content={companyData.name} />
              {/* <Typo
                className="text_R_12"
                content={companyData.category[0].category}
              /> */}
            </Box>
          </Box>
        </Box>
        <Box gap={"16px"} display={"flex"} flexDirection={"column"}>
          <Typo className="text_B_18" content="지원자 이름" />
          <CommonInput placeholder="지원자 이름을 입력해 주세요" />
        </Box>
        <Box gap={"16px"} display={"flex"} flexDirection={"column"}>
          <Typo className="text_B_18" content="지원자 직무" />
          <CommonInput placeholder="지원 직무를 입력해 주세요" />
        </Box>
        <Box gap={"16px"} display={"flex"} flexDirection={"column"}>
          <Typo className="text_B_18" content="지원 코멘트" />
          <CommonInput
            multiline
            minRows={2}
            maxRows={3}
            placeholder="자신에 대한 코멘트를 입력해 주세요"
            height="100px"
          />
        </Box>
        <Stack direction={"row"} justifyContent={"space-around"}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{ maxWidth: "194px", width: "100%", borderRadius: "50px" }}
          >
            취소
          </Button>
          <LargeBtn isDisabled={false} content="지원하기" />
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
