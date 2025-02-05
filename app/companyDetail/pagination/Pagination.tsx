import { Box, styled } from "@mui/material";
import { colorChips } from "@/global/styles/colorChips";

interface PaginationProps {
  currentPage: number; // 현재 페이지 번호
  totalPages: number; // 전체 페이지 수
  onPageChange: (page: number) => void; // 페이지 변경 시 호출될 콜백 함수
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  // 보여줄 페이지 번호들을 계산
  const getPageNumbers = () => {
    const pageNumbers = [];
    const VISIBLE_PAGES = 5; // 한 번에 보여줄 페이지 수

    // 현재 페이지가 5 이하면 1~5를 보여줌
    if (currentPage <= 5) {
      for (let i = 1; i <= VISIBLE_PAGES; i++) {
        pageNumbers.push(i);
      }
    } else {
      // 현재 페이지가 마지막에 오도록 앞의 4페이지를 보여줌
      const start = currentPage - 4;
      const end = currentPage;

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Container>
      <PageButton
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        sx={{
          cursor: currentPage === 1 ? "default" : "pointer",
          opacity: currentPage === 1 ? 0.5 : 1,
          "&:hover": {
            backgroundColor:
              currentPage === 1
                ? colorChips.black_100
                : `${colorChips.brand_orange}1A`,
          },
        }}
      >
        &lt;
      </PageButton>

      {pageNumbers.map((page) => (
        <PageButton
          key={page}
          onClick={() => onPageChange(page)}
          sx={{
            backgroundColor:
              currentPage === page
                ? colorChips.brand_orange
                : colorChips.black_100,
            color: currentPage === page ? "#ffffff" : colorChips.gray_200,
            "&:hover": {
              backgroundColor:
                currentPage === page
                  ? colorChips.brand_orange
                  : `${colorChips.brand_orange}1A`,
            },
          }}
        >
          {page}
        </PageButton>
      ))}

      <PageButton
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        sx={{
          cursor: currentPage === totalPages ? "default" : "pointer",
          opacity: currentPage === totalPages ? 0.5 : 1,
          "&:hover": {
            backgroundColor:
              currentPage === totalPages
                ? colorChips.black_100
                : `${colorChips.brand_orange}1A`,
          },
        }}
      >
        &gt;
      </PageButton>
    </Container>
  );
};

const Container = styled(Box)({
  display: "flex",
  gap: "8px",
  alignItems: "center",
});

const PageButton = styled(Box)({
  width: "48px",
  height: "48px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "12px",
  cursor: "pointer",
  color: colorChips.gray_200,
  backgroundColor: colorChips.black_100,
  transition: "all 0.2s ease-in-out",
  fontSize: "16px",

  "&:hover": {
    backgroundColor: `${colorChips.brand_orange}1A`,
  },

  "&.active": {
    backgroundColor: colorChips.brand_orange,
    color: "#ffffff",
  },
});

export default Pagination;
