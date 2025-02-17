import { colorChips } from "@/global/styles/colorChips";
import { Stack } from "@mui/material";
import { BookmarkItems } from "./components/BookmakrItems";
import { BookmarkDTO } from "@/global/types/data-contracts";

interface BookmarkListProps {
  companies: BookmarkDTO[];
  page: number | undefined;
}

export default function BookmarkList({ companies, page }: BookmarkListProps) {
  return (
    <Stack sx={bookmarkListWrapperStyle}>
      {companies?.map((item, idx) => (
        <BookmarkItems key={idx} itemData={item} />
      ))}
    </Stack>
  );
}

const bookmarkListWrapperStyle = {
  width: { xs: "696px", sm: "696px", md: "1200px" },
  borderRadius: "4px",
  flexDirection: "column",
  backgroundColor: colorChips.black_300,
};
