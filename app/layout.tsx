import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Horveil — Watch culture, deeper.",
  description: "The watch world, filtered for you. Five stories every morning, Monday to Friday, each with one honest line of context.",
  openGraph: {
    title: "Horveil — Watch culture, deeper.",
    description: "The watch world, filtered for you.",
    url: "https://horveil.com",
    siteName: "Horveil",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body>{children}</body>
    </html>
  )
}
