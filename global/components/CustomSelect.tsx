"use client";
import { SxProps, Divider, Box, Button } from "@mui/material";
import { colorChips } from "../styles/colorChips";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface CustomSelectProps {
  width?: string;
  height?: string;
  options: { value: string; name: string }[];
  value: string;
  handleChange: (value: string) => void;
  defaultValue?: string;
}
/**
 *ex)
 * const [valuse, setValuse] = useState("");
 * const test = [
 *    { name: "누적 투자금액 낮은순", value: "test1" },
 *    { name: "누적 투자금액 낮은", value: "test2" },
 *   { name: "누적 투자금액 낮", value: "test3" },
 *    { name: "누적 투자금액 ", value: "test4" },
 *    { name: "누적 투자금 ", value: "test5" },
 *  ];
 *
 *
 *  <CustomSelect
 *     defaultValue="test1"
 *     handleChange={(value) => {
 *        setValuse(value);
 *     }}
 *     value={valuse}
 *     options={test}
 *    />
 */

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  handleChange,
  defaultValue,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const selectedOption = options.find((option) => option.value === value);
  const defaultOption = options.find((option) => option.value === defaultValue);
  const displayValue = selectedOption
    ? selectedOption.name
    : defaultOption
    ? defaultOption.name
    : "Select";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleButtonClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Button ref={buttonRef} sx={selectStyle} onClick={handleButtonClick}>
        {displayValue}
        <Image
          src="/assets/ic_toggle.svg"
          width={24}
          height={24}
          alt="toggle icon"
        />
      </Button>

      {open && (
        <Box sx={dropdownStyle} ref={dropdownRef}>
          {options.map((d, idx) => (
            <Box key={d.value}>
              <Button
                onClick={() => {
                  handleChange(d.value);
                  setOpen(false);
                }}
                sx={menuItemStyle}
              >
                {d.name}
              </Button>

              {idx < options.length - 1 && (
                <Divider sx={{ width: "100%", bgcolor: colorChips.gray_200 }} />
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

const selectStyle: SxProps = {
  width: "100%",
  height: ["40px", "48px", "48px"],
  borderRadius: "10px",
  border: `1px solid ${colorChips.gray_200}`,
  bgcolor: colorChips.black_400,
  color: colorChips.gray_100,
  fontFamily: "Pretendard",
  fontSize: ["12px", "14px"],
  fontWeight: 400,
  lineHeight: "16.71px",
  textAlign: "left",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const dropdownStyle: SxProps = {
  position: "absolute",
  width: "100%",
  top: "100%",
  bgcolor: colorChips.black_400,
  borderRadius: "10px",
  border: `1px solid ${colorChips.gray_100}`,
  marginTop: "8px",
  zIndex: 1,
};

const menuItemStyle: SxProps = {
  width: "100%",
  color: colorChips.gray_100,
  fontSize: "14px",
  fontWeight: 400,
  textAlign: "left",
  padding: "8px 16px",
  "&:hover": {
    backgroundColor: colorChips.gray_200,
  },
};
