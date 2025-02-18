import { Button, styled } from "@mui/material";
import { colorChips } from "@/global/styles/colorChips";
import { useState } from "react";
import { ApplyModal } from "@/global/components/modal/ApplyModal";

interface ApplyButtonProps {
  companyData: {
    image: string;
    name: string;
    category: string;
    id: string;
    idx: number;
  };
}

const ApplyButton = ({ companyData }: ApplyButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <StyledApplyButton onClick={handleModalOpen}>지원하기</StyledApplyButton>
      <ApplyModal
        open={isModalOpen}
        handleClose={handleModalClose}
        companyData={companyData}
        // onSubmit={() => {}}
        // isSuccessModalOpen={false}
        // handleSuccessModalClose={() => {}}
        // isLoading={false}
        // errorMessage={null}
      />
    </>
  );
};

const StyledApplyButton = styled(Button)({
  backgroundColor: colorChips.brand_orange,
  color: colorChips.white,
  padding: "12px 24px",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: colorChips.brand_orange,
    opacity: 0.9,
  },
});

export default ApplyButton;
