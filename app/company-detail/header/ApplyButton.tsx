import { Button, styled } from "@mui/material";
import { colorChips } from "@/global/styles/colorChips";
import { useState } from "react";
import { ApplyModal } from "@/global/components/modal/ApplyModal";
import { applyCompany } from "../store/applyApi";

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
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");

  const onAplly = async () => {
    try {
      await applyCompany(companyData.id, name, role, content);
      setContent("");
      setName("");
      setRole("");
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

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
        onNameChange={(e) => setName(e.target.value)}
        onContentChange={(e) => setContent(e.target.value)}
        onRoleChange={(e) => setRole(e.target.value)}
        values={{ name, content, role }}
        onAplly={onAplly}
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
