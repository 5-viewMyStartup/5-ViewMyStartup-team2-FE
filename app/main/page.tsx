"use client";

import { Box, Stack } from "@mui/material";
import { Features } from "./features";
import { Single } from "./single";
import { SkeletonCompanyList } from "@/global/components/SkeletonCompanyItems";
import { ListPagination } from "@/global/components/ListPagination";
import { useCallback, useState } from "react";
import { CompanyListQuery } from "@/global/types/data-contracts";
import { useCompanyListFetch } from "./core/companiesFetchHook";
import {
  listLayout,
  listWrapperStyle,
  scrollWrapper,
} from "@/global/styles/companyListStyles";

//TODO: 백엔드 api 불러와서 목데이터랑 totalPages 지우기
const totalPages = 5;

const companies = [
  {
    id: "22",
    idx: "22",
    name: "코드잇",
    image:
      "https://s3-alpha-sig.figma.com/img/14ea/2072/7d797dc61be213072dfdfe95dc9d2494?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=NDjzJ4~YCVsb5sToJq49pE63fuvnB6MksZU3tEKQhmRkJ3PZ6iOq-XL82aHpZ56F8TZwkzwjwjwGPt6Qe1yH~NEye~NRFF~o3yVNdG0Zg8oBkZAkmOM3oTVmoA5Xh8J-X3~6cTjYSLjNtP3ObTC7d-NwCaeQmkw12r5hH3rOmsVjk~~Crx6yMTqdQZRdSmaIW6e0pPek6U1kTdphUWYbfx2koA7DS02NtHR3oFBfeLqTl4du5gomP2XRk3-CYc8CwFO0VMk0p5f~CX478UzYf2Ogzsasj9~SZxFEt0pmlS3JsfFfrpsUdV-Xt94zKisHvRrkLbdw0r3nKGm5hrMsuA__",
    content:
      '코드잇은 온라인 코딩 교육 서비스를 운영하는 EdTech 스타트업입니다. 코딩 교육과 데이터 사이언스 교육에 대한 수요는 급격히 늘어나고 있지만, 아직까지 좋은 교육 서비스를 찾기란 쉽지 않습니다. 이를 해결하고자 코드잇은 모든 강의를 자체 제작하여 퀄리티 높은 콘텐츠를 제공하고, 동시에 코딩 교육에 최적화된 플랫폼을 개발하고 있습니다. 모든 강의를 마음껏 들을 수 있는 "코드잇 무제한 멤버십"을 제공하고 있으며, 지난 5년 동안 21만 명의 수강생과 평균 만족도 4.9점이라는 국내 교육 업계에서 보기 드문 성과를 달성하였습니다. 또한 콘텐츠와 기술력을 인정받아 2021년 10월 Series B 투자를 받아 누적 140억 원의 투자를 받았고, 현재 40여 명의 팀원이 같은 목표를 향해 나아가고 있습니다.',
    category: [{ id: "wer", category: "에듀테크" }],
    salesRevenue: "14000000000",
    employeeCnt: 50,
    applicantCnt: 12,
    createdAt: "2025-02-14",
    updatedAt: "2025-02-15",
  },
  {
    id: "22",
    idx: "22",
    name: "뤼이드",
    image: "/#fdsa",
    content:
      '뤼이드는 온라인 코딩 교육 서비스를 운영하는 EdTech 스타트업입니다. 코딩 교육과 데이터 사이언스 교육에 대한 수요는 급격히 늘어나고 있지만, 아직까지 좋은 교육 서비스를 찾기란 쉽지 않습니다. 이를 해결하고자 코드잇은 모든 강의를 자체 제작하여 퀄리티 높은 콘텐츠를 제공하고, 동시에 코딩 교육에 최적화된 플랫폼을 개발하고 있습니다. 모든 강의를 마음껏 들을 수 있는 "코드잇 무제한 멤버십"을 제공하고 있으며, 지난 5년 동안 21만 명의 수강생과 평균 만족도 4.9점이라는 국내 교육 업계에서 보기 드문 성과를 달성하였습니다. 또한 콘텐츠와 기술력을 인정받아 2021년 10월 Series B 투자를 받아 누적 140억 원의 투자를 받았고, 현재 40여 명의 팀원이 같은 목표를 향해 나아가고 있습니다.',
    category: [{ id: "wer", category: "에듀테크" }],
    salesRevenue: "350000000",
    employeeCnt: 12,
    applicantCnt: 6,
    createdAt: "2025-02-14",
    updatedAt: "2025-02-15",
  },
];

export default function Main() {
  const [params, setParams] = useState<CompanyListQuery>({
    page: 1, //기본 1페이지
    keyword: "",
    filter: "revenueDesc", //기본 정렬 기준: 매출액 높은 순
  });

  /**
   * 파라미터 업데이트
   * @description 기존의 파라미터 복사, 새로운 파라미터를 기존 상태에 추가(덮어씌우기)
   */
  const updateParams = useCallback((newParams: CompanyListQuery): void => {
    setParams((prev) => ({ ...prev, ...newParams }));
  }, []);

  console.log("params 업데이트 테스트: ", params);

  //api호출
  // const { companies, totalPages, isLoading } = useCompanyListFetch(params);

  // const isShowSkeleton = isLoading || !companies.length;

  return (
    <Stack sx={listLayout}>
      <Features.ListTitle onSearch={(keyword) => updateParams({ keyword })} />

      <Box sx={scrollWrapper}>
        <Box sx={listWrapperStyle}>
          <Single.ListLabel />
          {/* {isShowSkeleton ? (
            <SkeletonCompanyList />
          ) : ( */}
          <Features.CompanyList companies={companies} page={params.page} />
          {/* )} */}
        </Box>
      </Box>

      <ListPagination
        page={params.page ?? 1}
        count={totalPages}
        onPageChange={(page) => updateParams({ page })}
      />
    </Stack>
  );
}
