import { CustomSelect } from "@/global/components/CustomSelect";
import { SearchInput } from "@/global/components/input/SearchInput";
import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";
import { FilterOption, mainCompanyFilter } from "@/global/types/data-contracts";
import { Box, SelectChangeEvent, Stack } from "@mui/material";
import React, { useState } from "react";

interface ListTitleProps {
  onSearch: (search: string) => void;
  onSelect: (filter: mainCompanyFilter) => void;
}

const mainFilterOptions: FilterOption[] = [
  { value: "revenueDesc", name: "매출액 높은순" },
  { value: "revenueAsc", name: "매출액 낮은순" },
  { value: "employeeDesc", name: "사원 수 많은순" },
  { value: "employeeAsc", name: "사원 수 적은순" },
];

export default function ListTitle({
  onSearch,
  onSelect,
}: ListTitleProps): React.ReactElement {
  const [selectedFilter, setSelectedFilter] = useState<string>("revenueDesc");

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const value = e.target.value.trim();
    onSearch(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const target = e.currentTarget;

    if (e.key === "Enter") {
      const value = target.value.trim();
      onSearch(value);
    }
  };

  function isMainCompanyFilter(value: string): value is mainCompanyFilter {
    return [
      "revenueDesc",
      "revenueAsc",
      "employeeDesc",
      "employeeAsc",
    ].includes(value);
  }

  const handleFilterChange = (e: SelectChangeEvent) => {
    const selectedValue = e.target.value;

    if (isMainCompanyFilter(selectedValue)) {
      setSelectedFilter(selectedValue);
      onSelect(selectedValue);
    }
  };

  return (
    <Stack sx={listHeaderContainerStyle}>
      <Typo
        className="text_B_20"
        content="전체 스타트업 목록"
        color={colorChips.white}
      />
      <Stack sx={utilsContainerSytle}>
        <Box sx={searchBoxStyle}>
          <SearchInput
            variation="left"
            placeholder="검색어를 입력해주세요"
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
        </Box>
        <Box sx={sortBoxStyle}>
          <CustomSelect
            options={mainFilterOptions}
            value={selectedFilter}
            handleChange={handleFilterChange}
            defaultValue="revenueDesc"
          />
        </Box>
      </Stack>
    </Stack>
  );
}

const listHeaderContainerStyle = {
  flexDirection: ["column", "row"] as const,
  justifyContent: "space-between",
  alignItems: ["flex-start", "center"],
  height: ["100%", "48px"],
  width: "100%",
  maxWidth: { sm: "696px", md: "1200px" },
  pl: { xs: "16px", sm: "0" },
};

const utilsContainerSytle = {
  flexDirection: "row" as const,
  gap: ["8px", "12px", "16px"],
  width: ["343px", "450px", "632px"],
  paddingTop: ["16px", "0"],
};

const searchBoxStyle = {
  display: "flex",
  alignItems: "center",
  width: ["189px", "269px", "448px"],
  height: ["40px", "48px"],
};

const sortBoxStyle = {
  display: "flex",
  alignItems: "center",
  width: ["146px", "168px"],
  height: ["40px", "48px"],
  border: `1px solid ${colorChips.white}`, //border는 컴포넌트 넣고 삭제
};
