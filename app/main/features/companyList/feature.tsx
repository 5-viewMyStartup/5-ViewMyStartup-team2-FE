import { COLORS } from "@/global/styles/colors";
import { Stack } from "@mui/material";
import { CompanyItems } from "./components/CompanyItems";

const mockData = [
  {
    name: "코드잇",
    image: "/sdf#",
    content:
      '코드잇은 온라인 코딩 교육 서비스를 운영하는 EdTech 스타트업입니다. 코딩 교육과 데이터 사이언스 교육에 대한 수요는 급격히 늘어나고 있지만, 아직까지 좋은 교육 서비스를 찾기란 쉽지 않습니다. 이를 해결하고자 코드잇은 모든 강의를 자체 제작하여 퀄리티 높은 콘텐츠를 제공하고, 동시에 코딩 교육에 최적화된 플랫폼을 개발하고 있습니다. 모든 강의를 마음껏 들을 수 있는 "코드잇 무제한 멤버십"을 제공하고 있으며, 지난 5년 동안 21만 명의 수강생과 평균 만족도 4.9점이라는 국내 교육 업계에서 보기 드문 성과를 달성하였습니다. 또한 콘텐츠와 기술력을 인정받아 2021년 10월 Series B 투자를 받아 누적 140억 원의 투자를 받았고, 현재 40여 명의 팀원이 같은 목표를 향해 나아가고 있습니다.',
    category: ["에듀테크"],
    salesRevenue: 140000,
    employeeCnt: 50,
    applicatnsCnt: 12,
  },
  {
    name: "뤼이드",
    image: "/#fdsa",
    content:
      '뤼이드는 온라인 코딩 교육 서비스를 운영하는 EdTech 스타트업입니다. 코딩 교육과 데이터 사이언스 교육에 대한 수요는 급격히 늘어나고 있지만, 아직까지 좋은 교육 서비스를 찾기란 쉽지 않습니다. 이를 해결하고자 코드잇은 모든 강의를 자체 제작하여 퀄리티 높은 콘텐츠를 제공하고, 동시에 코딩 교육에 최적화된 플랫폼을 개발하고 있습니다. 모든 강의를 마음껏 들을 수 있는 "코드잇 무제한 멤버십"을 제공하고 있으며, 지난 5년 동안 21만 명의 수강생과 평균 만족도 4.9점이라는 국내 교육 업계에서 보기 드문 성과를 달성하였습니다. 또한 콘텐츠와 기술력을 인정받아 2021년 10월 Series B 투자를 받아 누적 140억 원의 투자를 받았고, 현재 40여 명의 팀원이 같은 목표를 향해 나아가고 있습니다.',
    category: ["에듀테크"],
    salesRevenue: 155000,
    employeeCnt: 12,
    applicatnsCnt: 6,
  },
];

export default function CompanyList() {
  return (
    <Stack sx={companyListWrapperStyle}>
      {mockData.map((item, idx) => (
        <CompanyItems key={idx} ranking={idx} itemData={item} />
      ))}
    </Stack>
  );
}

const companyListWrapperStyle = {
  width: ["696px", "696px", "1200px"],
  borderRadius: "4px",
  flexDirection: "column",
  backgroundColor: COLORS.black_300,
  borderBottom: `1px solid ${COLORS.gray_300}`,
};
