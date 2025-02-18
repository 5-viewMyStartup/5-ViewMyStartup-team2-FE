"use client";

import Stats from "./Stats";
import { Box, styled } from "@mui/material";
import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";
import { useState } from "react";
import Bookmark from "./Bookmark";
import ApplyButton from "./ApplyButton";

// 타입 정의
interface HeaderProps {
  name: string;
  logo: string;
  stats: {
    monthlyRevenue: number;
    personnel: number;
    applicants: number;
  };
  isBookmarked: boolean;
  id: string;
  idx: number;
}

// 컴포넌트 로직
const Header = ({ name, logo, stats, id, idx, isBookmarked }: HeaderProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
  const companyData = {
    image: logo,
    name,
    id,
    idx,
  };

  return (
    <HeaderCard>
      <TopContainer>
        <LogoContainer>
          <Logo>
            {!imageError ? (
              <StyledImage
                src={logo ? logo : "/assets/default-company-img.svg"}
                alt={name}
                onError={handleImageError}
              />
            ) : (
              <FallbackLogo>
                <Typo className="text_B_16" color={colorChips.white}>
                  {name.charAt(0)}
                </Typo>
              </FallbackLogo>
            )}
          </Logo>
          <TextContainer>
            <Typo className="text_B_24" color={colorChips.white}>
              {name}
            </Typo>
            <Typo className="text_M_20" color={colorChips.gray_200}>
              {}
            </Typo>
          </TextContainer>
        </LogoContainer>
        <ButtonContainer>
          <Bookmark companyId={id} isBookmarked={isBookmarked} />
          <ApplyButton companyData={companyData} />
        </ButtonContainer>
      </TopContainer>
      <Stats stats={stats} />
    </HeaderCard>
  );
};

// 스타일 정의
const HeaderCard = styled(Box)(({ theme }) => ({
  backgroundColor: colorChips.black_400,
  marginBottom: "24px",
  marginTop: "40px",
  borderRadius: "12px",
  [theme.breakpoints.down("sm")]: {
    marginTop: "24px",
  },
}));

const TopContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "24px",
});

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "18px",
  [theme.breakpoints.down("sm")]: {
    gap: "12px",
  },
}));

const ButtonContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

const Logo = styled(Box)(({ theme }) => ({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  backgroundColor: "#6B34EB",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    width: "48px",
    height: "48px",
  },
}));

const FallbackLogo = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#3452eb",
});

const TextContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

const StyledImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export default Header;
