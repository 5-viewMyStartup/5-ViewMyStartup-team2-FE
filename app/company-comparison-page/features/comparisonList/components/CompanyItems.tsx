import { colorChips } from "@/global/styles/colorChips"; // 색상 관련 상수 임포트
import { Typo } from "@/global/styles/Typo"; // 텍스트 스타일을 위한 컴포넌트 임포트
import { ComparisonCompanyDTO } from "@/global/types/data-contracts"; // ApplicationDTO 타입 임포트
import { Box, Stack } from "@mui/material"; // MUI의 Box와 Stack 컴포넌트 임포트
import { useCompanyDefaultImg } from "@/global/hooks/useCompanyImg";
import Image from "next/image";

interface CompanyItemsProps {
  order: number;
  itemData: ComparisonCompanyDTO;
}

export function CompanyItems({ itemData }: CompanyItemsProps) {
  const { imgSrc, handleImgErr } = useCompanyDefaultImg(itemData.image); // 이미지 처리 훅
  return (
    <Stack>
      <Box>
        {/* 기업 로고 및 이름, 카테고리 표시 */}
        <Image
          src={imgSrc} // 이미지 URL (커스텀 훅에서 처리)
          alt="기업 대표 이미지"
          width={32} // 이미지 너비
          height={32} // 이미지 높이
          onError={handleImgErr} // 이미지 오류 처리
          style={{ borderRadius: "50%" }} // 원형 이미지
        />
        <Typo
          className="text_M_14"
          content={itemData.name} // 기업 이름
          color={colorChips.white} // 흰색 텍스트
          customStyle={{
            textAlign: "center", // 가운데 정렬
            overflow: "hidden", // 텍스트 넘침 방지
          }}
        />
      </Box>
      <Box>
        {/* 카테고리 표시 */}
        <Typo
          className="text_R_14"
          content={itemData.category.map((cat) => cat.category).join(", ")} // 카테고리 배열을 문자열로 합쳐서 표시
          color={colorChips.gray_100} // 회색 텍스트
          customStyle={{ textAlign: "center" }} // 가운데 정렬
        />
      </Box>
    </Stack>
  );
}
