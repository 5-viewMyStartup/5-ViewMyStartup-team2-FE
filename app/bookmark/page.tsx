"use client";

import { Box, Stack } from "@mui/material";
import { Features } from "./features";
import { Single } from "./single";
import { useCallback, useState } from "react";
import {
  AppliedCompanyListQuery,
  BookmarkDTO,
} from "@/global/types/data-contracts";
import { ListPagination } from "@/global/components/ListPagination";
import {
  listLayout,
  // listWrapperStyle,
  // scrollWrapper,
} from "@/global/styles/companyListStyles";

//백엔드 api 불러와서 목데이터 지우고 연동하기
const totalPages = 5;
const COMPANIES: BookmarkDTO[] = [
  {
    id: "1",
    idx: 1,
    name: "코드잇",
    image:
      "https://s3-alpha-sig.figma.com/img/14ea/2072/7d797dc61be213072dfdfe95dc9d2494?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=NDjzJ4~YCVsb5sToJq49pE63fuvnB6MksZU3tEKQhmRkJ3PZ6iOq-XL82aHpZ56F8TZwkzwjwjwGPt6Qe1yH~NEye~NRFF~o3yVNdG0Zg8oBkZAkmOM3oTVmoA5Xh8J-X3~6cTjYSLjNtP3ObTC7d-NwCaeQmkw12r5hH3rOmsVjk~~Crx6yMTqdQZRdSmaIW6e0pPek6U1kTdphUWYbfx2koA7DS02NtHR3oFBfeLqTl4du5gomP2XRk3-CYc8CwFO0VMk0p5f~CX478UzYf2Ogzsasj9~SZxFEt0pmlS3JsfFfrpsUdV-Xt94zKisHvRrkLbdw0r3nKGm5hrMsuA__",
    content:
      "코드잇은 '온라인 코딩 교육 서비스'를 운영하는 EdTech 스타트업입니다.\n\n" +
      "코딩 교육과 데이터 사이언스 교육에 대한 수요는 급격히 늘어나고 있지만, 아직까지 좋은 교육 서비스를 찾기란 쉽지 않습니다.\n" +
      "이를 해결하고자 코드잇은 모든 강의를 자체 제작하여 퀄리티 높은 콘텐츠를 제공하고, 동시에 코딩 교육에 최적화된 플랫폼을 개발하고 있습니다.\n\n" +
      "모든 강의를 마음껏 들을 수 있는 '코드잇 무제한 멤버십'을 제공하고 있으며, 지난 5년 동안 21만 명의 수강생과 평균 만족도 4.9점이라는 국내 교육 업계에서 보기 드문 성과를 달성하였습니다.\n" +
      "또한 콘텐츠와 기술력을 인정받아 2021년 10월 Series B 투자를 받아 누적 140억 원의 투자를 받았고, 현재 40여 명의 팀원이 같은 목표를 향해 나아가고 있습니다.\n\n" +
      "“배움의 기쁨을 세상 모두에게.” 이것이 코드잇의 비전입니다.\n" +
      "현재는 최고의 코딩 교육 서비스를 국내에서 제공하고 있지만, 이보다 더 큰 그림을 그리고 있습니다.\n" +
      "2021년 상반기부터 영어권 시장 진출을 시작했고, 코딩과 인접한 분야부터 스펙트럼을 넓혀 나갈 계획입니다.",
    category: [],
    applicantCnt: 23,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: "2",
    idx: 2,
    name: "헤이스타즈",
    image:
      "https://contents.nextunicorn.kr/company/9bbe6c71c46d8564/profile-285117581fc0b87d5aef4e8513fbcc880366.png",
    content:
      "외국인들이 어려워하는 한국어를 K-Content를 활용하여, 좀 더 쉽게 배울 수 있도록 헤이스타즈라는 앱을 개발하고 있습니다.\n\n" +
      "K-POP, K-드라마 열풍으로 한국어에 대한 세계인의 관심이 늘어나고 있고, 한국 기업의 세계 진출이 활발해 지며, 한국 기업에 취업하고자 하는 외국인의 수도 급속도로 증가하고 있습니다.\n" +
      "하지만 만들어진지 수십년된 한국어 문법교재들을 기반으로 영어, 중국어, 일본어 등으로 구성된 교재가 한국어 교재로 주로 한국어 학습에 사용되고 있으며 그마저도 각 국의 언어로 제공되지 못해 쉽게 학습을 포기하곤 합니다.\n\n" +
      "저희는 이런 부분에 착안하여, 영어 학습에서 검증된 숏클립 동영상 기반의 한국어 교육 어플리케이션을 개발하고, 컨텐츠의 자체 제작 및 외부 공중파 방송국 등에서의 컨텐츠 소싱을 통해 호기심을 가지고 재미있게 한국어를 학습할 수 있도록 지원하며, 최신 AI 발음 평가 시스템들을 통해 발음을 교정하는 등 실질적이면서도 부담 없는 교육 어플리케이션으로 글로벌 학습자들을 만나고자 합니다.",
    category: [],
    applicantCnt: 18,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: "3",
    idx: 3,
    name: "(주)당근나라",
    image:
      "https://contents.nextunicorn.kr/company/efcce6edf99313d9/profile-651d1798e4c719ch946d34568576713a0b3c.jpg",
    content:
      "한국에서 영어교육의 문제점은 모두 알고 있습니다. 학원이 아닌, 더 효율적이고 자연스러운 영어교육을 위해 당근나라에서는 학부모님들의 니즈를 확인후 한국에서 거주하고 있는 원어민들과 매칭하여 아이들에게 더 효율적이고 자연스러운 영어콘텐츠를 제공하고 있습니다.\n\n" +
      "원어민 선생님을 학부모가 찾기에는 많은 문제점이 있습니다. 언어소통의 어려움과, 실력이나 신뢰 확인 문제도 많고, 높은 비용때문에 장기 유지가 힘든 부분들이 많습니다.\n\n" +
      "또한 영어를 배우기 위해 해외 조기 유학, 단기 해외 살기, 어학연수 등 많이 출국하고 있지만, 비용과 시간비해, 만족도는 떨어지는 경우가 많습니다.\n\n" +
      "이런 시행착오를 감소하기 위해, 아이들이 해외에서 경험할 상황들을 국내에서 원어민과 함께 마트, 백화점, 박물관등 다양한 곳을 다니며, 자연스럽게 영어로 소통하며, 설명을 들으면 영어를 과목이 아닌 언어도구로 받아드리며 더 효과적인 언어 문화 습득을 도와주는 회사입니다.",
    category: [{id: "3", category: "에듀테크"}],
    applicantCnt: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: "4",
    idx: 4,
    name: "국제지속가능인증원",
    image:
      "https://contents.nextunicorn.kr/company/c5301d985d64b967/profile-363917f1039f92bebc15b956823550566f06.png",
    content:
      "글로벌 인증/규격이라는 한 우물만 팠더니 이제 세계가 보입니다.\n\n" +
      "K-certification, K-qualification 문화를 만들어 보겠습니다.\n\n" +
      "1. 다양한 글로벌 인증 서비스\n" +
      ": 해외수출 기업의 글로벌 경쟁력 강화를 위한 다양한 인증서비스 제공\n\n" +
      "2. 인증제도 개발\n" +
      ": 기업의 요구에 맞게 다양한 인증제도 개발하여 서비스 제공\n\n" +
      "3. 국제 교육 및 자격 인증 서비스\n" +
      ": 인증심사원 육성과 교육 프로그램 개발 등을 통한 다양한 인재 양성",
    category: [],
    applicantCnt: 17,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
];

export default function BookmarkPage() {
  const [params, setParams] = useState<AppliedCompanyListQuery>({
    page: 1, //기본 1페이지
    keyword: "",
    filter: {
      applicationStatus: false,
    }, //기본 정렬 기준: 매출액 높은 순
  });

  const updateParams = useCallback(
    (newParams: AppliedCompanyListQuery): void => {
      setParams((prev) => ({ ...prev, ...newParams }));
    },
    []
  );

  console.log("params 업데이트 테스트: ", params);

  return (
    <Stack sx={listLayout}>
      <Features.ListTitle />

      <Box sx={scrollWrapper}>
        <Box sx={listWrapperStyle}>
          <Single.ListLabel />
          <Features.BookmarkList companies={COMPANIES} page={params.page} />
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

const mainLayout = {
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
