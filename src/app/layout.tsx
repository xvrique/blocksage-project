"use client";

import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import { SolanaProvider } from "@/components/SolanaProvider";
import { SystemStatusProvider } from "@/hooks/useSystemStatus";
import { FloatingDock } from "@/components/FloatingDock";
import { SageAvatar } from "@/components/SageAvatar";
import { ConnectWalletHUD } from "@/components/ConnectWalletHUD";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased min-h-screen relative`}>
        <SolanaProvider>
          {/* ─── Friendly Header ─── */}
          <header className="fixed top-0 left-0 right-0 z-50">
            <div className="absolute inset-0 bg-gradient-to-b from-[#06080F]/95 via-[#06080F]/70 to-transparent backdrop-blur-lg pointer-events-none" />

            <div className="relative max-w-[1100px] mx-auto px-6 lg:px-10 h-16 md:h-[72px] flex items-center justify-between">
              {/* Logo — warm hover */}
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 md:w-9 md:h-9 relative">
                  <Image src="/assets/icon.png" alt="BlockSage" fill className="object-contain transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="font-outfit font-bold text-base md:text-lg text-white tracking-tight group-hover:text-primary transition-colors duration-200">
                  BlockSage
                </span>
              </Link>

              {/* Wallet */}
              <ConnectWalletHUD />
            </div>
          </header>

          {/* ─── Warm Ambient Glow ─── */}
          <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
            <div className="absolute top-[-15%] left-[-5%] w-[45%] h-[45%] bg-primary/[0.04] blur-[140px] rounded-full" />
            <div className="absolute bottom-[-15%] right-[-5%] w-[35%] h-[35%] bg-accent-pink/[0.04] blur-[120px] rounded-full" />
            <div className="absolute top-[40%] right-[20%] w-[25%] h-[25%] bg-accent-cyan/[0.02] blur-[100px] rounded-full" />
          </div>

          {/* ─── Page Content ─── */}
          <main className="relative z-10">
            {children}
            <Footer />
          </main>

          {/* ─── Fixed UI Elements ─── */}
          <FloatingDock />
          <SageAvatar />
        </SolanaProvider>
      </body>
    </html>
  );
}
