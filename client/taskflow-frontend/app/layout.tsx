import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";

import { siteConfig } from "@/config/site";

const work_sans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: "%s | " + siteConfig.name,
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/blue-logo.svg",
      href: "/blue-logo.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={work_sans.className}>{children}</body>
    </html>
  );
}
