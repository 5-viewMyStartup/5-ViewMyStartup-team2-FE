import { ResultCompany } from "@/global/types/data-contracts";
import { CompanyItems } from "./components/CompanyItems";
import { companyListWrapperStyle } from "@/global/styles/companyListStyles";
import Stack from "@mui/material/Stack";
import { colorChips } from "@/global/styles/colorChips";

interface CompanyListProps {
  companies: ResultCompany[];
  dropdownValue?: keyof ResultCompany; // dropdownValue는 선택적 속성으로 변경
}

export const CompanyList = {
  Pick: function ({ companies }: { companies: ResultCompany[] }) {
    return (
      <Stack sx={pickListWrapperStyle}>
        {companies.map((company) => (
          <CompanyItems.Pick key={company.id} itemData={company} />
        ))}
      </Stack>
    );
  },

  Result: function ({ companies }: { companies: ResultCompany[] }) {
    return (
      <Stack sx={companyListWrapperStyle}>
        {companies.map((company) => (
          <CompanyItems.Result key={company.id} itemData={company} />
        ))}
      </Stack>
    );
  },

  Ranking: function ({ companies, dropdownValue }: CompanyListProps) {
    return (
      <Stack sx={companyListWrapperStyle}>
        {companies.map((company) => (
          <CompanyItems.Ranking
            key={company.id}
            itemData={company}
            dropdownValue={dropdownValue!} // dropdownValue는 필수 속성으로 전달
          />
        ))}
      </Stack>
    );
  },
};

const pickListWrapperStyle = {
  width: { xs: "696px", sm: "696px", md: "1200px" },
  height: "300px",
  borderRadius: "4px",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colorChips.black_300,
};
