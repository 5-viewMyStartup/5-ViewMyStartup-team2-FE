import React from "react";
import Image from "next/image";
import { createBookMark, deleteBookMark } from "../store/bookMark";
import Cookies from "js-cookie";
import { getCompanyDetail } from "../store/companyApi";

interface BookmarkProps {
  isBookmarked: boolean;
  companyId: string;
}

const Bookmark: React.FC<BookmarkProps> = ({ isBookmarked, companyId }) => {
  const handleBookmark = () => {
    const userId = Cookies.get("id");
    if (!userId) {
      console.log("user id error");
      return;
    }

    if (!isBookmarked) {
      createBookMark(userId, companyId);
      getCompanyDetail(companyId, userId);
    } else {
      deleteBookMark(userId, companyId);
    }
  };

  return (
    <Image
      width={48}
      height={48}
      src={isBookmarked ? "/assets/on_star.svg" : "/assets/off_star.svg"}
      alt="즐겨찾기이미지"
      onClick={handleBookmark}
      style={{ cursor: "pointer" }}
    />
  );
};

export default Bookmark;
