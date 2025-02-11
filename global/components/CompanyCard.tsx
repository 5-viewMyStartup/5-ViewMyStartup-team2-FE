import { Box, BoxProps } from "@mui/material";
import Image from "next/image";
import { Typo } from "../styles/Typo";
import { colorChips } from "../styles/colorChips";

interface CompanyCardProps {
  company: { image: string; name: string; category: string };
  onRemove: () => void;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({
  company,
  onRemove,
}) => {
  return (
    <Box sx={{ ...CardStyle }}>
      <Box display={"flex"} justifyContent={"end"}>
        <Image
          onClick={onRemove}
          width={24}
          height={24}
          src={"/assets/ic_minus.svg"}
          alt="minus"
          style={{ cursor: "pointer" }}
        />
      </Box>
      <Image
        width={80}
        height={80}
        src={company.image}
        alt="logo"
        style={{ borderRadius: "100%", objectFit: "cover" }}
      />
      <Box pt={"10px"} gap={"4px"}>
        <Typo className="text_M_16" content={company.name} />
        <Typo
          color={colorChips.gray_200}
          className="text_M_14"
          content={company.category}
        />
      </Box>
    </Box>
  );
};
const CardStyle: BoxProps = {
  color: colorChips.white,
  bgcolor: colorChips.gray_400,
  width: "126px",
  height: "187px",
  borderRadius: "8px",
  justifyContent: "center",
  textAlign: "center",
  padding: "8px",
};
