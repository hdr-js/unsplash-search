import type { Metadata } from "next";
import Head from "next/head";
import { Inter } from "next/font/google";
import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Unsplash Search",
  description: "Search images by keyword powered by unsplash api",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <Head>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <body className={`bg-black ${inter.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
