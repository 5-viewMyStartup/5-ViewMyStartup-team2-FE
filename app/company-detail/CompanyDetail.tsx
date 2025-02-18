"use client";

import { useEffect } from "react";
import Header from "./header/Header";
import Description from "./header/Description";
import Comments from "./comments/Comments";
import { styled, Box } from "@mui/material";
import useCompanyStore from "./store/companyStore";

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
  idx: number;
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
  const { company, loading, error, setCompany, fetchCompany } =
    useCompanyStore();

  useEffect(() => {
    if (initialData) {
      setCompany(initialData);
    } else if (id) {
      fetchCompany(id);
    }
  }, [id, initialData, setCompany, fetchCompany]);

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
          idx={company.idx}
        />
        <Description description={company.content} />
        <Comments companyId={company.id} />
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
