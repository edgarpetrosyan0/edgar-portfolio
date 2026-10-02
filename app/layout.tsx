import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.scss";
import ZoomBlocker from "@/components/ZoomBlocker";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const title = "Edgar Petrosyan · Senior Frontend Engineer";
const description =
  "Senior Frontend Engineer with 7 years of experience building scalable React, Next.js and Angular apps, dashboards and realtime features.";

export const metadata: Metadata = {
  metadataBase: new URL("https://edgar-portfolio-coral.vercel.app/"), 
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Edgar Petrosyan",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#09060a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <ZoomBlocker />
        <div>{children}</div>
      </body>
    </html>
  );
}