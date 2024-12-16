"use client";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "../layouts/Header/Header";
import Footer from "../layouts/Footer/Footer";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { usePathname } from "next/navigation"; // Import hook usePathname
import Providers from "../redux/Provider";

config.autoAddCss = false;

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại

  // Kiểm tra nếu không phải trang login hoặc register
  const showHeaderFooter =
    pathname !== "/login" &&
    pathname !== "/register" &&
    !pathname.includes("/admin");
  return (
    <html lang="en">
      <Providers>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {showHeaderFooter && <Header />}{" "}
          {/* Hiển thị Header nếu không phải trang login/register */}
          {children}
          {showHeaderFooter && <Footer />}{" "}
          {/* Hiển thị Footer nếu không phải trang login/register */}
        </body>
      </Providers>
    </html>
  );
}
