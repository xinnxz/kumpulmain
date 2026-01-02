import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "KumpulMain.id - Booking Lapangan & Main Bareng",
  description: "Platform booking lapangan dan main bareng #1 di Indonesia. Temukan lapangan terdekat, buat undangan, dan main bareng teman baru!",
  keywords: ["booking lapangan", "futsal", "badminton", "main bareng", "joinan", "olahraga"],
  authors: [{ name: "KumpulMain.id" }],
  openGraph: {
    title: "KumpulMain.id - Booking Lapangan & Main Bareng",
    description: "Platform booking lapangan dan main bareng #1 di Indonesia",
    type: "website",
    locale: "id_ID",
    siteName: "KumpulMain.id",
  },
  twitter: {
    card: "summary_large_image",
    title: "KumpulMain.id - Booking Lapangan & Main Bareng",
    description: "Platform booking lapangan dan main bareng #1 di Indonesia",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}


