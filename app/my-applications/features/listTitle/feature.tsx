import { CustomSelect } from "@/global/components/CustomSelect";
import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";
import { applicationFilter, FilterOption } from "@/global/types/data-contracts";
import { Box, SelectChangeEvent, Stack } from "@mui/material";
import React, { useState } from "react";

interface ListTitleProps {
  onSelect: (filter: applicationFilter) => void;
}

const applicationFilterOptions: FilterOption[] = [
  { value: "all", name: "전체" },
  { value: "pending", name: "지원완료" },
  { value: "accepted", name: "합격" },
  { value: "rejected", name: "불합격" },
];

export default function ListTitle({
  onSelect,
}: ListTitleProps): React.ReactElement {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  function isMainCompanyFilter(value: string): value is applicationFilter {
    return ["all", "pending", "accepted", "rejected"].includes(value);
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
      <Typo className="text_B_20" content="지원현황" color={colorChips.white} />
      <Box sx={sortBoxStyle}>
        <CustomSelect
          options={applicationFilterOptions}
          value={selectedFilter}
          handleChange={handleFilterChange}
          defaultValue="all"
        />
      </Box>
    </Stack>
  );
}

const listHeaderContainerStyle = {
  flexDirection: "row" as const,
  justifyContent: "space-between",
  alignItems: "center",
  height: ["40px", "48px"],
  width: "100%",
  maxWidth: { sm: "696px", md: "1200px" },
  pl: { xs: "16px", sm: "0" },
  pr: { xs: "16px", sm: "0" },
};

const sortBoxStyle = {
  display: "flex",
  alignItems: "center",
  width: ["241px", "264px"],
  height: ["40px", "48px"],
  border: `1px solid ${colorChips.white}`, //border는 컴포넌트 넣고 삭제
};
