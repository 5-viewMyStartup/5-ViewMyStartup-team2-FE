import { Box, styled } from "@mui/material";
import { colorChips } from "@/global/styles/colorChips";
import { Typo } from "@/global/styles/Typo";

interface DescriptionProps {
  description: string;
}

const Description = ({ description }: DescriptionProps) => {
  return (
    <Card>
      <Typo
        className="text_B_20"
        color={colorChips.white}
        sx={{ marginBottom: "16px" }}
      >
        기업 소개
      </Typo>
      <Typo
        className="text_R_16"
        color={colorChips.gray_100}
        sx={{ lineHeight: 1.6, whiteSpace: "pre-line" }}
      >
        {description}
      </Typo>
    </Card>
  );
};

const Card = styled(Box)({
  backgroundColor: colorChips.black_300,
  borderRadius: "12px",
  padding: "24px",
  marginBottom: "24px",
});

export default Description;
