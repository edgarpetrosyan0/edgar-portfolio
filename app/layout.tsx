import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
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

export const metadata: Metadata = {
  title: "Edgar Petrosyan · Senior Frontend Engineer",
  description:
    "Senior Frontend Developer with 7 years of experience in React, Next.js, Angular and TypeScript. Based in Yerevan, Armenia.",
  openGraph: {
    title: "Edgar Petrosyan · Senior Frontend Engineer",
    description:
      "React, Next.js, Angular and TypeScript. Admin panels, dashboards and real-time interfaces.",
    images: ["/photo.jpg"],
    type: "website",
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
      <meta name="viewport" content="initial-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi"></meta>
      <body>
        <ZoomBlocker />
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}