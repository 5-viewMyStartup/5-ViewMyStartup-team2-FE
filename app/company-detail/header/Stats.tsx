import { Box, styled } from "@mui/material";
import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";

// 타입 정의
interface StatsProps {
  stats: {
    monthlyRevenue: number;
    personnel: number;
    applicants: number;
  };
}

// 컴포넌트 로직
const Stats = ({ stats }: StatsProps) => {
  return (
    <StatsContainer>
      <StatsItem>
        <Typo className="text_R_16" color={colorChips.gray_100}>
          매출액
        </Typo>
        <Typo className="text_SB_16" color={colorChips.white}>
          {Math.floor(stats.monthlyRevenue / 100000000)}억 원
        </Typo>
      </StatsItem>
      <StatsItem>
        <Typo className="text_R_16" color={colorChips.gray_100}>
          고용 인원
        </Typo>
        <Typo className="text_SB_16" color={colorChips.white}>
          {stats.personnel}명
        </Typo>
      </StatsItem>
      <StatsItem>
        <Typo className="text_R_16" color={colorChips.gray_100}>
          지원 인원
        </Typo>
        <Typo className="text_SB_16" color={colorChips.white}>
          {stats.applicants}명
        </Typo>
      </StatsItem>
    </StatsContainer>
  );
};

// 스타일 정의
const StatsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "24px",
  marginTop: "24px",
  borderTop: `1px solid ${colorChips.black_100}`,
  [theme.breakpoints.down("sm")]: {
    // 600px 이하에서 적용
    // gridTemplateColumns: "1fr",
    gap: "16px",
    marginTop: "16px",
  },
}));

const StatsItem = styled(Box)(({ theme }) => ({
  display: "flex",
  backgroundColor: colorChips.black_200,
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "32px",
  padding: "36px 24px",
  borderRadius: "10px",
  width: "100%", // 반응형에서 너비 100% 유지
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "16px",
    padding: "36px 16px",
  },
}));

export default Stats;
