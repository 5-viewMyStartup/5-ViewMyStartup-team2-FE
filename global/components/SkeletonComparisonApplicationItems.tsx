import { Box, Skeleton, Stack } from "@mui/material";
import { colorChips } from "@/global/styles/colorChips";

const skeletonItemStyle = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  gap: "8px",
  padding: "16px",
  borderRadius: "8px",
  backgroundColor: colorChips.black_300,
  width: "114px", // ✅ 개별 아이템의 크기를 고정
  flexBasis: "15%", // ✅ 한 줄에 5개 배치
};

// ✅ 개별 스켈레톤 아이템 (기업 카드)
function SkeletonApplicationItems() {
  return (
    <Box sx={skeletonItemStyle}>
      {/* 기업 이미지 (80x80 원형) */}
      <Skeleton
        variant="circular"
        width={80}
        height={80}
        sx={{ backgroundColor: colorChips.gray_300 }}
      />

      {/* 기업명 */}
      <Skeleton
        variant="rectangular"
        width={100}
        height={20}
        sx={{ backgroundColor: colorChips.gray_300, borderRadius: "4px" }}
      />

      {/* 기업 카테고리 */}
      <Skeleton
        variant="rectangular"
        width={100}
        height={16}
        sx={{ backgroundColor: colorChips.gray_300, borderRadius: "4px" }}
      />
    </Box>
  );
}

// ✅ 가로 정렬된 스켈레톤 리스트
export function SkeletonApplicationList() {
  return (
    <Stack
      direction="row" // ✅ 가로 정렬
      spacing={2} // ✅ 아이템 간 간격 설정
      sx={{
        width: "100%", // ✅ 부모 컨테이너의 너비를 충분히 확보
        maxWidth: "600px", // ✅ 한 줄에 5개가 들어갈 수 있도록 조정
        justifyContent: "center", // ✅ 균등한 간격 배치
        flexWrap: "nowrap", // ✅ 줄바꿈 방지
        margin: "0 auto", // ✅ 중앙 정렬
        gap: "16px",
      }}
    >
      {Array.from({ length: 5 }).map((_, idx) => (
        <SkeletonApplicationItems key={idx} />
      ))}
    </Stack>
  );
}
