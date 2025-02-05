import { useEffect, useState } from "react";

interface UseCompanyImgReturn {
  handleImgErr: () => void;
  imgSrc: string;
}

export function useCompanyDefaultImg(
  src: string | undefined
): UseCompanyImgReturn {
  const [imgErr, setImgErr] = useState<boolean>(false);

  useEffect(() => {
    setImgErr(false);

    // 이미지 프리로딩
    const img = new Image();
    img.src = src || "";

    img.onerror = () => {
      setImgErr(true);
    };
  }, [src]);

  const handleImgErr = (): void => setImgErr(true);

  const imgSrc: string =
    imgErr || !src ? "/assets/default-company-img.svg" : src;

  return {
    handleImgErr,
    imgSrc,
  };
}
