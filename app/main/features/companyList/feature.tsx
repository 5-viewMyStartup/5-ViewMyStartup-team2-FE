import { Stack } from "@mui/material";
import { companyListWrapperStyle } from "@/global/styles/companyListStyles";
import { CompanyItems } from "./components/CompanyItems";
import { CompanyDTO } from "@/global/types/data-contracts";

interface CompanyListProps {
  companies: CompanyDTO[];
  page: number | undefined;
}

//TODO: 각 companyItems 로우 클릭했을 때, 해당 companyId로 라우팅되도록

export default function CompanyList({ companies, page = 1 }: CompanyListProps) {
  return (
    <Stack sx={companyListWrapperStyle}>
      {companies.map((item, idx) => (
        <CompanyItems
          key={idx}
          ranking={(page - 1) * 10 + idx + 1}
          itemData={item}
        />
      ))}
    </Stack>
  );
}
