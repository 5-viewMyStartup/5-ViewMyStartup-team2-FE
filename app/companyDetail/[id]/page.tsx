import CompanyDetail from "@/app/companyDetail/CompanyDetail";

interface CompanyDetailPageProps {
  params: {
    id: string;
  };
}

// 정적 페이지 생성을 위한 파라미터 설정
export async function generateStaticParams() {
  // 실제 API 연동 시 모든 기업 ID 목록을 가져와서 반환
  return [
    { id: "1" },
    // 추가 기업 ID들...
  ];
}

export default function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  return <CompanyDetail id={params.id} />;
}
