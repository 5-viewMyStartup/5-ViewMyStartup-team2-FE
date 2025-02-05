import { Skeleton } from "@mui/material";
import { useCompanyImg } from "../hooks/useCompanyImg";
import Image from "next/image";
import { colorChips } from "../styles/colorChips";

interface CompanyImgProps {
  src?: string;
  width: number;
  height: number;
}

export function CompanyImg({ src, width, height }: CompanyImgProps) {
  const { handleImgErr, imgSrc, isLoading } = useCompanyImg(src);

  if (isLoading) {
    return (
      <Skeleton
        variant="circular"
        width={width}
        height={height}
        sx={{ backgroundColor: colorChips.gray_300 }}
      />
    );
  }

  return (
    <Image
      src={imgSrc}
      alt="기업 대표 이미지"
      width={width}
      height={height}
      onError={handleImgErr}
      style={{ borderRadius: "50%" }}
    />
  );
}
