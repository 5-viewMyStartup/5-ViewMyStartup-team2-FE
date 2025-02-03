import { Box } from "@mui/material";
import { Features } from "./features";
import { Single } from "./single";

export default function Main() {
  return (
    <Box sx={mainLayout}>
      <Features.ListTitle />

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

const scrollWrapper = {
  width: "100vw",
  overflow: "hidden",
  position: "relative",
};

// 실제 스크롤되는 컨텐츠
const listWrapperStyle = {
  width: "100%",
  pl: { xs: "16px" },
  display: "flex",
  flexDirection: "column",
  alignItems: { xs: "flex-start", sm: "center" },
  overflowX: "auto",
  whiteSpace: "nowrap",
  WebkitOverflowScrolling: "touch",
  // 스크롤바 스타일링
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
};
