"use client";

import { useState } from "react";
import Header from "./header/Header";
import Description from "./header/Description";
import Comments from "./comments/Comments";

interface CompanyDetailProps {
  id: string;
}

const CompanyDetail = ({ id }: CompanyDetailProps) => {
  // id를 사용하여 API에서 데이터를 가져오는 로직이 추가될 예정
  const [company] = useState({ ...MOCK_DATA, id });

  return (
    <div>
      <Header
        name={company.name}
        category={company.category}
        logo={company.logo}
        stats={company.stats}
      />
      <Description description={company.description} />
      <Comments comments={company.investments} />
    </div>
  );
};

// 목업 데이터와 타입 정의
const MOCK_DATA = {
  id: "1",
  name: "코드잇",
  logo: "/company-logo.png",
  category: "에듀테크",
  description: `코드잇은 누구나 쉽게 코딩을 배울 수 있도록 도와주는 EdTech 스타트업입니다.
    현재 시리즈 A 투자를 유치하였으며, 매월 꾸준한 성장을 보이고 있습니다.`,
  stats: {
    monthlyRevenue: 44.3,
    personnel: 95,
    applicants: 0,
  },
  investments: [
    {
      investor: "김인우",
      round: 1,
      amount: 15,
      comment: "코드잇은 일일 플랫폼 기업입니다!",
    },
    {
      investor: "박지성",
      round: 2,
      amount: 12,
      comment: "교육 시장의 혁신을 이끌 기업입니다.",
    },
    {
      investor: "이미나",
      round: 3,
      amount: 8,
      comment: "성장 가능성이 무한한 기업입니다.",
    },
    {
      investor: "최준호",
      round: 4,
      amount: 10,
      comment: "탄탄한 기술력과 뛰어난 팀워크가 인상적입니다.",
    },
    {
      investor: "정다운",
      round: 5,
      amount: 7,
      comment: "교육 콘텐츠의 퀄리티가 매우 높습니다.",
    },
    {
      investor: "한소희",
      round: 6,
      amount: 9,
      comment: "사용자 경험에 대한 깊은 이해가 돋보입니다.",
    },
    {
      investor: "강민수",
      round: 7,
      amount: 11,
      comment: "지속적인 성장세가 인상적입니다.",
    },
    {
      investor: "윤서연",
      round: 8,
      amount: 6,
      comment: "교육 시장의 새로운 패러다임을 제시할 것으로 기대됩니다.",
    },
    {
      investor: "임재현",
      round: 9,
      amount: 8,
      comment: "혁신적인 교육 방식이 매력적입니다.",
    },
    {
      investor: "송민아",
      round: 10,
      amount: 13,
      comment: "글로벌 시장 진출 가능성이 높은 기업입니다.",
    },
    {
      investor: "오태호",
      round: 11,
      amount: 7,
      comment: "차별화된 비즈니스 모델이 인상적입니다.",
    },
    {
      investor: "류현진",
      round: 12,
      amount: 9,
      comment: "교육 테크 분야의 선도 기업으로 성장할 것입니다.",
    },
    {
      investor: "김태희",
      round: 13,
      amount: 8,
      comment: "교육 시장의 게임체인저가 될 것입니다.",
    },
    {
      investor: "이승우",
      round: 14,
      amount: 10,
      comment: "혁신적인 교육 플랫폼의 미래가 기대됩니다.",
    },
    {
      investor: "박서준",
      round: 15,
      amount: 6,
      comment: "사용자 중심의 서비스가 인상적입니다.",
    },
    {
      investor: "정우성",
      round: 16,
      amount: 12,
      comment: "교육 시장의 새로운 강자로 부상할 것입니다.",
    },
    {
      investor: "손예진",
      round: 17,
      amount: 7,
      comment: "학습 경험의 혁신을 이끌어낼 것입니다.",
    },
    {
      investor: "현빈",
      round: 18,
      amount: 9,
      comment: "교육 콘텐츠의 품질이 매우 뛰어납니다.",
    },
    {
      investor: "이병헌",
      round: 19,
      amount: 8,
      comment: "미래 교육의 방향성을 제시하고 있습니다.",
    },
    {
      investor: "전지현",
      round: 20,
      amount: 11,
      comment: "교육 시장의 혁신을 주도할 기업입니다.",
    },
    {
      investor: "조인성",
      round: 21,
      amount: 6,
      comment: "학습자 중심의 접근이 돋보입니다.",
    },
    {
      investor: "김수현",
      round: 22,
      amount: 7,
      comment: "교육 플랫폼의 새로운 기준을 제시합니다.",
    },
    {
      investor: "공유",
      round: 23,
      amount: 5,
      comment: "혁신적인 학습 경험을 제공합니다.",
    },
    {
      investor: "송중기",
      round: 24,
      amount: 8,
      comment: "교육 시장의 판도를 바꿀 잠재력이 있습니다.",
    },
    {
      investor: "박보검",
      round: 25,
      amount: 4,
      comment: "사용자 친화적인 플랫폼이 인상적입니다.",
    },
    {
      investor: "이정재",
      round: 26,
      amount: 4,
      comment: "교육의 미래를 선도할 기업입니다.",
    },
  ],
};

export type { CompanyDetailProps };
export default CompanyDetail;
