import { Stack } from "@mui/material";
import { companyListWrapperStyle } from "@/global/styles/companyListStyles";
import { CompanyItems } from "./components/CompanyItems";
import { ApplicationDTO } from "@/global/types/data-contracts";

interface CompanyListProps {
  applications: (ApplicationDTO & { companyId: string })[];
  page: number | undefined;
}

export default function CompanyList({
  applications,
  page = 1,
}: CompanyListProps) {
  return (
    <Stack sx={companyListWrapperStyle}>
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
