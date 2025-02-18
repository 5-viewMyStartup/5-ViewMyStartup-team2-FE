import React, { useState, useEffect } from "react";
import { Stack, Box } from "@mui/material";
import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";
import { CompanySelectModal } from "./components/CompanySelectModal"; // 기업 선택 모달 컴포넌트
import { ComparisonCompanyDTO } from "@/global/types/data-contracts"; // 기업 데이터 타입
import { useCompanyFetch } from "../../core/useCompanyFetchHook"; // `useCompanyFetch` 훅 import
import { CompanyListQuery } from "@/global/types/data-contracts"; // 쿼리 파라미터 타입
import { useRouter } from "next/navigation";
import { useCompanyStore } from "@/app/company-comparison-page/store/useCompanyStore"; //zustand 상태 가져오기
import { CompanyCard } from "@/global/components/CompanyCard";

const CompanyListTitle: React.FC = () => {
  // const [selectedCompanies, setSelectedCompanies] = useState<CompanyDTO[]>([]); // 선택된 기업 목록
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const router = useRouter();

  // ✅ zustand에서 상태 및 액션 가져오기
  const {
    selectedAppliedCompanies, // 최근 지원한 기업 목록
    selectedSearchCompanies, // 검색 결과에서 선택한 기업 목록
    selectSearchCompany,
    deselectSearchCompany,
  } = useCompanyStore();

  const params: CompanyListQuery = {
    page: currentPage, // 현재페이지를 기준으로 API 요청
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

  // ✅ 기본 이미지를 적용하는 함수
  const defaultImage = "@/public/assets/default-company-img.svg";
  const formatSelectedCompanies = (companies: ComparisonCompanyDTO[]) => {
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
        {/* 선택된 기업이 하나라도 있으면 "(최대 5개)" 메시지 표시 */}
        {selectedSearchCompanies.length > 0 && (
          <Typo
            className="text_R_16"
            content="(최대 5개)"
            color={colorChips.white}
          />
        )}
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
            marginLeft: "auto", // ✅ 버튼을 오른쪽 끝으로 밀기
          }}
        >
          <Typo className="text_SB_16" content="기업 추가하기" />
        </button>
      </Stack>

      {/* 선택된 기업을 보여주는 두 번째 박스 */}
      <Box
        sx={{
          minHeight: "300px",
          backgroundColor: colorChips.black_300, // 배경색 지정
          padding: "8px", // 여백 추가
          borderRadius: "8px", // 모서리 둥글게
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* 선택된 기업이 없을 때의 메시지 */}
        {selectedSearchCompanies.length === 0 ? (
          <Typo
            className="text_R_14"
            content={
              "아직 추가한 기업이 없어요.\n버튼을 눌러 기업을 추가해보세요!"
            }
            color={colorChips.gray_200}
            customStyle={{
              textAlign: "center",
              whiteSpace: "pre-line", // ✅ 개행 문자(\n)를 줄바꿈으로 처리
            }}
          />
        ) : (
          // 선택된 기업들 CompanyCard로 표시
          <Stack
            direction="row"
            spacing={2}
            sx={{
              flexWrap: "nowrap",
              justifyContent: "center",
              gap: "16px",
              width: "100%",
              "@media (max-width: 743px)": {
                flexWrap: "wrap",
              },
            }}
          >
            {selectedSearchCompanies.map((company, index) => (
              <CompanyCard
                key={index}
                company={{
                  image:
                    company.image || "@/public/assets/default-company-img.svg", // 기본 이미지 처리
                  name: company.name,
                  category:
                    company.category && company.category.length > 0
                      ? company.category.join(", ")
                      : "기타",
                }}
                onRemove={() => deselectSearchCompany(company)} // ✅ 기업 삭제 기능 추가
                sx={companyCardStyles}
              />
            ))}
          </Stack>
        )}
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <button
          onClick={() => router.push("/company-comparison")} // ✅ 이동할 경로 설정
          disabled={selectedSearchCompanies.length === 0} // ✅ 선택한 기업이 없으면 비활성화
          style={{
            backgroundColor:
              selectedSearchCompanies.length === 0
                ? colorChips.gray_400 // 비활성화 시 색상
                : colorChips.brand_orange,
            color:
              selectedSearchCompanies.length === 0
                ? colorChips.gray_200 // 비활성화 시 글씨색
                : colorChips.white,
            width: "183px",
            height: "48px",
            border: "none",
            padding: "13px 48px",
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
  maxWidth: "100%",
  marginTop: "40px",
  marginBottom: "16px",
};

const companyCardStyles = {
  width: "calc(25% - 8px)", // 기본적으로 4개씩 가로 배치 (너비는 25%로 설정)
  maxWidth: "126px", // 카드의 최대 너비
  minWidth: "126px", // 카드의 최소 너비
  marginBottom: "16px", // 아래쪽 간격
  "@media (max-width: 743px)": {
    width: "calc(50% - 8px)", // 모바일 화면에서는 2개씩 배치
  },
};

export default CompanyListTitle;
