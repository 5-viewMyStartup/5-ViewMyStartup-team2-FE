import CompanyDetail from "@/app/company-detail/CompanyDetail";
import { notFound } from "next/navigation";

interface CompanyDetailPageProps {
  params: {
    id: string;
  };
}

interface Company {
  id: string;
  idx: number;
  name: string;
  image: string | null;
  content: string;
  salesRevenue: bigint;
  employeeCnt: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  comments: CompanyComment[];
  category: Category[];
  applicantCount: number;
}

interface CompanyComment {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Category {
  id: string;
  name: string;
}

// 회사 데이터를 가져오는 함수
async function getCompanyData(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/company-detail/${id}`,
    {
      cache: "force-cache", // SSG를 위한 설정
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch company data");
  }

  const company = await res.json();

  // 데이터 확인을 위한 로그
  console.log("Company data:", {
    id: company.id,
    name: company.name,
    applicantCount: company.applicantCount,
  });

  return company;
}

// 모든 회사 목록을 가져오는 함수
async function getAllCompanies() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/company-detail`,
    {
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch companies");
  }

  return res.json();
}

// 정적 페이지 생성을 위한 설정
export const generateStaticParams = async () => {
  try {
    const companies = await getAllCompanies();
    // 모든 회사의 UUID id를 URL 파라미터로 변환
    // 예: id: "550e8400-e29b-41d4-a716-446655440000" -> { id: "550e8400-e29b-41d4-a716-446655440000" }
    return companies.map((company: Company) => ({
      id: company.id,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};

export default async function CompanyDetailPage({
  params,
}: CompanyDetailPageProps) {
  try {
    // URL에서 id 파라미터 추출 (예: /company-detail/550e8400-e29b-41d4-a716-446655440000 -> id: "550e8400-e29b-41d4-a716-446655440000")
    // id와 일치하는 id를 가진 회사 데이터 조회
    // params를 await으로 처리
    const { id } = await Promise.resolve(params);
    const companyData = await getCompanyData(id);

    if (!companyData) {
      console.error("No data found for id:", id);
      return notFound();
    }

    return <CompanyDetail id={id} initialData={companyData} />;
  } catch (error) {
    console.error("Error:", error);
    return notFound();
  }
}
