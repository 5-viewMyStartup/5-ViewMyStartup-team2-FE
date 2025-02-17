"use client";
import { Typo } from "@/global/styles/Typo";
import { Box, Modal, Stack } from "@mui/material";
import Image from "next/image";
import CustomInput from "../input";
import { useState } from "react";
import { CustomListItem } from "../CustomListItem";
import { colorChips } from "@/global/styles/colorChips";
import { CompanyDTO } from "@/global/types/data-contracts";
import { CustomPagination } from "../CustomPagination";
// import { useCompanyDefaultImg } from "@/global/hooks/useCompanyImg";
//지금부터 수정!시작!!!
interface CustomModalProps {
  title: string;
  open: boolean;
  handleClose: () => void;
  companies: CompanyDTO[];
  appliedCompanies: CompanyDTO[];
  selectedCompanies: CompanyDTO[];
  onSelect: (company: CompanyDTO) => void;
  onDeselect: (company: CompanyDTO) => void;
  isLoading: boolean;
  keyword: string;
  setKeyword: (value: string) => void;
  searchPage: number;
  totalSearchPages: number;
  handleSearchPageChange: (page: number) => void;
  pickPage: number; // 🚀 새로운 prop 추가
  totalPickPages: number; // 🚀 새로운 prop 추가
  handlePickPageChange: (page: number) => void; // 🚀 새로운 prop 추가
  totalCompaniesCount: number; // 전체 기업 수 (검색 결과 전체)
  totalAppliedCompaniesCount: number; // 전체 지원한 기업 수
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
}) => {
  const handleCompanyClick = (company: CompanyDTO) => {
    const isSelected = selectedCompanies.some((c) => c.id === company.id);
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
