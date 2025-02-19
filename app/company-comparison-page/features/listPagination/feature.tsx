import { CustomPagination } from "@/global/components/CustomPagination";
import { Box } from "@mui/material";

interface ListPaginationProps {
  page: number; // 현재 페이지
  count: number; // 전체 페이지 수
  onPageChange: (page: number) => void;
  startPage: number; // 페이지 범위 시작
  endPage: number; // 페이지 범위 끝
}

export default function ListPagination({
  page = 1,
  count = 1,
  onPageChange,
  endPage,
}: ListPaginationProps) {
  // 페이지 번호 범위
  const handlePageChange = (page: number) => {
    onPageChange(page); // 페이지 변경
  };

  // 전체 페이지 수는 endPage가 count를 넘지 않도록 제한
  const adjustedCount = endPage <= count ? count : endPage;

  return (
    <Box
      sx={{
        margin: "40px auto",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* CustomPagination을 사용하여 범위 내에서 페이지 전환 */}
      <CustomPagination
        page={page}
        count={adjustedCount} // 페이지 범위에 맞춰 전체 페이지 수 전달
        handleChange={(event, value) => handlePageChange(value)} // 페이지 변경
      />
    </Box>
  );
}
