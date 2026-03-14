import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "William J. Pakpahan — Fullstack Engineer",
  description: "Fullstack Engineer specializing in Flutter & Laravel. Building elegant mobile and web applications with passion.",
  keywords: ["Flutter", "Laravel", "Fullstack", "Mobile Developer", "Web Developer", "Surabaya", "Indonesia"],
  authors: [{ name: "William Johan Pakpahan" }],
  openGraph: {
    title: "William J. Pakpahan — Fullstack Engineer",
    description: "Fullstack Engineer specializing in Flutter & Laravel.",
    type: "website",
    locale: "en_US",
  },
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8fafc",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
