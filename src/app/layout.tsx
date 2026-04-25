import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Great_Vibes } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ogyantom.org"),
  title: "Ogya Ntom Prayer Army",
  description:
    "Ogya Ntom Prayer Army is an online ministry connecting the world through prayers via WhatsApp, Telegram, and Google Meet.",
  applicationName: "Ogya Ntom Prayer Army",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Ogya Ntom Prayer Army",
    description:
      "An online prayer ministry led by Watchman Opanin Thomas, connecting the world through prayers.",
    siteName: "Ogya Ntom Prayer Army",
    images: [
      {
        url: "/brand/ogya-ntom-prayer-logo.png",
        width: 1039,
        height: 719,
        alt: "Ogya Ntom Prayer Army logo",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${greatVibes.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full" suppressHydrationWarning>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
