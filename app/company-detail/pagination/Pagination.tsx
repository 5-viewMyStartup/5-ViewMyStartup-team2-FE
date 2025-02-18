import { Box } from "@mui/material";
import { CustomPagination } from "@/global/components/CustomPagination";

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
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <Box display="flex" justifyContent="center" mt={3}>
      <CustomPagination
        page={currentPage}
        count={totalPages}
        handleChange={handleChange}
      />
    </Box>
  );
};

export default Pagination;
