import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const mont = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pride Care",
  description: "Portal de Saúde para a Comunidade LGBT+",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>

      <body className={mont.className}>{children}</body>
    </html>
  );
}
