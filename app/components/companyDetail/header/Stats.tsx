import { Box, styled } from "@mui/material";
import { COLORS } from "@/global/styles/colors";

const StatsContainer = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "24px",
  marginTop: "24px",
  borderTop: `1px solid ${COLORS.gray_400}`,

  "@media (max-width: 768px)": {
    gridTemplateColumns: "1fr",
    gap: "16px",
    marginTop: "16px",
  },
});

const StatsItem = styled(Box)({
  display: "flex",
  backgroundColor: COLORS.black_200,
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "32px",
  padding: "24px 36px",
  borderRadius: "12px",
});

const StatsLabel = styled(Box)({
  color: COLORS.gray_100,
  fontSize: "14px",
});

const StatsValue = styled(Box)({
  fontSize: "20px",
  fontWeight: 600,
  color: "#ffffff",
});

interface StatsProps {
  stats: {
    totalInvestment: number;
    monthlyRevenue: number;
    personnel: number;
  };
}

export default function Stats({ stats }: StatsProps) {
  return (
    <StatsContainer>
      <StatsItem>
        <StatsLabel>누적 투자 금액</StatsLabel>
        <StatsValue>{stats.totalInvestment}억 원</StatsValue>
      </StatsItem>
      <StatsItem>
        <StatsLabel>매출액</StatsLabel>
        <StatsValue>{stats.monthlyRevenue}억 원</StatsValue>
      </StatsItem>
      <StatsItem>
        <StatsLabel>고용 인원</StatsLabel>
        <StatsValue>{stats.personnel}명</StatsValue>
      </StatsItem>
    </StatsContainer>
  );
}
