import { create } from "zustand";
import { getBookmarksAPI } from "./bookmarkAPI";
import Cookies from "js-cookie";
import {
  BookmarkDTO,
  BookmarkListResponse,
} from "@/global/types/data-contracts";

interface ApplyModalData {
  image: string;
  name: string;
  category: { id: string; category: string }[];
}

interface BookmarkState {
  bookMarks: BookmarkDTO[];
  totalPages: number;
  currentPage: number;
  sort: string;
  isApplyModalOpen: boolean;
  applyModalData: ApplyModalData | null;
  fetchBookMarks: () => Promise<void>;
  setSort: (sort: string) => void;
  setPage: (page: number) => void;
  toggleApplyModal: (open: boolean, data?: ApplyModalData) => void;
}

export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  bookMarks: [],
  totalPages: 1,
  currentPage: 1,
  sort: "1", // Default sort: 지원한 기업 우선
  isApplyModalOpen: false,
  applyModalData: null,

  fetchBookMarks: async () => {
    const userId = Cookies.get("id");
    if (!userId) {
      console.error("❌ 쿠키에서 userId를 찾을 수 없습니다.");
      return;
    }
    try {
      const { currentPage, sort } = get();
      const response: BookmarkListResponse = await getBookmarksAPI({
        userId,
        page: currentPage,
        limit: 10,
        sort,
      });
      if (!response || !Array.isArray(response.companies)) {
        console.error("❌ API 응답 형식이 올바르지 않습니다.", response);
        return;
      }
      set({
        bookMarks: response.companies,
        totalPages: response.totalPages ?? 1,
        currentPage: response.currentPage ?? 1,
      });
    } catch (error) {
      console.error("❌ 북마크를 가져오는 중 오류 발생: ", error);
      set({ bookMarks: [], totalPages: 1, currentPage: 1 });
    }
  },

  setSort: (sort) => {
    set({ sort });
    get().fetchBookMarks();
  },

  setPage: (page) => {
    set({ currentPage: page });
    get().fetchBookMarks();
  },

  toggleApplyModal: (open, data) => {
    set({
      isApplyModalOpen: open,
      applyModalData: data ? data : null,
    });
  },
}));
