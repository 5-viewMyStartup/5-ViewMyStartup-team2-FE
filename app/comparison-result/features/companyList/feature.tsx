import { ResultCompany } from "@/global/types/data-contracts";
import { CompanyItems } from "./components/CompanyItems";

interface CompanyListProps {
  companies: ResultCompany[];
  dropdownValue?: keyof ResultCompany; // dropdownValue는 선택적 속성으로 변경
}

export const CompanyList = {
  Pick: function ({ companies }: { companies: ResultCompany[] }) {
    return (
      <div>
        {companies.map((company) => (
          <CompanyItems.Pick key={company.id} itemData={company} />
        ))}
      </div>
    );
  },

  Result: function ({ companies }: { companies: ResultCompany[] }) {
    return (
      <div>
        {companies.map((company) => (
          <CompanyItems.Result key={company.id} itemData={company} />
        ))}
      </div>
    );
  },

  Ranking: function ({ companies, dropdownValue }: CompanyListProps) {
    return (
      <div>
        {companies.map((company) => (
          <CompanyItems.Ranking
            key={company.id}
            itemData={company}
            dropdownValue={dropdownValue!} // dropdownValue는 필수 속성으로 전달
          />
        ))}
      </div>
    );
  },
};
