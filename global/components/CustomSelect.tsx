import {
  FormControl,
  MenuItem,
  Select,
  SxProps,
  Divider,
  SelectChangeEvent,
} from "@mui/material";

import { colorChips } from "../styles/colorChips";
import Image from "next/image";

interface CustomSelectProps {
  width?: string;
  height?: string;
  options: { value: string; name: string }[];
  value: string;
  handleChange: (e: SelectChangeEvent) => void;
  defaultValue?: string;
}

const CustomIcon = () => (
  <div style={{ paddingRight: "10px" }}>
    <Image
      src="/assets/ic_toggle.svg"
      width={24}
      height={24}
      alt="toggle icon"
    />
  </div>
);

export const CustomSelect: React.FC<CustomSelectProps> = ({
  width,
  height,
  options,
  value,
  handleChange,
  defaultValue = "",
}) => {
  /**
   * ex)
   * const [valuse, setValuse] = useState("");
   * const handleChange = (event: SelectChangeEvent) => {
   * setVaue(event.target.value);
  };
 */
  return (
    <FormControl sx={{ m: 1, minWidth: 146 }}>
      <Select
        defaultValue={defaultValue}
        color="input"
        value={value}
        onChange={handleChange}
        IconComponent={CustomIcon}
        sx={{ ...selectStyle, width, height }}
        inputProps={{ "aria-label": "Without label" }}
        MenuProps={{
          PaperProps: {
            sx: {
              marginTop: "8px",
              border: `solid 1px ${colorChips.gray_100}`,
              bgcolor: colorChips.black_400,
              borderRadius: "10px",
            },
          },
        }}
      >
        {options.map((d, idx) => [
          <MenuItem key={d.value} value={d.value} sx={menuItemStyle}>
            {d.name}
          </MenuItem>,
          idx < options.length - 1 && (
            <Divider
              key={`divider-${d.value}`}
              sx={{ bgcolor: colorChips.gray_200, marginY: "4px" }}
            />
          ),
        ])}
      </Select>
    </FormControl>
  );
};

const selectStyle: SxProps = {
  width: "100%",
  height: "48px",
  borderRadius: "10px",
  border: `1px solid ${colorChips.gray_200}`,
  bgcolor: colorChips.black_400,
  color: colorChips.gray_100,
  fontFamily: "Pretendard",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "16.71px",
  textAlign: "left",
  "& .MuiSelect-select": {
    paddingX: "10px",
  },
};

const menuItemStyle: SxProps = {
  color: colorChips.gray_100,
  fontSize: "14px",
  fontWeight: 400,
  textAlign: "center",
  "&.Mui-selected": {
    bgcolor: "transparent",
  },
  "&.Mui-selected:hover": {
    bgcolor: "transparent",
  },
  "&:hover": {
    bgcolor: "transparent",
  },
};
