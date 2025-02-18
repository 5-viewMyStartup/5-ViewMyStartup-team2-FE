"use client";
import { Typo } from "@/global/styles/Typo";
import { Box, Modal, Stack } from "@mui/material";
import Image from "next/image";
import CustomInput from "../input";
import { useState } from "react";
import { CustomListItem } from "../CustomListItem";
import { colorChips } from "@/global/styles/colorChips";
import { ComparisonCompanyDTO } from "@/global/types/data-contracts";
import { CustomPagination } from "../CustomPagination";
// import { useCompanyDefaultImg } from "@/global/hooks/useCompanyImg";
//지금부터 수정!시작!!!
interface CustomModalProps {
  title: string;
  open: boolean;
  handleClose: () => void;
  companies: ComparisonCompanyDTO[];
  appliedCompanies: ComparisonCompanyDTO[];
  selectedCompanies: ComparisonCompanyDTO[];
  onSelect: (company: ComparisonCompanyDTO) => void;
  onDeselect: (company: ComparisonCompanyDTO) => void;
  isLoading: boolean;
  keyword: string;
  setKeyword: (value: string) => void;
  searchPage: number;
  totalSearchPages: number;
  handleSearchPageChange: (page: number) => void;
  pickPage: number;
  totalPickPages: number;
  handlePickPageChange: (page: number) => void;
  totalCompaniesCount: number; // 전체 기업 수 (검색 결과 전체)
  totalAppliedCompaniesCount: number; // 전체 지원한 기업 수
  errorMessage?: string;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  title,
  open,
  handleClose,
  companies,
  appliedCompanies,
  selectedCompanies,
  onSelect,
  onDeselect,
  isLoading,
  keyword,
  setKeyword,
  searchPage,
  totalSearchPages,
  handleSearchPageChange,
  pickPage, // 🚀 pickPage prop 사용
  totalPickPages, // 🚀 totalPickPages prop 사용
  handlePickPageChange, // 🚀 handlePickPageChange prop 사용
  totalCompaniesCount, // 전체 기업 수
  totalAppliedCompaniesCount, // 전체 지원한 기업 수
  errorMessage,
}) => {
  const handleCompanyClick = (company: ComparisonCompanyDTO) => {
    const isSelected = selectedCompanies.some((c) => c.id === company.id);
    // 선택된 기업이 5개 이상이면 더 이상 선택할 수 없도록 막음
    if (selectedCompanies.length > 5 && !isSelected) {
      return;
    }
    isSelected ? onDeselect(company) : onSelect(company);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Stack
        padding={"24px"}
        bgcolor={colorChips.black_300}
        maxWidth={496}
        width={"100%"}
        gap={"24px"}
        borderRadius={"10px"}
        sx={{ ...modalStyle }}
      >
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typo color="input" content={title} className="text_B_20" />
          <Image
            width={32}
            height={32}
            src={"/assets/ic_delete.svg"}
            alt="close"
            onClick={handleClose}
          />
        </Box>
        <CustomInput.SearchInput
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          variation={keyword !== "" ? "right" : "left"}
          onClick={() => {
            setKeyword("");
          }}
        />
        <Stack gap={"12px"}>
          <Typo
            color="input"
            className="text_B_18"
            content={`최근 지원한 기업 (${totalAppliedCompaniesCount})`} //전체 기업 수
          />
          {appliedCompanies.map((company) => (
            <CustomListItem
              checked={true} // ✅ 항상 선택된 상태 유지
              key={company.id}
              listData={{
                image: company.image ?? "/assets/default-logo.svg",
                name: company.name,
                category: company.category.map((c) => c.category).join(", "),
              }}
              handleClick={undefined}
            />
          ))}
          <Box display="flex" justifyContent="center" mt={2}>
            {/* 🚀 pickPage를 사용한 페이지네이션 추가 */}
            <CustomPagination
              page={pickPage}
              count={totalPickPages}
              handleChange={(e, value) => handlePickPageChange(value)}
            />
          </Box>
        </Stack>
        <Stack gap={"12px"} pt={"16px"}>
          <Typo
            color="input"
            className="text_B_18"
            content={`검색결과 (${totalCompaniesCount})`} // 전체 검색된 기업 수
          />
          {companies.map((company) => (
            <CustomListItem
              selected={selectedCompanies.some((c) => c.id === company.id)}
              checked={selectedCompanies.some((c) => c.id === company.id)}
              key={company.id}
              listData={{
                image: company.image ?? "/assets/default-logo.svg",
                name: company.name,
                category: company.category.map((c) => c.category).join(", "),
              }}
              handleClick={() => handleCompanyClick(company)}
            />
          ))}
          {/* ✅ Error Message 표시 부분 추가 */}
          {errorMessage && (
            <Box mt={2} display="flex" justifyContent="left">
              <Typo
                color={colorChips.red_error}
                className="text_R_14"
                content={errorMessage}
              />
            </Box>
          )}
          <Box display="flex" justifyContent="center" mt={2}>
            <CustomPagination
              page={searchPage}
              count={totalSearchPages}
              handleChange={(e, value) => handleSearchPageChange(value)}
            />
          </Box>
        </Stack>
      </Stack>
    </Modal>
  );
};
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};
