import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "s3-alpha-sig.figma.com",
      "contents.nextunicorn.kr",
      "imgs.jobkorea.co.kr",
    ], // figma 이미지 도메인 허용
    // 또는 더 유연하게:
  },
};

export default nextConfig;
