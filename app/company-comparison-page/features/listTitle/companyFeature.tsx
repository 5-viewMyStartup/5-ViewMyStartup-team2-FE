import React, { useState, useEffect } from "react";
import { Stack, Box, CircularProgress } from "@mui/material";
import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";
import { CompanySelectModal } from "./components/CompanySelectModal"; // 기업 선택 모달 컴포넌트
import { useCompanyFetch } from "../../core/useCompanyFetchHook"; // `useCompanyFetch` 훅 import
import { CompanyListQuery } from "@/global/types/data-contracts"; // 쿼리 파라미터 타입
import { useRouter } from "next/navigation";
import { useCompanyStore } from "@/app/company-comparison-page/store/useCompanyStore"; //zustand 상태 가져오기
import { CompanyCard } from "@/global/components/CompanyCard";

const CompanyListTitle: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const router = useRouter();

  // ✅ zustand에서 상태 및 액션 가져오기
  const {
    selectedSearchCompanies, // 검색 결과에서 선택한 기업 목록

    deselectSearchCompany,
  } = useCompanyStore();

  const params: CompanyListQuery = {
    page: 1, // 현재페이지를 기준으로 API 요청
  };

  // `useCompanyFetch` 훅을 사용하여 기업 목록 불러오기
  const { isLoading, companies = [] } = useCompanyFetch(params); // `companies`가 undefined일 경우 빈 배열로 설정

  useEffect(() => {
    if (!isLoading && companies.length > 0) {
      setLoading(false); // 로딩이 끝났으면 false
    }
  }, [isLoading, companies]); // isLoading과 companies 상태에 따라 effect 실행

  // 모달 열기
  const handleOpenModal = () => setModalOpen(true);

  // 모달 닫기
  const handleCloseModal = () => setModalOpen(false);

  // ✅ 기본 이미지를 적용하는 함수
  const defaultImage = "@/public/assets/default-company-img.svg";

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
      {/* ✅ 로딩 상태 표시 */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "300px",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      ) : (
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
                    image: company.image || defaultImage, // 기본 이미지 처리
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
      )}
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
      <CompanySelectModal open={modalOpen} handleClose={handleCloseModal} />
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
