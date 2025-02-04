"use client";

import { useState } from "react";
import Header from "./header/Header";
import Investments from "./investments/Investments";
import { Box, styled } from "@mui/material";
import { COLORS } from "@/global/styles/colors";

const MOCK_DATA = {
  id: "1",
  name: "코드잇",
  logo: "/company-logo.png",
  category: "에듀테크",
  description: `코드잇은 누구나 쉽게 코딩을 배울 수 있도록 도와주는 EdTech 스타트업입니다.
    현재 시리즈 A 투자를 유치하였으며, 매월 꾸준한 성장을 보이고 있습니다.`,
  stats: {
    totalInvestment: 140,
    monthlyRevenue: 44.3,
    personnel: 95,
  },
  investments: [
    {
      investor: "김인우",
      round: 1,
      amount: 10,
      comment: "코드잇은 일일 플랫폼 기업입니다!",
    },
  ],
};

const PageContainer = styled(Box)({
  width: "100%",
  padding: "40px 0",
});

const Card = styled(Box)({
  backgroundColor: COLORS.black_300,
  borderRadius: "12px",
  padding: "24px",
  marginBottom: "24px",
});

const DescriptionTitle = styled(Box)({
  fontSize: "20px",
  fontWeight: 600,
  color: "#ffffff",
  marginBottom: "16px",
});

const Description = styled(Box)({
  fontSize: "16px",
  lineHeight: 1.6,
  color: COLORS.gray_200,
  whiteSpace: "pre-line",
});

// export default function CompanyDetail({ id }: { id: string })
export default function CompanyDetail() {
  const [company] = useState(MOCK_DATA);

  return (
    <PageContainer>
      <Header
        name={company.name}
        logo={company.logo}
        category={company.category}
        stats={company.stats}
      />
      <Card>
        <DescriptionTitle>기업 소개</DescriptionTitle>
        <Description>{company.description}</Description>
      </Card>
      <Investments investments={company.investments} />
    </PageContainer>
  );
}
