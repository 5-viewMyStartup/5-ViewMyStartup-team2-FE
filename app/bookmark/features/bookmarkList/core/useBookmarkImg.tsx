import { useEffect, useState } from "react";

interface UseInvestmentImgReturn {
  handleImgErr: () => void;
  imgSrc: string;
  isLoading: boolean;
}

//TODO: 이미지 애니메이션 효과 추가하는면 로딩중이라는 표시 더 잘 보일듯듯
export function useInvestmentImg(
  src: string | undefined
): UseInvestmentImgReturn {
  const [imgErr, setImgErr] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setImgErr(false);
    setIsLoading(true);

    if (!src) {
      setIsLoading(false);
      return;
    }

    // 이미지 프리로딩
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setIsLoading(false);
    };

    img.onerror = () => {
      setImgErr(true);
      setIsLoading(false);
    };
  }, [src]);

  const handleImgErr = (): void => setImgErr(true);

  const imgSrc: string =
    isLoading || imgErr || !src ? "/assets/default-company-img.svg" : src;

  return {
    handleImgErr,
    imgSrc,
    isLoading,
  };
}
