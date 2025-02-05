import { Box, Stack } from "@mui/material";
import { Features } from "./features";
import { Single } from "./single";
// import { SkeletonCompanyList } from "@/global/components/SkeletonCompanyItems";
import {
  listLayout,
  listWrapperStyle,
  scrollWrapper,
} from "@/global/styles/companyListStyles";

export default function Main() {
  return (
    <Stack sx={listLayout}>
      <Features.ListTitle />

      <Box sx={scrollWrapper}>
        <Box sx={listWrapperStyle}>
          <Single.ListLabel />
          <Features.CompanyList />
        </Box>
      </Box>

      <Features.ListPagination />
    </Stack>
  );
}
