import { Box, styled, IconButton, Menu, MenuItem } from "@mui/material";
import { colorChips } from "@/global/styles/colorChips";
import { useState } from "react";
import Pagination from "../pagination/Pagination";
import { Typo } from "@/global/styles/Typo";
import Image from "next/image";
import { ApplicationModal } from "./ApplicationModal";

// 타입 정의
interface Comment {
  investor: string;
  round: number;
  amount: number;
  comment: string;
}

interface CompanyCommentsProps {
  comments: Comment[];
}

// 컴포넌트 로직
const CompanyComments = ({ comments = [] }: CompanyCommentsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const itemsPerPage = 5;

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    // 수정 로직 구현
    handleClose();
  };

  const handleDelete = () => {
    // 삭제 로직 구현
    handleClose();
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    // TODO: API 연동 시 댓글 등록 처리
    console.log("Submit comment:", comment);
    setComment("");
  };

  // 현재 페이지의 댓글 데이터만 필터링
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
          <Typo className="text_B_24" color="#ffffff">
            Review
          </Typo>
          <ApplicationButton onClick={handleModalOpen}>
            <Typo className="text_R_16" color="#ffffff">
              지원하기
            </Typo>
          </ApplicationButton>
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
                    순번
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
                <tr key={comment.investor}>
                  <td>
                    <Typo className="text_R_16" color={colorChips.gray_100}>
                      {comment.investor}
                    </Typo>
                  </td>
                  <td>
                    <Typo className="text_R_16" color={colorChips.gray_100}>
                      {comment.round}
                    </Typo>
                  </td>
                  <td>
                    <Typo className="text_R_16" color={colorChips.gray_100}>
                      {comment.comment}
                    </Typo>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <IconButton onClick={handleMenuClick} sx={{ padding: 0 }}>
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
        <CommentInputContainer>
          <CommentTextArea
            value={comment}
            onChange={handleCommentChange}
            placeholder="댓글을 입력해 주세요."
          />
          <CommentSubmitButton onClick={handleSubmit}>
            <Typo className="text_R_16" color={colorChips.white}>
              등록
            </Typo>
          </CommentSubmitButton>
        </CommentInputContainer>
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
            "& .MuiBackdrop-root": {
              position: "fixed",
            },
            "& .MuiModal-root": {
              position: "fixed",
            },
          }}
          disableScrollLock={true}
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

      <ApplicationModal
        open={isModalOpen}
        onClose={handleModalClose}
        companyName="코드잇"
        companyCategory="에듀테크"
      />
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

const ApplicationButton = styled(Box)({
  padding: "8px 24px",
  backgroundColor: colorChips.brand_orange,
  borderRadius: "50px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#FF3D00",
  },
});

const CommentInputContainer = styled(Box)({
  display: "flex",
  gap: "12px",
  marginTop: "24px",
  padding: "24px",
  backgroundColor: colorChips.black_400,
  borderRadius: "12px",
});

const CommentTextArea = styled("textarea")({
  flex: 1,
  minHeight: "48px",
  padding: "12px 16px",
  backgroundColor: "transparent",
  border: `1px solid ${colorChips.gray_400}`,
  borderRadius: "8px",
  color: colorChips.white,
  resize: "none",
  fontFamily: "inherit",
  fontSize: "16px",
  "&::placeholder": {
    color: colorChips.gray_200,
  },
  "&:focus": {
    outline: "none",
    borderColor: colorChips.brand_orange,
  },
});

const CommentSubmitButton = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 24px",
  backgroundColor: colorChips.brand_orange,
  borderRadius: "8px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#FF3D00",
  },
});

export default CompanyComments;
