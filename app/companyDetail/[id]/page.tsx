import CompanyDetail from "@/app/companyDetail/CompanyDetail";

interface CompanyDetailPageProps {
  params: {
    id: string;
  };
}

export default function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  return <CompanyDetail id={params.id} />;
}
