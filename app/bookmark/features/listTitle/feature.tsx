import { CustomSelect } from "@/global/components/CustomSelect";
import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";
import { Box, Stack } from "@mui/material";
import React, { useState } from "react";

interface ListTitleProps {
  onSelectSort: (sort: string) => void;
}

const sortOptions = [
  { value: "1", name: "지원한 기업 우선" }, // Applied companies first
  { value: "2", name: "지원하지 않은 기업 우선" }, // Non-applied companies first
  { value: "5", name: "지원자 수 많은 순" }, // Companies with most applicants
  { value: "6", name: "지원자 수 적은 순" }, // Companies with least applicants
];

export default function ListTitle({ onSelectSort }: ListTitleProps): React.ReactElement {
  const [selectedSort, setSelectedSort] = useState<string>("1");

  const handleSortChange = (selectedValue: string) => {
    setSelectedSort(selectedValue);
    onSelectSort(selectedValue);
  };

  return (
    <Stack sx={listHeaderContainerStyle}>
      <Typo className="text_B_20" content="즐겨찾기" color={colorChips.white} />
      <Box sx={sortBoxStyle}>
        <CustomSelect
          options={sortOptions}
          value={selectedSort}
          handleChange={handleSortChange}
          defaultValue="1"
        />
      </Box>
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

const sortBoxStyle = {
  display: "flex",
  alignItems: "center",
  width: ["146px", "168px"],
  height: ["40px", "48px"],
  border: `1px solid ${colorChips.white}`,
};