import { useState, useEffect } from "react";
import { Box, styled, IconButton, Menu, MenuItem } from "@mui/material";
import { colorChips } from "@/global/styles/colorChips";
import Pagination from "../pagination/Pagination";
import { Typo } from "@/global/styles/Typo";
import Image from "next/image";
import { CommentInput } from "@/global/components/input/CommentInput";
import axios from "axios";

// 타입 정의
interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  companyId: string;
}

interface CompanyCommentsProps {
  companyId: string;
}

// 컴포넌트 로직
const CompanyComments = ({ companyId }: CompanyCommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [comment, setComment] = useState("");
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 5;

  // 댓글 목록 조회
  const fetchComments = async () => {
    try {
      // const response = await axios.get(
      //   `${process.env.NEXT_PUBLIC_API_URL}/api/comments/${companyId}`
      // );
      // setComments(response.data);
    } catch (error) {
      console.error("댓글 조회 실패:", error);
      setError("댓글을 불러오는데 실패했습니다.");
    }
  };

  useEffect(() => {
    // fetchComments();
  }, [companyId]);

  // 댓글 작성
  const handleSubmit = async () => {
    if (!comment.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comments/${companyId}`,
        {
          content: comment,
        }
      );
      setComment("");
      fetchComments();
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      setError("댓글 작성에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 댓글 수정
  const handleEdit = async () => {
    if (!selectedComment) return;
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comments/${selectedComment.id}`,
        {
          content: comment,
        }
      );
      fetchComments();
      handleClose();
    } catch (error) {
      console.error("댓글 수정 실패:", error);
      setError("댓글 수정에 실패했습니다.");
    }
  };

  // 댓글 삭제
  const handleDelete = async () => {
    if (!selectedComment) return;
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comments/${selectedComment.id}`
      );
      fetchComments();
      handleClose();
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      setError("댓글 삭제에 실패했습니다.");
    }
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    comment: Comment
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedComment(comment);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedComment(null);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  // 현재 페이지의 댓글만 필터링
  const currentComments = comments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 총 페이지 수 계산
  const totalPages = Math.ceil(comments.length / itemsPerPage);

  return (
    <>
      <TitleContainer>
        <TitleWrapper>
          <Typo className="text_B_24" color={colorChips.white}>
            Review
          </Typo>
        </TitleWrapper>
      </TitleContainer>

      <CommentCard>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>
                  <Typo className="text_R_14" color={colorChips.white}>
                    작성자
                  </Typo>
                </th>
                <th>
                  <Typo className="text_R_14" color={colorChips.white}>
                    작성일
                  </Typo>
                </th>
                <th>
                  <Typo className="text_R_14" color={colorChips.white}>
                    코멘트
                  </Typo>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentComments.map((comment) => (
                <tr key={comment.id}>
                  <td>
                    <Typo className="text_R_16" color={colorChips.gray_100}>
                      {comment.userId}
                    </Typo>
                  </td>
                  <td>
                    <Typo className="text_R_16" color={colorChips.gray_100}>
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </Typo>
                  </td>
                  <td>
                    <Typo className="text_R_16" color={colorChips.gray_100}>
                      {comment.content}
                    </Typo>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <IconButton
                      onClick={(e) => handleMenuClick(e, comment)}
                      sx={{ padding: 0 }}
                    >
                      <Image
                        src="/assets/ic_Menu.svg"
                        alt="menu"
                        width={24}
                        height={24}
                      />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>

        {error && (
          <Box mt={2}>
            <Typo className="text_R_14" color={colorChips.red_error}>
              {error}
            </Typo>
          </Box>
        )}

        <Box mt={3}>
          <CommentInput
            value={comment}
            onChange={handleCommentChange}
            onSubmit={handleSubmit}
            disabled={isLoading}
          />
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: colorChips.black_400,
              color: colorChips.white,
              marginTop: "4px",
              minWidth: "120px",
              borderRadius: "12px",
              border: `1px solid ${colorChips.gray_200}`,
              boxShadow: "none",
              overflow: "hidden",
            },
            "& .MuiMenuItem-root": {
              padding: "16px",
              borderBottom: `1px solid ${colorChips.gray_200}`,
              "&:last-child": {
                borderBottom: "none",
              },
              "&:hover": {
                backgroundColor: colorChips.black_200,
              },
            },
          }}
        >
          <MenuItem onClick={handleEdit}>
            <Typo className="text_R_16" color={colorChips.gray_100}>
              수정하기
            </Typo>
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <Typo className="text_R_16" color={colorChips.gray_100}>
              삭제하기
            </Typo>
          </MenuItem>
        </Menu>

        <PaginationContainer>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </PaginationContainer>
      </CommentCard>
    </>
  );
};

// 스타일 컴포넌트
const CommentCard = styled(Box)({
  backgroundColor: colorChips.black_300,
  borderRadius: "12px",
  padding: "24px",
  marginBottom: "150px",
  overflow: "hidden",
});

const TableContainer = styled(Box)({
  width: "100%",
  overflowX: "auto",
  "&::-webkit-scrollbar": {
    height: "8px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: colorChips.black_400,
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: colorChips.gray_400,
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: colorChips.gray_300,
    },
  },
});

const Table = styled("table")({
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: 0,
  minWidth: "743px",
  "& th": {
    padding: "16px",
    borderBottom: `1px solid ${colorChips.black_100}`,
    textAlign: "left",
    whiteSpace: "nowrap",
  },
  "& td": {
    padding: "16px",
    borderBottom: `1px solid ${colorChips.gray_400}`,
    "&:nth-of-type(1)": {
      width: "120px",
      whiteSpace: "nowrap",
    },
    "&:nth-of-type(2)": {
      width: "80px",
      whiteSpace: "nowrap",
    },
    "&:nth-of-type(3)": {
      width: "auto",
      minWidth: "400px",
      whiteSpace: "normal",
      wordBreak: "break-all",
    },
    "&:nth-of-type(4)": {
      width: "48px",
      padding: "16px 24px 16px 16px",
      textAlign: "right",
    },
  },
  "& tr:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  "& tr:last-child td": {
    borderBottom: "none",
  },
});

const PaginationContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginTop: "24px",
});

const TitleContainer = styled(Box)({
  marginBottom: "24px",
});

const TitleWrapper = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default CompanyComments;
