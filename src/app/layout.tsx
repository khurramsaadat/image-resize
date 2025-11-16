import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Image Resizer - Resize Images Online for Free",
  description: "Easily resize images online for free. Support for JPG, PNG, WebP, GIF formats. Client-side processing ensures privacy. No watermarks, no software required.",
  keywords: ["image resizer", "resize images", "image converter", "online image editor", "free image tools"],
  authors: [{ name: "Image Resizer" }],
  creator: "Image Resizer",
  publisher: "Image Resizer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome-512x512", 
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://image-resizer.com",
    title: "Image Resizer - Resize Images Online for Free",
    description: "Easily resize images online for free. Support for JPG, PNG, WebP, GIF formats. Client-side processing ensures privacy.",
    siteName: "Image Resizer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Resizer - Resize Images Online for Free",
    description: "Easily resize images online for free. Support for JPG, PNG, WebP, GIF formats. Client-side processing ensures privacy.",
    creator: "@imageresizer",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
