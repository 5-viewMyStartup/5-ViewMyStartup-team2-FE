import { Box, Stack } from "@mui/material";
import { Features } from "./features";
import { Single } from "./single";
import { useCallback, useState } from "react";
import { ApplicationListQuery } from "@/global/types/data-contracts";
import { useApplicationFetch } from "./core/applicationsFetchHook";

export default function Page() {
  const [params, setParams] = useState<ApplicationListQuery>({
    page: 1, //기본 1페이지
    filter: "all", //정렬 기준: 전체
  });

  /**
   * 파라미터 업데이트
   * @description 기존의 파라미터 복사, 새로운 파라미터를 기존 상태에 추가(덮어씌우기)
   */
  const updateParams = useCallback((newParams: ApplicationListQuery): void => {
    setParams((prev) => ({ ...prev, ...newParams }));
  }, []);

  //api호출
  const { applications, totalPages, isLoading } = useApplicationFetch(params);
  const totalPageCount = totalPages; //백엔드에서 계산해둔 전체 페이지 수 받아오기

  const isShowSkeleton = isLoading || !applications.length;

  return (
    <Stack sx={ListLayout}>
      <Features.ListTitle />

      <Box sx={scrollWrapper}>
        <Box sx={listWrapperStyle}>
          <Single.ListLabel />
          <Features.CompanyList />
        </Box>
      </Box>

      <Features.ListPagination
        page={params.page ?? 1}
        count={totalPageCount}
        onPageChange={(page) => updateParams({ page })}
      />
    </Stack>
  );
}

const ListLayout = {
  pt: "40px",
  pb: "140px",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
};

const scrollWrapper = {
  width: "100vw",
  overflow: "hidden",
  position: "relative",
};

// 실제 스크롤되는 컨텐츠
const listWrapperStyle = {
  width: "100%",
  pl: { xs: "16px", sm: "0" },
  pr: { xs: "16px", sm: "0" },
  display: "flex",
  flexDirection: "column",
  alignItems: { xs: "flex-start", sm: "center" },
  overflowX: "auto",
  whiteSpace: "nowrap",
  WebkitOverflowScrolling: "touch",
  // 스크롤바 스타일링
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
};
