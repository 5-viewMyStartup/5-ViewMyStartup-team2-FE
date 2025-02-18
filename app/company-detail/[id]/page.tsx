"use client";

import { useParams } from "next/navigation";
import CompanyDetail from "@/app/company-detail/CompanyDetail";
import { useCompanyStore } from "../store/companyStore";
import { useEffect, useState } from "react";
import { getCompanyDetail } from "../store/companyApi";
import Cookies from "js-cookie";
interface CompanyDetails {
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
  apllycant: number;
  category: {
    id: string;
    category: string;
  };
}
const CompanyDetailPage = () => {
  const { id } = useParams() as { id: string };
  const [companyData, setCompanyData] = useState<CompanyDetails | null>(null);
  const { company } = useCompanyStore();
  useEffect(() => {
    const userId = Cookies.get("id");
    if (!userId) {
      return console.log("error: userId 오류");
    }
    if (!id) {
      return console.log("error: companyId 오류", id);
    }
    getCompanyDetail(id, userId);
    if (company) {
      setCompanyData(company);
    }
  }, [id, company]);

  return companyData ? (
    <CompanyDetail company={companyData} />
  ) : (
    <div>Loading...</div>
  );
};

export default CompanyDetailPage;
