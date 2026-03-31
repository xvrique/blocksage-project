"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ShieldAlert, Activity } from "lucide-react";
import { useEffect, useState } from "react";
import { CrystalCard } from "./CrystalCard";
import { useSystemStatus } from "@/hooks/useSystemStatus";

export function GlobalThreatMap() {
   const { globalLoad, oracleSync, addEvent } = useSystemStatus();
   const [pings, setPings] = useState<{ id: number, x: number, y: number, label: string }[]>([]);

   useEffect(() => {
      const interval = setInterval(() => {
         const locations = ["MEV-Node", "Arbitrage-Bot", "DEX-Liquidity", "Mint-Auth", "Wallet-Drainer"];
         const newPing = {
            id: Date.now(),
            x: Math.random() * 80 + 10,
            y: Math.random() * 60 + 20,
            label: locations[Math.floor(Math.random() * locations.length)]
         };
         setPings(prev => [...prev, newPing].slice(-4));
      }, 4000);
      return () => clearInterval(interval);
   }, []);

   return (
      <CrystalCard glowColor="rgba(75, 74, 254, 0.05)" className="h-full min-h-[500px] p-0 flex flex-col overflow-hidden relative group bg-[#0A0D18]/20 border-white/[0.03]">
         
         <div className="absolute top-0 inset-x-0 h-16 px-6 flex items-center justify-between border-b border-white/[0.03] bg-black/40 backdrop-blur-md z-30">
            <h3 className="text-[10px] font-black font-outfit uppercase tracking-[0.4em] flex items-center gap-3 text-white/60">
               <Globe className="w-4 h-4 text-primary animate-spin-slow" /> Global Threat Surface
            </h3>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-3 bg-white/[0.03] px-3.5 py-1.5 rounded-lg border border-white/[0.05]">
                  <Activity className="w-3 h-3 text-danger" />
                  <span className="text-[9px] font-black text-white tracking-widest leading-none">
                     {globalLoad} GB/S
                  </span>
               </div>
               <div className="w-2.5 h-2.5 bg-danger rounded-full animate-pulse shadow-[0_0_10px_rgba(255,65,77,0.5)]" />
            </div>
         </div>

         <div className="flex-1 relative overflow-hidden bg-[radial-gradient(circle_at_center,rgba(75,74,254,0.08),transparent_80%)] cursor-crosshair">
            
            <div className="absolute inset-0 flex items-center justify-center p-12 opacity-40 mix-blend-screen pointer-events-none">
               <svg viewBox="0 0 100 60" className="w-[110%] h-[110%] stroke-primary/30 fill-none stroke-[0.15]">
                  {[...Array(11)].map((_, i) => (
                     <line key={`h-${i}`} x1="0" y1={i * 6} x2="100" y2={i * 6} strokeDasharray="0.5 2" />
                  ))}
                  {[...Array(21)].map((_, i) => (
                     <line key={`v-${i}`} x1={i * 5} y1="0" x2={i * 5} y2="60" strokeDasharray="0.5 2" />
                  ))}
                  
                  <motion.path 
                     initial={{ pathLength: 0 }}
                     animate={{ pathLength: 1 }}
                     transition={{ duration: 3, ease: "easeInOut" }}
                     d="M20,15 Q25,10 35,15 T45,25 T60,20 T75,30 T85,25" 
                     className="stroke-primary/40 stroke-[0.4]"
                  />
                  <motion.path 
                     initial={{ pathLength: 0 }}
                     animate={{ pathLength: 1 }}
                     transition={{ duration: 4, delay: 0.5, ease: "easeInOut" }}
                     d="M10,40 Q20,35 30,45 T50,40 T70,50 T90,45" 
                     className="stroke-primary/40 stroke-[0.4]"
                  />
                  
                  <circle cx="50" cy="30" r="10" strokeDasharray="1 3" className="animate-[spin_40s_linear_infinite]" />
                  <circle cx="50" cy="30" r="25" strokeDasharray="2 6" className="animate-[spin_80s_linear_infinite_reverse] opacity-50" />
               </svg>
            </div>

            <AnimatePresence>
               {pings.map(p => (
                  <motion.div
                     key={p.id}
                     initial={{ scale: 0, opacity: 0 }}
                     animate={{ scale: [1, 1.4, 1], opacity: [0, 1, 1] }}
                     exit={{ scale: 0, opacity: 0 }}
                     transition={{ duration: 0.8 }}
                     style={{ left: `${p.x}%`, top: `${p.y}%` }}
                     className="absolute z-20 group"
                  >
                     <div className="relative w-8 h-8 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                        <div className="absolute inset-0 bg-danger/20 rounded-full blur-[10px]" />
                        <div className="absolute inset-0 border border-danger/40 rounded-full animate-ping" />
                        <div className="glass-pill p-1.5 border-danger/40 bg-danger/10 group-hover:bg-danger/30 transition-colors">
                           <ShieldAlert className="w-2.5 h-2.5 text-danger" />
                        </div>
                        
                        {/* Hover Tooltip */}
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                           <div className="glass-pill bg-black/90 px-3 py-1.5 border-white/10 whitespace-nowrap">
                              <span className="text-[8px] font-black text-white uppercase tracking-widest">{p.label} - DETECTED</span>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </AnimatePresence>

            <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.02]">
               <div className="absolute inset-0 bg-white/5 animate-[pulse_0.2s_linear_infinite]" />
               <div className="absolute inset-0 bg-primary/20 animate-[pulse_0.3s_linear_infinite_reverse]" />
            </div>
         </div>

         <div className="absolute bottom-6 left-6 right-6 z-30">
            <div className="glass-pill py-3 px-5 flex items-center justify-between border-white/[0.06] bg-black/60 shadow-2xl">
               <div className="flex items-center gap-5">
                  <div className="flex flex-col">
                     <span className="text-[7px] font-black text-white/30 uppercase tracking-[0.3em] mb-1">Observation Node</span>
                     <span className="text-[10px] font-black text-safe uppercase tracking-widest flex items-center gap-1.5">
                        <div className="w-1 h-1 bg-safe rounded-full" /> AF-NODE_04
                     </span>
                  </div>
                  <div className="w-px h-6 bg-white/[0.05]" />
                  <div className="flex flex-col">
                     <span className="text-[7px] font-black text-white/30 uppercase tracking-[0.3em] mb-1">Latency</span>
                     <span className="text-[10px] font-black text-white uppercase tracking-widest">{oracleSync}ms</span>
                  </div>
               </div>
               <button 
                  onClick={() => addEvent("info", "MAP: Synchronizing global telemetry...")}
                  className="px-4 py-2 bg-primary/10 border border-primary/20 text-primary text-[8px] font-black uppercase tracking-widest rounded-lg hover:bg-primary/20 transition-all"
               >
                  Sync Map
               </button>
            </div>
         </div>

         <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.03] bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px]" />
      </CrystalCard>
   );
}
