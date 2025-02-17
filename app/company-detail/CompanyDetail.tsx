"use client";

import { useState, useEffect } from "react";
import Header from "./header/Header";
import Description from "./header/Description";
import Comments from "./comments/Comments";
import { styled, Box } from "@mui/material";
import axios from "axios";

interface CompanyDetailProps {
  id: string;
  initialData: CompanyData;
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

const CompanyDetail = ({ id, initialData }: CompanyDetailProps) => {
  const [company, setCompany] = useState<CompanyData>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/company-detail/${id}`
        );

        if (!response.data) {
          throw new Error("데이터가 없습니다.");
        }

        setCompany(response.data);
        setError(null);
      } catch {
        setError("기업 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    // 초기 데이터가 있으면 API 호출 스킵
    if (!initialData) {
      fetchCompanyData();
    }
  }, [id, initialData]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error || !company) {
    return <div>{error}</div>;
  }

  return (
    <StyledWrapper>
      <StyledContainer>
        <Header
          name={company.name}
          category={company.category?.map((c) => c.name).join(", ") || ""}
          logo={company.image}
          stats={{
            monthlyRevenue: Number(company.salesRevenue),
            personnel: company.employeeCnt,
            applicants: company.applicantCount || 0,
          }}
          id={company.id}
        />
        <Description description={company.content} />
        <Comments comments={[]} />
      </StyledContainer>
    </StyledWrapper>
  );
};

const StyledWrapper = styled(Box)({
  paddingBottom: "150px",
});

const StyledContainer = styled(Box)({
  padding: "0 24px",
});

export type { CompanyDetailProps };
export default CompanyDetail;
