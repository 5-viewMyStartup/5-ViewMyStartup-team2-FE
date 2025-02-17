import { create } from "zustand";
import { getBookmarksAPI } from "./bookmarkAPI";
interface Company {
  id: string;
  name: string;
  content: string;
  employeeCnt: number;
  category: { id: string; category: string }[];
  applied: boolean;
  applicants: number;
}
interface Bookmarks {
  companies: Company[];
  totalPages: number;
  currentPage: number;
}

interface BookmarkState {
  bookMarks: Bookmarks;
  totalPage: number;
  fetchBookMarks: (params: {
    userId: string;
    page?: number;
    limit?: number;
    sort?: string;
  }) => Promise<void>;
  setBookMarkList: (data: Bookmarks) => void;
}
export const useBookmarkStore = create<BookmarkState>((set) => ({
  bookMarks: [],
  totalPage: 1,
  fetchBookMarks: async (params) => {
    try {
      const data: Bookmarks = await getBookmarksAPI(params);
      set({ bookMarks: data.companies });
      set({ totalPage: data.totalPages });
    } catch (error) {}
  },

  setBookMarkList: (data) => set({ data }),
}));
