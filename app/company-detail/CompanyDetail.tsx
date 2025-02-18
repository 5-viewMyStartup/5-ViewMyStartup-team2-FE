"use client";

import Header from "./header/Header";
import Description from "./header/Description";
import Comments from "./comments/Comments";
import { styled, Box } from "@mui/material";
interface Company {
  id: string;
  idx: number;
  name: string;
  image: string;
  content: string;
  salesRevenue: string;
  employeeCnt: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  isBookmarked: boolean;
}
interface CompanyDetailProps {
  company: Company;
}

const CompanyDetail: React.FC<CompanyDetailProps> = ({ company }) => {
  return (
    <StyledWrapper>
      <StyledContainer>
        <Header
          name={company.name}
          isBookmarked={company.isBookmarked}
          logo={company.image}
          stats={{
            monthlyRevenue: Number(company.salesRevenue),
            personnel: company.employeeCnt,
            applicants: 0,
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
