import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "William J. Pakpahan — Mobile Engineer & Design Systems",
  description: "Mobile Engineer at Bapenda Kota Surabaya. Specializing in Flutter, Clean Architecture, and scalable UI/UX Design Systems.",
  keywords: ["Flutter", "Clean Architecture", "Mobile Engineer", "Bapenda Surabaya", "Design System", "Laravel", "Indonesia"],
  authors: [{ name: "William Johan Pakpahan" }],
  openGraph: {
    title: "William J. Pakpahan — Mobile Engineer",
    description: "Building production-grade mobile applications with Clean Architecture & scalable Design Systems.",
    type: "website",
  },
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#080c14" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
