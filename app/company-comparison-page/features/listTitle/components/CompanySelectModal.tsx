import { useEffect, useState } from "react";
import { CustomModal } from "@/global/components/modal/CustomModal";
import { CompanyDTO } from "@/global/types/data-contracts";
import { useCompanyFetch } from "../../../core/useCompanyFetchHook";
import { useApplicationFetch } from "@/app/company-comparison-page/core/useApplicationFetchHook";
import { useCompanyStore } from "@/app/company-comparison-page/store/useCompanyStore"; //zustand 상태 가져오기

interface CompanySelectModalProps {
  open: boolean;
  handleClose: () => void;
  // selectedCompanies: CompanyDTO[];
  // onSelect: (company: CompanyDTO) => void;
  // onDeselect: (company: CompanyDTO) => void;
}

export const CompanySelectModal: React.FC<CompanySelectModalProps> = ({
  open,
  handleClose,
  // selectedCompanies,
  // onSelect,
  // onDeselect,
}) => {
  // ✅ zustand에서 상태 및 액션 가져오기
  const { selectedCompanies, selectCompany, deselectCompany } =
    useCompanyStore();

  // 검색 결과 및 최근 지원한 기업 상태 관리
  const [searchPage, setSearchPage] = useState(1); // 검색 결과 페이지 상태 관리
  const [pickPage, setPickPage] = useState(1); // 🚀 최근 지원한 기업의 페이지 상태 관리
  const [keyword, setKeyword] = useState(""); // 검색어 상태 관리

  // API에서 검색된 기업 데이터 가져오기
  const {
    isLoading: isCompanyLoading,
    companies,
    totalPages: totalSearchPages,
    totalCount: totalCompaniesCount, // 전체 검색된 기업 수
  } = useCompanyFetch({ page: searchPage, keyword });

  // 🚀 최근 지원한 기업 데이터 가져오기 (변경된 변수명 반영)
  const {
    isLoading: isApplicationLoading,
    companies: appliedCompanies,
    totalPages: totalPickPages,
    totalAppliedCompaniesCount, // 전체 지원한 기업 수
  } = useApplicationFetch({ page: pickPage });

  // 🚀 pickPage를 변경할 핸들러 함수 추가
  const handleSearchPageChange = (newPage: number) => setSearchPage(newPage);
  const handlePickPageChange = (newPage: number) => setPickPage(newPage); // 최근 지원한 기업의 페이지 변경

  useEffect(() => {
    if (open) {
      setSearchPage(1); // 모달이 열릴 때 검색 페이지 초기화
      setPickPage(1); // 🚀 모달이 열릴 때 pickPage도 초기화
    }
  }, [open]);

  return (
    <CustomModal
      title="기업 선택"
      open={open}
      handleClose={handleClose}
      companies={companies}
      appliedCompanies={appliedCompanies}
      selectedCompanies={selectedCompanies} //Zustand에서 가져온 선택된 기업 리스트
      onSelect={selectCompany} // 기업 선택 시 zustand 상태 업데이트
      onDeselect={deselectCompany} // 기업 선택 해제 시 zustand 상태 업데이트
      isLoading={isCompanyLoading || isApplicationLoading}
      keyword={keyword}
      setKeyword={setKeyword}
      searchPage={searchPage}
      totalSearchPages={totalSearchPages}
      totalCompaniesCount={totalCompaniesCount} // 전체 검색된 기업 수 전달
      handleSearchPageChange={handleSearchPageChange}
      pickPage={pickPage} // 🚀 props에 pickPage 추가
      totalPickPages={totalPickPages} // 🚀 props에 totalPickPages 추가
      handlePickPageChange={handlePickPageChange} // 🚀 props에 handlePickPageChange 추가
      totalAppliedCompaniesCount={totalAppliedCompaniesCount} // 전체 지원한 기업 수 전달
    />
  );
};
