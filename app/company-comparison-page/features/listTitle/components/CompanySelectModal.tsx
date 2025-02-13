import { useEffect, useState } from "react";
import { CustomModal } from "@/global/components/modal/CustomModal";
import { CompanyDTO } from "@/global/types/data-contracts";
import { useCompanyFetch } from "../../../core/useCompanyFetchHook";
import { useApplicationFetch } from "@/app/company-comparison-page/core/useApplicationFetchHook";

interface CompanySelectModalProps {
  open: boolean;
  handleClose: () => void;
  selectedCompanies: CompanyDTO[];
  onSelect: (company: CompanyDTO) => void;
  onDeselect: (company: CompanyDTO) => void;
}

export const CompanySelectModal: React.FC<CompanySelectModalProps> = ({
  open,
  handleClose,
  selectedCompanies,
  onSelect,
  onDeselect,
}) => {
  // 🚀 기존 recentPage → pickPage로 변수명 변경
  const [searchPage, setSearchPage] = useState(1); // 검색 결과 페이지 상태 관리
  const [pickPage, setPickPage] = useState(1); // 🚀 최근 지원한 기업의 페이지 상태 관리
  const [keyword, setKeyword] = useState(""); // 검색어 상태 관리

  // API에서 검색된 기업 데이터 가져오기
  const {
    isLoading: isCompanyLoading,
    companies,
    totalPages: totalSearchPages,
  } = useCompanyFetch({ page: searchPage, keyword });

  // 🚀 최근 지원한 기업 데이터 가져오기 (변경된 변수명 반영)
  const {
    isLoading: isApplicationLoading,
    companies: appliedCompanies,
    totalPages: totalPickPages,
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
      selectedCompanies={selectedCompanies}
      onSelect={onSelect}
      onDeselect={onDeselect}
      isLoading={isCompanyLoading || isApplicationLoading}
      keyword={keyword}
      setKeyword={setKeyword}
      searchPage={searchPage}
      totalSearchPages={totalSearchPages}
      handleSearchPageChange={handleSearchPageChange}
      pickPage={pickPage} // 🚀 props에 pickPage 추가
      totalPickPages={totalPickPages} // 🚀 props에 totalPickPages 추가
      handlePickPageChange={handlePickPageChange} // 🚀 props에 handlePickPageChange 추가
    />
  );
};

// import { useEffect, useState } from "react";
// import { CustomModal } from "@/global/components/modal/CustomModal"; // CustomModal 컴포넌트 임포트
// import { CompanyDTO } from "@/global/types/data-contracts"; // CompanyDTO 임포트
// import { useCompanyFetch } from "../../../core/useCompanyFetchHook";
// import { useApplicationFetch } from "@/app/company-comparison-page/core/useApplicationFetchHook";
// import {
//   ComparisonSearchQuery,
//   ComparisonSearchResponse,
// } from "@/global/types/data-contracts";
// // import { useCompanyDefaultImg } from "@/global/hooks/useCompanyImg";

// interface CompanySelectModalProps {
//   open: boolean;
//   handleClose: () => void;
//   selectedCompanies: CompanyDTO[];
//   onSelect: (company: CompanyDTO) => void;
//   onDeselect: (company: CompanyDTO) => void;
// }

// export const CompanySelectModal: React.FC<CompanySelectModalProps> = ({
//   open,
//   handleClose,
//   selectedCompanies,
//   onSelect,
//   onDeselect,
// }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [keyword, setKeyword] = useState(""); // 검색어 관리

//   // 1️⃣ 검색된 기업 데이터 가져오기
//   const searchParams = { page: currentPage, keyword };
//   const { isLoading: isCompanyLoading, companies } =
//     useCompanyFetch(searchParams);

//   // 2️⃣ 최근 지원한 기업 데이터 가져오기 (초기값 testData 사용)
//   const testData: CompanyDTO[] = [
//     {
//       id: "1",
//       idx: "101",
//       name: "테스트 기업 1",
//       image: "/assets/logo.svg",
//       content: "이곳은 테스트 기업 1의 소개입니다.",
//       category: [
//         { id: "1", category: "에듀테크" },
//         { id: "2", category: "재테크" },
//       ],
//       salesRevenue: "100억",
//       employeeCnt: 50,
//       applicantCnt: 200,
//       createdAt: "2024-01-01T00:00:00Z",
//       updatedAt: "2024-02-01T00:00:00Z",
//     },
//     {
//       id: "2",
//       idx: "102",
//       name: "테스트 기업 2",
//       image: "/assets/logo.svg",
//       content: "이곳은 테스트 기업 2의 소개입니다.",
//       category: [{ id: "3", category: "애드테크" }],
//       salesRevenue: "200억",
//       employeeCnt: 100,
//       applicantCnt: 500,
//       createdAt: "2024-01-02T00:00:00Z",
//       updatedAt: "2024-02-02T00:00:00Z",
//     },
//   ];

//   const { isLoading: isApplicationLoading, companies: appliedCompanies } =
//     useApplicationFetch({ page: 1 });

//   const [displayedAppliedCompanies, setDisplayedAppliedCompanies] =
//     useState<CompanyDTO[]>(testData);

//   useEffect(() => {
//     if (
//       appliedCompanies.length > 0 &&
//       displayedAppliedCompanies !== appliedCompanies
//     ) {
//       setDisplayedAppliedCompanies(appliedCompanies);
//     }
//   }, [appliedCompanies, displayedAppliedCompanies]);

//   // 3️⃣ `CustomModal`에 넘길 props 구성
//   // ✅ 기본 이미지 적용 (훅 사용 없이 직접 처리)
//   const defaultImage = "/assets/default-company-img.svg";

//   const companyImages = companies.map((company) => ({
//     ...company,
//     image: company.image || defaultImage,
//     category: company.category || [], // ✅ 원래 타입 유지
//   }));

//   const appliedCompanyImages = displayedAppliedCompanies.map((company) => ({
//     ...company,
//     image: company.image || defaultImage,
//     category: company.category || [], // ✅ 원래 타입 유지
//   }));

//   useEffect(() => {
//     if (open) {
//       setCurrentPage(1);
//     }
//   }, [open]);
//   console.log("📌 모달에 전달되는 기업 리스트:", companyImages);
//   console.log(
//     "📌 모달에 전달되는 최근 지원 기업 리스트:",
//     appliedCompanyImages
//   );
//   return (
//     <CustomModal
//       title="기업 선택"
//       open={open}
//       handleClose={handleClose}
//       companies={companyImages}
//       appliedCompanies={appliedCompanyImages}
//       selectedCompanies={selectedCompanies}
//       onSelect={onSelect}
//       onDeselect={onDeselect}
//       isLoading={isCompanyLoading || isApplicationLoading}
//       keyword={keyword}
//       setKeyword={setKeyword}
//     />
//   );
// };
