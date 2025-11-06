import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Background } from "@/components/Background";
import { Footer } from "@/components/Footer";
import { NetworkProvider } from "@/contexts/NetworkContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Somnia Pulse - Live Blockchain Visualizer",
  description: "Real-time blockchain activity visualizer powered by Somnia Data Streams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NetworkProvider>
          <Background />
          {children}
          <Footer />
        </NetworkProvider>
      </body>
    </html>
  );
}
