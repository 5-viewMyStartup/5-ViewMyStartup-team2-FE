import { Box, Skeleton, Stack } from "@mui/material";
import { colorChips } from "@/global/styles/colorChips";

// 공통 스타일
const baseLabelBoxStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const commonSkeletonStyle = {
  backgroundColor: colorChips.gray_300,
  borderRadius: "4px",
};

// 기존 스타일들
const labelDescBoxStyle = {
  ...baseLabelBoxStyle,
  width: ["180px", "180px", "304px"],
};

const companyItemBoxStyle = {
  cursor: "pointer",
  flexDirection: "row",
  height: "64px",
  borderBottom: `1px solid ${colorChips.gray_300}`,
  "&:last-child": {
    borderBottom: "none",
  },
};

const labelDataBoxStyle = {
  ...baseLabelBoxStyle,
  width: ["91.5px", "91.5px", "153.75px"],
};

const itemNameBoxStyle = {
  display: "flex",
  alignItems: "center",
  gap: ["8px", "8px", "12px"],
  pl: ["16px", "16px", "24px"],
  pr: ["6px", "6px", "24px"],
  width: ["150px", "150px", "216px"],
};

const companyListWrapperStyle = {
  width: { xs: "696px", sm: "696px", md: "1200px" },
  borderRadius: "4px",
  flexDirection: "column",
  backgroundColor: colorChips.black_300,
};

const labelOrderBoxStyle = {
  ...baseLabelBoxStyle,
  display: "flex",
  width: ["50px", "50px", "68px"],
};

// PickSkeleton: 이미지, 회사이름, 카테고리를 세로로 배치
const groupContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  width: "20%", // 5개가 한 줄에 들어가도록 (100% / 5)
  boxSizing: "border-box",
};

const containerStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
  justifyContent: "flex-start",
};

export function PickSkeleton() {
  return (
    <Box sx={containerStyle}>
      <Box sx={groupContainerStyle}>
        {/* 이미지 */}
        <Skeleton
          variant="circular"
          width={64}
          height={64}
          sx={commonSkeletonStyle}
        />
        {/* 회사이름 */}
        <Box sx={{ mt: "12px", width: "80%" }}>
          <Skeleton
            variant="rectangular"
            height={20}
            sx={{
              width: "100%",
              ...commonSkeletonStyle,
            }}
          />
        </Box>
        {/* 카테고리 */}
        <Box sx={{ mt: "8px", width: "60%" }}>
          <Skeleton
            variant="rectangular"
            height={16}
            sx={{
              width: "100%",
              ...commonSkeletonStyle,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

// PickSkeletonList: PickSkeleton을 5개 렌더링 (재귀 호출 오류 수정)
export function PickSkeletonList() {
  return (
    <Stack sx={companyListWrapperStyle}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <PickSkeleton key={idx} />
      ))}
    </Stack>
  );
}

export function ResultSkeleton() {
  return (
    <Stack sx={companyItemBoxStyle}>
      <Box sx={{ ...itemNameBoxStyle, padding: "20px" }}>
        <Skeleton
          variant="circular"
          width={32}
          height={32}
          sx={commonSkeletonStyle}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: "60%",
            height: "100%",
            ...commonSkeletonStyle,
          }}
        />
      </Box>
      <Box sx={{ ...labelDescBoxStyle, padding: "20px" }}>
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: "100%",
            ...commonSkeletonStyle,
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
              ...commonSkeletonStyle,
            }}
          />
        </Box>
      ))}
    </Stack>
  );
}

export function ResultSkeletonList() {
  return (
    <Stack sx={companyListWrapperStyle}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <ResultSkeleton key={idx} />
      ))}
    </Stack>
  );
}

export function RankSkeleton() {
  return (
    <Stack sx={companyItemBoxStyle}>
      <Box sx={{ ...labelOrderBoxStyle, padding: "20px" }}>
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: "100%",
            ...commonSkeletonStyle,
          }}
        />
      </Box>
      <Box sx={{ ...itemNameBoxStyle, padding: "20px" }}>
        <Skeleton
          variant="circular"
          width={32}
          height={32}
          sx={commonSkeletonStyle}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: "60%",
            height: "100%",
            ...commonSkeletonStyle,
          }}
        />
      </Box>
      <Box sx={{ ...labelDescBoxStyle, padding: "20px" }}>
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: "100%",
            ...commonSkeletonStyle,
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
              ...commonSkeletonStyle,
            }}
          />
        </Box>
      ))}
    </Stack>
  );
}

export function RankSkeletonList() {
  return (
    <Stack sx={companyListWrapperStyle}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <RankSkeleton key={idx} />
      ))}
    </Stack>
  );
}
