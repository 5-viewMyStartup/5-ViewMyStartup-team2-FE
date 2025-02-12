import React, { useState, useEffect } from "react";
import { Stack, Box, Modal, IconButton, Button } from "@mui/material";
import { Typo } from "@/global/styles/Typo";
import { colorChips } from "@/global/styles/colorChips";
import { CompanyDTO } from "@/global/types/data-contracts";
import { SearchInput } from "@/global/components/input/SearchInput";
import ListPagination from "../../listPagination/feature";

interface CompanySelectModalProps {
  open: boolean; // 모달 열기 상태
  onClose: () => void; // 모달 닫기 함수
  onSelect: (company: CompanyDTO) => void; // 기업 선택 시 호출될 함수
  onDeselect: (company: CompanyDTO) => void; // 기업 선택 해제 시 호출될 함수
  selectedCompanies: CompanyDTO[]; // 선택된 기업 목록
  companies: CompanyDTO[]; // 기업 목록
  totalPages: number; // 전체 페이지 수
  totalItems: number;
  isLoading: boolean; // 로딩 상태
  fetchCompanies: (page: number) => void; // 페이지 변경 시 기업 목록을 가져오는 함수
}

const CompanySelectModal: React.FC<CompanySelectModalProps> = ({
  open,
  onClose,
  onSelect,
  onDeselect,
  selectedCompanies,
  companies,
  totalItems,
  totalPages,
  isLoading,
  fetchCompanies,
}) => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태

  useEffect(() => {
    fetchCompanies(currentPage); // 페이지가 변경될 때마다 데이터를 불러옵니다.
  }, [currentPage, fetchCompanies]);

  // 기업이 선택되었는지 확인하는 함수
  const isCompanySelected = (company: CompanyDTO) => {
    return selectedCompanies.some(
      (selectedCompany) => selectedCompany.name === company.name
    );
  };

  // 한 번에 5개씩 페이지 표시하기 위한 함수
  const getPaginationRange = (page: number) => {
    const startPage = Math.floor((page - 1) / 5) * 5 + 1; // 시작 페이지 계산
    const endPage = Math.min(startPage + 4, totalPages); // 종료 페이지 계산 (totalPages보다 큰 값 방지)
    return { startPage, endPage };
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // 페이지가 변경되면 상태 업데이트
  };

  const { startPage, endPage } = getPaginationRange(currentPage); // 페이지 범위 계산

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "24px",
          backgroundColor: colorChips.black_300,
          borderRadius: "16px",
          width: "496px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typo
            className="text_B_20"
            content="비교할 기업 선택하기"
            color={colorChips.white}
          />
          <IconButton onClick={onClose} sx={{ color: colorChips.white }}>
            <img
              src="/assets/ic_delete.svg"
              alt="Close"
              style={{ width: "24px", height: "24px" }}
            />
          </IconButton>
        </Box>

        {/* 검색창 추가 */}
        <Box sx={{ marginTop: "16px" }}>
          <SearchInput
            variation="left"
            width="100%"
            placeholder="기업명 검색"
          />
        </Box>

        {/* 로딩 중일 때 */}
        {isLoading ? (
          <Box
            sx={{
              textAlign: "center",
              padding: "20px",
              color: colorChips.white,
            }}
          >
            <Typo
              className="text_M_18"
              content="로딩 중..."
              color={colorChips.white}
            />
          </Box>
        ) : (
          <>
            {/* 선택된 기업이 없을 때 */}
            {companies.length === 0 ? (
              <Box
                sx={{
                  textAlign: "center",
                  padding: "20px",
                  color: colorChips.white,
                }}
              >
                <Typo
                  className="text_M_18"
                  content="기업 목록이 없습니다."
                  color={colorChips.white}
                />
              </Box>
            ) : (
              <Stack sx={{ marginTop: "20px" }}>
                {companies.map((company) => (
                  <Box
                    key={company.name}
                    sx={{
                      padding: "10px",
                      marginBottom: "10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    <Typo
                      className="text_M_16"
                      content={company.name}
                      color="black"
                    />
                    <Button
                      onClick={
                        () =>
                          isCompanySelected(company)
                            ? onDeselect(company) // 이미 선택된 기업이라면 해제
                            : onSelect(company) // 아직 선택되지 않은 기업이라면 선택
                      }
                      sx={{
                        marginTop: "8px",
                        backgroundColor: isCompanySelected(company)
                          ? colorChips.brand_orange
                          : colorChips.gray_400,
                        color: colorChips.white,
                      }}
                    >
                      {isCompanySelected(company) ? "선택완료" : "선택하기"}
                    </Button>
                  </Box>
                ))}
              </Stack>
            )}
          </>
        )}

        {/* 페이지네이션 추가 (모달에서만 사용) */}
        {totalPages > 1 && (
          <Box sx={{ textAlign: "center", marginTop: "16px" }}>
            <ListPagination
              page={currentPage} // 현재 페이지
              count={totalPages} // 전체 페이지 수
              onPageChange={handlePageChange} // 페이지 변경 시 호출될 함수
              startPage={startPage} // 페이지 범위의 시작
              endPage={endPage} // 페이지 범위의 끝
            />
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default CompanySelectModal;
