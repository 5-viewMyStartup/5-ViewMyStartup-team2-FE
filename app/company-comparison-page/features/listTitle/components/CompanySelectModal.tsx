import { useEffect, useState } from "react";
import { CustomModal } from "@/global/components/modal/CustomModal";
import { ComparisonCompanyDTO } from "@/global/types/data-contracts";
import { useCompanyFetch } from "../../../core/useCompanyFetchHook";
import { useApplicationFetch } from "@/app/company-comparison-page/core/useApplicationFetchHook";
import { useCompanyStore } from "@/app/company-comparison-page/store/useCompanyStore"; //zustand 상태 가져오기

interface CompanySelectModalProps {
  open: boolean;
  handleClose: () => void;
}

export const CompanySelectModal: React.FC<CompanySelectModalProps> = ({
  open,
  handleClose,
}) => {
  // ✅ zustand에서 상태 및 액션 가져오기
  const {
    selectedSearchCompanies,
    setAppliedCompanies,
    selectSearchCompany,
    deselectSearchCompany,
  } = useCompanyStore();

  // 검색 결과 및 최근 지원한 기업 상태 관리
  const [searchPage, setSearchPage] = useState(1); // 검색 결과 페이지 상태 관리
  const [keyword, setKeyword] = useState(""); // 검색어 상태 관리
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  // API에서 검색된 기업 데이터 가져오기
  const {
    isLoading: isCompanyLoading,
    companies,
    totalPages: totalSearchPages,
    totalCount: totalCompaniesCount, // 전체 검색된 기업 수
  } = useCompanyFetch({ page: searchPage, keyword });

  // ✅ 최근 지원한 기업 데이터 가져오기 (1페이지만)
  const { isLoading: isApplicationLoading, companies: appliedCompanies } =
    useApplicationFetch();

  useEffect(() => {
    if (open) {
      setSearchPage(1);
      setAppliedCompanies(appliedCompanies);
      setErrorMessage(undefined);
    }
  }, [open, appliedCompanies, setAppliedCompanies]);

  const handleSelectCompany = (company: ComparisonCompanyDTO) => {
    if (selectedSearchCompanies.length >= 5) {
      setErrorMessage("*비교할 기업은 최대 5개까지 선택 가능합니다.");
      return;
    }
    setErrorMessage(undefined);
    selectSearchCompany(company);
  };

  return (
    <CustomModal
      title="기업 선택"
      open={open}
      handleClose={handleClose}
      companies={companies}
      appliedCompanies={appliedCompanies}
      selectedCompanies={selectedSearchCompanies} //Zustand에서 가져온 선택된 기업 리스트
      onSelect={handleSelectCompany} // 기업 선택 시 zustand 상태 업데이트
      onDeselect={deselectSearchCompany} // 기업 선택 해제 시 zustand 상태 업데이트
      isLoading={isCompanyLoading || isApplicationLoading}
      keyword={keyword}
      setKeyword={setKeyword}
      searchPage={searchPage}
      totalSearchPages={totalSearchPages}
      totalCompaniesCount={totalCompaniesCount} // 전체 검색된 기업 수 전달
      handleSearchPageChange={setSearchPage}
      errorMessage={errorMessage} // 🚀 에러 메시지 전달
    />
  );
};
