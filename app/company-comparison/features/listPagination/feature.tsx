import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";
import { Box } from "@mui/material";

export default function ListPagination() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typo
        className="text_SB_20"
        content="[페이지네이션 필요한가?]"
        color={colorChips.white}
      />
    </Box>
  );
}
