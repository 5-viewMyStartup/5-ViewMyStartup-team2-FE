import { Stack } from "@mui/material";
import { CompanyItems } from "./components/CompanyItems";
import { ComparisonCompanyDTO } from "@/global/types/data-contracts";

interface CompanyListProps {
  applications: ComparisonCompanyDTO[];
  page: number | undefined;
}

export default function CompanyList({
  applications,
  page = 1,
}: CompanyListProps) {
  return (
    <Stack>
      {applications.map((item, idx) => (
        <CompanyItems
          key={idx}
          order={(page - 1) * 10 + idx + 1}
          itemData={item}
        />
      ))}
    </Stack>
  );
}
