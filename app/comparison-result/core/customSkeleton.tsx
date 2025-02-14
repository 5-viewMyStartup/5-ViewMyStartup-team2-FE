import { Box, Skeleton, Stack } from "@mui/material";
import { colorChips } from "@/global/styles/colorChips";

/* ===============================
   Pick 스켈레톤 (내가 선택한 기업)
   실제 Pick: 이미지(80×80), 회사명(text_M_20), 카테고리(text_M_18)
=============================== */
const PickItemBoxStyle = {
  display: "flex",
  flexDirection: "column",
  height: "139px",
  alignItems: "center",
  justifyContent: "center",
  mr: "20px",
  "&:last-child": { mr: 0 },
};

export function SkeletonCompanyItemsPick() {
  return (
    <Stack
      sx={PickItemBoxStyle}
      direction="row"
      alignItems="center"
      spacing={2}
    >
      {/* 이미지 */}
      <Box>
        <Skeleton
          variant="circular"
          width={80}
          height={80}
          sx={{ backgroundColor: colorChips.gray_300 }}
        />
      </Box>
      {/* 회사명 */}
      <Box>
        <Skeleton
          variant="rectangular"
          width={150}
          height={24}
          sx={{
            backgroundColor: colorChips.gray_300,
            borderRadius: 1,
          }}
        />
      </Box>
      {/* 카테고리 */}
      <Box>
        <Skeleton
          variant="rectangular"
          width={100}
          height={20}
          sx={{
            backgroundColor: colorChips.gray_300,
            borderRadius: 1,
          }}
        />
      </Box>
    </Stack>
  );
}

/* ===============================
   Result 및 Ranking 스켈레톤
   전체 5줄(행)로 구성된 스켈레톤 – <Single.ListLabel.Result /> 의 높이와 폭에 맞게 조절
=============================== */
const fullFiveLineStyle = {
  width: "100%",
  p: "15px 16px",
};

export function SkeletonCompanyItemsResult() {
  return (
    <Stack spacing={1} sx={fullFiveLineStyle}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width="100%"
          height={20}
          sx={{ backgroundColor: colorChips.gray_300 }}
        />
      ))}
    </Stack>
  );
}

export function SkeletonCompanyItemsRanking() {
  return (
    <Stack spacing={1} sx={fullFiveLineStyle}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width="100%"
          height={20}
          sx={{ backgroundColor: colorChips.gray_300 }}
        />
      ))}
    </Stack>
  );
}
