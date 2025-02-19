import { Box, Skeleton } from "@mui/material";
import { colorChips } from "@/global/styles/colorChips";

const skeletonItemStyle = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  gap: "8px",
  borderRadius: "8px",
  backgroundColor: colorChips.black_300,
  width: "126px", // 기본 너비
};

// ✅ 개별 스켈레톤 아이템
function SkeletonApplicationItems() {
  return (
    <Box sx={skeletonItemStyle}>
      <Skeleton
        variant="circular"
        width={80}
        height={80}
        sx={{ backgroundColor: colorChips.gray_300 }}
      />
      <Skeleton
        variant="rectangular"
        width={80}
        height={20}
        sx={{ backgroundColor: colorChips.gray_300, borderRadius: "4px" }}
      />
      <Skeleton
        variant="rectangular"
        width={80}
        height={17}
        sx={{ backgroundColor: colorChips.gray_300, borderRadius: "4px" }}
      />
    </Box>
  );
}

// ✅ 가로 정렬된 스켈레톤 리스트
export function SkeletonApplicationList() {
  return (
    <Box
      sx={{
        backgroundColor: colorChips.black_300,
        padding: "85px 8px",
        borderRadius: "8px",
        display: "flex",
        flexWrap: "wrap", // flexWrap을 "wrap"으로 설정하여 줄바꿈 가능
        justifyContent: "center", // 항목들을 가운데 정렬
        gap: "16px", // 항목 간 간격
        "@media (max-width: 743px)": {
          // 화면 크기가 743px 이하일 때 3개-2개 배치 되도록 설정
          width: "100%",
          gap: "16px",
          "& > :nth-of-type(1), & > :nth-of-type(2), & > :nth-of-type(3)": {
            width: "calc(30% - 5px)", // 첫 번째 줄: 3개 배치
          },
          "& > :nth-of-type(4), & > :nth-of-type(5)": {
            width: "calc(30% - 5px)", // 두 번째 줄: 2개 배치
          },
        },
      }}
    >
      {Array.from({ length: 5 }).map((_, idx) => (
        <SkeletonApplicationItems key={idx} />
      ))}
    </Box>
  );
}
