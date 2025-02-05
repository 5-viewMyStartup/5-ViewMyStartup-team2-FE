"use client";

import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";
import { Box, IconButton, Modal, TextField, styled } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

interface InvestmentModalProps {
  open: boolean;
  onClose: () => void;
  companyName: string;
  companyCategory: string;
}

export const InvestmentModal = ({
  open,
  onClose,
  companyName,
  companyCategory,
}: InvestmentModalProps) => {
  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState({
    investorName: "",
    amount: "",
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

  // 비밀번호 표시/숨김 상태 관리
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  // 비밀번호 표시/숨김 토글 핸들러
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleTogglePasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  // 폼 유효성 검사 함수
  const validateForm = () => {
    const newErrors = {
      comment: "",
      password: "",
    };

    // 코멘트 길이 검사 (30자 제한)
    if (formData.comment.length > 30) {
      newErrors.comment = "코멘트는 30자 이내로 작성해주세요";
    }

    // 비밀번호 일치 여부 검사
    if (formData.password !== formData.passwordConfirm) {
      newErrors.password = "비밀번호가 일치하지 않습니다";
    }

    setErrors(newErrors);
    return !newErrors.comment && !newErrors.password;
  };

  // 폼 초기화
  const resetForm = () => {
    setFormData({
      investorName: "",
      amount: "",
      comment: "",
      password: "",
      passwordConfirm: "",
    });
    setErrors({
      comment: "",
      password: "",
    });
  };

  // 투자 요청 처리
  const handleInvestment = async () => {
    try {
      setIsLoading(true);
      // TODO: API 연동
      // const response = await fetch('/api/investments', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     investorName: formData.investorName,
      //     amount: formData.amount,
      //     comment: formData.comment,
      //     password: formData.password,
      //   }),
      // });

      // API 연동 전 임시 처리
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setShowSuccessModal(true);
      resetForm();
    } catch (error) {
      console.error("Investment failed:", error);
      // TODO: 에러 처리
    } finally {
      setIsLoading(false);
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = () => {
    if (validateForm()) {
      handleInvestment();
    }
  };

  // 성공 모달 닫기 핸들러
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    onClose();
  };

  // 코멘트 입력 핸들러 - 실시간 유효성 검사
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

  // 비밀번호 입력 핸들러 - 실시간 일치 여부 검사
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, password: value });
    if (value !== formData.passwordConfirm) {
      setErrors((prev) => ({
        ...prev,
        password: "비밀번호가 일치하지 않습니다",
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  // 비밀번호 확인 입력 핸들러 - 실시간 일치 여부 검사
  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setFormData({ ...formData, passwordConfirm: value });
    if (value !== formData.password) {
      setErrors((prev) => ({
        ...prev,
        password: "비밀번호가 일치하지 않습니다",
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  // 폼 전체 유효성 검사 - 버튼 활성화 여부 결정
  const isFormValid = () => {
    return (
      formData.investorName &&
      formData.amount &&
      formData.comment &&
      formData.password &&
      formData.passwordConfirm &&
      !errors.comment &&
      !errors.password
    );
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="investment-modal-title"
      >
        <ModalContainer>
          <ModalHeader>
            <Typo className="text_B_20" color={colorChips.white}>
              기업에 투자하기
            </Typo>
            <IconButton onClick={onClose} sx={{ padding: 0 }}>
              <Image
                src="/assets/ic_delete.svg"
                alt="close"
                width={24}
                height={24}
              />
            </IconButton>
          </ModalHeader>

          <Section>
            <Typo className="text_SB_16" color={colorChips.white}>
              투자 기업 정보
            </Typo>
            <CompanyInfo>
              <CompanyLogo>
                <Typo className="text_B_16" color={colorChips.white}>
                  {companyName.charAt(0)}
                </Typo>
              </CompanyLogo>
              <Box>
                <Typo className="text_SB_16" color={colorChips.white}>
                  {companyName}
                </Typo>
                <Typo className="text_R_14" color={colorChips.gray_200}>
                  {companyCategory}
                </Typo>
              </Box>
            </CompanyInfo>
          </Section>

          <Section>
            <Typo
              className="text_SB_16"
              color={colorChips.white}
              sx={{ mb: 1 }}
            >
              투자자 이름
            </Typo>
            <StyledTextField
              placeholder="투자자 이름을 입력해 주세요"
              value={formData.investorName}
              onChange={(e) =>
                setFormData({ ...formData, investorName: e.target.value })
              }
            />
          </Section>

          <Section>
            <Typo
              className="text_SB_16"
              color={colorChips.white}
              sx={{ mb: 1 }}
            >
              투자 금액
            </Typo>
            <StyledTextField
              placeholder="투자 금액을 입력해 주세요"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
            />
          </Section>

          <Section>
            <Typo
              className="text_SB_16"
              color={colorChips.white}
              sx={{ mb: 1 }}
            >
              투자 코멘트
            </Typo>
            <StyledTextField
              placeholder="투자에 대한 코멘트를 입력해 주세요 (30자 이내)"
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
          </Section>

          <Section>
            <Typo
              className="text_SB_16"
              color={colorChips.white}
              sx={{ mb: 1 }}
            >
              비밀번호
            </Typo>
            <PasswordFieldWrapper>
              <StyledTextField
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요"
                value={formData.password}
                onChange={handlePasswordChange}
                error={!!errors.password}
              />
              <VisibilityButton onClick={handleTogglePassword}>
                <Image
                  src={
                    showPassword
                      ? "/assets/btn_visibility_on_24px.svg"
                      : "/assets/btn_visibility_off_24px.svg"
                  }
                  alt={showPassword ? "hide password" : "show password"}
                  width={24}
                  height={24}
                />
              </VisibilityButton>
            </PasswordFieldWrapper>
          </Section>

          <Section>
            <Typo
              className="text_SB_16"
              color={colorChips.white}
              sx={{ mb: 1 }}
            >
              비밀번호 확인
            </Typo>
            <PasswordFieldWrapper>
              <StyledTextField
                type={showPasswordConfirm ? "text" : "password"}
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                value={formData.passwordConfirm}
                onChange={handlePasswordConfirmChange}
                error={!!errors.password}
                helperText={errors.password}
                FormHelperTextProps={{
                  sx: { color: colorChips.brand_orange },
                }}
              />
              <VisibilityButton onClick={handleTogglePasswordConfirm}>
                <Image
                  src={
                    showPasswordConfirm
                      ? "/assets/btn_visibility_on_24px.svg"
                      : "/assets/btn_visibility_off_24px.svg"
                  }
                  alt={showPasswordConfirm ? "hide password" : "show password"}
                  width={24}
                  height={24}
                />
              </VisibilityButton>
            </PasswordFieldWrapper>
          </Section>

          <ButtonContainer>
            <CancelButton onClick={onClose}>
              <Typo className="text_R_16" color={colorChips.white}>
                취소
              </Typo>
            </CancelButton>
            <SubmitButton
              onClick={handleSubmit}
              sx={{
                opacity: !isFormValid() || isLoading ? 0.5 : 1,
                cursor: !isFormValid() || isLoading ? "not-allowed" : "pointer",
                pointerEvents: !isFormValid() || isLoading ? "none" : "auto",
              }}
            >
              <Typo className="text_R_16" color={colorChips.white}>
                {isLoading ? "처리중..." : "투자하기"}
              </Typo>
            </SubmitButton>
          </ButtonContainer>
        </ModalContainer>
      </Modal>

      {/* 성공 모달 */}
      <Modal
        open={showSuccessModal}
        onClose={handleSuccessModalClose}
        aria-labelledby="success-modal-title"
      >
        <SuccessModalContainer>
          <SuccessModalContent>
            <Typo className="text_B_20" color={colorChips.white} sx={{ mb: 2 }}>
              투자가 완료되었어요!
            </Typo>
            <SuccessButton onClick={handleSuccessModalClose}>
              <Typo className="text_R_16" color={colorChips.white}>
                확인
              </Typo>
            </SuccessButton>
          </SuccessModalContent>
        </SuccessModalContainer>
      </Modal>
    </>
  );
};

/* ===== 스타일 컴포넌트 ===== */

// 모달 레이아웃 관련 스타일
const ModalContainer = styled(Box)(({ theme }) => ({
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
  [theme.breakpoints.down("sm")]: {
    width: "calc(100% - 32px)",
    padding: "16px",
  },
}));

const ModalHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
  [theme.breakpoints.down("sm")]: {
    marginBottom: "16px",
  },
}));

const Section = styled(Box)(({ theme }) => ({
  marginBottom: "24px",
  [theme.breakpoints.down("sm")]: {
    marginBottom: "16px",
  },
}));

// 기업 정보 관련 스타일
const CompanyInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginTop: "12px",
  [theme.breakpoints.down("sm")]: {
    marginTop: "8px",
  },
}));

const CompanyLogo = styled(Box)(({ theme }) => ({
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  backgroundColor: "#6B34EB",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    width: "40px",
    height: "40px",
  },
}));

// 입력 필드 관련 스타일
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
    "& .MuiOutlinedInput-input": {
      paddingRight: "48px", // 아이콘을 위한 여백
    },
  },
  "& .MuiOutlinedInput-input": {
    "&::placeholder": {
      color: colorChips.gray_200,
      opacity: 1,
    },
  },
});

// 비밀번호 입력 필드 래퍼 스타일
const PasswordFieldWrapper = styled(Box)({
  position: "relative",
  width: "100%",
  "& .MuiTextField-root": {
    width: "100%",
  },
  "& .MuiFormHelperText-root": {
    position: "absolute",
    bottom: "-20px",
  },
});

// 비밀번호 표시/숨김 버튼 스타일
const VisibilityButton = styled(IconButton)({
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  padding: 0,
  zIndex: 1,
  "&:hover": {
    backgroundColor: "transparent",
  },
});

// 버튼 관련 스타일
const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "12px",
  marginTop: "32px",
  [theme.breakpoints.down("sm")]: {
    marginTop: "24px",
    gap: "8px",
  },
}));

const Button = styled(Box)({
  flex: 1,
  padding: "12px 0",
  borderRadius: "50px",
  cursor: "pointer",
  textAlign: "center",
});

const CancelButton = styled(Button)({
  backgroundColor: colorChips.black_200,
  "&:hover": {
    backgroundColor: colorChips.black_100,
  },
});

const SubmitButton = styled(Button)({
  backgroundColor: colorChips.brand_orange,
  "&:hover": {
    backgroundColor: "#FF3D00",
  },
});

// 성공 모달 스타일
const SuccessModalContainer = styled(Box)({
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

const SuccessModalContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
});

const SuccessButton = styled(Box)({
  width: "100%",
  padding: "12px 0",
  backgroundColor: colorChips.brand_orange,
  borderRadius: "50px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#FF3D00",
  },
});
