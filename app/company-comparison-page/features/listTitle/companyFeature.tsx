import { useState } from "react";
import { Stack, Box } from "@mui/material";
import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";
import { CompanySelectModal } from "./components/CompanySelectModal"; // 기업 선택 모달 컴포넌트
import { useRouter } from "next/navigation";
import { useCompanyStore } from "@/app/company-comparison-page/store/useCompanyStore"; //zustand 상태 가져오기
import { CompanyCard } from "@/global/components/CompanyCard";

const CompanyListTitle: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태
  const router = useRouter();

  // ✅ zustand에서 상태 및 액션 가져오기
  const {
    selectedSearchCompanies, // 검색 결과에서 선택한 기업 목록
    deselectSearchCompany,
  } = useCompanyStore();

  // 모달 열기
  const handleOpenModal = () => setModalOpen(true);

  // 모달 닫기
  const handleCloseModal = () => setModalOpen(false);

  // ✅ 기본 이미지를 적용하는 함수

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
          height: "300px",
          backgroundColor: colorChips.black_300, // 배경색 지정
          padding: "56px 253px", // 여백 추가
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
          <Stack direction="row" spacing={2}>
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
              />
            ))}
          </Stack>
        )}
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <button
          onClick={() => router.push("/comparison-result")} // ✅ 이동할 경로 설정
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

export default CompanyListTitle;
