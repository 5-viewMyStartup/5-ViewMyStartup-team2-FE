import { Pagination } from "@mui/material";
import { colorChips } from "../styles/colorChips";

interface CustomPaginationProps {
  page: number; // 현재 페이지
  count: number; // 전체 페이지 수
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}
/*
ex)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
   setPage(value);
  };
 */
export const CustomPagination: React.FC<CustomPaginationProps> = ({
  page,
  count,
  handleChange,
}) => {
  return (
    <Pagination
      defaultPage={1}
      page={page}
      count={count}
      onChange={handleChange}
      siblingCount={2}
      boundaryCount={0}
      variant="outlined"
      shape="rounded"
      sx={{
        "& .MuiPaginationItem-root": {
          backgroundColor: colorChips.black_100, // 버튼 배경색
          color: colorChips.gray_200, // 버튼의 텍스트 색상
          "&.MuiPaginationItem-ellipsis": { display: "none" },
          "&.Mui-selected": {
            backgroundColor: colorChips.brand_orange, // 선택된 버튼 배경색
            color: colorChips.white, // 선택된 버튼의 텍스트 색상
          },
        },
      }}
    />
  );
};
