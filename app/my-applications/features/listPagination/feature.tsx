// import { colorChips } from "@/global/styles/colorChips";
// import { Typo } from "@/global/styles/Typo";
import { Box } from "@mui/material";
import { useState } from "react";

interface CustomPaginationProps {
  page: number; // 현재 페이지
  count: number; // 전체 페이지 수
  onPageChange: (page: number) => void;
}

export default function ListPagination({
  page = 1,
  count = 1,
  onPageChange,
}: CustomPaginationProps) {
  const [currentPage, setCurrentPage] = useState<number>(page); //현재 페이지
  const handlePageClick = (page: number): void => {
    setCurrentPage(page);
    onPageChange(page);
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
        page={currentPage}
        count={count}
        handleChange={handlePageClick}
      />
    </Box>
  );
}
