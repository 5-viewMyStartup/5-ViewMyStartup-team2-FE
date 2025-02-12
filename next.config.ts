import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "s3-alpha-sig.figma.com",
      "contents.nextunicorn.kr",
      "imgs.jobkorea.co.kr",
    ],
    unoptimized: true,
  },
  output: "export", // 정적 배포 하기 위해서
};

export default nextConfig;
