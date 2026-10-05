import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.scss";
import ZoomBlocker from "@/components/ZoomBlocker";
import ThemeProvider from "@/components/providers/ThemeProvider";

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
  "Senior Frontend Engineer with 8+ years of experience building scalable React, Next.js and Angular apps, dashboards and real-time features.";

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
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Edgar Petrosyan — Senior Frontend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image.png"],
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
    <html
     lang="en"
  className={`${display.variable} ${body.variable}`}
  suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <ZoomBlocker />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}