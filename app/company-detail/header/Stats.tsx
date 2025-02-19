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
        {/* 소수점 첫째 자리까지만 보여주고 정수인 경우 소수점을 숨김 */}
        <Typo className="text_SB_16" color={colorChips.white}>
          {((amount) => {
            const billions = amount / 100000000;
            return billions % 1 === 0 ? billions : billions.toFixed(1);
          })(stats.monthlyRevenue)}
          억 원
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
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "16px",
    padding: "36px 16px",
  },
}));

export default Stats;
