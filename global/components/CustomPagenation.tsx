import { Pagination } from "@mui/material";
import { COLORS } from "../styles/colors";

interface CustomPagenationProps {
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
export const CustomPagenation: React.FC<CustomPagenationProps> = ({
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
      variant="outlined"
      shape="rounded"
      sx={{
        "& .MuiPaginationItem-root": {
          backgroundColor: COLORS.black_100, // 버튼 배경색
          color: COLORS.gray_200, // 버튼의 텍스트 색상
          "&.Mui-selected": {
            backgroundColor: COLORS.brand_orange, // 선택된 버튼 배경색
            color: COLORS.white, // 선택된 버튼의 텍스트 색상
          },
        },
      }}
    />
  );
};
