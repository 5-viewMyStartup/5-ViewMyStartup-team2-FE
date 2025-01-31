import { ReactNode } from "react";
import "./globals.css";
import { Layout } from "@/global/Layout";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="kor">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
