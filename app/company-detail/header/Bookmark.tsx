import { Button, styled } from "@mui/material";
import { colorChips } from "@/global/styles/colorChips";
import { useState } from "react";

const Bookmark = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // TODO: 북마크 API 연동
  };

  return (
    <BookmarkButton onClick={handleBookmark} variant="outlined">
      {isBookmarked ? "즐겨찾기 제거" : "즐겨찾기 추가"}
    </BookmarkButton>
  );
};

const BookmarkButton = styled(Button)({
  color: colorChips.white,
  borderColor: colorChips.white,
  padding: "12px 24px",
  borderRadius: "8px",
  "&:hover": {
    borderColor: colorChips.white,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

export default Bookmark;
