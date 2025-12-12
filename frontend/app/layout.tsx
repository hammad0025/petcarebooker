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

const siteUrl = "https://www.petcarebooker.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PetCareBooker | Book Pet Grooming Near You | Instant Online Booking",
    template: "%s | PetCareBooker",
  },
  description: "Find and book trusted pet groomers near you instantly. No phone calls, no waiting. Compare prices, read verified reviews, and schedule dog and cat grooming in seconds. Serving 100+ cities nationwide.",
  keywords: "pet grooming, dog grooming, cat grooming, mobile pet grooming, pet grooming near me, book pet groomer, dog groomer near me, pet spa",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.svg',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "PetCareBooker | Book Pet Grooming in Seconds",
    description: "Find trusted pet groomers near you. Book instantly with real-time availability. 4.9★ average rating from 1,200+ happy pet parents.",
    type: "website",
    url: "https://www.petcarebooker.com",
    siteName: "PetCareBooker",
    images: [
      {
        url: "https://www.petcarebooker.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "PetCareBooker - Book Pet Grooming Near You",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PetCareBooker | Book Pet Grooming Near You",
    description: "Find and book trusted pet groomers instantly. No phone calls needed. 4.9★ rating.",
    images: ["https://www.petcarebooker.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden w-full max-w-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden w-full max-w-full`}
      >
        <div className="overflow-x-hidden w-full max-w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
