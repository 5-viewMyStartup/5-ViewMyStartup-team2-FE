import { colorChips } from "@/global/styles/colorChips";
import { Stack } from "@mui/material";
import { BookmarkItems } from "./components/BookmakrItems";

const mockData = [
  {
    id: "000",
    idx: 0o0,
    userId: "111",
    companyId: "211",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: "001",
    idx: 0o1,
    userId: "112",
    companyId: "212",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
];

export default function BookmarkList() {
  return (
    <Stack sx={bookmarkListWrapperStyle}>
      {mockData.map((item, idx) => (
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
