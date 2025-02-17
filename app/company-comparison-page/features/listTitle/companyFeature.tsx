import React, { useState, useEffect } from "react";
import { Stack, Box } from "@mui/material";
import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";
import { CompanySelectModal } from "./components/CompanySelectModal"; // 기업 선택 모달 컴포넌트
import { CompanyDTO } from "@/global/types/data-contracts"; // 기업 데이터 타입
import { useCompanyFetch } from "../../core/useCompanyFetchHook"; // `useCompanyFetch` 훅 import
import { CompanyListQuery } from "@/global/types/data-contracts"; // 쿼리 파라미터 타입
import { useRouter } from "next/navigation";
import { useCompanyStore } from "@/app/company-comparison-page/store/useCompanyStore"; //zustand 상태 가져오기

const CompanyListTitle: React.FC = () => {
  // const [selectedCompanies, setSelectedCompanies] = useState<CompanyDTO[]>([]); // 선택된 기업 목록
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const router = useRouter();

  // ✅ zustand에서 상태 및 액션 가져오기
  const { selectedCompanies, selectCompany, deselectCompany } =
    useCompanyStore();

  const params: CompanyListQuery = {
    page: currentPage,
  };

  // `useCompanyFetch` 훅을 사용하여 기업 목록 불러오기
  const { isLoading, companies = [], totalPages } = useCompanyFetch(params); // `companies`가 undefined일 경우 빈 배열로 설정

  useEffect(() => {
    if (!isLoading && companies.length > 0) {
      setLoading(false); // 로딩이 끝났으면 false
    }
  }, [isLoading, companies]); // isLoading과 companies 상태에 따라 effect 실행

  // 페이지가 변경될 때마다 호출되는 useEffect
  useEffect(() => {
    if (currentPage > 0) {
      setLoading(true); // 페이지 변경 시 로딩 상태 true로 설정
    }
  }, [currentPage]); // currentPage 값 변경될 때마다 호출

  // 모달 열기
  const handleOpenModal = () => setModalOpen(true);

  // 모달 닫기
  const handleCloseModal = () => setModalOpen(false);

  // // 기업 선택 처리
  // const handleSelectCompany = (company: CompanyDTO) => {
  //   console.log("📌✅ 기업 선택됨:", company);
  //   setSelectedCompanies((prev) => [...prev, company]); // 선택된 기업 추가
  // };

  // // 기업 선택 해제 처리
  // const handleDeselectCompany = (company: CompanyDTO) => {
  //   setSelectedCompanies((prev) => prev.filter((c) => c.name !== company.name)); // 선택된 기업 삭제
  // };

  // ✅ 기본 이미지를 적용하는 함수
  const defaultImage = "/assets/default-company-img.svg";
  const formatSelectedCompanies = (companies: CompanyDTO[]) => {
    return companies.map((company) => ({
      ...company,
      image: company.image || defaultImage, // 기본 이미지 적용
      category: company.category || [],
    }));
  };

  return (
    <Stack sx={{ width: "100%" }}>
      {/* 회사 목록 타이틀 */}
      <Stack sx={listHeaderContainerStyle}>
        <Typo
          className="text_B_20"
          content="어떤 기업이 궁금하세요?"
          color={colorChips.white}
        />
        <button
          onClick={handleOpenModal} // 버튼 클릭 시 모달 열기
          style={{
            backgroundColor: colorChips.brand_orange,
            color: colorChips.white,
            height: "40px",
            border: "none",
            padding: "8px 24px",
            borderRadius: "50px",
            cursor: "pointer",
          }}
        >
          <Typo className="text_SB_16" content="기업 추가하기" />
        </button>
      </Stack>

      {/* 선택된 기업을 보여주는 두 번째 박스 */}
      <Box
        sx={{
          backgroundColor: colorChips.black_300, // 배경색 지정
          padding: "56px 253px", // 여백 추가
          borderRadius: "8px", // 모서리 둥글게
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* 선택된 기업이 없을 때의 메시지 */}
        {selectedCompanies.length === 0 ? (
          <Typo
            className="text_R_14"
            content="아직 추가한 기업이 없어요, 
            버튼을 눌러 기업을 추가해보세요!"
            color={colorChips.gray_200}
            customStyle={{
              textAlign: "center",
              whiteSpace: "nowrap", // 텍스트 줄바꿈 방지
            }}
          />
        ) : (
          // 선택된 기업들 표시
          <Stack direction="row">
            {selectedCompanies.map((company, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex", // ✅ 전체를 flex 컨테이너로
                  flexDirection: "column", // ✅ 이미지, 이름, 카테고리를 세로 배치
                  alignItems: "center", // ✅ 가로 정렬 (중앙 정렬)
                  padding: "8px",
                  backgroundColor: colorChips.gray_400,
                  borderRadius: "8px",
                }}
              >
                <img
                  src={company.image}
                  alt={company.name}
                  style={{ width: "80px", height: "80px", borderRadius: "50%" }}
                />
                <Typo
                  className="text_M_16"
                  content={company.name}
                  color={colorChips.white}
                />
                <Typo
                  className="text_R_14"
                  content={
                    company.category && company.category.length > 0
                      ? company.category.join(", ") // 직접 join() 사용
                      : "기타"
                  }
                  color={colorChips.gray_200}
                />
              </Box>
            ))}
          </Stack>
        )}
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <button
          onClick={() => router.push("/company-comparison")} // ✅ 이동할 경로 설정
          disabled={selectedCompanies.length === 0} // ✅ 선택한 기업이 없으면 비활성화
          style={{
            backgroundColor:
              selectedCompanies.length === 0
                ? colorChips.gray_400 // 비활성화 시 색상
                : colorChips.brand_orange,
            color:
              selectedCompanies.length === 0
                ? colorChips.gray_200 // 비활성화 시 글씨색
                : colorChips.white,
            height: "40px",
            border: "none",
            padding: "8px 24px",
            borderRadius: "50px",
            cursor: "pointer",
          }}
        >
          <Typo className="text_SB_16" content="기업 비교하기" />
        </button>
      </Box>
      {/* 모달 컴포넌트 */}
      <CompanySelectModal
        open={modalOpen}
        handleClose={handleCloseModal}
        // onSelect={selectCompany} //zustand 사용
        // onDeselect={deselectCompany} //zustand 사용
        // selectedCompanies={formatSelectedCompanies(selectedCompanies)} // 기본 이미지가 포함된 데이터 전달
      />
    </Stack>
  );
};

// 스타일 정의 (listHeaderContainerStyle)
const listHeaderContainerStyle = {
  flexDirection: "row" as const,
  justifyContent: "space-between",
  alignItems: "center",
  height: ["40px", "48px"],
  width: "100%",
  maxWidth: { sm: "696px", md: "1200px" },
};

export default CompanyListTitle;
