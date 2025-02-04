import Image from "next/image";
import Stats from "./Stats";
import { Box, styled } from "@mui/material";
import { COLORS } from "@/global/styles/colors";
import { Typo } from "@/global/styles/Typo";
import { useState } from "react";

const HEADER_STYLES = {
  card: {
    backgroundColor: COLORS.black_400,
    marginBottom: "24px",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    "@media (max-width: 768px)": {
      gap: "8px",
    },
  },
  logo: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "#6B34EB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: COLORS.white,
    fontSize: "16px",
    fontWeight: 600,
    overflow: "hidden",
    "@media (max-width: 768px)": {
      width: "40px",
      height: "40px",
    },
  },
  // 이미지 로드 실패시 보여줄 대체 로고 스타일
  fallbackLogo: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3452eb",
    color: COLORS.white,
    fontSize: "16px",
    fontWeight: 600,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  // Typography 스타일을 객체로 관리
  typography: {
    companyName: {
      className: "text_B_24",
      style: {
        color: COLORS.white,
      },
    },
    category: {
      className: "text_M_20",
      style: {
        color: COLORS.gray_200,
      },
    },
  },
} as const;

const HeaderCard = styled(Box)(HEADER_STYLES.card);
const LogoContainer = styled(Box)(HEADER_STYLES.logoContainer);
const Logo = styled(Box)(HEADER_STYLES.logo);
const TextContainer = styled(Box)(HEADER_STYLES.textContainer);
// 이미지 로드 실패시 사용할 대체 로고 컴포넌트
const FallbackLogo = styled(Box)(HEADER_STYLES.fallbackLogo);

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

export default function Header({ name, logo, category, stats }: HeaderProps) {
  // 이미지 로드 실패 상태를 관리하는 state
  const [imageError, setImageError] = useState(false);

  // 이미지 로드 실패시 호출되는 핸들러
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <HeaderCard>
      <LogoContainer>
        <Logo>
          {!imageError ? (
            // 이미지가 정상적으로 로드되면 해당 이미지를 표시
            <Image
              src={logo}
              alt={name}
              width={80}
              height={80}
              onError={handleImageError}
              style={{ objectFit: "cover" }}
            />
          ) : (
            // 이미지 로드 실패시 회사 이름의 첫 글자를 보여주는 대체 UI
            <FallbackLogo>{name.charAt(0)}</FallbackLogo>
          )}
        </Logo>
        <TextContainer>
          <Typo
            className={HEADER_STYLES.typography.companyName.className}
            customStyle={HEADER_STYLES.typography.companyName.style}
          >
            {name}
          </Typo>
          <Typo
            className={HEADER_STYLES.typography.category.className}
            customStyle={HEADER_STYLES.typography.category.style}
          >
            {category}
          </Typo>
        </TextContainer>
      </LogoContainer>
      <Stats stats={stats} />
    </HeaderCard>
  );
}
