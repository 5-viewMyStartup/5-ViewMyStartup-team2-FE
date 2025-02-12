import { Box, Skeleton, Stack } from "@mui/material";
import { colorChips } from "../styles/colorChips";
import {
  companyItemBoxStyle,
  companyListWrapperStyle,
  itemNameBoxStyle,
  labelDataBoxStyle,
  labelDescBoxStyle,
  labelOrderBoxStyle,
} from "../styles/companyListStyles";

export function SkeletonCompanyItems() {
  return (
    <Stack sx={companyItemBoxStyle}>
      <Box sx={{ ...labelOrderBoxStyle, padding: "20px" }}>
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: colorChips.gray_300,
            borderRadius: "4px",
          }}
        />
      </Box>
      <Box sx={{ ...itemNameBoxStyle, padding: "20px" }}>
        <Skeleton
          variant="circular"
          width={32}
          height={32}
          sx={{ backgroundColor: colorChips.gray_300 }}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: "60%",
            height: "100%",
            backgroundColor: colorChips.gray_300,
            borderRadius: "4px",
          }}
        />
      </Box>
      <Box
        sx={{
          ...labelDescBoxStyle,
          padding: "20px",
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: colorChips.gray_300,
            borderRadius: "4px",
          }}
        />
      </Box>
      {Array.from({ length: 4 }).map((_, idx) => (
        <Box sx={{ ...labelDataBoxStyle, padding: "20px" }} key={idx}>
          <Skeleton
            variant="rectangular"
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: colorChips.gray_300,
              borderRadius: "4px",
            }}
          />
        </Box>
      ))}
    </Stack>
  );
}

export function SkeletonCompanyList() {
  return (
    <Stack sx={companyListWrapperStyle}>
      {Array.from({ length: 10 }).map((_, idx) => (
        <SkeletonCompanyItems key={idx} />
      ))}
    </Stack>
  );
}
