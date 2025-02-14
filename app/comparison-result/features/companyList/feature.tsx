import { colorChips } from "@/global/styles/colorChips";
import { Stack } from "@mui/material";
import { CompanyItems } from "./components/CompanyItems";
import { Company } from "@/global/types/data-contracts";

interface CompanyListProps {
  companies: Company[];
}

export const CompanyList = {
  // 내가 선택한 기업 목록 컴포넌트
  Pick: function Pick({ companies }: CompanyListProps) {
    const data = companies;
    {
      console.log("흠 되나? : ", data);
    }
    return (
      <Stack sx={BookmarkListWrapperStyle}>
        {data.map((item, idx) => (
          <CompanyItems.Pick key={idx} itemData={item} />
        ))}
      </Stack>
    );
  },

  // 비교 결과용 기업 목록 컴포넌트
  Result: function Result({ companies }: CompanyListProps) {
    const data = companies;
    return (
      <Stack sx={companyListWrapperStyle}>
        {data.map((item, idx) => (
          <CompanyItems.Result key={idx} itemData={item} />
        ))}
      </Stack>
    );
  },

  // 기업 순위용 목록 컴포넌트
  Ranking: function Ranking({ companies }: CompanyListProps) {
    const data = companies;
    return (
      <Stack sx={companyListWrapperStyle}>
        {data.map((item, idx) => (
          <CompanyItems.Ranking key={idx} itemData={item} />
        ))}
      </Stack>
    );
  },
};

const companyListWrapperStyle = {
  width: { xs: "696px", sm: "696px", md: "1200px" },
  borderRadius: "4px",
  flexDirection: "column",
  backgroundColor: colorChips.black_300,
};

const BookmarkListWrapperStyle = {
  width: { xs: "696px", sm: "696px", md: "1200px" },
  flexDirection: "row",
  backgroundColor: colorChips.black_300,
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
};
