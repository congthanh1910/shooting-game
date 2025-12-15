import { Inter } from "next/font/google";
import type { Metadata } from "next";

import "@/styles/globals.css";

const font = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shooting game",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${font.variable} bg-black font-sans antialiased`}>{children}</body>
    </html>
  );
}
