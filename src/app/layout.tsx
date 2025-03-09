import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@mysten/dapp-kit/dist/index.css';
import Navbar from "@/components/navbar/navbar";
import QueryClientProvider from "@/context/query-provider";
import SuiProvider from "@/context/sui-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
        <QueryClientProvider>
          <SuiProvider>
              <div className="min-h-screen bg-gray-100 text-gray-100 dark:bg-gray-900 dark:text-gray-100">
                <Navbar />
                <div className="max-w-screen-xl m-auto pt-16">{children}</div>
              </div>
          </SuiProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
