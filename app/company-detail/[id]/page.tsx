"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CompanyDetail from "@/app/company-detail/CompanyDetail";
import { notFound } from "next/navigation";

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

interface CompanyData {
  id: string;
  name: string;
  image: string | null;
  content: string;
  employeeCnt: number;
  salesRevenue: bigint;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  comments: CompanyComment[];
  category: Category[];
  applicantCount: number;
  idx: number;
  isBookmarked: boolean;
}

// 회사 데이터를 가져오는 함수
async function getCompanyData(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/companies/${id}`,
    {
      cache: "force-cache", // SSG를 위한 설정
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch company data");
  }

  const company = await res.json();
  return company;
}

const CompanyDetailPage = () => {
  const { id } = useParams() as { id: string };
  const [companyData, setCompanyData] = useState<CompanyData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const data = await getCompanyData(id);
          setCompanyData(data);
        } catch (err) {
          console.log("error", err);
          setError("회사 데이터를 가져오는 데 실패했습니다.");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!companyData) {
    return notFound();
  }

  return <CompanyDetail id={id} initialData={companyData} />;
};

export default CompanyDetailPage;
