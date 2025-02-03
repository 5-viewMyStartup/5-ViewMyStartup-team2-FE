import { useEffect, useState } from "react";

interface UseCompanyImgReturn {
  handleImgErr: () => void;
  imgSrc: string;
}

//TODO: 처음에 로딩되는 동안 지금 이미지가 안뜨는데, 디폴트 이미지 보이도록 하기
export function useCompanyImg(src: string | undefined): UseCompanyImgReturn {
  const [imgErr, setImgErr] = useState<boolean>(false);

  //이미지 url이 변경될 때마다(각 카드마다) 상태 초기화
  useEffect(() => {
    setImgErr(false);
  }, [src]);

  //이미지 로드 실패 시 디폴트 이미지로 전환
  const handleImgErr = (): void => setImgErr(true);

  //imgErr이 true이거나 src가 아예 없는 경우 디폴트이미지, 정상 url인 경우 src 사용
  const imgSrc: string =
    imgErr || !src ? "/assets/default-company-img.svg" : src;

  return {
    handleImgErr,
    imgSrc,
  };
}
