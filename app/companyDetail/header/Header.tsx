"use client";

import Image from "next/image";
import Stats from "./Stats";
import { Box, styled } from "@mui/material";
import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";
import { useState } from "react";

// 타입 정의
interface HeaderProps {
  name: string;
  logo: string;
  category: string;
  stats: {
    totalInvestment: number;
    monthlyRevenue: number;
    personnel: number;
  };
}

// 컴포넌트 로직
const Header = ({ name, logo, category, stats }: HeaderProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <HeaderCard>
      <LogoContainer>
        <Logo>
          {!imageError ? (
            <Image
              src={logo}
              alt={name}
              width={80}
              height={80}
              onError={handleImageError}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <FallbackLogo>
              <Typo className="text_B_16" color="#ffffff">
                {name.charAt(0)}
              </Typo>
            </FallbackLogo>
          )}
        </Logo>
        <TextContainer>
          <Typo className="text_B_24" color="#ffffff">
            {name}
          </Typo>
          <Typo className="text_M_20" color={colorChips.gray_200}>
            {category}
          </Typo>
        </TextContainer>
      </LogoContainer>
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

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "18px",
  [theme.breakpoints.down("sm")]: {
    gap: "12px",
  },
}));

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

export default Header;
