import { colorChips } from "@/global/styles/colorChips"; // 색상 관련 상수 임포트
import { Typo } from "@/global/styles/Typo"; // 텍스트 스타일을 위한 컴포넌트 임포트
import { Stack } from "@mui/material";
import { companyListWrapperStyle } from "@/global/styles/companyListStyles";
import { ApplicationItems } from "./components/ApplicationItems";
import { ComparisonCompanyDTO } from "@/global/types/data-contracts";

interface ApplicationListProps {
  companies: ComparisonCompanyDTO[];
  page: number | undefined;
}

export default function applicationList({
  companies,
  page = 1,
}: ApplicationListProps) {
  // companies 비어 있으면 "지원한 기업이 없습니다." 메시지 출력
  if (companies.length === 0) {
    return (
      <Stack sx={companyListWrapperStyle}>
        <Typo
          className="text_M_14"
          content="현재 지원한 기업이 없습니다."
          color={colorChips.gray_200}
          customStyle={{
            textAlign: "center",
          }}
        />
      </Stack>
    );
  }
  return (
    <Stack sx={companyListWrapperStyle}>
      {companies.map((item, idx) => (
        <ApplicationItems
          key={idx}
          order={(page - 1) * 10 + idx + 1}
          itemData={item}
        />
      ))}
    </Stack>
  );
}
