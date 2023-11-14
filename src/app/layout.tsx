import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Unsplash Search...",
  description: "Search images by keyword powered by unsplash.com",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`bg-slate-200 ${inter.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
