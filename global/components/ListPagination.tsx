import { CustomPagination } from "@/global/components/CustomPagination";
import { Box } from "@mui/material";

interface CustomPaginationProps {
  page: number | undefined; // 현재 페이지
  count: number; // 전체 페이지 수
  onPageChange: (page: number) => void;
}

export function ListPagination({
  page = 1,
  count = 1,
  onPageChange,
}: CustomPaginationProps) {
  const handlePageClick = (
    event: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    onPageChange(value);
  };

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
      <CustomPagination
        page={page}
        count={count}
        handleChange={handlePageClick}
      />
    </Box>
  );
}
