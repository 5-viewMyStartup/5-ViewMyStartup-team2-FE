import { Box } from "@mui/material";
import { Features } from "./features";
import { Single } from "./single";

export default function Main() {
  return (
    <Box sx={mainLayout}>
      <Box sx={contentContainerStyle}>
        <Features.ListTitle />
      </Box>

      <Box sx={scrollWrapper}>
        <Box sx={listWrapperStyle}>
          <Single.ListLabel />
          <Features.CompanyList />
        </Box>
      </Box>

      <Features.ListPagination />
    </Box>
  );
}

const mainLayout = {
  pt: "40px",
  pb: "140px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
};

const contentContainerStyle = {
  display: "flex",
  alignItems: "center",
  width: "100%",
  maxWidth: ["696px", "696px", "1200px"],
  px: ["16px", "24px"], // 좌우 패딩
};

const scrollWrapper = {
  width: "100%",
  overflow: "hidden",
};

// 실제 스크롤되는 컨텐츠
const listWrapperStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  overflowX: "auto",
  whiteSpace: "nowrap",
  WebkitOverflowScrolling: "touch",
  // 스크롤바 스타일링 (선택적)
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
};
