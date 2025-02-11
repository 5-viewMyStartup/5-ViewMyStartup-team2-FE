import { Box, Stack } from "@mui/material";
import { Features } from "./features";
import { Single } from "./single";

export default function BookmarkPage() {
  return (
    <Stack sx={mainLayout}>
      <Features.ListTitle />

      <Box sx={scrollWrapper}>
        <Box sx={listWrapperStyle}>
          <Single.ListLabel />
          <Features.BookmarkList />
        </Box>
      </Box>

      <Features.ListPagination />
    </Stack>
  );
}

const mainLayout = {
  pt: "40px",
  pb: "140px",
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
  pl: { xs: "16px", sm: "0" },
  pr: { xs: "16px", sm: "0" },
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
