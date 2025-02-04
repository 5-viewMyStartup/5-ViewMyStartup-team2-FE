import { Box, styled } from "@mui/material";
import { COLORS } from "@/global/styles/colors";

const InvestmentCard = styled(Box)({
  backgroundColor: COLORS.black_300,
  borderRadius: "12px",
  padding: "24px",
});

const CardTitle = styled(Box)({
  fontSize: "20px",
  fontWeight: 600,
  color: "#ffffff",
  marginBottom: "24px",
});

const TableContainer = styled(Box)({
  overflowX: "auto",
});

const Table = styled("table")({
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: 0,
  "& th": {
    color: COLORS.gray_200,
    fontSize: "14px",
    fontWeight: "normal",
    textAlign: "left",
    padding: "16px",
    borderBottom: `1px solid ${COLORS.gray_400}`,
  },
  "& td": {
    color: "#ffffff",
    fontSize: "16px",
    padding: "16px",
    borderBottom: `1px solid ${COLORS.gray_400}`,
  },
  "& tr:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
});

interface Investment {
  investor: string;
  round: number;
  amount: number;
  comment: string;
}

interface CompanyInvestmentsProps {
  investments: Investment[];
}

export default function CompanyInvestments({
  investments,
}: CompanyInvestmentsProps) {
  return (
    <InvestmentCard>
      <CardTitle>총 200억 원</CardTitle>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>투자자 이름</th>
              <th>순위</th>
              <th>투자 금액</th>
              <th>투자 코멘트</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {investments.map((investment, index) => (
              <tr key={index}>
                <td>{investment.investor}</td>
                <td>{investment.round}위</td>
                <td>{investment.amount}억 원</td>
                <td>{investment.comment}</td>
                <td style={{ textAlign: "right" }}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "8px",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Box
                      sx={{
                        color: COLORS.gray_100,
                        fontSize: "14px",
                        cursor: "pointer",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      수정하기
                    </Box>
                    <Box
                      sx={{
                        color: COLORS.gray_100,
                        fontSize: "14px",
                        cursor: "pointer",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      삭제하기
                    </Box>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </InvestmentCard>
  );
}
