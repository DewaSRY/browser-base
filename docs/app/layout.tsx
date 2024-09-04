import type { Metadata } from "next";
import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
export const metadata: Metadata = {
  title: "DewaSRY | Personal",
  description:
    "DewaSRY with full name, Dewa Surya Ariesta is full stack developer with hight experience",
  icons: {
    icon: [
      {
        url: "/favicon/favicon.ico",
        rel: "icon",
      },
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        rel: "apple-touch-icon",
      },
      {
        url: "/favicon/favicon-32x32.png",
        sizes: "32x32",
        rel: "icon",
      },
      {
        url: "/favicon/favicon-16x16.png",
        sizes: "16x16",
        rel: "icon",
      },
    ],
  },
};

const inter = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
