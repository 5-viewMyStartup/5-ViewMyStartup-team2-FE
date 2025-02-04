import { ChangeEvent } from "react";
import { companyComparisonStore } from "./companyhock";

export const DropDown: React.FC = () => {
  const { orderBy, setOrderBy } = companyComparisonStore();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(event.currentTarget.value);
  };

  return (
    <div id="DropDown">
      <select
        value={orderBy}
        onChange={handleChange}
        id="orderSelect"
        style={{
          backgroundImage: "url(/img/ic_toggle.png)",
        }}
      >
        <option value="sales-high">매출액 높은순</option>
        <option value="sales-row">매출액 낮은순</option>
        <option value="employee-high">재직자 많은순</option>
        <option value="employee-row">재직자 적은순</option>
        <option value="volunteer-high">지원자 많은순</option>
        <option value="volunteer-row">지원자 적은순</option>
      </select>
    </div>
  );
};
