import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "William J. Pakpahan — Fullstack Engineer",
  description: "Fullstack Engineer specializing in Flutter & Laravel. Building elegant mobile and web applications.",
  keywords: ["Flutter", "Laravel", "Fullstack", "Mobile Developer", "Web Developer", "Indonesia"],
  authors: [{ name: "William Johan Pakpahan" }],
  openGraph: {
    title: "William J. Pakpahan — Fullstack Engineer",
    description: "Fullstack Engineer specializing in Flutter & Laravel.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
