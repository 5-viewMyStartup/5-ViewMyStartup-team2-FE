import { Box, styled, Menu, MenuItem, IconButton } from "@mui/material";
import { colorChips } from "@/global/styles/colorChips";
import { useState, useMemo } from "react";
import Pagination from "../pagination/Pagination";
import { Typo } from "@/global/styles/Typo";
import Image from "next/image";
import { InvestmentModal } from "./InvestmentModal";

// 타입 정의
interface Investment {
  investor: string;
  round: number;
  amount: number;
  comment: string;
}

interface CompanyInvestmentsProps {
  investments: Investment[];
}

// 컴포넌트 로직
const CompanyInvestments = ({ investments }: CompanyInvestmentsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 5;

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    // 수정 로직 구현
    handleClose();
  };

  const handleDelete = () => {
    // 삭제 로직 구현
    handleClose();
  };

  // 투자 데이터를 금액 기준으로 정렬하고 순위 부여
  const sortedInvestments = useMemo(() => {
    return investments
      .slice()
      .sort((a, b) => b.amount - a.amount)
      .map((investment, index) => ({
        ...investment,
        round: index + 1, // 금액 순으로 순위 재할당
      }));
  }, [investments]);

  // 총 투자금액 계산
  const totalInvestment = sortedInvestments.reduce(
    (sum, investment) => sum + investment.amount,
    0
  );

  // 현재 페이지의 투자 데이터만 필터링
  const currentInvestments = sortedInvestments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 총 페이지 수 계산
  const totalPages = Math.ceil(investments.length / itemsPerPage);

  return (
    <>
      <TitleContainer>
        <TitleWrapper>
          <Typo className="text_B_24" color="#ffffff">
            Review
          </Typo>
          <InvestButton onClick={handleModalOpen}>
            <Typo className="text_R_16" color="#ffffff">
              지원하기
            </Typo>
          </InvestButton>
        </TitleWrapper>
      </TitleContainer>

      <InvestmentCard>
        <Typo
          className="text_B_20"
          color="#ffffff"
          sx={{ marginBottom: "24px" }}
        >
          총 {totalInvestment}억 원
        </Typo>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>
                  <Typo className="text_R_14" color={colorChips.white}>
                    투자자 이름
                  </Typo>
                </th>
                <th>
                  <Typo className="text_R_14" color={colorChips.white}>
                    순위
                  </Typo>
                </th>
                <th>
                  <Typo className="text_R_14" color={colorChips.white}>
                    투자 금액
                  </Typo>
                </th>
                <th>
                  <Typo className="text_R_14" color={colorChips.white}>
                    투자 코멘트
                  </Typo>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentInvestments.map((investment) => (
                <tr key={investment.investor}>
                  <td>
                    <Typo className="text_R_16" color={colorChips.gray_100}>
                      {investment.investor}
                    </Typo>
                  </td>
                  <td>
                    <Typo className="text_R_16" color={colorChips.gray_100}>
                      {investment.round}위
                    </Typo>
                  </td>
                  <td>
                    <Typo className="text_R_16" color={colorChips.gray_100}>
                      {investment.amount}억 원
                    </Typo>
                  </td>
                  <td>
                    <Typo className="text_R_16" color={colorChips.gray_100}>
                      {investment.comment}
                    </Typo>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <IconButton onClick={handleMenuClick} sx={{ padding: 0 }}>
                      <Image
                        src="/assets/ic_Menu.svg"
                        alt="menu"
                        width={24}
                        height={24}
                      />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: colorChips.black_400,
              color: colorChips.white,
              marginTop: "4px",
              minWidth: "120px",
              borderRadius: "12px",
              border: `1px solid ${colorChips.gray_200}`,
              boxShadow: "none",
              overflow: "hidden",
            },
            "& .MuiMenuItem-root": {
              padding: "16px",
              borderBottom: `1px solid ${colorChips.gray_200}`,
              "&:last-child": {
                borderBottom: "none",
              },
              "&:hover": {
                backgroundColor: colorChips.black_200,
              },
            },
            "& .MuiBackdrop-root": {
              position: "fixed",
            },
            "& .MuiModal-root": {
              position: "fixed",
            },
          }}
          disableScrollLock={true}
        >
          <MenuItem onClick={handleEdit}>
            <Typo className="text_R_16" color={colorChips.gray_100}>
              수정하기
            </Typo>
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <Typo className="text_R_16" color={colorChips.gray_100}>
              삭제하기
            </Typo>
          </MenuItem>
        </Menu>
        <PaginationContainer>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </PaginationContainer>
      </InvestmentCard>

      <InvestmentModal
        open={isModalOpen}
        onClose={handleModalClose}
        companyName="코드잇"
        companyCategory="에듀테크"
      />
    </>
  );
};

// 스타일 컴포넌트에서 타이포그래피 관련 속성 제거
const InvestmentCard = styled(Box)({
  backgroundColor: colorChips.black_300,
  borderRadius: "12px",
  padding: "24px",
  marginBottom: "150px",
  overflow: "hidden",
});

const TableContainer = styled(Box)({
  width: "100%",
  overflowX: "auto",
  "&::-webkit-scrollbar": {
    height: "8px",
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

const Table = styled("table")({
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: 0,
  minWidth: "743px", // 모바일에서 스크롤을 위한 최소 너비
  "& th": {
    padding: "16px",
    borderBottom: `1px solid ${colorChips.black_100}`,
    textAlign: "left",
    whiteSpace: "nowrap",
  },
  "& td": {
    padding: "16px",
    borderBottom: `1px solid ${colorChips.gray_400}`,
    "&:nth-of-type(1), &:nth-of-type(2), &:nth-of-type(3)": {
      whiteSpace: "nowrap",
    },
    "&:nth-of-type(4)": {
      minWidth: "200px", // 코멘트 칼럼 최소 너비
      maxWidth: "400px", // 코멘트 칼럼 최대 너비
      whiteSpace: "normal", // 코멘트는 줄바꿈 허용
      wordBreak: "break-all", // 긴 텍스트 처리
    },
    "&:last-child": {
      width: "48px",
      padding: "16px 24px 16px 16px",
      textAlign: "right",
    },
  },
  "& tr:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  "& tr:last-child td": {
    borderBottom: "none",
  },
});

const PaginationContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginTop: "24px",
});

const TitleContainer = styled(Box)({
  marginBottom: "24px",
});

const TitleWrapper = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const InvestButton = styled(Box)({
  padding: "8px 24px",
  backgroundColor: colorChips.brand_orange,
  borderRadius: "50px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#FF3D00",
  },
});

export default CompanyInvestments;
