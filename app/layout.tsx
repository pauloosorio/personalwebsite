import type { Metadata } from "next";
import { Google_Sans_Code, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const technical = Google_Sans_Code({
  variable: "--font-technical",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

const editorial = Source_Serif_4({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Paulo Osório - Lead Experience Designer",
  description:
    "Portfolio of Paulo Osório, Lead Experience Designer focused on enterprise UX, design systems, and AI-assisted design operations.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${technical.variable} ${editorial.variable}`}>{children}</body>
    </html>
  );
}
