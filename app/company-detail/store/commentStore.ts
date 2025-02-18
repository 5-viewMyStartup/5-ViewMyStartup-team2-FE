import { create } from "zustand";
import axios from "axios";

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  companyId: string;
  user: { name: string; nickname: string; email: string };
}

interface CommentStore {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  fetchComments: (companyId: string) => Promise<void>;
  addComment: (
    userId: string,
    companyId: string,
    content: string
  ) => Promise<void>;
  updateComment: (commentId: string, content: string) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
  setCurrentPage: (page: number) => void;
}

const useCommentStore = create<CommentStore>((set, get) => ({
  comments: [],
  loading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 5,

  fetchComments: async (companyId: string) => {
    try {
      set({ loading: true });
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comments/${companyId}`
      );
      set({ comments: response.data, error: null });
    } catch (err) {
      set({ error: "댓글을 불러오는데 실패했습니다." });
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  addComment: async (userId: string, companyId: string, content: string) => {
    try {
      set({ loading: true });
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comments`,
        { userId, companyId, content }
      );
      set((state) => ({
        comments: [...state.comments, response.data],
        error: null,
      }));
    } catch (err) {
      set({ error: "댓글 작성에 실패했습니다." });
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  updateComment: async (commentId: string, content: string) => {
    try {
      set({ loading: true });
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comments/${commentId}`,
        { content }
      );
      const { fetchComments } = get();
      await fetchComments(get().comments[0]?.companyId);
    } catch (err) {
      set({ error: "댓글 수정에 실패했습니다." });
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  deleteComment: async (commentId: string) => {
    try {
      set({ loading: true });
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comments/${commentId}`
      );
      const { fetchComments } = get();
      await fetchComments(get().comments[0]?.companyId);
    } catch (err) {
      set({ error: "댓글 삭제에 실패했습니다." });
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  setCurrentPage: (page: number) => set({ currentPage: page }),
}));

export default useCommentStore;
