"use client";

import { TechBackground } from "@/components/TechBackground";
import { AmbientOrb } from "@/components/observatory/UIElements";
import { HeroSection } from "@/components/observatory/HeroSection";
import { StatsSection } from "@/components/observatory/StatsSection";
import { FeaturesSection } from "@/components/observatory/FeaturesSection";
import { DashboardSection } from "@/components/observatory/DashboardSection";
import { AcademySection } from "@/components/observatory/AcademySection";
import { SystemStatusProvider } from "@/hooks/useSystemStatus";

export default function ObservatoryPageRedesign() {
   return (
      <SystemStatusProvider>
         <div className="relative overflow-hidden border-t border-white/[0.03] bg-[#050816] text-white">
            {/* Shared Background elements */}
            <TechBackground />
            <AmbientOrb />

            {/* Hero Section: Scanner, Mascot, and HUD */}
            <HeroSection />

            {/* Stats Grid: System metrics */}
            <StatsSection />

            {/* Features: Product overview and look */}
            <FeaturesSection />

            {/* Dashboard Overview: Live feeds, maps, and portfolio */}
            <DashboardSection />

            {/* Academy & CTA: Education and Final Call-to-action */}
            <AcademySection />
         </div>
      </SystemStatusProvider>
   );
}