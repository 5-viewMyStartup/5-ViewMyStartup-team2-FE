"use client";

import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";
import { Modal, IconButton, Box, TextField, styled } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { LargeBtn } from "@/global/components/button/LargeBtn";

interface ApplicationModalProps {
  open: boolean;
  onClose: () => void;
  companyName: string;
  companyCategory: string;
}

export const ApplicationModal = ({
  open,
  onClose,
  companyName,
  companyCategory,
}: ApplicationModalProps) => {
  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState({
    applicantName: "",
    experience: "",
    comment: "",
    password: "",
    passwordConfirm: "",
  });

  // 유효성 검사 에러 상태 관리
  const [errors, setErrors] = useState({
    comment: "",
    password: "",
  });

  // 모달 상태 관리
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 폼 유효성 검사
  const validateForm = () => {
    const newErrors = {
      comment: "",
      password: "",
    };

    if (formData.comment.length > 30) {
      newErrors.comment = "코멘트는 30자 이내로 작성해주세요";
    }

    if (formData.password !== formData.passwordConfirm) {
      newErrors.password = "비밀번호가 일치하지 않습니다";
    }

    setErrors(newErrors);
    return !newErrors.comment && !newErrors.password;
  };

  // 지원서 제출 처리
  const handleApplication = async () => {
    try {
      setIsLoading(true);
      // TODO: API 연동
      // const response = await fetch('/api/applications', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     applicantName: formData.applicantName,
      //     experience: formData.experience,
      //     comment: formData.comment,
      //     password: formData.password,
      //   }),
      // });

      // API 연동 전 임시 처리
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setShowSuccessModal(true);
      resetForm();
    } catch (error) {
      console.error("Application failed:", error);
      // TODO: 에러 처리
    } finally {
      setIsLoading(false);
    }
  };

  // 폼 초기화
  const resetForm = () => {
    setFormData({
      applicantName: "",
      experience: "",
      comment: "",
      password: "",
      passwordConfirm: "",
    });
    setErrors({
      comment: "",
      password: "",
    });
  };

  // 폼 전체 유효성 검사 - 버튼 활성화 여부 결정
  const isFormValid = () => {
    return (
      formData.applicantName &&
      formData.experience &&
      formData.comment &&
      formData.password &&
      formData.passwordConfirm &&
      !errors.comment &&
      !errors.password
    );
  };

  // 코멘트 입력 핸들러
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, comment: value });
    if (value.length > 30) {
      setErrors((prev) => ({
        ...prev,
        comment: "코멘트는 30자 이내로 작성해주세요",
      }));
    } else {
      setErrors((prev) => ({ ...prev, comment: "" }));
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = () => {
    if (validateForm()) {
      handleApplication();
    }
  };

  // 성공 모달 닫기 핸들러
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    onClose();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="application-modal-title"
      >
        <StyledModalContainer>
          <StyledModalHeader>
            <Typo className="text_B_20" color={colorChips.white}>
              기업에 지원하기
            </Typo>
            <IconButton onClick={onClose} sx={{ padding: 0 }}>
              <Image
                src="/assets/ic_delete.svg"
                alt="close"
                width={24}
                height={24}
              />
            </IconButton>
          </StyledModalHeader>

          <StyledSection>
            <Typo className="text_SB_16" color={colorChips.white}>
              지원 기업 정보
            </Typo>
            <StyledCompanyInfo>
              <StyledCompanyLogo>
                <Typo className="text_B_16" color={colorChips.white}>
                  {companyName.charAt(0)}
                </Typo>
              </StyledCompanyLogo>
              <Box>
                <Typo className="text_SB_16" color={colorChips.white}>
                  {companyName}
                </Typo>
                <Typo className="text_R_14" color={colorChips.gray_200}>
                  {companyCategory}
                </Typo>
              </Box>
            </StyledCompanyInfo>
          </StyledSection>

          <StyledSection>
            <Typo
              className="text_SB_16"
              color={colorChips.white}
              sx={{ mb: 1 }}
            >
              지원자 이름
            </Typo>
            <StyledTextField
              placeholder="지원자 이름을 입력해 주세요"
              value={formData.applicantName}
              onChange={(e) =>
                setFormData({ ...formData, applicantName: e.target.value })
              }
            />
          </StyledSection>

          <StyledSection>
            <Typo
              className="text_SB_16"
              color={colorChips.white}
              sx={{ mb: 1 }}
            >
              경력 사항
            </Typo>
            <StyledTextField
              placeholder="경력 사항을 입력해 주세요"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
            />
          </StyledSection>

          <StyledSection>
            <Typo
              className="text_SB_16"
              color={colorChips.white}
              sx={{ mb: 1 }}
            >
              지원 동기
            </Typo>
            <StyledTextField
              placeholder="지원 동기를 입력해 주세요 (30자 이내)"
              multiline
              rows={4}
              value={formData.comment}
              onChange={handleCommentChange}
              error={!!errors.comment}
              helperText={errors.comment}
              FormHelperTextProps={{
                sx: { color: colorChips.brand_orange },
              }}
            />
          </StyledSection>

          <StyledButtonContainer>
            <StyledCancelButton onClick={onClose}>
              <Typo className="text_R_16" color={colorChips.white}>
                취소
              </Typo>
            </StyledCancelButton>
            <LargeBtn
              content={isLoading ? "처리중..." : "지원하기"}
              onClickBtn={handleSubmit}
              isDisabled={!isFormValid() || isLoading}
            />
          </StyledButtonContainer>
        </StyledModalContainer>
      </Modal>

      {/* 성공 모달 */}
      <Modal
        open={showSuccessModal}
        onClose={handleSuccessModalClose}
        aria-labelledby="success-modal-title"
        sx={{
          zIndex: 1400,
        }}
      >
        <StyledSuccessModalContainer>
          <StyledSuccessModalContent>
            <Typo className="text_B_20" color={colorChips.white} sx={{ mb: 2 }}>
              지원이 완료되었어요!
            </Typo>
            <StyledSubmitButton onClick={handleSuccessModalClose}>
              <Typo className="text_R_16" color={colorChips.white}>
                확인
              </Typo>
            </StyledSubmitButton>
          </StyledSuccessModalContent>
        </StyledSuccessModalContainer>
      </Modal>
    </>
  );
};

// 스타일 컴포넌트
const StyledModalContainer = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "calc(100% - 48px)",
  maxWidth: "480px",
  backgroundColor: colorChips.black_300,
  borderRadius: "16px",
  padding: "24px",
  outline: "none",
  maxHeight: "90vh",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: colorChips.black_400,
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: colorChips.gray_400,
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: colorChips.gray_300,
    },
  },
});

const StyledModalHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
});

const StyledSection = styled(Box)({
  marginBottom: "24px",
});

const StyledCompanyInfo = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginTop: "12px",
});

const StyledCompanyLogo = styled(Box)({
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  backgroundColor: "#6B34EB",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledTextField = styled(TextField)({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    color: colorChips.white,
    backgroundColor: colorChips.black_400,
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
    "&::placeholder": {
      color: colorChips.gray_200,
      opacity: 1,
    },
  },
});

const StyledButtonContainer = styled(Box)({
  display: "flex",
  gap: "12px",
  marginTop: "32px",
});

const StyledSuccessModalContainer = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "calc(100% - 48px)",
  maxWidth: "320px",
  backgroundColor: colorChips.black_300,
  borderRadius: "16px",
  padding: "24px",
  outline: "none",
});

const StyledSuccessModalContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
});

const StyledCancelButton = styled(Box)({
  flex: 1,
  padding: "12px 0",
  borderRadius: "50px",
  cursor: "pointer",
  textAlign: "center",
  backgroundColor: colorChips.black_200,
  "&:hover": {
    backgroundColor: colorChips.black_100,
  },
});

const StyledSubmitButton = styled(Box)({
  width: "100%",
  padding: "12px 0",
  backgroundColor: colorChips.brand_orange,
  borderRadius: "50px",
  cursor: "pointer",
  textAlign: "center",
  "&:hover": {
    backgroundColor: "#FF3D00",
  },
});
