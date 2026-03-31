"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Zap, Search, Activity, Eye, ShieldCheck, Globe } from "lucide-react";
import { CrystalCard } from "./CrystalCard";

export function SeerLensModule() {
   return (
      <CrystalCard className="relative overflow-hidden group min-h-[400px] flex flex-col justify-between p-8">
         {/* Scanning Beam Animation */}
         <div className="absolute inset-0 z-0 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(75,74,254,0.1),transparent_70%)]" />
            
            {/* The horizontal scanning beam */}
            <motion.div
               animate={{ y: ["0%", "400%", "0%"] }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="h-[2px] w-full bg-primary/60 blur-[4px] shadow-[0_0_20px_rgba(75,74,254,0.8)]"
            />

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
         </div>

         <div className="relative z-10">
            <div className="w-12 h-12 bg-primary/20 border border-primary/40 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
               <Search className="w-6 h-6 text-primary" />
            </div>
            
            <h3 className="text-2xl font-bold font-outfit uppercase tracking-tighter text-white mb-4">
               The Seer's Lens
            </h3>
            <p className="text-gray-400 font-medium text-sm leading-relaxed max-w-xs">
               Proprietary AI scanner that dissects contract logic in real-time. Uncovering hidden honeypots and dev-entry points before you swap.
            </p>
         </div>

         <div className="relative z-10 pt-10">
            <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase text-primary/60">
               <span className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3" /> Audit Verified</span>
               <span className="w-1 h-1 bg-white/20 rounded-full" />
               <span className="flex items-center gap-1.5"><Activity className="w-3 h-3" /> 98.2% Accuracy</span>
            </div>
         </div>

         {/* Decorative "Depth" Layer */}
         <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 bg-primary/5 blur-[60px] rounded-full group-hover:bg-primary/10 transition-colors" />
      </CrystalCard>
   );
}

export function NexusPulseModule() {
   return (
      <CrystalCard className="relative overflow-hidden group min-h-[400px] flex flex-col justify-between p-8 border-accent-pink/20 hover:border-accent-pink/40 transition-all">
         {/* Liquid Pulse Animation */}
         <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden text-accent-pink">
            <svg className="w-full h-full opacity-10 group-hover:opacity-20 transition-opacity">
               <filter id="liquid">
                  <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" />
                  <feDisplacementMap in="SourceGraphic" scale="30" />
               </filter>
               <motion.circle
                  animate={{ 
                     r: [100, 300, 100],
                     opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  cx="50%" cy="50%" r="200"
                  fill="none" stroke="currentColor" strokeWidth="80"
                  style={{ filter: "url(#liquid)" }}
               />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-pink/5 to-transparent" />
         </div>

         <div className="relative z-10">
            <div className="w-12 h-12 bg-accent-pink/20 border border-accent-pink/40 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
               <Activity className="w-6 h-6 text-accent-pink" />
            </div>
            
            <h3 className="text-2xl font-bold font-outfit uppercase tracking-tighter text-white mb-4">
               Nexus Pulse
            </h3>
            <p className="text-gray-400 font-medium text-sm leading-relaxed max-w-xs">
               A globally distributed node network tracking institutional activity and malicious intent 1ms after the tx hits the mempool.
            </p>
         </div>

         <div className="relative z-10 pt-10">
            <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase text-accent-pink/60">
               <span className="flex items-center gap-1.5"><Globe className="w-3 h-3" /> Global Nodes</span>
               <span className="w-1 h-1 bg-white/20 rounded-full" />
               <span className="flex items-center gap-1.5"><Zap className="w-3 h-3" /> 1ms Latency</span>
            </div>
         </div>

         {/* Abstract Cyber-Rings */}
         <div className="absolute -top-12 -right-12 w-40 h-40 border border-white/5 rounded-full pointer-events-none group-hover:scale-110 transition-transform" />
         <div className="absolute -top-16 -right-16 w-56 h-56 border border-white/5 rounded-full pointer-events-none group-hover:scale-125 transition-transform delay-75" />
      </CrystalCard>
   );
}
