"use client";

import { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { Features } from "./features";
import { Single } from "./single";
import { SkeletonCompanyList } from "@/global/components/SkeletonCompanyItems";
import { ListPagination } from "@/global/components/ListPagination";
import { ApplyModal } from "@/global/components/modal/ApplyModal";
import { useBookmarkStore } from "./core/store";
import Cookies from "js-cookie";
import {
  listLayout,
  listWrapperStyle,
  scrollWrapper,
} from "@/global/styles/companyListStyles";

export default function BookmarkPage() {
  const {
    bookMarks,
    totalPages,
    currentPage,
    fetchBookMarks,
    setPage,
    setSort,
    isApplyModalOpen,
    applyModalData,
    toggleApplyModal,
  } = useBookmarkStore();

  useEffect(() => {
    // Optionally check for userId here if needed
    if (!Cookies.get("id")) {
      console.error("❌ 쿠키에서 userId를 찾을 수 없습니다.");
      return;
    }
    fetchBookMarks();
  }, [fetchBookMarks]);

  const handleModalClose = () => {
    toggleApplyModal(false);
  };

  return (
    <Stack sx={listLayout}>
      {/* Sorting component */}
      <Features.ListTitle onSelectSort={setSort} />

      <Box sx={scrollWrapper}>
        <Box sx={listWrapperStyle}>
          <Single.ListLabel />
          {bookMarks.length === 0 ? (
            <SkeletonCompanyList />
          ) : (
            // Pass onApply callback; transform BookmarkDTO into ApplyModalData here.
            <Features.BookmarkList
              companies={bookMarks}
              onApply={(companyData) =>
                toggleApplyModal(true, {
                  image: companyData.image ?? "",
                  name: companyData.name,
                  category: companyData.category, // stored as array; will convert below when rendering modal
                })
              }
            />
          )}
        </Box>
      </Box>

      <ListPagination
        page={currentPage}
        count={totalPages}
        onPageChange={setPage}
      />

      {isApplyModalOpen && applyModalData && (
        <ApplyModal
          open={isApplyModalOpen}
          handleClose={handleModalClose}
          companyData={{
            image: applyModalData.image,
            name: applyModalData.name,
            // Convert category array to a string by joining the category names.
            category: applyModalData.category.map((c) => c.category).join(", "),
          }}
        />
      )}
    </Stack>
  );
}
